import React, { useState, useEffect } from 'react';
import { geolocated } from 'react-geolocated';
import Select from 'react-select';
import { selectStyles } from '../utils/styles';

import './Suggestion.css';

function Suggestion(props) {
  const reverse = require('reverse-geocode');
  const states = require('us-state-converter');
  const dropdownOptions = require('../states.json');
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
    if (stateAbbr) {
      setStateFull(states(stateAbbr).name);
    }
  }, [stateAbbr])

  const onDropdownChange = (state) => {
     setStateAbbr(state.value);
     setStateFull(state.full);
  }

  return (
    <div className="Suggestion">
      <header>
        How much time do I have to register to vote in
        <Select
          styles={selectStyles}
          options={dropdownOptions}
          value={dropdownOptions.filter(option => option.label === stateFull)}
          onChange={value => onDropdownChange(value)}
        />
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
