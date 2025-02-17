import "./styles/main.css";
import { format } from "date-fns";

const magLogo = new URL("./images/magnify.svg", import.meta.url);

const defaultbackgroundUrl = new URL(
  "./images/nasa-i9w4Uy1pU-s-unsplash.jpg",
  import.meta.url
);

const carlosLogo = new URL("./images/carlosfrontend-logo.png", import.meta.url);
const magnifyLogo = document.querySelector(".magnify-logo");

const carlosfrontendLogo = document.querySelector("#carlosfrontend-logo");
const unitsButton = document.querySelector(".units-button");
const currentDate = document.querySelector(".date");
const currentCity = document.querySelector(".city");
const currentStatusLogo = document.querySelector(".status-logo");
const currentTemp = document.querySelector(".temp");
const currentConditionText = document.querySelector(".status-text");
const daysLogos = [...document.querySelectorAll(".days-logo")];
const weekDays = [...document.querySelectorAll(".weekday")];
const maxMinValues = [...document.querySelectorAll(".max-min-value")];
const tempButton = document.querySelector("#temp-button");
const atmosButton = document.querySelector("#atmos-button");
const windButton = document.querySelector("#wind-button");
const firstValue = document.querySelector("#first");
const secondValue = document.querySelector("#second");
const thirdValue = document.querySelector("#third");
const searchForm = document.querySelector("#search-form");
const searchInput = document.querySelector("#search");
let URI =
  "https://api.weatherapi.com/v1/forecast.json?key=4d9f03d07f3643cd876174147240803&q=auto:ip&days=3&aqi=no/ip.json";
magnifyLogo.src = magLogo;

function showLoading() {
  document.getElementById("loadingOverlay").style.display = "flex";
}

function hideLoading() {
  document.getElementById("loadingOverlay").style.display = "none";
}

window.addEventListener("load", hideLoading);

const getCurrentLocationBackground = async (condition) => {
  const myStatus = condition;
  showLoading();
  const response = await fetch(
    `https://api.giphy.com/v1/gifs/translate?api_key=uU7BhEfEscbnMatQy6DkKmF7hapwlMBD&s=${myStatus} weather`,
    { mode: "cors" }
  );

  if (!response.ok) {
    document.body.style.backgroundImage = defaultbackgroundUrl;
    throw new Error("Can't get a new background image");
  }

  const backgroundData = await response.json();
  document.body.style.backgroundImage = `url(${backgroundData.data.images.original.url})`;
  hideLoading();
};

const getCurrrentLocationWeather = async () => {
  const response = await fetch(URI, { mode: "cors" });

  if (!response.ok && response.status === 403) {
    throw new Error("API key has been disabled.");
  } else if (!response.ok && response.status === 401) {
    throw new Error("API key not provided.");
  } else if (!response.ok && response.status === 400) {
    throw new Error("You need put a city name in the search field!");
  }

  const weatherData = await response.json();
  getCurrentLocationBackground(weatherData.current.condition.text).catch(
    (error) => alert(error)
  );

  currentDate.textContent = `Today, ${format(
    weatherData.location.localtime,
    "eeee do"
  )}`;

  currentStatusLogo.src = weatherData.current.condition.icon;
  currentCity.textContent = `${weatherData.location.name}, ${weatherData.location.country}`;
  currentTemp.textContent = `${weatherData.current.temp_c} ºC`;
  currentConditionText.textContent = weatherData.current.condition.text;

  daysLogos.forEach((logo, index) => {
    const domLogo = logo;
    domLogo.src = weatherData.forecast.forecastday[index].day.condition.icon;
  });

  weekDays.forEach((day, index) => {
    const domDay = day;
    domDay.textContent = format(
      weatherData.forecast.forecastday[index].date,
      "eeee"
    );
  });
  maxMinValues.forEach((value, index) => {
    const domValue = value;
    domValue.textContent = `${weatherData.forecast.forecastday[index].day.maxtemp_c}º / ${weatherData.forecast.forecastday[index].day.mintemp_c}º`;
  });

  tempButton.focus();

  firstValue.textContent = `Max Temp: ${weatherData.forecast.forecastday[0].day.maxtemp_c} ºC`;
  secondValue.textContent = `Min Temp: ${weatherData.forecast.forecastday[0].day.mintemp_c} ºC`;
  thirdValue.textContent = `(Feels like): ${weatherData.current.feelslike_c} ºC`;
  return weatherData;
};

