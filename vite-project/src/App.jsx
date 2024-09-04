import { useState } from 'react'
import reactLogo from './react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import KioskBoard from 'kioskboard';

function safeCAPTCHA(){
  return(
    <div>
        <mobiscroll.Numpad
            ref="numpad"
            theme="ios" 
            themeVariant="light"
            preset="decimal"
            scale={0}
            max={9999}
            min={-9999}
        >
            <input placeholder="Please Select..."/>
        </mobiscroll.Numpad>
    </div>
  );
}
function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="login-section">
      <div className="login-section__card">
        <form>
          <div className="form-section">
            <div className="form-section__text-field">
              <label className="form-section__label">Enter Aadhaar Number</label>
              <input name="uid" autoComplete="off" className="form-section__input" />
            </div>
            <div className="form-section__button-container">
              <button 
                type="button" 
                className="form-section__button"
                onClick = {() => safeCAPTCHA()}
              >Sign in With Safe CAPTCHA</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default App;
