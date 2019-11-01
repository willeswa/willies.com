import React from 'react';
import {Link} from 'gatsby';

import layout from './layout.module.css';

const ListLink = props => (
    <li className={layout.navItem}>
        <Link to={props.to}>{props.children}</Link>
    </li>
)

const SpecialLink = props => (
    <li className={layout.navItem}>
        <a href={props.email}>{props.children}</a>
    </li>
)


export default ({children}) => (
    <div>
        {/* <header>
            <ul className={layout.navbar}>
                <ListLink to='/'>Home</ListLink>
                <ListLink to='/blogs'>Blogs</ListLink>
                <SpecialLink email='mailto:gwiliez@gmail.com?'>Contact Me</SpecialLink>
            </ul>
        </header> */}
        <main  className={layout.container}>    
            {children}
        </main>
        <footer  className={layout.container}>
            <p>Design inspired by: <a href="https://deepstash.com/">deepstash.com</a></p>
        </footer>
    </div>
)