  var map = new ol.Map({
    target: 'map',
    layers: [
      // Base layer with OpenStreetMap tiles (optional)
       new ol.layer.Tile({
         source: new ol.source.OSM()
       }),
  
      // Raster image layer from GeoServer
      new ol.layer.Image({
        source: new ol.source.ImageWMS({
          url: 'http://localhost:8080/geoserver/SINGAPORE/wms?service=WMS&version=1.1.0&request=GetMap&layers=SINGAPORE%3ANDVI_Machillipatnam_2024_Mar&bbox=81.09145968663968%2C16.076250324602956%2C81.12667364577716%2C16.09080303220569&width=768&height=330&srs=EPSG%3A4326&styles=&format=application/openlayers',
          params: { 'LAYERS': 'NDVI_Machillipatnam_2024_Mar', 'TILED': true },
          serverType: 'geoserver'
        })
      })
    ],
    view: new ol.View({
      center: ol.proj.fromLonLat([81.1210,16.0476]), // Adjust center as needed
      zoom: 12
    }),
    controls: ol.control.defaults({
      attributionOptions: {
        collapsible: false
      }
    }).extend([
      new ol.control.ZoomSlider(),
      new ol.control.FullScreen()
    ])
  });

  // Add element to display coordinates
  var mousePositionElement = document.createElement('div');
  mousePositionElement.style.position = 'absolute';
  mousePositionElement.style.bottom = '10px';
  mousePositionElement.style.left = '10px';
  mousePositionElement.style.padding = '5px';
  mousePositionElement.style.backgroundColor = 'rgba(255, 255, 255, 0.8)';
  mousePositionElement.innerText = 'Coordinates: ';
  map.getViewport().appendChild(mousePositionElement);
  
  // Function to format coordinates
  function formatCoord(value) {
    return value.toFixed(4);
  }
  
  // Handle mouse move event
  map.on('pointermove', function(event) {
    var coordinates = ol.proj.toLonLat(event.coordinate);
    var lon = formatCoord(coordinates[0]);
    var lat = formatCoord(coordinates[1]);
    mousePositionElement.innerText = 'Coordinates: Longitude - ' + lon + ', Latitude - ' + lat;
  });
  
  // Search box elements
  var searchInput = document.getElementById('search-input');
  var searchButton = document.getElementById('search-button');
  
  // Function to handle search using OSM Nominatim
  function searchLocation(searchText) {
    var url = 'https://nominatim.openstreetmap.org/search?format=json&q=' + searchText;
    fetch(url)
      .then(function(response) {
        return response.json();
      })
      .then(function(data) {
        if (data.length > 0) {
          var lon = parseFloat(data[0].lon);
          var lat = parseFloat(data[0].lat);
          map.getView().setCenter(ol.proj.fromLonLat([lon, lat]));
          map.getView().setZoom(5); // Adjust zoom level as needed
        } else {
          alert('Location not found!');
        }
      })
      .catch(function(error) {
        console.error('Error fetching location:', error);
        alert('Error searching location!');
      });
  }
  
  // Add event listener to search button
  searchButton.addEventListener('click', function() {
    var searchTerm = searchInput.value;
    if (searchTerm) {
      searchLocation(searchTerm);
    }
  });

// Functionality for sidebar button clicks (replace with your actual content)
var contentDiv = document.getElementById('content');
var loginBtn = document.getElementById('login-btn');
var dashboardBtn = document.getElementById('dashboard-btn');
var farmManagerBtn = document.getElementById('farm-manager-btn');
var graphBtn = document.getElementById('graph-btn');
var farmListBtn = document.getElementById('farm-list-btn');
var logoutBtn = document.getElementById('logout-btn');

loginBtn.addEventListener('click', function() {
  contentDiv.innerHTML = "<h1>Login Content</h1>";  // Replace with your login content
  contentDiv.style.display = 'block';
});

dashboardBtn.addEventListener('click', function() {
  contentDiv.innerHTML = "<h1>Dashboard Content</h1>";  // Replace with your dashboard content
  contentDiv.style.display = 'block';
});
