import React, { useState, useEffect } from 'react';
import '../index.css';
import image from './image.webp';
export const LastScreen = () => {
    return(
       <div className='home'>
        <img 
            src={image}  
            style = {{
                width: "70vw",
                height: "80vh",   
            }}
        />
        </div>
    );
}