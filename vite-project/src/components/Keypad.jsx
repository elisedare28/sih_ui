import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './keypad.css'; 

const Keypad = ({ screenValue, refresh, handleSubmit }) => {
  const [input, setInput] = useState('');
  const navigate = useNavigate();

  const handleClick = (value) => {
    setInput((prev) => prev + value)
  };

  const handleClear = () => {
    setInput((prev) => prev.substring(0, prev.length - 1));
  };

  return (
    <div>
      <div className="numpad-container">
        <div className="screen">{input}</div>
        <div className="numpad-buttons">
          {['1', '2', '3', '4', '5', '6', '7', '8', '9'].map((num) => (
            <button key={num} onClick={() => handleClick(num)}>
              {num}
            </button>
            
          ))}
          <button id='clr' onClick={handleClear}>X</button>
          <button onClick={() => handleClick('0')}>0</button>
          <button id='ok' type='button' onClick={() => handleSubmit(input)}>OK</button>
        </div>
      </div>
    </div>
  );
};

export default Keypad;
