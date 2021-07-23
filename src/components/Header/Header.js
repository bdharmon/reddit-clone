import React from 'react';
import './header.css';
import redditIcon from '../../images/reddit_icon.png';
import { Subreddit } from './Subreddit';
import { Search } from './Search';
import { Sections } from './Sections';
import { Account } from './Account';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Fragment } from 'react';

export const Header = () => {
    const { isAuthenticated } = useSelector(state => state.authReducer);

    return (
        <div className="header">
            <Link className="home-icon" to="/"><img className="reddit-icon" src={redditIcon} alt="" /></Link>
            <Subreddit />
            <Search />

            {!isAuthenticated ? <div className="login-container">
                <Link to="/login"><button>Log In</button></Link>
                <Link to="/register"><button>Sign Up</button></Link>
            </div> : <Fragment><Sections /> <Account /></Fragment>}
        </div>
    );
};
