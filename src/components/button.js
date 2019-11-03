import React from 'react';
import layout from './layout.module.css';

export default ({link, text}) => (
    <a href={link}>
        <button className={layout.button}>
            {text}
        </button>
    </a>
)
