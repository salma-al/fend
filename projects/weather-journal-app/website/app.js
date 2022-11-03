// base url
let baseURL = 'https://api.openweathermap.org/data/2.5/weather?zip=';
// Personal API Key for OpenWeatherMap API
let apiKey = '&appid=fac48d14a5f14c4a5fc1d6745ae486b3&units=imperial';

/* Global Variables */
const btn = document.querySelector('#generate');
const date = document.querySelector('#date');
const temp = document.querySelector('#temp');
const content = document.querySelector('#content');

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + '.' + d.getDate() + '.' + d.getFullYear();

btn.addEventListener('click', () => {
  //   e.preventDefault();
  const zip = document.querySelector('#zip').value;
  let feelings = document.querySelector('#feelings').value;
  //   const getUrl = baseURL + zip + apiKey;
  //   getData(getUrl).then((data) => console.log(data));
  getData(baseURL, zip, apiKey)
    .then((data) => {
      postData('/postData', {
        date: newDate,
        temp: data.main.temp,
        feelings: feelings,
      });
    })
    .then(updateUI());
});

const getData = async (baseURL, zip, apiKey) => {
  const res = await fetch(baseURL + zip + apiKey);
  try {
    const data = await res.json();
    console.log(data);
    return data;
  } catch (error) {
    console.log('error', error);
  }
};

const postData = async (url = '', data = {}) => {
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
    date.innerHTML = allData.date;
    temp.innerHTML = allData.temp;
    content.innerHTML = allData.feelings;
  } catch (error) {
    console.log('error', error);
  }
};
