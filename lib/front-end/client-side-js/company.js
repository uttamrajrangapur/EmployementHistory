const singUpForm = document.querySelector('form')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

singUpForm.addEventListener('submit', (e) => {
    e.preventDefault()
    messageOne.textContent = 'Loading...'
    messageTwo.textContent = ''

    fetch('/company/').then((response) => {
        response.json().then((data) => {
            messageOne.textContent = 'Companies List are as follows...'
            messageTwo.textContent = data

        })
    })
})