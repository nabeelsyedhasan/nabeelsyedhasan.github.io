import { useState, useEffect } from 'react';
import { Map, Popup } from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

const MapComponent = () => {
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [map, setMap] = useState(null);

  const createMap = () => {
    const mapboxToken = 'pk.eyJ1Ijoibm9ib2R5MDA0NyIsImEiOiJjbHZ3eGZ0bWQxcmJmMmlud2NpNDhqd3ZtIn0.qsJ4JcMMeu2TvIMsNGzu-w';
    const map = new Map({
      container: 'map-container',
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [20.5937, 78.9629],
      zoom: 10,
      accessToken: mapboxToken,
    });
    setMap(map);

    map.on('click', (e) => {
      setSelectedLocation(e.lngLat);
    });
  };

  useEffect(() => {
    createMap();
  }, []);

  useEffect(() => {
    if (selectedLocation && map) {
      map.flyTo({
        center: [selectedLocation.lng, selectedLocation.lat],
        zoom: 15, // adjust the zoom level as needed
        duration: 2000, // animation duration in milliseconds
      });
    }
  }, [selectedLocation, map]);

  const handleClosePopup = () => {
    setSelectedLocation(null);
  };

  return (
    <div>
      <div id="map-container" style={{ height: '400px', width: '100%' }}></div>
      {selectedLocation && (
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
          }}
        >
          {new Popup().setLngLat([selectedLocation.lng, selectedLocation.lat]).setHTML(
            `<div>
              You selected this location. <br />Click 'Confirm' to set this address.
              <button onClick={handleClosePopup}>Close</button>
            </div>`
          )}
        </div>
      )}
    </div>
  );
};

export default MapComponent;