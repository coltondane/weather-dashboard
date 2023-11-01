
// API key
const apiKey = "457a3c3118899b78bfcb79e03960442b";

// load local storage
// const historyStorage = JSON.parse(localStorage.getItem("searchHistory"));

// document variables
const searchBar = document.querySelector("#search-bar");
// buttons
const searchBtn = document.querySelector("#search-btn");
const clearSearchBtn = document.querySelector("#clear-history");
// HTML elements
const setLocation = document.querySelector(".weather-location");
const setDate = document.querySelector(".weather-date");
const setDay = document.querySelector("#day");
const setTemp = document.querySelector(".display-3");
const setDescription = document.querySelector("#description")
const setWindSpeed = document.querySelector("#wind-speed");
const setHumidity = document.querySelector("#humidity");

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
          alert(`Must Enter Valid City Name: ${response.status}`);
        }
        // else return
        return response.json();
      })
      .then((data) => {
        console.log(data);
        const lon = data[0].lon;
        const lat = data[0].lat;
        console.log(lat, lon);
        // after gathering the lat and lon run the nnext function
        getCityData(lat, lon);
      });
  }
}

function getCityData(lat, lon) {
  // if there is a city value
  // get weather data API
  const apiURL = `http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=imperial`;

  fetch(apiURL)
    .then((response) => {
      console.log(response.status);
      // if the response isnt good display it
      if (response.status !== 200) {
        alert(`Must Enter Valid City Name: ${response.status}`);
      }
      // else return
      return response.json();
    })
    .then((data) => {
      console.log("all data: ", data);
      console.log("City Data: ", data.city);
      console.log("Future Data: ", data.list);
      // current and future conditions
      // future 5 day forecast w/ date, weather icon, temp, wind speed, amd humidity
      displayWeather(data);
    });
}

function displayWeather(data) {
  // store the weather data in variables
  // city name-, date-, weather icon, temp-, humidity-, wind speed-
  const selectedLocation = `${data.city.name}, ${data.city.country}`;
  const currentTemp = `${Math.round(data.list[0].main.temp)}°F`;
  const description = data.list[0].weather[0].description;
  const currentHumidity = `${data.list[0].main.humidity}%`;
  const windSpeed = `${data.list[0].wind.speed}mph`;
//   const date = dayjs(data.list[0].dt_txt).format(M/D/YYYY);
const date = new Date();

    // set the display information
    setLocation.textContent = selectedLocation;
    setDay.textContent = 
    setDate.textContent = date;
    setTemp.textContent = currentTemp;
    setDescription.textContent = description;
    setWindSpeed.textContent = windSpeed;
    setHumidity.textContent = currentHumidity;
}

//  event listeners
searchBtn.addEventListener("click", getLocation);
