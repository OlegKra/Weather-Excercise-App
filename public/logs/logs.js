async function getData() {
  const response = await fetch('/api');
  const data = await response.json();
  console.log(data);

  const mymap = L.map('checkinMap').setView([data[0].coord.lat, data[0].coord.lon], 7);
  const attribution = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';
  const tileUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
  const tiles = L.tileLayer(tileUrl, { attribution });
  tiles.addTo(mymap);

  for (item of data) {
    // const root = document.createElement('p');
    // const date = document.createElement('div');
    // const dateString = new Date(item.timestamp).toLocaleString();
    // date.textContent = dateString;
    // const geo = document.createElement('div');
    // geo.textContent = `${item.coord.lat}, ${item.coord.lon}`;
    // const location = document.createElement('div');
    // location.textContent = `${item.name}`;
    // const temperature = document.createElement('div');
    // temperature.innerHTML = `${item.main.temp}&deg; C.`;

    const marker = L.marker([item.coord.lat, item.coord.lon]).addTo(mymap);
    let txt = `Широта:${item.coord.lat}&deg;, Долгота:${item.coord.lon}&deg;,
    местоположение-${item.name}, температура=${item.main.temp}&deg; C.`;

    marker.bindPopup(txt);

    // root.append(date, geo, location, temperature);
    // document.body.append(root);
  }
}

getData();