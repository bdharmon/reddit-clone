import React from 'react';
import '../css/rightSection.css';
import { AboutSubreddit } from './AboutSubreddit';

export const RightSection = ({ thisSubReddit }) => {
    const scrollToTop = () => {
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
    };

    return (
        <div className="right-section">
            <AboutSubreddit thisSubReddit={thisSubReddit} />
            <button className="back-to-top-btn" onClick={() => scrollToTop()}>Back To Top</button>
        </div>
    );
};
