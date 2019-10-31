import React from "react";

import Layout from '../components/Layout';
import Section from '../components/Section';
import MainSection from '../components/MainSection';
import layout from './pages.module.css';

export default () => (
    <Layout>
        <div className={layout.aboutron}>
            <h3>About</h3>
            <p>Hi. My name is Willies Wanjala. I am a software developer based in Nairobi Kenya.</p>
        </div>
    </Layout>
)
