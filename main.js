// weather data fetch

// TO DO:
// throw error if input is not a valid value => not a city
// add use current location function
// add wind data below everything else

// // Geo code fetch
let cityName = document.getElementById("city-name");
let currentTemp = document.getElementById("current-temp");
let highestTemp = document.getElementById("highest-temp");
let lowestTemp = document.getElementById("lowest-temp");
let weatherDescription = document.getElementById("weather-description");
let humidity = document.getElementById("humidity-level");
let longitude;
let latitude;
let city;
let weatherIconCode;
const cityValue = document.getElementById("search-city");

// handles Fetch, get data, receives input from user -> grabs lon and lat of city, then calls weatherFetch(lat, lon)
let handleFetch = () => {
  city = cityValue.value;
  console.log(`EVENT FIRED ${city}`);
  cityValue.value = "";
  fetch(
    `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=7204832c888665d2f8d75367e7575802`
  )
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      latitude = data[0].lat;
      longitude = data[0].lon;
      console.log(latitude, longitude);

      weatherFetch(latitude, longitude);
    });
  // weatherFetch();
};

// Event Listeners when entering the search button or the Enter key

document.getElementById("search-btn-city").addEventListener("click", () => {
  handleFetch();
});
document.addEventListener("keypress", function (e) {
  if (e.code === "Enter") {
    const inputField = document.getElementById("search-city");
    if (inputField.value.trim() !== "") {
      e.preventDefault();
      handleFetch();
    }
  }
});

// Fetching the data of city. Plugs data into the dom

const weatherFetch = (lat, lon) => {
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=7204832c888665d2f8d75367e7575802`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      console.log(data, data.main, data.weather);
      console.log("button clicked");
      cityName.innerText = data.name;
      currentTemp.innerText = `${convertKelvinToCelcius(data.main.temp)} C`;
      highestTemp.innerText = `H: ${convertKelvinToCelcius(
        data.main.temp_max
      )} C`;
      lowestTemp.innerText = `L: ${convertKelvinToCelcius(
        data.main.temp_min
      )} C`;
      weatherDescription.innerText = data.weather[0].description;
      humidity.innerText = `Humidity: ${data.main.humidity}`;

      // img to show weather icon
      weatherIconCode = data.weather[0].icon;
      document.querySelector(
        "img"
      ).src = `https://openweathermap.org/img/wn/${weatherIconCode}@2x.png`;
    });
};

const convertKelvinToCelcius = (x) => {
  return Math.floor(x - 273.15);
};
