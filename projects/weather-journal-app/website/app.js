// base url
let baseURL = 'https://api.openweathermap.org/data/2.5/weather?zip=';
// Personal API Key for OpenWeatherMap API
let apiKey = '&appid=fac48d14a5f14c4a5fc1d6745ae486b3&units=imperial';

/* Global Variables */
const zipCode = document.querySelector('#zip');
const btn = document.querySelector('#generate');
const date = document.querySelector('#date');
const temp = document.querySelector('#temp');
const content = document.querySelector('#content');
const feelings = document.querySelector('#feelings');
const trial = 12345; // delete later

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
      });
    })
    .then((res) => {
      updateUI();
    });
});

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

const updateUI = async () => {
  const req = await fetch('/all');
  try {
    const allData = await req.json();
    console.log(allData);
    date.innerText = allData.date;
    temp.innerText = `${parseInt(allData.temp)}°C`;
    content.innerText = `I feel ${allData.feelings}`;
    //     date.innerHTML = `date: ${allData.date}`;
    //     temp.innerHTML = `temp: ${Math.round(allData.temp)}°C`;
    //     content.innerHTML = `feelings: ${allData.content}`;
  } catch (error) {
    console.log('error', error);
  }
};
