import React, { useEffect, useState } from 'react';
import './App.css';
import ReactGA from 'react-ga';
import GA from './GA';

const TRACKING_ID = 'G-YLXZK5F931';
ReactGA.initialize(TRACKING_ID);

function App() {
  ReactGA.pageview(window.location.pathname);

  const [ip, setIp] = useState('?');
  const [isVisible, setIsVisible] = useState(false);
  const eventTracker = GA('Visited');

  useEffect(() => {
      (async () => {
          try {
              const response = await fetch('https://api.ipify.org?format=json');
              const data = await response.json();
              setIp(data.ip);
              setIsVisible(false);
          } catch (error) {
              console.error('Error fetching IP:', error);
              setIp("?");
              setIsVisible(true);
          }
      })();
  }, []);

  return (
      <div className="App">
        <header className="App-header">
          <h1>My IP address is</h1>
        </header>
        <main onMouseOver={() => eventTracker('mouse over')}>
          {ip ? <p className="ip-address" onClick={() => eventTracker('ip address clicked')}>{ip}</p> : <p className="ip-address loading">Loading...</p>}
          {isVisible && <p className="error hide">Sorry, failed to find IP information.</p> }
        </main>
      </div>
  );
}

export default App;
