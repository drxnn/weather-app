// weather data fetch

// // Geo code fetch

let longitude;
let latitude;
let city;
const cityValue = document.getElementById("search-city");

document.getElementById("search-btn-city").addEventListener("click", () => {
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

      weatherFetch();
    });
});

// document.querySelector("button").addEventListener("click", weatherFetch);

const weatherFetch = () => {
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=7204832c888665d2f8d75367e7575802`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      console.log("button clicked");
    });
};

// document.getElementById("search-btn-lon").addEventListener("click", () => {
//   longitude = longitudeValue.value;
//   console.log(`EVENT FIRED ${longitude}`);
//   longitudeValue.value = "";
// });

// document.getElementById("search-btn-lat").addEventListener("click", () => {
//   latitude = latitudeValue.value;
//   console.log(`EVENT FIRED ${latitude}`);
//   latitudeValue.value = "";
// });
