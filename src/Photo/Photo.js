import React from 'react';
import './Photo.css';

export default function Photo(props) {
    return (
        <figure>
            <img src={props.download_url}
                alt={`Author: ${props.author}`} width={props.width / 4 > 600 ? 600 : props.width / 4}
                height={props.height / 4 > 400 ? 400 : props.height / 4}
            />
        </figure>
    );
}
