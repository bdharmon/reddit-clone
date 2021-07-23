import React from 'react';
import './header.css';
import redditIcon from '../../images/reddit_icon.png';
import { Subreddit } from './Subreddit';
import { Search } from './Search';
import { Sections } from './Sections';
import { Account } from './Account';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

export const Header = () => {
    const { isAuthenticated } = useSelector(state => state.authReducer);

    return (
        <div className="header">
            <Link className="home-icon" to="/"><img className="reddit-icon" src={redditIcon} alt="" /></Link>
            <Subreddit />
            <Search />

            {!isAuthenticated ? <div className="login-container">
                <button>Log In</button>
                <button>Sign Up</button>
            </div> : <div><Sections /> <Account /></div>}
        </div>
    );
};
