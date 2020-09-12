document.getElementById('form').addEventListener('submit', validateForm);

function validateForm() {
    let errorMessage = '';
    //Name
    let regExpression = /(\W|\d)/g;
    let item = document.getElementById('name');
    if (regExpression.test(item.value)) {
        item.style.backgroundColor = '#ff6f6f';
        event.preventDefault();
        errorMessage = errorMessage + 'Name'
    } else {
        item.style.backgroundColor = '#fff';
    }

    //phone
    regExpression = /^\+7\([0-9]{3}\)[0-9]{3}-[0-9]{4}$/g;
    item = document.getElementById('phone');
    console.log(item.value)
    if (!regExpression.test(item.value)) {
        item.style.backgroundColor = '#ff6f6f';
        event.preventDefault();
        errorMessage = errorMessage + ', Phone number';
    } else {
        item.style.backgroundColor = '#fff';
    }

    //email
    regExpression = /^[a-zA-Z0-9]*(\.|-)?[a-zA-Z0-9]*@[a-zA-Z]*\.[a-zA-Z]{2,3}$/g;
    item = document.getElementById('eAddress');
    console.log(item.value)
    if (!regExpression.test(item.value)) {
        item.style.backgroundColor = '#ff6f6f';
        event.preventDefault();
        errorMessage = errorMessage + ', Email address';
    } else {
        item.style.backgroundColor = '#fff';
    }

    if (errorMessage != '') {
        if (errorMessage[0] == ',') {
            errorMessage = errorMessage.slice(1, errorMessage.length-1);
        }
        alert('Invalid input: ' + errorMessage);
    }
}