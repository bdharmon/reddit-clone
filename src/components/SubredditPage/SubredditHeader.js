import React from 'react';
import './css/subredditHeader.css';

export const SubredditHeader = ({ thisSubReddit }) => {
    return (
        <div className="sr-header">
            <div className="top-half-color"></div>

            <div className="sr-header-info">
                <i className="fas fa-film fa-4x"></i>
                <div className="sr-title">
                    <h3>{thisSubReddit.display_name}</h3>
                    <p>r/{thisSubReddit.display_name}</p>
                </div>
            </div>
        </div>
    );
};
