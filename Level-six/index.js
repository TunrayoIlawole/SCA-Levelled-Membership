const domElements = {
    navLink: document.querySelector('.right-nav'),
    toggleButton: document.querySelector('.nav-link-toggle'),
    inactive: document.querySelector('.inactive'),
    closeButton: document.querySelector('.close'),
    body: document.querySelector('body'),
    footerBtn: document.querySelector('.footer-btn'),
    footerEmail: document.getElementById('footer-email'),
    errorBlock: document.querySelector('.error-block')
}

const displayNav = () => {
    domElements.inactive.classList.add('active');
    domElements.body.classList.add('fit');
}

const closeNav = () => {
    domElements.inactive.classList.remove('active');
    domElements.body.classList.remove('fit');
}

const validateEmail = (e) => {
    let reg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (domElements.footerEmail.value === '') {
        domElements.errorBlock.classList.add('show');
        domElements.errorBlock.innerHTML = "Please enter your email address";
        e.preventDefault();
        return false;
    } else if (!reg.test(domElements.footerEmail.value.trim()) ) {
        domElements.errorBlock.classList.add('show');
        domElements.errorBlock.innerHTML = "Whoops, make sure it's an email";
        e.preventDefault();
        return false;
    } else {
        domElements.errorBlock.classList.remove('show');
        domElements.errorBlock.innerHTML = "";
        return true;
    }
}

domElements.footerBtn.addEventListener('click', validateEmail);


domElements.toggleButton.addEventListener('click', displayNav);
domElements.closeButton.addEventListener('click', closeNav);