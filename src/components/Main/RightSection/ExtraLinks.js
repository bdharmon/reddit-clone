import React from 'react';
import './css/extraLinks.css';

export const ExtraLinks = () => {
    return (
        <div className="extra-links">
            <div className="links">
                <div className="left-side">
                    <p>User Agreement</p>
                    <p>Privacy Policy</p>
                </div>

                <div className="right-side">
                    <p>Content Policy</p>
                    <p>Moderator Guidelines</p>
                </div>
            </div>

            <p>2021 Reddit, Inc. All rights reserved.</p>
        </div>
    );
};
