import React, { useEffect, useState } from "react";
import "../index.css";
import Keypad from "./Keypad";
import axios from 'axios';

const Numpad = () => {
    const [screenValue, setScreenValue] = useState('');
    const [captchaImage, setCaptchaImage] = useState(null);
    const [ans, setAns] = useState(0);

   
    const fetchData = async () => {
        try {
            const response = await axios.get('/captcha_image');
            const image = response.data.image;
            const answer = response.data.answer;
            setCaptchaImage(image);
            setAns(answer);

        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };
    
    const handleSubmit = () => {
        if (screenValue == ans) {
            alert('Correct Answer!');
        } else {
            alert('Incorrect Answer. Try again.');
            fetchData();
        }
    }

    useEffect(() => {
        fetchData(); 
    }, []);

    return (
        <div className="numpad">
            <div className="numpad-left">
                <p>Enter the given number:</p>
                <div className="num-box">
                <img height={100} width={180} src = "https://unsplash.com/documentation#get-a-random-photo" />
                </div>
                <div className='submit-btn'>
                <button className='btn' type='button' onClick={fetchData}>Refresh</button>
            </div>
            </div>

            <div className="numpad-right">
                <Keypad screenValue={screenValue} handleSubmit = {handleSubmit}/>
            </div>
            
        </div>
    );
};

export default Numpad;
