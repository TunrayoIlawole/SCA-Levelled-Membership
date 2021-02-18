const domElements = {
    form: document.getElementById('form'),
    firstName: document.getElementById('first-name'),
    lastName: document.getElementById('last-name'),
    email: document.getElementById('email'),
    company: document.getElementById('company'),
    phone: document.getElementById('phone'),
    message: document.querySelector('textarea'),
    budget: document.querySelectorAll('input[name="budget"]'),
    budget1: document.getElementsByName('budget'),
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

    const small = formInput.querySelector('small');
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

// check max text 
const checkMax = (input) => {
    if(input.value.trim().length < 100) {
        showError(input, 'Please enter a minimum of 100 characters');
        return false;
    }
    else {
        showSuccess(input);
        return true;
    }
}

let validInputs = [];


// const checkBudget = (inputNodes) => {
//     for (const rb of inputNodes) {
//         if (rb.checked === true) {
//             domElements.submit.disabled = false;
//         }
//         else {
//             domElements.submit.disabled = true;
//             const radioInput = document.querySelector('.radio-input');
//             radioInput.className = 'radio-input error';
//             document.querySelector('.small').textContent = 'Please select an option';
//         }
//     }
    
// }

[domElements.firstName, domElements.lastName, domElements.email, domElements.company, domElements.phone, domElements.message, domElements.info].forEach(input => {
    input.addEventListener('change', () => {
        if(input.required) {
            let isValid;
            if (input.type === 'text') {
                isValid = checkText(input);
            } else if (input.type === 'email') {
                isValid = checkEmail(input);
            } else if (input.type === 'tel') {
                isValid = checkNumber(input)
            } else if (input.type === 'textarea') {
                isValid = checkMax(input);
            }

            if (isValid) {
                validInputs.push(input);
            }

            if (validInputs.length >= 5) {
                domElements.submit.disabled = false;
            }
            else {
                domElements.submit.disabled = true;
            }

        }
    })
});

domElements.form.addEventListener('submit', function() {

    domElements.submit.innerHTML = `<div class="loader"></div>`;
    setTimeout(function() {
        domElements.submit.textContent = 'Submit';
    }, 2000);

})