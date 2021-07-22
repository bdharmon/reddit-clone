import React from 'react';

export const Account = () => {
    return (
        <div className="account-btn">
            <i className="fab fa-reddit-square fa-2x"><div className="account-status"></div></i>
            <div className="account-name">
                <p>John Doe</p>
                <div className="karma"><i className="far fa-compass"></i><p>1.5k karma</p></div>
            </div>
            <i className="fas fa-chevron-down"></i>
        </div>
    );
};
