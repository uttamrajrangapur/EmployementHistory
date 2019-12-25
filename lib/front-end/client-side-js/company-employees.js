const singUpForm = document.querySelector('form')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')
const search = document.querySelector('input')

singUpForm.addEventListener('submit', (e) => {
    e.preventDefault()
    let companyname = search.value;
    messageOne.textContent = 'Loading...'
    messageTwo.textContent = ''
    console.log(companyname);
    fetch(`/company/${companyname}/employees/`).then((response) => {
        response.json().then((data) => {
            messageOne.textContent = 'All the current employees in the company are as follows:\n'
            data.currentEmployees.forEach(employee => {
                messageOne.textContent += `\n ${employee}`    
            })
            messageTwo.textContent = 'All the past employees in the company are as folllows:\n'
            data.pastEmployees.forEach(employee => {
                messageTwo.textContent += `\n ${employee}`    
            })
            console.log(JSON.stringify(data, null, 2));
            

        })
    })
})