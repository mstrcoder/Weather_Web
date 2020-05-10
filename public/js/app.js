// console.log("BHAYYA")
// fetch('http://puzzle.mead.io/puzzle').then((response) => {
//     response.json().then((data) => {
//         console.log(data)
//     })
// });


const address_val = document.querySelector('form');

const search = document.querySelector('input');
const message1 = document.querySelector('#message-1');
const message2 = document.querySelector('#message-2');

message1.textContent = ' ';


address_val.addEventListener('submit', (e) => {
    e.preventDefault()
    const location = search.value;

    fetch('http://localhost:5000/weather?address=' + location).then((response) => {
        response.json().then((val) => {
            message1.textContent = 'Current Temperature is ' + val.data.temp

            message2.textContent = 'Current Weather is ' + val.data.weather
            // console.log(val.data.temp);
        })
    });

})