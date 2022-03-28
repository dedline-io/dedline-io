import React, { useState, useEffect } from 'react';
import { geolocated } from 'react-geolocated';
import Select from 'react-select';
import { selectStyles } from '../../utils/styles';

import Response from '../Response';

import './Suggestion.css';

const Suggestion = (props) => {
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

  const resetButtonColor = button => {
    document.getElementsByClassName(button)[0].style.backgroundColor = '#060e29';
    document.getElementsByClassName(button)[0].style.border = '1px solid white';
  }

  const onPrimaryClick = (el) => {
    resetButtonColor('general-button');
    setPrimaryOrGeneralSelected(true);
    setPrimaryOrGeneral('primary');
    el.target.style.backgroundColor = '#5f9dbf';
    el.target.style.border = '3px solid white';
    el.target.style.color = 'white';
  };

  const onGeneralClick = (el) => {
    resetButtonColor('primary-button');
    setPrimaryOrGeneralSelected(true);
    setPrimaryOrGeneral('general');
    el.target.style.backgroundColor = '#5f9dbf';
    el.target.style.border = '3px solid white';
    el.target.style.color = 'white';
  };

  return (
    <div className="Suggestion">
      <h1 className='header'>🇺🇸 2022 Voter Registration Deadlines 🇺🇸</h1>
      <div className="vote-question">
        How much time do I have to register to vote in for the:
        <div className='primary-or-general'>
          <button className='primary-button' onClick={onPrimaryClick}> Primary Election </button>
          <button className='general-button' onClick={onGeneralClick}> General Election </button>
        </div>
      </div>
      {primaryOrGeneralSelected &&
        <div className='select'>
          <Select
            styles={selectStyles}
            placeholder='Pick your state...'
            options={dropdownOptions}
            value={dropdownOptions.filter(option => option.value === stateAbbr)}
            onChange={value => onDropdownChange(value)}
            isSearchable={true}
          />
        </div>
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
