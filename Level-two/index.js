const domElements = {
    form: document.getElementById('form'),
    firstName: document.getElementById('first-name'),
    lastName: document.getElementById('last-name'),
    email: document.getElementById('email'),
    company: document.getElementById('company'),
    phone: document.getElementById('phone'),
    message: document.querySelector('textarea'),
    budget: document.querySelectorAll('input[name="budget"]'),
    info: document.getElementById('info'),
    submit: document.querySelector('.submit')
}

const showSuccess = (input) => {
    const formInput = input.parentElement;
    formInput.className = 'form-input success';
}

const showError = (input, message) => {
    const formInput = input.parentElement;
    formInput.className = 'form-input error';

    const small = formInput.querySelector('.small');
    small.textContent = message;
}

// check text inputs
const checkText = (input) => {
    const regex = /^\d+$/;
    if (input.value.match(regex)) {
        showError(input, 'This field cannot contain numbers');
        return false;
    }
    else {
        showSuccess(input);
        return true;
    }
}

// check email
const checkEmail = (input) => {
    const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (regex.test(input.value.trim())) {
        showSuccess(input);
        return true;
    }
    else {
        showError(input, 'Enter a valid email');
    }
}

// check number
const checkNumber = (input) => {
    const regex2 = /^\d+$/;
    if (input.value.match(regex2)) {
        showSuccess(input);
        return true;
    }
    else {
        showError(input, 'Phone number is not valid');
        return false;
    }
}

