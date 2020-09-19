import React from 'react';
import { GeolocateControl } from 'mapbox-gl';
import './Dropdown.css';

function Dropdown() {
  const mapboxToken = process.env.REACT_APP_MAPBOX_KEY;
  const userLocator = new GeolocateControl({
    accessToken: mapboxToken,
    positionOptions: {
      enableHighAccuracy: true,
    },
    trackUserLocation: true,
  });

  return (
    <div className="Dropdown">
        <p>
        </p>
    </div>
  );
}

export default Dropdown;
