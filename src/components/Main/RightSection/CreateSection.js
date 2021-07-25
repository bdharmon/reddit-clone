import React from 'react';
import { Link } from 'react-router-dom';
import './css/createSection.css';
import edditMascot from '../../../images/_eddit Clone-mascot.png';
import planets from '../../../images/planets.jpg';

export const CreateSection = () => {
    return (
        <ul className="create-section">
            <li>
                <div className="create-section-header">
                    <img className="planets-img" src={planets} alt="" />
                    <div className="create-section-title">
                        <img className="mascot" src={edditMascot} alt="" />
                        <p>Home</p>
                    </div>
                </div>
            </li>

            <li>
                <p>Your personal _eddit Clone frontpage. Come here to check in with your favorite communities.</p>
            </li>

            <li className="create-btns">
                <Link to="/submit"><li><button className="post-btn">Create Post</button></li></Link>
                <Link><li><button className="comm-btn">Create Community</button></li></Link>
            </li>
        </ul>
    );
};