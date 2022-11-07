// base url
let baseURL = 'https://api.openweathermap.org/data/2.5/weather?zip=';
// Personal API Key for OpenWeatherMap API
let apiKey = 'API KEY GOES HERE';

/* Global Variables */
const zipCode = document.querySelector('#zip');
const btn = document.querySelector('#generate');
const date = document.querySelector('#date');
const temp = document.querySelector('#temp');
const content = document.querySelector('#content');
const feelings = document.querySelector('#feelings');
const iconEl = document.getElementById('icon');
const cityName = document.getElementById('cityName');

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + '.' + d.getDate() + '.' + d.getFullYear();

btn.addEventListener('click', () => {
  getData(zipCode.value)
    .then((data) => {
      console.log(data);
      return data;
    })
    .then((dataApi) => {
      postData('/postData', {
        date: newDate,
        temp: dataApi.main.temp,
        feelings: feelings.value,
        icon: dataApi.weather[0].icon,
        name: dataApi.name,
        country: dataApi.sys.country,
      });
    })
    .then((res) => {
      updateUI();
    });
});

// Get function
const getData = async (zip) => {
  const res = await fetch(baseURL + zip + apiKey);
  try {
    const data = await res.json();
    console.log(data);
    return data;
  } catch (error) {
    console.log('error', error);
  }
};

// Post function
const postData = async (url = '/postData', data = {}) => {
  const res = await fetch(url, {
    method: 'POST',
    credentials: 'same-origin',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify(data),
  });

  try {
    const newData = await res.json();
    console.log(newData);
    return newData;
  } catch (error) {
    console.log('error', error);
  }
};

// Updating UI
const updateUI = async () => {
  const req = await fetch('/all');
  try {
    const getData = await req.json();
    console.log(getData);
    date.innerText = `date: ${getData.date}`;
    temp.innerText = `${parseInt(getData.temp)}°F`;
    content.innerText = `I feel ${getData.feelings}`;
    iconEl.src = `http://openweathermap.org/img/wn/${getData.icon}@2x.png`;
    iconEl.style.display = 'block';
    cityName.innerHTML = `${getData.name}, ${getData.country}`;
  } catch (error) {
    console.log('error', error);
  }
};
