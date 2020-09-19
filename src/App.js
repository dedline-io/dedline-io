import React, {useState} from 'react';
import logo from './logo.svg';
import './App.css';
import Dropdown from './Dropdown';
import Suggestion from './Suggestion';

function App() {
  const checkGeolocate = 'geolocation' in navigator ? true : false;
  const [canGeolocate, setCanGeolocate] = useState(checkGeolocate);

  return (
    <div className="App">
      <div className="Voting-registration-question">
       <Dropdown />
       <Suggestion />
       </div>
    </div>
  );
}

export default App;
