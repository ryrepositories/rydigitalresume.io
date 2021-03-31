//We create the tile layer that will be the background of our map.
let streets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 7,
    accessToken: API_KEY
});

// We create the dark view tile layer that will be an option for our map.
let satelliteStreets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/satellite-streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 7,
    accessToken: API_KEY
});

// Create a base layer that holds both maps.
let baseMaps = {
    "Streets": streets,
    "Satellite": satelliteStreets
  };

  // Create the map object with center, zoom level and default layer.
  let map = L.map('mapid', {
    center: [37.7576171, -122.5776844],
    zoom: 7,
    layers: [satelliteStreets]
});

//create a schools layer for our map    
let caschools = new L.layerGroup();

let overlays = {CASchools:caschools};

L.control.layers(baseMaps, overlays).addTo(map);


d3.json ("https://opendata.arcgis.com/datasets/e9476c422f0842a7a38652aaf4c7597c_0.geojson").then(function(data){
    L.geoJson (data,
        {pointToLayer: function (feature,latlng) {
            console.log (data);
            return L.marker(latlng);
        },
        onEachFeature: function (feature,layer){
            layer.bindPopup("District Name: " + feature.properties.DistrictName +
                            "<br> District Type: "+ feature.properties.DistrictType +
                            "<br> Lowest Grade: " + feature.properties.GradeLow +
                            "<br> Highest Grade: " + feature.properties.GradeHigh+
                            "<br> Total Enrollment: " + feature.properties.EnrollTotal+
                            "<br> ELA Test: " + feature.properties.ELATested+
                            "<br> ELA Std Met: " + feature.properties.ELAStdMetPct+
                            "<br> Math Tested: " + feature.properties.MathTested+
                            "<br> Math Std Met: " +feature.properties.MathStdMetPct+
                            "<br> EL Count: " +feature.properties.ELcount+
                            "<br> Drop Out Percentage: " + feature.properties.DropOutPct);
        }
    }).addTo(caschools);

    caschools.addTo(map)})
