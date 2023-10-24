// API key
const apiKey = '457a3c3118899b78bfcb79e03960442b'

// document variables
const searchBarVal = document.querySelector('input').value;
const searchBtn = document.querySelector('#search-btn');
const clearSearchBtn = document.querySelector('#clear-history');

// functions

 function getCity(cityName) {
    // if there is a city value
    return function () {
        console.log(cityName);
    }
 };

//  event listeners
 searchBtn.addEventListener('click', getCity(searchBarVal));
