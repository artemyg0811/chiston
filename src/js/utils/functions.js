// Сокращенная запись нахождения одного элемента
export function find(selector) {
    return document.querySelector(selector)
}
//========================================================================================================================================================

// Сокращенная запись нахождения нескольких элементов
export function findAll(selectors) {
    return document.querySelectorAll(selectors)
}
//========================================================================================================================================================

// Удаляет у всех элементов items класс itemClass
export function removeAllClasses(items, itemClass) {
    if (typeof items == "string") {
        items = document.querySelectorAll(items)
    }

    for (let i = 0; i < items.length; i++) {
        if (typeof(itemClass) === 'object') {
            items[i].classList.remove(...itemClass)
        }
        else {
            items[i].classList.remove(itemClass)
        }
    }
}
//========================================================================================================================================================

// Удаляет у элемента item класс itemClass
export function removeClass(item, itemClass) {
    if (typeof item == "string") {
        item = document.querySelectorAll(item)
    }

    item.classList.remove(itemClass)
}
//========================================================================================================================================================

// Получаем все соседние элементы
export function getSiblings(elem) {
    var siblings = []
    var sibling = elem
    while (sibling.previousSibling) {
        sibling = sibling.previousSibling
        sibling.nodeType == 1 && siblings.push(sibling)
    }

    sibling = elem
    while (sibling.nextSibling) {
        sibling = sibling.nextSibling
        sibling.nodeType == 1 && siblings.push(sibling)
    }

    return siblings
}
//========================================================================================================================================================


// Возвращает рандомное целое число
export function getRandomInt(min, max) {
    min = Math.ceil(min)
    max = Math.floor(max) + 1
    return Math.floor(Math.random() * (max - min)) + min
}
//========================================================================================================================================================


// Проверка поддержки webp, добавление класса webp или no-webp тегу body
isWebp()
export function isWebp() {
    // Проверка поддержки webp
    function testWebP(callback) {
        let webP = new Image()

        webP.onload = webP.onerror = function () {
            callback(webP.height == 2)
        }

        webP.src = "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA"
    }

    testWebP(function (support) {
        let className = support === true ? "webp" : "no-webp"
        document.body.classList.add(className)
    })
}
//========================================================================================================================================================

acc()
// Аккордеон
// data-acc-toggle - кнопка при клике по которой показывается/скрывается тело аккордеона
// data-acc-body - тело аккордеона
// data-acc-hidden-sibling - аккордеоны будут скрываться при выборе других аккордеонов. !Атрибут указывается у контейнера (acc-list), в котором находятся аккордеоны
export function acc() {
    const preview = document.querySelector('.faq-preview')
    const previewImg = preview.querySelector('.faq-preview__img img')
    const previewContent = preview.querySelector('.faq-preview__content')
    
    window.addEventListener("click", (e) => {

        if (e.target.getAttribute('data-acc-toggle') || e.target.closest('[data-acc-toggle]')) {
            doAcc(e.target)
        }
    })

    if (window.innerWidth > 768) {
        const accFirst = document.querySelectorAll('.acc')[0]

        accFirst.classList.add('acc_show')
        doAcc(accFirst.querySelector('.acc__toggle'))

        console.log(accFirst)
    }

    // if (document.querySelector('.acc_show')) {
    //     const accToggleElems = document.querySelectorAll('.acc_show .acc__toggle')

    //     for (let i = 0; i < accToggleElems.length; i++) {
    //         const accToggle = accToggleElems[i];

    //         doAcc(accToggle)
    //         accToggle.parentElement.classList.add("acc_show")
    //     }
    // }

    function doAcc(accToggle) {
        const accContainer = !accToggle.closest("[data-acc-body]") ? accToggle.parentElement.parentElement : accToggle.closest("[data-acc-body]")
        const accElem = accToggle.parentElement
        const accBody = accToggle.nextElementSibling
        
        if (window.innerWidth <= 768) {
            accElem.classList.toggle("acc_show")
    
            if (accBody.style.maxHeight) {
                accBody.style.maxHeight = null
                accElem.classList.remove("acc_show")
            } else {
                const adjacentElems = getSiblings(accElem)
                const accHiddenSibling = accContainer.dataset.accHiddenSibling
    
                if (accHiddenSibling != undefined && accHiddenSibling != 'false') {
    
                    for (let i = 0; i < adjacentElems.length; i++) {
                        const elem = adjacentElems[i]
                        const elemHeader = elem.querySelector("[data-acc-toggle]")
                        const elemBody = elem.querySelector("[data-acc-body]")
    
                        elem.classList.remove("acc_show")
                        elemHeader.classList.remove("acc_show")
                        elemBody.style.maxHeight = null
                    }
                }
    
                accBody.style.maxHeight = accBody.scrollHeight + "px"
                accContainer.style.maxHeight = parseInt(accContainer.scrollHeight) + accBody.scrollHeight + "px"
            }
        }
        else {
            const accContent = accBody.querySelector('.acc__content')
            const accElems = accContainer.querySelectorAll('.acc')
            const accImg = accElem.dataset.imgThumb
    
            removeAllClasses(accElems, 'acc_show')
            accElem.classList.add('acc_show')
    
            previewContent.innerHTML = accContent.innerHTML
            previewImg.src = accImg
        }
    }
}
//========================================================================================================================================================

