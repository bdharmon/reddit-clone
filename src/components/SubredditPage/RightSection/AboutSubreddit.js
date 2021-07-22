import React from 'react';
import { Link, useRouteMatch } from 'react-router-dom';
import '../css/aboutSubreddit.css';

export const AboutSubreddit = ({ thisSubReddit }) => {
    const {url} = useRouteMatch()

    return (
        <div className="about-sr">
            <div className="about-sr-header">
                <p>About Community</p>
                <i className="fas fa-ellipsis-h"></i>
            </div>

            <div className="about-sr-title">
                <i className="fas fa-film"></i>
                <p>r/{thisSubReddit.display_name}</p>
            </div>

            <div className="about-sr-content">
                <p>{thisSubReddit.about}</p>
            </div>

            <div className="about-sr-stats">
                <div className="members"></div>
            </div>

            <Link to={`${url}/submit`}><button>Create Post</button></Link>
        </div>
    );
};
