import React, { useState, useEffect } from 'react';
import { geolocated } from 'react-geolocated';
import Select from 'react-select';
import { selectStyles } from '../../utils/styles';

import Response from '../Response';

import './Suggestion.css';

function Suggestion(props) {
  const reverse = require('reverse-geocode');
  const dropdownOptions = require('../../states.json');

  const [userCoords, setUserCoords] = useState(null);
  const [stateAbbr, setStateAbbr] = useState(null);
  const [selectedState, setSelectedState] = useState(false);

  // Grab user location
  useEffect(() => {
    setUserCoords(props.coords);
  }, [props.coords]);

  // Convert location to a state
  useEffect(() => {
    if (userCoords && userCoords.latitude) {
      const usState = reverse.lookup(userCoords.latitude, userCoords.longitude, 'us');
      setStateAbbr(usState.state_abbr);
      setSelectedState(true);
    }
  }, [userCoords, reverse])

  const onDropdownChange = (state) => {
    setStateAbbr(state.value);
    setSelectedState(true);
  }

  return (
    <div className="Suggestion">
      <header>
        <div className="vote-question">
        How much time do I have to register to vote in:
        </div>
        <Select
          styles={selectStyles}
          options={dropdownOptions}
          value={dropdownOptions.filter(option => option.value === stateAbbr)}
          onChange={value => onDropdownChange(value)}
        />
      </header>
      {selectedState &&
        <Response
          selectedState={dropdownOptions.filter(option => option.value === stateAbbr)}
        />
      }
    </div>
  );
}

export default geolocated({
  positionOptions: {
    enableHighAccuracy: false,
  },
  userDecisionTimeout: 5000,
})(Suggestion);
