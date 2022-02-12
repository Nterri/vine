const iconMenu = document.querySelector('.header__burger');
const menuBody = document.querySelector('.header__menu');
if (iconMenu) {
    iconMenu.addEventListener('click', function (e) {
        document.body.classList.toggle('lock');
        iconMenu.classList.toggle('active');
        menuBody.classList.toggle('active');
    });
};

const menuLinks = document.querySelectorAll('.menu__link[data-goto]');
if (menuLinks.length > 0) {
    menuLinks.forEach(menuLink => {
        menuLink.addEventListener('click', onMenuLinkClick)
    });
    function onMenuLinkClick(e) {
        const menuLink = e.target;
        if (menuLink.dataset.goto && document.querySelector(menuLink.dataset.goto)) {
            const gotoBlock = document.querySelector(menuLink.dataset.goto);
            const gotoBlockValue = gotoBlock.getBoundingClientRect().top + pageYOffset - document.querySelector('.header__container').offsetHeight;
            if (iconMenu.classList.contains('active')) {
                document.body.classList.remove('lock');
                iconMenu.classList.remove('active');
                menuBody.classList.remove('active');
            }
            console.log(gotoBlockValue);
            window.scrollTo({
                top: gotoBlockValue,
                behavior: "smooth"
            });
        }
    }
};

document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('subscribe_form');
    const name = document.querySelector('.name');
    const number = document.querySelector('.number');
    const error = document.querySelector('.submit__error');
    const person = document.querySelectorAll('.personal-info-person');
    form.addEventListener('submit', formSend);

    function formSend(e) {
        e.preventDefault();
        remove();
        if ((name.value == '') && (number.value == '') && !(/^\d[\d\(\)\ -]{4,14}\d$/.test(number.value))) {
            add();
        }
        if (name.value == '') {
            name.classList.add('error');
            error.classList.add('active');
        }
        if (number.value == '' || !(/^\d[\d\(\)\ -]{4,14}\d$/.test(number.value))) {
            number.classList.add('error');
            error.classList.add('active');
        }
        function add() {
            error.classList.add('active');
            person.forEach(person => { person.classList.add('error') });
        }
        function remove() {
            error.classList.remove('active');
            person.forEach(person => { person.classList.remove('error') });
        }
        if ((name.value != '') && (number.value != '') && (/^\d[\d\(\)\ -]{4,14}\d$/.test(number.value))) {
            form.reset();
            form.classList.add('well');
            setTimeout(() => {
                form.classList.remove('well');
            }, 1000)
        }
    };
});