const SignUpForm = document.querySelector('form')
const userNameInputElement = document.querySelector('input[name="username"]')
const passwordInputElement = document.querySelector('input[name="password"]')
const confirmPasswordInputElement = document.querySelector('input[name="confirmPassword"]')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

SignUpForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const username = userNameInputElement.value;
    const password = passwordInputElement.value;
    const confirmPassword = confirmPasswordInputElement.value;

    messageOne.textContent = 'Loading...'
    messageTwo.textContent = ''

    fetch('/employee/sign-up', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "name": username,
            "password": password,
            "confirmPassword": confirmPassword
        })
    }).then((response) => {
        response.json().then((data) => {
            messageOne.textContent = 'Response from signUp is as follows'
            messageTwo.textContent = data.status;
            console.log(data);
        })
    });


    

})