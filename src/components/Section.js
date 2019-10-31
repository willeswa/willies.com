import React from 'react';
import layout from './layout.module.css';

export default props => (
    <div className={layout.section}>
        <h2>{props.title}</h2>
        <a href='#'>Facebook</a>
        <a href='#'>Github</a>
        <a href='#'>Twitter</a>
    </div>
)
