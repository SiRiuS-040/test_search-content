const menuLinks = document.querySelectorAll('.menu__item-link');
const menuSlider = document.querySelector('.menu-slider');

//передвижение подчеркивания
menuLinks.forEach(function (menuLink) {
    menuLink.addEventListener('click', () => {
        menuSlider.style.width = `${menuLink.offsetWidth}px`
        menuSlider.style.left = `${menuLink.offsetLeft}px`
    })
})

//адаптив для подчеркивания
function handleResize() {
    const menuLinkActive = document.querySelector('.selected');
    menuSlider.style.width = `${menuLinkActive.offsetWidth}px`
    menuSlider.style.left = `${menuLinkActive.offsetLeft}px`
}

let timeOutFunctionId;
window.addEventListener('resize', () => {
    clearTimeout(timeOutFunctionId);
    timeOutFunctionId = setTimeout(handleResize, 400);
})

document.addEventListener('DOMContentLoaded', function (evt) {
    const menuLinkActive = document.querySelector('.selected');
    console.log('загрузка');
    menuSlider.style.width = `${menuLinkActive.offsetWidth}px`


})

// const menuLinks = document.querySelectorAll('.menu__item-link');

//переключение меню
function showBlock(link) {
    menuLinks.forEach(function (menuLink) {
        const idElement = menuLink.id;
        const block = document.querySelector(`.${idElement}`);

        if (link !== menuLink) {
            menuLink.classList.remove('active');
            menuLink.closest('.menu__item').classList.remove('selected');
            block.classList.add('section-hidden');
        } else {
            menuLink.classList.remove('active');
            menuLink.closest('.menu__item').classList.add('selected');
            block.classList.remove('section-hidden');
        }
    })
}

menuLinks.forEach(function (menuLink) {
    menuLink.addEventListener('click', () => {
        showBlock(menuLink);
        // hideMore();
    })
})



document.addEventListener('click', function (evt) {
    if (evt.target && evt.target.closest('.faq-content__question')) {
        console.log('клик по вопросу');
        let target = evt.target;
        let targetParentItem = target.closest('.faq-content__item')
        targetParentItem.classList.toggle('active')
    }
})


// поиcк на странице
// дополнительные перевенные 
const SEARCH_CLASS = 'search-content';
const HIDDEN_BY_SEARCH_CLASS = 'hidden-by-search';
const CONTENT_ITEM = 'faq-content__item';
const CONTENT_ITEM_ACTIVE_CLASS = 'active';
const HIGHLIHGT_CLASS = 'highlight';

// сохраняем чистый начальный HTML
let clearHTML = '';
let searchBlock = document.querySelector('.faq__main-section');

document.addEventListener('DOMContentLoaded', function () {
    searchBlock = document.querySelector('.faq__main-section')
    clearHTML = searchBlock.innerHTML
})

// функции  поиска в списке адресов
let liveSearchInput = document.querySelector('.faq__search-input');
let searchCondition;

function collectContent(element) {
    let parent = element.closest(`.${CONTENT_ITEM}`)
    let clearContentText = element.textContent;
    let clearInputText = liveSearchInput.value;
    searchCondition = RegExp(clearInputText, 'i');

    let result = clearContentText.match(searchCondition);

    if (result != null) {
        // убираем скрытие у родителя
        parent.classList.remove(`${HIDDEN_BY_SEARCH_CLASS}`);
        parent.classList.add(`${CONTENT_ITEM_ACTIVE_CLASS}`); //активируем все найденные элементы 
        let oldStr = element.textContent;
        let newStr = oldStr.replace(searchCondition, `<span class="${HIGHLIHGT_CLASS}">${result}</span>`);
        element.innerHTML = newStr;
    }

    if (result == null) {
        // блок заглушка отсутствия результатов
    }
}

liveSearchInput.addEventListener('input', function () {
    searchBlock.innerHTML = clearHTML; // загружаем каждый раз чистый html
    liveSearchInput.value = liveSearchInput.value.replace(/['"]+/g, '');
    let allOfficesArr = document.querySelectorAll(`.${CONTENT_ITEM}`);

    allOfficesArr.forEach(element => {
        element.classList.remove(`${HIDDEN_BY_SEARCH_CLASS}`);
        element.classList.remove(`${CONTENT_ITEM_ACTIVE_CLASS}`) // сворачиваем все элементы
    });

    if (liveSearchInput.value.length > 1) {
        allOfficesArr.forEach(element => {
            element.classList.add(`${HIDDEN_BY_SEARCH_CLASS}`);
        });
        let searchAreaArr = document.querySelectorAll(`.${SEARCH_CLASS}`);
        searchAreaArr.forEach(element => {
            collectContent(element);
        });
    }
})
