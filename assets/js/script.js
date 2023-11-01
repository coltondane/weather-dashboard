// API key
const apiKey = '457a3c3118899b78bfcb79e03960442b'

// load local storage
const historyStorage = JSON.parse(localStorage.getItem("searchHistory"));

// document variables
const searchBar = document.querySelector('#search-bar');

const searchBtn = document.querySelector('#search-btn');
const clearSearchBtn = document.querySelector('#clear-history');

const setLocation = document.querySelector('.weather-location');

// functions

function getLocation() {
        // get city name on click
        if (searchBar.value) {
            const cityName = searchBar.value;
            // get latitude and longitude
            const geoURL = `http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=1&appid=${apiKey}`;
    
            fetch(geoURL)
            .then((response) => {
                console.log(response.status);
                // if the response isnt good display it
                if (response.status !== 200) {
                    alert(`Must Enter Valid City Name: ${response.status}`)
    
                }
                // else return 
                return response.json();
            })
            .then((data) => {
                console.log(data);
                const lon = data[0].lon;
                const lat = data[0].lat
                console.log(lat, lon);
                // after gathering the lat and lon run the nnext function
                getCityData(lat, lon);
            })
        }
};

function getCityData(lat, lon) {
    // if there is a city value
        // get weather data API
        const apiURL = `http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}`;

        fetch(apiURL)
        .then((response) => {
            console.log(response.status);
            // if the response isnt good display it
            if (response.status !== 200) {
                alert(`Must Enter Valid City Name: ${response.status}`)

            }
            // else return 
            return response.json();
        })
        .then((data) => {
            console.log("all data: ", data);
            console.log("City Data: ", data.city);
            console.log("Future Data: ", data.list);
            // current and future conditions
            // city name, date, weather icon, temp, humidity, wind speed
            // future 5 day forecast w/ date, weather icon, temp, wind speed, amd humidity
            displayWeather(data);
        })
};

function displayWeather(data) {
    // store the weather data in variables
    selectedCity = data.city.name
    console.log(selectedCity);
}

//  event listeners
 searchBtn.addEventListener('click', getLocation);
