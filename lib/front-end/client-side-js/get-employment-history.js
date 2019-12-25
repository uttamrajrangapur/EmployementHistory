const SignUpForm = document.querySelector('form')
const historyInputElement = document.querySelector('input[name="history"]')
// const statusInputElement = document.querySelector('input[name="status"]')

const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

SignUpForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const history = historyInputElement.value;
    // const status = statusInputElement.value;

    messageOne.textContent = 'Loading...'
    messageTwo.textContent = ''
    // console.log(JSON.stringify({
    //     "companyName": companyName,
    //     "status": status
    // }));
    fetch('/employee/employment-history', {
        method: 'GET',
        credentials: "same-origin",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
    }).then((response) => {
        response.json().then((data) => {
            console.log(data);

            messageOne.textContent = 'Response from get employement History is as follows'
            messageTwo.textContent = '';
            if (data.status == 'session expired.Please login again') {
                messageTwo.textContent += 'session expired.Please login again'
                return;

            }
            data.forEach(company => {
                messageTwo.textContent += company.company_id;
                messageTwo.textContent += '\n';
            });
            console.log(data);
        })
    }).catch(e => {
        console.log(e);
    })
        ;

})