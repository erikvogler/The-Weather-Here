const mymap = L.map('checkinMap').setView([0, 0], 1);
const attribution =
  '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';
//const tileUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
const tileUrl =
  'https://{s}.tile.openstreetmap.de/tiles/osmde/{z}/{x}/{y}.png';
const tiles = L.tileLayer(tileUrl, { attribution });
tiles.addTo(mymap);

getData();

// >>>>>>>>>> possible sorting function
const datapoints = [];

document.getElementById('time').addEventListener('click', event => {
  sortData((a, b) => b.time - a.time);
});

function sortData(compare) {
  for (let item of datapoints) {
    item.elt.remove();
  }
  datapoints.sort(compare);
  for (let item of datapoints) {
    document.body.append(item.elt);
  }
}

async function getData() {
  const response = await fetch('/api');
  const data = await response.json();
  console.log(data);
  for (let item of data) {
    console.log(item);
    const marker = L.marker([item.lat, item.lon]).addTo(mymap);
    let txt = `
      latitude: ${item.lat}&deg;<br />
      longitude: ${item.lon}&deg;<br />
      I'm sitting out here in ${item.weather.name} and it feels like ${item.weather.main.temp}&deg; C. outside.<br />`;

    // const root = document.createElement('p');
    // const geo = document.createElement('div');
    // const date = document.createElement('div');

    // geo.textContent = `${item.lat}, ${item.lon}`;
    // const dateString = new Date(item.timestamp).toLocaleString();
    // date.textContent = dateString;

    // root.append(geo, date );
    // datapoints.push({elt: root, time: item.timestamp});
    // document.body.append(root);

    if (item.air.value < 0) {
      txt += ' No air reading.';
    } else {
      txt += `The AirQ for ${item.air.parameter} is ${item.air.value} </span>${item.air.unit} last read on ${item.air.lastUpdated}<br />`;
    }
    marker.bindPopup(txt);
  }
}
