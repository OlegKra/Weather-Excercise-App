const express = require('express');
const Datastore = require('nedb');
const fetch = require('node-fetch');
require('dotenv').config();

const app = express();

app.listen(3000, () => console.log('Listening at 3000...'));
app.use(express.static('public'));
app.use(express.json({limit: '1mb'}));

const database = new Datastore('database.db');
database.loadDatabase();

app.get('/api', (request, response) => {
  database.find({}, (err, data) => {
    if (err) {
      response.end();
      return
    }
    response.json(data);
  });
});


app.post('/api', (request, response) => {
  const data = request.body;
  const timestamp = Date.now();
  data.timestamp = timestamp;
  // database.insert(data);
  response.json(data);
});


app.get('/weather/:latlon', async (request, response) => {
  const latlon = request.params.latlon.split(',');
  let lat = latlon[0];
  let lon = latlon[1];
  const api_key = process.env.API_KEY;
  let api_url = `http://api.openweathermap.org/data/2.5/weather?units=metric&lang=ru&lat=${lat}&lon=${lon}&appid=${api_key}`;
  const fetch_response = await fetch(api_url);
  const data = await fetch_response.json();
  const timestamp = Date.now();
  data.timestamp = timestamp;
  database.insert(data);
  response.json(data);
});

