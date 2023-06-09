const apiKey = "7bdd1a18f40370e69fd1f149baf85ddc";
const apiUrl =
  "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const city = document.querySelector(".search-bar");
const searchIcon = document.getElementById("search-icon");
const weatherImg = document.querySelector(".weather-img");
const errorMessage = document.querySelector(".error");

// Displaying weather box
const displayWeatherBox = function () {
  errorMessage.classList.add("hidden");
  document.querySelector(".weather-info").classList.remove("hidden");
  document.querySelector(".weather-details").classList.remove("hidden");
};

// Hiding weather box
const hideWeatherBox = function () {
  errorMessage.classList.remove("hidden");
  document.querySelector(".weather-info").classList.add("hidden");
  document.querySelector(".weather-details").classList.add("hidden");
  errorMessage.innerHTML = "❌ Invalid City Name";
};

async function checkWeather(city) {
  const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
  const data = await response.json();

  console.log(data);
  if (data.message == "city not found") hideWeatherBox();
  else {
    displayWeatherBox();
    document.querySelector(".temperature").innerHTML =
      Math.round(data.main.temp) + " °C";
    document.querySelector(".weather-condition").innerHTML =
      data.weather[0].description;
    document.querySelector(".city-name").innerHTML =
      data.name + ", " + data.sys.country;
    document.querySelector("#humidity").innerHTML = data.main.humidity + "%";
    document.querySelector("#wind-speed").innerHTML = data.wind.speed + "km/h";
    if (data.weather[0].main == "Clouds") weatherImg.src = "assets/clouds.png";
    else if (data.weather[0].main == "Clear")
      weatherImg.src = "assets/clear.png";
    else if (data.weather[0].main == "Drizzle")
      weatherImg.src = "assets/drizzle.png";
    else if (data.weather[0].main == "Mist") weatherImg.src = "assets/mist.png";
    else if (data.weather[0].main == "Rain") weatherImg.src = "assets/rain.png";
    else if (data.weather[0].main == "Snow") weatherImg.src = "assets/snow.png";
  }
}

searchIcon.addEventListener("click", () => {
  if (city.value == "") {
    hideWeatherBox();
    errorMessage.innerHTML = "⚠️ Please Enter A City Name";
  } else checkWeather(city.value);
});

document.addEventListener("keydown", function (e) {
  if (e.key === "Enter") {
    if (city.value == "") {
      hideWeatherBox();
      errorMessage.innerHTML = "⚠️ Please Enter A City Name";
    } else checkWeather(city.value);
  }
});

// Typed top bar
var typed = new Typed(".typing-text", {
  strings: [
    "Sunshine is delicious,",
    "Rain is refreshing,",
    " Wind braces us up,",
    "Snow is exhilarating,",
    "There is really no such thing as bad weather,",
    "Only different kinds of good weather.",
  ],
  typeSpeed: 100,
  backSpeed: 100,
  loop: true,
});
