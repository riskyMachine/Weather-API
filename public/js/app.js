console.log('Client side javascript is loaded')

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')

let messageOne = document.querySelector('#message-1')
let messageTwo = document.querySelector('#message-2')

weatherForm.addEventListener('submit',(event) => {
    event.preventDefault();

    const location = search.value
    const url = 'http://localhost:3000/weather?address=' + location;

    messageOne.textContent = 'Loading...' 
    messageTwo.textContent = ''

    fetch(url).then((response) => {
        response.json().then((data) => {
            if(data.error){
                messageOne.textContent = data.error;
                messageTwo.textContent = ''
            }else{
                messageOne.textContent = data.forecastData;
                messageTwo.textContent = data.location;
            }
        })
    })
})