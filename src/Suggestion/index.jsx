import React, { useState, useEffect } from 'react';
import { geolocated } from "react-geolocated";

import './Suggestion.css';

function Suggestion(props) {
  const reverse = require('reverse-geocode');
  const states = require('us-state-converter')

  const [userCoords, setUserCoords] = useState(null);
  const [stateAbbr, setStateAbbr] = useState(null);
  const [stateFull, setStateFull] = useState(null);
  // Grab user location
  useEffect(() => {
    setUserCoords(props.coords);
  });

  // Convert location to a state
  useEffect(() => {
    if (userCoords && userCoords.latitude) {
    const usState = reverse.lookup(userCoords.latitude, userCoords.longitude, 'us');
    setStateAbbr(usState.state_abbr);
    }
  }, [userCoords])

  useEffect(() => {
    if (stateAbbr){
      setStateFull(states(stateAbbr).name);
    }
  }, [stateAbbr])

  return (
    <div className="Suggestion">
      <header>
        How much time do I have to register to vote in <span className='state-name'> {stateFull} </span>?
     </header>
    </div>
  );
}

export default geolocated({
  positionOptions: {
    enableHighAccuracy: false,
  },
  userDecisionTimeout: 5000,
})(Suggestion);
