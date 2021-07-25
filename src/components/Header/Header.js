import React from 'react';
import './header.css';
import rIcon from '../../images/_eddit Clone-logos_transparent.png';
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
            <Link className="home-icon" to="/"><img className="r-icon" src={rIcon} alt="" /></Link>
            <Subreddit />
            <Search />

            {!isAuthenticated ? <div className="login-container">
                <Link to="/login"><button className="login-btn">Log In</button></Link>
                <Link to="/register"><button className="sign-up-btn">Sign Up</button></Link>
            </div> : <Fragment><Sections /> <Account /></Fragment>}
        </div>
    );
};
