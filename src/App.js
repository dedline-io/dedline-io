import React, { useState, useEffect } from 'react';
import './App.css';
import Suggestion from './Components/Suggestion';

const App = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setIsLoaded(true);
    }, 2000);
  }, []);

  return (
      <div className="App">
      {!isLoaded ? <div className="lds-dual-ring"></div> :
        <div className="voting-registration-question">
          <Suggestion />
        </div>
      }
      </div>
  );
}

export default App;
