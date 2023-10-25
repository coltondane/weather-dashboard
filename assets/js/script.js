// API key
const apiKey = '457a3c3118899b78bfcb79e03960442b'

// load local storage
const historyStorage = JSON.parse(localStorage.getItem("searchHistory"));

// document variables
const searchBar = document.querySelector('#search-bar');
const searchBtn = document.querySelector('#search-btn');
const clearSearchBtn = document.querySelector('#clear-history');

// functions

function getCity() {
    // if there is a city value
    console.log(searchBar.value);
    return searchBar.value
};

//  event listeners
 searchBtn.addEventListener('click', getCity);
