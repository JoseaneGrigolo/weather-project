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
  //let celsius = Math.round((temperature.value - 32) / 1.8);
  temperature.innerHTML = Math.round(celsiusGlobal);
}
buttonC.addEventListener("click", changeCelsius);

/* Working on it...*/
function updateTemperature() {
  let weekDay = [
    "Sun",
    "Mon",
    "Tue",
    "Wed",
    "Thu",
    "Fri",
    "Sat",
    "Sun",
    "Mon",
    "Tue",
    "Wed",
    "Thu",
  ];
  let weather = ["🌧", "⛅️", "☔️", "🌧", "⛅️"];
  let today = new Date();
  let weekDayList = document.querySelector("#weekDayList");
  let weatherList = document.querySelector("#weatherList");
  let tempList = document.querySelector("#tempList");

  let count = 1;
  for (let i = 1; i < 6; i++) {
    let item = document.createElement("p");
    item.appendChild(
      document.createTextNode(weekDay[today.getDay() + count++])
    );
    weekDayList.appendChild(item);
  }
  for (let i = 0; i < weather.length; i++) {
    let item = document.createElement("p");
    item.appendChild(document.createTextNode(weather[i]));
    weatherList.appendChild(item);
  }
  for (let i = 0; i < 5; i++) {
    let item = document.createElement("p");
    item.appendChild(
      document.createTextNode(Math.round(Math.random() * (35 - 1) + 1) + "°")
    );
    tempList.appendChild(item);
  }
}
updateTemperature();
