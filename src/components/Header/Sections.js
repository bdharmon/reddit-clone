import React from 'react';

export const Sections = () => {
    return (
        <div>
            <ul className="sections">
                <li className="sections-btn"><i className="fas fa-location-arrow fa-lg"></i></li>
                <li className="sections-btn"><i className="fas fa-signal fa-lg"></i></li>
                <li className="sections-btn"><i className="fas fa-video fa-lg"></i></li>
                <li><div className="vertical-line"></div></li>
                <li className="sections-btn"><i className="far fa-comment-dots fa-lg"></i></li>
                <li className="sections-btn"><i className="far fa-bell fa-lg"></i></li>
                <li className="sections-btn"><i className="fas fa-plus fa-lg"></i></li>
                <li className="coin-btn"><i className="fas fa-donate fa-lg"></i>Coin Sale</li>
            </ul>
        </div>
    );
};