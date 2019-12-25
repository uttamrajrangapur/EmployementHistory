const SignUpForm = document.querySelector('form')
const companyNameInputElement = document.querySelector('input[name="companyName"]')
const statusInputElement = document.querySelector('input[name="status"]')

const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

SignUpForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const companyName = companyNameInputElement.value;
    const status = statusInputElement.value;

    messageOne.textContent = 'Loading...'
    messageTwo.textContent = ''
    console.log(JSON.stringify({
        "companyName": companyName,
        "status": status
    }));
    fetch('/employee/employment-history', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "companyName": companyName,
            "status": status
        })
    }).then((response) => {
        response.json().then((data) => {
            messageOne.textContent = 'Response from add employement History is as follows'
            messageTwo.textContent = data.status;
            console.log(data);
        })
    }).catch(e=>{
        console.log(e);
    })
    ;

})