const showAtomosInternationalSystem = async () => {
  try {
    const data = await getCurrrentLocationWeather();
    atmosButton.focus();
    firstValue.textContent = `Precipitation: ${data.current.precip_mm} mm`;
    secondValue.textContent = `Pressure: ${data.current.pressure_mb} mB`;
    thirdValue.textContent = `Humidity: ${data.current.humidity} %`;
  } catch (error) {
    alert(error);
  }
};

const showAtomosEnglishSystem = async () => {
  try {
    const data = await getCurrrentLocationWeather();
    atmosButton.focus();
    firstValue.textContent = `Precipitation: ${data.current.precip_in} in`;
    secondValue.textContent = `Pressure: ${data.current.pressure_in} Hg`;
    thirdValue.textContent = `Humidity: ${data.current.humidity} %`;
  } catch (error) {
    alert(error);
  }
};

const showWindInternationalSystem = async () => {
  try {
    const data = await getCurrrentLocationWeather();
    windButton.focus();
    firstValue.textContent = `Speed: ${data.current.wind_kph} kph`;
    secondValue.textContent = `Degrees: ${data.current.wind_degree} º`;
    thirdValue.textContent = `Direction: ${data.current.wind_dir}`;
  } catch (error) {
    alert(error);
  }
};

const showWindEnglishSystem = async () => {
  try {
    const data = await getCurrrentLocationWeather();
    windButton.focus();
    firstValue.textContent = `Speed: ${data.current.wind_mph} mph`;
    secondValue.textContent = `Degrees: ${data.current.wind_degree} º`;
    thirdValue.textContent = `Direction: ${data.current.wind_dir}`;
  } catch (error) {
    alert(error);
  }
};

const showDefaultWeatherInCelsius = async () => {
  try {
    const data = await getCurrrentLocationWeather();
    currentTemp.textContent = `${data.current.temp_c} ºC`;
    firstValue.textContent = `Max Temp: ${data.forecast.forecastday[0].day.maxtemp_c} ºC`;
    secondValue.textContent = `Min Temp: ${data.forecast.forecastday[0].day.mintemp_c} ºC`;
    thirdValue.textContent = `(Feels like): ${data.current.feelslike_c} ºC`;
    maxMinValues.forEach((value, index) => {
      const domValue = value;
      domValue.textContent = `${data.forecast.forecastday[index].day.maxtemp_c}º / ${data.forecast.forecastday[index].day.mintemp_c}º`;
    });
  } catch (error) {
    alert(error);
  }
};

const showDefaultWeatherInFarenheit = async () => {
  try {
    const data = await getCurrrentLocationWeather();
    currentTemp.textContent = `${data.current.temp_f} ºF`;
    firstValue.textContent = `Max Temp: ${data.forecast.forecastday[0].day.maxtemp_f} ºF`;
    secondValue.textContent = `Min Temp: ${data.forecast.forecastday[0].day.mintemp_f} ºF`;
    thirdValue.textContent = `(Feels like): ${data.current.feelslike_f} ºF`;
    maxMinValues.forEach((value, index) => {
      const domValue = value;
      domValue.textContent = `${data.forecast.forecastday[index].day.maxtemp_f}º / ${data.forecast.forecastday[index].day.mintemp_f}º`;
    });
  } catch (error) {
    alert(error);
  }
};

const handleTemperature = () => {
  unitsButton.textContent = unitsButton.textContent === "ºC" ? "ºF" : "ºC";
  unitsButton.classList.toggle("change-color");
  if (unitsButton.textContent === "ºC") showDefaultWeatherInCelsius();
  if (unitsButton.textContent === "ºF") showDefaultWeatherInFarenheit();
};

getCurrrentLocationWeather().catch((error) => {
  if (error.message === "Failed to fetch") {
    alert("You need a Internet conexion");
  }
  alert(error);
});

unitsButton.addEventListener("click", handleTemperature);

tempButton.addEventListener("click", () => {
  if (unitsButton.textContent === "ºC") showDefaultWeatherInCelsius();
  if (unitsButton.textContent === "ºF") showDefaultWeatherInFarenheit();
});

atmosButton.addEventListener("click", () => {
  if (unitsButton.textContent === "ºC") showAtomosInternationalSystem();
  if (unitsButton.textContent === "ºF") showAtomosEnglishSystem();
});

windButton.addEventListener("click", () => {
  if (unitsButton.textContent === "ºC") showWindInternationalSystem();
  if (unitsButton.textContent === "ºF") showWindEnglishSystem();
});

searchForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const query = searchInput.value;

  URI = `https://api.weatherapi.com/v1/forecast.json?key=4d9f03d07f3643cd876174147240803&days=3&q=${query}&aqi=no`;

  getCurrrentLocationWeather().catch((error) => {
    alert(error);
  });
  searchInput.value = "";
});
