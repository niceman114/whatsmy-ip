import React, { useEffect, useState } from 'react';
import './App.css';
import ReactGA from 'react-ga4';
import ga from './libs/ga';

const TRACKING_ID = 'G-YLXZK5F931';
ReactGA.initialize(TRACKING_ID);

function App() {
  const [ip, setIp] = useState('loading');
  const [hasErrorMessage, viewErrorMessage] = useState(false);

  const fetchIp = async () => {
    try {
      const response = await fetch('https://api.ipify.org?format=json');
      const data = await response.json();
      setIp(data.ip);
      ga().event('loaded', 'ip-address', 'IP 주소 정상확인됨', 1);
    } catch (error) {
      console.error('Error fetching IP:', error);
      setIp('error');
      viewErrorMessage(true);
    }
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(ip);
      ga().event('clicked', 'ip-address', 'IP 주소가 클릭됨', 1);
      alert('Text copied to clipboard!');
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  };

  useEffect(() => {
    fetchIp();
  }, []);

  ga().pageview();

  return (
    <div className="App">
      <header className="App-header">
        <h1>My IP address</h1>
      </header>
      <main>
        {
          !hasErrorMessage && ip === 'loading' &&
          <>
            <p className="ip-address loading">.</p>
            <p>Now loading...</p>
          </>
        }

        {
          !hasErrorMessage && ip !== 'loading' && ip !== 'error' &&
            <>
              <p className="ip-address" onClick={copyToClipboard}>{ip}</p>
              <p>To copy the IP address, click the box above!</p>
            </>
        }

        {hasErrorMessage && <p className="error">Sorry, failed to find IP information.</p>}
      </main>
    </div>
  );
}

export default App;