// Вспомогательные модули блокировки прокрутки и резкого сдвига
export let bodyLockStatus = true;
export let bodyLockToggle = (delay = 100) => {
	if (document.documentElement.classList.contains('_lock')) {
		bodyUnlock(delay);
	} else {
		bodyLock(delay);
	}
}

// Разблокировать скролл
export let bodyUnlock = (delay = 100) => {
	let body = document.querySelector("body");
	if (bodyLockStatus) {
		let lock_padding = document.querySelectorAll("[data-lp]");
		setTimeout(() => {
			for (let index = 0; index < lock_padding.length; index++) {
				const el = lock_padding[index];
				el.style.paddingRight = '0px';
			}
			body.style.paddingRight = '0px';
			document.documentElement.classList.remove("_lock");
		}, delay);
		bodyLockStatus = false;
		setTimeout(function () {
			bodyLockStatus = true;
		}, delay);
	}
}

// Заблокировать скролл
export let bodyLock = (delay = 100) => {
	let body = document.querySelector("body");
	if (bodyLockStatus) {
		let lock_padding = document.querySelectorAll("[data-lp]");
		for (let index = 0; index < lock_padding.length; index++) {
			const el = lock_padding[index];
			el.style.paddingRight = window.innerWidth - document.querySelector('.wrapper').offsetWidth + 'px';
		}
		body.style.paddingRight = window.innerWidth - document.querySelector('.wrapper').offsetWidth + 'px';
		document.documentElement.classList.add("_lock");

		bodyLockStatus = false;
		setTimeout(function () {
			bodyLockStatus = true;
		}, delay);
	}
}

// Ленивая загрузка изображений
lazyLoading();
function lazyLoading() {
    const lazyElems = document.querySelectorAll("[data-lazy-loading]")
    const windowHeight = document.documentElement.clientHeight

    lazyShow()
    window.addEventListener("scroll", function () {
        lazyShow()
    })

    function lazyShow() {
        for (let i = 0; i < lazyElems.length; i++) {
            const lazyElem = lazyElems[i];

            if (lazyElem.tagName === 'SCRIPT' && (lazyElem.getAttribute('src') == '' || lazyElem.getAttribute('src') == null)) {
                if (lazyElem.parentElement.getBoundingClientRect().top - windowHeight < 400) {
                    lazyElem.setAttribute("src", lazyElem.dataset.lazyLoading)
                    lazyElem.removeAttribute('data-lazy-loading')
                }
            }
            else if (lazyElem.getBoundingClientRect().top - windowHeight < 400 && (lazyElem.getAttribute('src') == '' || lazyElem.getAttribute('src') == null)) {
                lazyElem.setAttribute("src", lazyElem.dataset.lazyLoading)
                lazyElem.removeAttribute('data-lazy-loading')
            }
        }
    }
}