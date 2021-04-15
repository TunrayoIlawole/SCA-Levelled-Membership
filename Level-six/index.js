const navLink = document.querySelector('.right-nav');
const toggleButton = document.querySelector('.nav-link-toggle');

const displayNav = () => {
    if (navLink.classList.contains('nav-show')) {
        toggleButton.innerHTML = '<img src = "images/icon-close.svg" alt = "Logo" />';
    }
    else {
        toggleButton.innerHTML = '<img src = "images/icon-hamburger.svg" alt = "Hamburger menu" />';
    }
}

toggleButton.addEventListener('click', displayNav);