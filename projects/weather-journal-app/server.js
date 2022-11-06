// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require('express');

// Start up an instance of app
const app = express();

/* Dependencies */
const bodyParser = require('body-parser');
/* Middleware*/

//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));

// Setup Server
const port = 5000;

// Spin up the server
const server = app.listen(port, () => {
  // Callback to debug
  console.log(`localhost: ${port}`);
});

// Callback function to complete GET '/all'
app.get('/all', function (req, res) {
  res.send(projectData);
  console.log(projectData);
});

// post route
const contentArea = [];

app.post('/postData', (req, res) => {
  console.log(req.body);
  newData = {
    date: req.body.date,
    temp: req.body.temp,
    feelings: req.body.feelings,
  };
  contentArea.push(newData);
  console.log(contentArea);
  projectData = newData;
  res.send(projectData);
});
