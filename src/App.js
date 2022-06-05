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
      <div className="footer">
      <img src="/github-logo.png" alt="github logo" height="18" /> {' '}Dedline.io is 
      <a href="https://github.com/dedline-io/dedline-io"> open source!</a>
      </div>
      </div>
  );
}

export default App;
