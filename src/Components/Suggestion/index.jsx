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
  const [primaryOrGeneralSelected, setPrimaryOrGeneralSelected] = useState(false);
  const [primaryOrGeneral, setPrimaryOrGeneral] = useState(null);

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
  };

  const onPrimaryClick = () => {
    setPrimaryOrGeneralSelected(true);
    setPrimaryOrGeneral('primary');

  };

  const onGeneralClick = () => {
    setPrimaryOrGeneralSelected(true);
    setPrimaryOrGeneral('general');
  };

  return (
    <div className="Suggestion">
      <div className="vote-question">
        <div className="header-emoji">🗳🗳🗳🗳🗳</div>
        How much time do I have to register to vote in for the:
        <div className='primary-or-general'>
          <button className='primary-button' onClick={onPrimaryClick}> Primary </button>
          <button className='general-button' onClick={onGeneralClick}> General </button>
        </div>
      </div>
      {primaryOrGeneralSelected &&
        <Select
          styles={selectStyles}
          options={dropdownOptions}
          value={dropdownOptions.filter(option => option.value === stateAbbr)}
          onChange={value => onDropdownChange(value)}
          isSearchable={true}
        />
      }
      {selectedState &&
        <Response
          selectedState={dropdownOptions.filter(option => option.value === stateAbbr)}
          primaryOrGeneral={primaryOrGeneral}
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
