

const mymap = L.map('mapid').setView([0, 0], 2);

//attribution for using openstreet map
const attribution =  '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';

const tileUrl= 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';

//creating tiles
const tiles= L.tileLayer (tileUrl, {attribution});

//add tiles to my map
tiles.addTo (mymap);

//json data url
const api_url ='https://opendata.arcgis.com/datasets/e9476c422f0842a7a38652aaf4c7597c_0.geojson'

async function getData(){
    const response = await fetch (api_url);
    const data = await response.json();
    const {latitude, longitude } =data;
    console.log (data);

    //___________________Adding Markers_________________________________________
    const marker = L.marker([0,0]).addTo(mymap);
    marker.setLatLng ([latitude,longitude]).addTo(mymap);

    //document.getElementById ('lat').textContent= latitude;
    //document.getElementById ('lon').textContent= longitude;

}
getData();


