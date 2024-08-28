import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { geolocated } from 'react-geolocated';
import Select from 'react-select';
import { selectStyles } from '../../utils/styles';
import config from '../../config';
import Response from '../Response';
import './Suggestion.css';

const Suggestion = (props) => {
  const reverse = require('reverse-geocode');
  const [dropdownOptions, setDropdownOptions] = useState([]);
  const navigate = useNavigate();
  const location  = useLocation();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userCoords, setUserCoords] = useState(null);
  const [stateAbbr, setStateAbbr] = useState(null);
  const [selectedState, setSelectedState] = useState(false);
  const [primaryOrGeneralSelected, setPrimaryOrGeneralSelected] = useState(false);
  const [primaryOrGeneral, setPrimaryOrGeneral] = useState(null);

  useEffect(() => {
    const url = config.apiUrl;
    console.log(url);

      fetch(url)
        .then((response) => {
          console.log(response);
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          return response.json();
        })
        .then((jsonData) => {
          const states = jsonData.states;
          console.log(states);
          setDropdownOptions(states);
          setLoading(false);
        })
        .catch((error) => {
          setError(error);
          setLoading(false);
        });
  }, []); 

    // check to see if user came in via a direct state URL
    useEffect(() => {
      const currentPath = location.pathname;
      if (currentPath.length <= 1 || selectedState){
        return;
      }
      // TODO: refactor this so it's nicer in the future.
      if (currentPath.includes('primary') || currentPath.includes('general')){
        const state = currentPath.slice(-2).toUpperCase();
        if (dropdownOptions && dropdownOptions.find(s => s.value === state) !== undefined){
          setPrimaryOrGeneral(currentPath[1] === 'p' ? 'primary' : 'general');
          setButtonColor(currentPath[1] === 'p' && currentPath.includes('primary') ? 'primary-button' : 'general-button');
          setPrimaryOrGeneralSelected(true);
          setSelectedState(true);
          setStateAbbr(dropdownOptions.find(s => s.value === state).value);
        }
      }        
    }, [location, dropdownOptions, selectedState]);

  // Grab user location
  useEffect(() => {
    setUserCoords(props.coords);
  }, [props.coords]);

  // Convert location to a state
  useEffect(() => {
    if (userCoords && userCoords.latitude && !selectedState) {
      const usState = reverse.lookup(userCoords.latitude, userCoords.longitude, 'us');
      setStateAbbr(usState.state_abbr);
      setSelectedState(true);
    }
  }, [userCoords, reverse, selectedState]);

  // handle redirect to state's page
  useEffect(() => {
    if (selectedState && primaryOrGeneralSelected) {
      navigate(`${primaryOrGeneral}/${stateAbbr}`);
    }
    else if (selectedState){
      navigate(`${stateAbbr}`)
    }
  }, [selectedState, stateAbbr, primaryOrGeneral, primaryOrGeneralSelected, navigate]);

  const onDropdownChange = (state) => {
    setStateAbbr(state.value);
    setSelectedState(true);
  };

  const resetButtonColor = button => {
    document.getElementsByClassName(button)[0].style.backgroundColor = '#060e29';
    document.getElementsByClassName(button)[0].style.border = '1px solid white';
  }

  const setButtonColor = button => {
    if (button && (button)[0].style){
    document.getElementsByClassName(button)[0].style.backgroundColor = '#5f9dbf';
    document.getElementsByClassName(button)[0].style.border = '3px solid white';
    }
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


  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="suggestion">
      <h1 className='header'><span role='img' aria-label='us-flag-emoji'>🇺🇸</span> 2024 Voter Registration Deadlines <span role='img' aria-label='us-flag-emoji'>🇺🇸</span></h1>
      <div className="vote-question">
        How much time do I have to register to vote in the:
        <div className='primary-or-general'>
          <button className='primary-button' onClick={onPrimaryClick}> Primary Election </button>
          <button className='general-button' onClick={onGeneralClick}> General Election </button>
        </div>
      </div>
      {primaryOrGeneralSelected &&
        <div className='select'>
          <Select
            styles={selectStyles}
            placeholder={window.innerWidth > 640 ? 'Pick your state...' : 'States...'}
            options={dropdownOptions}
            value={dropdownOptions.filter(option => option.value === stateAbbr)}
            onChange={value => onDropdownChange(value)}
            isSearchable={false}
          />
        </div>
      }
      <Routes>
        <Route path="general/:state" element={selectedState ?
          <Response
            selectedState={dropdownOptions.filter(option => option.value === stateAbbr)}
            primaryOrGeneral={primaryOrGeneral}
          /> : null
        } />}
        <Route path="primary/:state" element={selectedState ?
          <Response
            selectedState={dropdownOptions.filter(option => option.value === stateAbbr)}
            primaryOrGeneral={primaryOrGeneral}
          /> : null
        } />}
      </Routes>
    </div>
  );
}

export default geolocated({
  positionOptions: {
    enableHighAccuracy: false,
  },
  userDecisionTimeout: 5000,
})(Suggestion);
