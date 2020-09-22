import React, {useState} from 'react';
import logo from './logo.svg';
import './App.css';
import Suggestion from './Suggestion';

function App() {
  const checkGeolocate = 'geolocation' in navigator ? true : false;
  const [canGeolocate, setCanGeolocate] = useState(checkGeolocate);

  return (
    <div className="App">
      <div className="Voting-registration-question">
       <Suggestion />
       </div>
    </div>
  );
}

export default App;
