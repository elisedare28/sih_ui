import React, { useState, useEffect, useRef } from 'react';
import './App.css';

function App() {
  const [showKeypad, setShowKeypad] = useState(false);
  const [input, setInput] = useState('');
  
  useEffect(() => {
    console.log('User Agent:', navigator.userAgent);
  }, []);
  

  useEffect(() => {
    fetch('https://ipapi.co/ip/')
      .then(response => response.text())
      .then(ip => {
        console.log('IP:', ip);
  
        return fetch(`https://ipapi.co/${ip}/country/`).then(response => response.text())
          .then(country => {
            console.log('Country:', country);
            
            return fetch(`https://ipapi.co/${ip}/city/`).then(response => response.text())
              .then(city => {
                console.log('City:', city);
                
                const latitude = fetch(`https://ipapi.co/${ip}/latitude/`).then(res => res.text());
                const longitude = fetch(`https://ipapi.co/${ip}/longitude/`).then(res => res.text());
                
                return Promise.all([latitude, longitude]);
              });
          });
      })
      .then(([latitude, longitude]) => {
        console.log('Coordinates:', { latitude, longitude });
      })
      .catch(error => console.error('Error fetching user data:', error));
  }, []);
  
  
  function safeCAPTCHA() {
    setShowKeypad(prev => !prev);
  }

  const Keypad = ({ onClick }) => {
    const keys = [
      '1', '2', '3',
      '4', '5', '6',
      '7', '8', '9', '0'
    ];

    return (
      <div className="keypad">
        {keys.map((key) => (
          <button 
            key={key} 
            className="keypad-button" 
            onClick={() => onClick(key)}
          >
            {key}
          </button>
        ))}
        <div className='generated-number'>
          <label className="form-section__label">Enter the given number</label>
          <input 
            name="num" 
            autoComplete="off" 
            className="form-section__input" 
            value={input}
            readOnly 
          />
        </div>
        <div className="random-number-box">
          {Math.floor(Math.random() * 10)}
        </div>
      </div>
    );
  };
  
  const handleKeyClick = (key) => {
    setInput(prevInput => prevInput + key);
  };
  
  const typingStart = useRef(null);

  useEffect(() => {
    if (input.length === 0) 
    {
      typingStart.current = null;
      return;
    }

    if (!typingStart.current) 
      typingStart.current = new Date().getTime();
   
    else 
    {
      const typingEnd = new Date().getTime();
      const timeTaken = (typingEnd - typingStart.current) / 1000; 
      const speed = input.length / timeTaken; 
      console.log('Typing Speed:', speed.toFixed(2), 'chars/s');
    }
  }, [input]);
  
  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  const [totalDistance, setTotalDistance] = useState(0);
  const startPosition = useRef(null);
  const lastPosition = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (event) => {
      const { clientX, clientY } = event;

      if (startPosition.current) {
        if (lastPosition.current.x !== 0 || lastPosition.current.y !== 0) {
          const dx = clientX - lastPosition.current.x;
          const dy = clientY - lastPosition.current.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          setTotalDistance(prevDistance => prevDistance + distance);
        }
      }
      lastPosition.current = { x: clientX, y: clientY };
    };

    const handleLoad = () => {
      startPosition.current = { x: lastPosition.current.x, y: lastPosition.current.y };
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('load', handleLoad);
  }, []);

  const handleSignInClick = () => {
      console.log('Distance from Start to Click:', totalDistance.toFixed(2));
    }
  
  return (
    <div className="login-section">
      <div className="login-section__card">
        <form>
          <div className="form-section">
            <div className="form-section__text-field">
              <label className="form-section__label">Enter Aadhaar Number</label>
              <input 
                name="uid" 
                autoComplete="off" 
                className="form-section__input" 
                value={input}
                onChange={handleInputChange} 
              />
            </div>
            
            <div className="form-section__button-container">
              <button 
                type="button" 
                className="form-section__button"
                onClick={safeCAPTCHA, handleSignInClick}
              >
                {showKeypad ? 'Hide Keypad' : 'Sign in With Safe CAPTCHA'}
              </button>
            </div>
          </div>
        </form>
        {showKeypad && <Keypad onClick={handleKeyClick} />}
      </div>
    </div>
  );
}

export default App;
