import React, { useEffect, useState } from 'react';
import './App.css';
import GA from './GA';

function App() {
  const [ip, setIp] = useState('?');
  const [isVisible, setIsVisible] = useState(false);
  const ga = GA('Visited');

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
        <main onMouseOver={() => ga('mouse over')}>
          {ip ? <p className="ip-address" onClick={() => ga('ip address clicked')}>{ip}</p> : <p className="ip-address loading">Loading...</p>}
          {isVisible && <p className="error hide">Sorry, failed to find IP information.</p> }
        </main>
      </div>
  );
}

export default App;
