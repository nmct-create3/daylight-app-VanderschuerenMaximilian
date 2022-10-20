let sunriseElement;
let sunsetElement;
let locationElement;
let sunElement;
let totalTime;

// VOOR MEZELF: MENEER HEEFT GEWERKT MET NEW DATE EN WIL DEZE OMZETTEN NAAR MINUTEN, IK HEB GEEN ZIN OM MET DATES TEWERKEN DUS ZOEK HOE JE UIT DE
// DATA DE TIJD ANDERS KUNT OMZETTEN NAAR MINUTEN

const setDOMElements = () => {
  sunriseElement = document.querySelector('.js-sunrise');
  sunsetElement = document.querySelector('.js-sunset');
  locationElement = document.querySelector('.js-location');

  sunElement = document.querySelector('.js-sun');
  timeLeftElement = document.querySelector('.js-time-left');

  //hier zou je best nog een error 'if' doen met een throw
};

// PLACE SUN ON LEFT AND BOTTOM POSITION
// BASED ON TOTAL TIME AND CURRENT TIME
const placeSun = (sunrise) => {
  const now = new Date();
  const sunriseDate = new Date(sunrise * 1000);

  const minutesLeft =
    now.getHours() * 60 +
    now.getMinutes() -
    (sunriseDate.getHours() * 60 + sunriseDate.getMinutes());

  //const percentage = (100/ (totalTime.getHours() * 60 + totalTime.getMinutes())) * minutesLeft
  const percentage = (totalTime / 100) * minutesLeft;

  const sunLeftPosition = percentage;
  const sunBottomPosition = percentage > 50 ? 100 - percentage : percentage * 2;

  sunElement.style.left = `${sunLeftPosition}`;
  sunElement.style.bottom = `${sunBottomPosition}`;
};

const updateandTimeLeft = (totalTime) => {};

const makeReadableTimeFromTimestamp = (timestamp) => {
  return new Date(timestamp * 1000).toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
  });
};

const setLocationData = (city) => {
  sunriseElement.innerText = makeReadableTimeFromTimestamp(city.sunrise);
  sunsetElement.innerText = makeReadableTimeFromTimestamp(city.sunset);
  locationElement.innerText = `${city.name}, ${city.country}`;
};

getData = (endpoint) => {
  return fetch(endpoint)
    .then((r) => r.json())
    .catch((e) => console.error(e));
};

document.addEventListener('DOMContentLoaded', async function () {
  lat = 50.8027841;
  lon = 3.2097454;
  let endpoint = `http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=c5e94c97ee4a04de4f17e06fb18dac92
	&units=metric&lang=nl&cnt=1`;

  setDOMElements();
  const { city } = await getData(endpoint);
  // console.log(city);
  setLocationData(city);
  totalTime =
    new Date(city.sunset - city.sunrise * 1000).getHours() * 60 +
    new Date(city.sunset - city.sunrise * 1000).getMinutes();
  // updateandTimeLeft(totalTime)
  placeSun(city.sunrise);
});
