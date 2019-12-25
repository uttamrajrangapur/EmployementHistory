const LoginForm = document.querySelector('form')
const userNameInputElement = document.querySelector('input[name="username"]')
const passwordInputElement = document.querySelector('input[name="password"]')

const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

LoginForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const username = userNameInputElement.value;
    const password = passwordInputElement.value;
    
    messageOne.textContent = 'Loading...'
    messageTwo.textContent = ''

    fetch('/employee/login', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "name": username,
            "password": password,
        })
    }).then((response) => {
        response.json().then((data) => {
            messageOne.textContent = 'Response from Login is as follows'
            messageTwo.textContent = data.status;
            console.log(data);
        })
    });


    

})