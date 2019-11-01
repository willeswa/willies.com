import React from 'react';
import layout from './layout.module.css';

export default props => (
    <a href={props.link}>
        <button className={layout.button}>
            {props.text}
        </button>
    </a>
)
