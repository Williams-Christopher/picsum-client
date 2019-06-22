import React from 'react';
import './Photo.css';

export default function Photo(props) {
    let maxWidth = window.innerWidth / 3;
    let factor = props.width / maxWidth;
    let imageWidth = Math.round(props.width / factor);
    let imageHeight = Math.round(props.height / factor);
    
    return (

            <img className='photo_display'
                src={props.download_url}
                alt={`Author: ${props.author}`}
                width={imageWidth}
                height={imageHeight}
            />
    );
}
