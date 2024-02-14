import React, { useEffect, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css'; // Import Leaflet CSS
import icon from '../assets/icons/location.png'; // Import your custom icon

function Map({ latitude, longitude,wname }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Retrieve the user data from local storage and parse it to an object
    const storedUser = JSON.parse(localStorage.getItem('user'));
    setUser(storedUser);
  }, []);
  console.log(latitude,longitude,wname);
  useEffect(() => {
    // Create map instance
    const map = L.map('map').setView([latitude, longitude], 13);

    // Add tile layer
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors'
    }).addTo(map);

    // Define custom icon
    const customIcon = L.icon({
      iconUrl: icon,
      iconSize: [32, 32], // size of the icon
      iconAnchor: [16, 32], // point of the icon which will correspond to marker's location
      popupAnchor: [0, -32] // point from which the popup should open relative to the iconAnchor
    });

const nameda = user ? user.name : "Work Location"

    // Add marker with custom icon
    L.marker([latitude, longitude], { icon: customIcon }).addTo(map)
      .bindPopup(nameda)
      .openPopup();
  }, []);

  return (
    <>
          Latitude: {latitude}, Longitude: {longitude}

    <div id="map" style={{ height: "400px", width: "100%" }}>
      {/* Ensure map container has defined size */}
    </div>
    </>
  );
}

export default Map;
