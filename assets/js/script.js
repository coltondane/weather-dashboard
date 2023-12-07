// API key
const apiKey = "457a3c3118899b78bfcb79e03960442b";

// load local storage
// const historyStorage = JSON.parse(localStorage.getItem("searchHistory"));

// document variables
var storageArray = JSON.parse(localStorage.getItem("searchHistory")) || [];
const searchBar = document.querySelector("#search-bar");
// buttons
const searchBtn = document.querySelector("#search-btn");
const clearSearchBtn = document.querySelector("#clear-history");
// HTML elements
const setHistory = document.querySelector("#history-display");
const setLocation = document.querySelector(".weather-location");
const setDate = document.querySelector(".weather-date");
const setDay = document.querySelector("#day");
const setTemp = document.querySelector(".display-3");
const setDescription = document.querySelector("#description");
const setWindSpeed = document.querySelector("#wind-speed");
const setHumidity = document.querySelector("#humidity");
const forecastContainer = document.querySelector("#forecast-container");

// functions
function displaySearchHistory() {
  console.log("displaySearchHistory");
  setHistory.innerHTML = "";
  for (let i = 0; i < storageArray.length; i++) {
    // create a new li for each item in the array
    const cityHistory = document.createElement("li");
    // set the text content to the array item
    cityHistory.textContent = storageArray[i];
    cityHistory.className = "history-list";
    // add an event listener to each item to search that city on click
    setHistory.addEventListener("click", function (event) {
      if (event.target.tagName === "LI") {
        console.log(event.target.textContent);
        // Check if the clicked element is an li
        getLocation(event.target.textContent);
      };
    });
    // append
    setHistory.appendChild(cityHistory);
  }
}

function getLocation() {
  // get city name on click
  if (searchBar.value) {
    const cityName = searchBar.value;
    // add the city to search history if it isn't already there
    if (!storageArray.includes(cityName)) {
      // add the city to the search history in local storage
      storageArray.push(cityName);
      localStorage.setItem("searchHistory", JSON.stringify(storageArray));
      // refresh the search history
      displaySearchHistory();
    }
    // get latitude and longitude
    const geoURL = `http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=1&appid=${apiKey}`;

    fetch(geoURL)
      .then((response) => {
        console.log(response.status);
        // if the response isn't good display it
        if (response.status !== 200) {
          alert(`Must Enter Valid City Name: ${response.status}`);
        }
        // else return
        return response.json();
      })
      .then((data) => {
        const lon = data[0].lon;
        const lat = data[0].lat;
        // after gathering the lat and lon run the next function
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
      // if the response isn't good display it
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
  // clear the forecast container
  forecastContainer.innerHTML = "";
  // store the weather data in variables
  // city name-, date-, weather icon, temp-, humidity-, wind speed-
  const selectedLocation = `${data.city.name}, ${data.city.country}`;
  const currentTemp = `${Math.round(data.list[0].main.temp)}°F`;
  const description = data.list[0].weather[0].description;
  const currentHumidity = `Humidity: ${data.list[0].main.humidity}%`;
  const windSpeed = `Wind Speed: ${data.list[0].wind.speed}mph`;
  const date = data.list.dt_txt;

  // set the display information
  setLocation.textContent = selectedLocation;
  setDay.textContent = setDate.textContent = date;
  setTemp.textContent = currentTemp;
  setDescription.textContent = description;
  setWindSpeed.textContent = windSpeed;
  setHumidity.textContent = currentHumidity;

  // gather the noon forecast for each set of data
  const forecast = data.list.filter((list) => {
    return list.dt_txt.includes("12:00:00");
  });
  console.log(forecast);

  // create a new child div for each day
  for (let i = 0; i < forecast.length; i++) {
    const divContainer = document.createElement("div");
    divContainer.className = "weakly-weather-item";

    const forecastTemp = document.createElement("p");
    forecastTemp.textContent = `Temp: ${Math.round(forecast[i].main.temp)}°F`;

    const forecastWind = document.createElement("p");
    forecastWind.textContent = `Wind: ${forecast[i].wind.speed}mph`;

    var forecastHumidity = document.createElement("p");
    forecastHumidity.textContent = `Humidity: ${forecast[i].main.humidity}%`;

    var iconUrl = `https://openweathermap.org/img/wn/${forecast[i].weather[0].icon}@2x.png`;
    var icon = document.createElement("img");
    icon.src = iconUrl;

    divContainer.appendChild(icon);
    divContainer.appendChild(forecastHumidity);
    divContainer.appendChild(forecastWind);
    divContainer.appendChild(forecastTemp);

    // append the weather data for each one
    forecastContainer.appendChild(divContainer);
  }
}

displaySearchHistory();
//  event listeners
searchBtn.addEventListener("click", getLocation);
