// API key
const apiKey = '457a3c3118899b78bfcb79e03960442b'

// load local storage
const historyStorage = JSON.parse(localStorage.getItem("searchHistory"));

// document variables
const searchBar = document.querySelector('#search-bar');
const searchBtn = document.querySelector('#search-btn');
const clearSearchBtn = document.querySelector('#clear-history');

// functions

function getCityData() {
    // if there is a city value
    if (searchBar.value) {
        const cityName = searchBar.value;
        
        // get API
        const apiURL = "https://api.openweathermap.org/data/2.5/weather?q="+ cityName +"&appid=" + apiKey +"&units=imperial";

        fetch(apiURL)
        .then(function(response) {
            console.log(response.status);
            // if the response isnt good display it
            if (response.status !== 200) {
                alert(`Must Enter Valid City Name: ${response.status}`)

            }
            // else return 
            return response.json();
        })
        .then(function(data) {
            console.log(data);
        })
    }
};

//  event listeners
 searchBtn.addEventListener('click', getCityData);
