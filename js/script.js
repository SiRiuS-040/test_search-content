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
            menuLink.classList.add('active');
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
        targetParentItem.classList.toggle('hidden')

    }


})