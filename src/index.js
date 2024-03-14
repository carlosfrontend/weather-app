import './styles/main.css';

const magLogo = new URL('./images/magnify.svg', import.meta.url);
const gifLogo = new URL('./images/Poweredby_100px-White_VertLogo.png', import.meta.url);
const carlosLogo = new URL('./images/carlosfrontend-logo.png', import.meta.url);
const magnifyLogo = document.querySelector('.magnify-logo');
const giphyLogo = document.querySelector('#giphy-logo');
const carlosfrontendLogo = document.querySelector('#carlosfrontend-logo');
magnifyLogo.src = magLogo;
giphyLogo.src = gifLogo;
carlosfrontendLogo.src = carlosLogo;

/* const getCurrentLocationWeather = async () => {
  try {
    const response = await fetch('https://api.weatherapi.com/v1/forecast.json?key=4d9f03d07f3643cd876174147240803&q=auto:ip&aqi=no/ip.json');
    const responseData = await response.json();
    const { current } = responseData;
    const { location } = responseData;
    console.log(location, current);
  } catch (error) {
    console.log(error);
  }
};

getCurrentLocationWeather(); */
