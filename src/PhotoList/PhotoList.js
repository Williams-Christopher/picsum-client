import React from 'react';
import Photo from '../Photo/Photo';
import './PhotoList.css';

export default function PhotoList(props) {
    return (
        <main>
            <section className='photo_list'>
                {props.photos.map(p => <Photo key={p.id} {...p} />)}
            </section>
        </main>
    )
}