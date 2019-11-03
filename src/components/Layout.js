import React from 'react';

import layout from './layout.module.css';


export default ({children}) => (
    <div>
        <main  className={layout.container}>    
            {children}
        </main>
        <footer  className={layout.container}>
            <p>Design inspired by: <a href="https://deepstash.com/">deepstash.com</a></p>
        </footer>
    </div>
)