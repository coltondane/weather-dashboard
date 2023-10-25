// API key
const apiKey = '457a3c3118899b78bfcb79e03960442b'

// load local storage
const historyStorage = JSON.parse(localStorage.getItem("searchHistory"));

// document variables
const searchBar = document.querySelector('#search-bar');
const searchBtn = document.querySelector('#search-btn');
const clearSearchBtn = document.querySelector('#clear-history');

// functions

function getLocation(cityName) {
        // get latitude and longitude
        const geoURL = `http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit={limit}&appid=${apiKey}`;

        fetch(geoURL)
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

function getCityData() {
    // if there is a city value
    if (searchBar.value) {
        const cityName = searchBar.value;

        const lat = getLocation(cityName);
        
        // get weather data API
        const apiURL = `api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}`;

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
            console.log(data.main);
            // current and future conditions
            // city name, date, weather icon, temp, humidity, wind speed
            // future 5 day forecast w/ date, weather icon, temp, wind speed, amd humidity
        })
    }
};

//  event listeners
 searchBtn.addEventListener('click', getCityData);
