/* Clock & Day*/
function startTime() {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let today = new Date();
  let h = today.getHours();
  let m = today.getMinutes();
  h = checkTime(h);
  m = checkTime(m);
  document.querySelector("#clock").innerHTML = h + ":" + m;
  document.querySelector("#today").innerHTML = days[today.getDay()];

  setTimeout(startTime, 1000);
}

function checkTime(i) {
  if (i < 10) {
    i = "0" + i;
  }
  return i;
}

/* Change city */
let apiKey = "52e34c3750a0a87a4e68575b57b95041";

function showTemperature(response) {
  let city = document.querySelector("#current-city");
  city.innerHTML = response.data.name;
  let weatherDescription = document.querySelector("#description");
  weatherDescription.innerHTML = response.data.weather[0].description;
  let humidityElement = document.querySelector("#humidity");
  humidityElement.innerHTML = response.data.main.humidity;
  let windElement = document.querySelector("#wind");
  windElement.innerHTML = Math.round(response.data.wind.speed);

  let alert = document.querySelector("#weather-main");
  let weather = response.data.weather[0].main;
  alert.innerHTML = weather.toUpperCase();

  let iconElement = document.querySelector("#icon");

  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);
  celsiusGlobal = response.data.main.temp;
  let celsius = Math.round(response.data.main.temp);
  let temp = document.querySelector("#temperature-change");
  temp.innerHTML = `${celsius}`;

  getForecast(response.data.coord);
}

function cityName(event) {
  event.preventDefault();
  let input = document.querySelector("#search-city");
  let input2 = input.value.trim();
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${input2}&units=metric&appid=${apiKey}`;
  axios.get(apiUrl).then(showTemperature);
}
let button = document.querySelector("#submit-city");
button.addEventListener("click", cityName);

function handlePosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
  axios.get(apiUrl).then(showTemperature);
}
function showCurrentLocation() {
  navigator.geolocation.getCurrentPosition(handlePosition);
}
let currentButton = document.querySelector("#currenty-location");
currentButton.addEventListener("click", showCurrentLocation);

//Porto Alegre as Default;
function defaultCity(city) {
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
  axios.get(apiUrl).then(showTemperature);
}
defaultCity("Porto Alegre");

/* Fahrenheit - Celsius */
let celsiusGlobal = null;
let temperature = document.querySelector("#temperature-change");
let buttonC = document.querySelector("#button-celsius");
let buttonF = document.querySelector("#button-fahrenheit");

function changeFahrenheit(event) {
  event.preventDefault();
  buttonF.classList.add("active");
  buttonC.classList.remove("active");

  let fahrenheit = Math.round(celsiusGlobal * 1.8 + 32);
  temperature.innerHTML = fahrenheit;
}
buttonF.addEventListener("click", changeFahrenheit);

function changeCelsius(event) {
  event.preventDefault();
  buttonF.classList.remove("active");
  buttonC.classList.add("active");
  temperature.innerHTML = Math.round(celsiusGlobal);
}
buttonC.addEventListener("click", changeCelsius);

/* Forecast*/
function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[day];
}

function displayForecast(response) {
  let forecast = response.data.daily;

  let forecastElement = document.querySelector("#forecast");
  let forecastHtml = "";
  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHtml =
        forecastHtml +
        `
  <div class="row p-0">   
    <div class="col-4 p-1 weather-forecast-date fw-bold text-primary font-size">${formatDay(
      forecastDay.dt
    )}
    </div>   
    <div class="col-2 p-0"><img src="http://openweathermap.org/img/wn/${
      forecastDay.weather[0].icon
    }@2x.png" alt="" width="46" />
    </div>   
    <div class="col-6 p-2 weather-forecast-temperatures font">
       <span class="weather-forecast-temperature-max fw-bold text-secondary">${Math.round(
         forecastDay.temp.max
       )}° |</span> 
       <span class="weather-forecast-temperature-min text-secondary">${Math.round(
         forecastDay.temp.min
       )}° </span>
    </div>  
  </div>
  `;
    }
  });
  forecastElement.innerHTML = forecastHtml;
}
function getForecast(coordinates) {
  let newApi = "1d038ee28ef2727a9f0310860ac10ae9";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${newApi}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}
