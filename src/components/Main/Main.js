import React from 'react';
import './main.css';
import { PostSection } from './PostSection/PostSection';
import { RightSection } from './RightSection/RightSection';

export const Main = () => {
    return (
        <div className="main">
            <PostSection />
            <RightSection />
        </div>
    );
};
