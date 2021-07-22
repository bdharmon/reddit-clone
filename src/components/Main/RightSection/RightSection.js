import React from 'react';
import './css/rightSection.css';
import { CreateSection } from './CreateSection';
import { Premium } from './Premium';
import { TopCommunities } from './TopCommunities';
import { ExtraLinks } from './ExtraLinks';

export const RightSection = () => {
    const scrollToTop = () => {
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
    };

    return (
        <div className="right-section">
            <TopCommunities />
            <Premium />
            <CreateSection />
            <ExtraLinks />
            <button className="back-to-top-btn" onClick={() => scrollToTop()}>Back To Top</button>
        </div>
    );
};
