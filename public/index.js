let lat, lon;
const button = document.getElementById('submit');

if ('geolocation' in navigator) {
  navigator.geolocation.getCurrentPosition(async position => {
    try {
      lat = position.coords.latitude;
      lon = position.coords.longitude;
      document.getElementById('latitude').textContent = lat.toFixed(2);
      document.getElementById('longitude').textContent = lon.toFixed(2);

      const api_url = `weather/${lat},${lon}`;
      const response = await fetch(api_url);
      const data = await response.json();
      document.getElementById('location').textContent = data.name;
      document.getElementById('summary').textContent = data.weather[0].description;
      document.getElementById('temperature').textContent = data.main.temp;
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  });
} else {
  console.log('geolocation not available');
}

button.addEventListener('click', async event => {
  const data = {lat, lon};
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  }

  const response = await fetch('/api', options);
  const json = await response.json();

});