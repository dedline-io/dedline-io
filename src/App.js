import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import Suggestion from './Components/Suggestion';
import Widget from './Components/Widget';

const App = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setIsLoaded(true);
    }, 2000);
  }, []);

  return (
    <Routes>
      <Route path="/widget/:state" element={<Widget />} />
      <Route path="/*" element={
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
      } />
    </Routes>
  );
}

export default App;
