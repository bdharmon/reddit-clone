import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../redux/actions/auth';

export const Account = () => {
    const [showDropdownList, setShowDropdownList] = useState(false);
    const { user } = useSelector(state => state.authReducer);
    const dispatch = useDispatch();

    const showDropdownListHandler = () => {
        setShowDropdownList(!showDropdownList);
    };

    document.getElementsByTagName("BODY")[0].addEventListener("click", (e) => {
        if (e.target === document.getElementsByClassName("account-btn")[0]) {
            return;
        }
        setShowDropdownList(false);
    });

    return (
        <div className="account-btn" onClick={() => showDropdownListHandler()}>
            <i className="fab fa-reddit-square fa-2x"><div className="account-status"></div></i>
            <div className="account-name">
                <p>{user.username}</p>
                <div className="karma"><i className="far fa-compass"></i><p>1.5k karma</p></div>
            </div>
            <i className="fas fa-chevron-down"></i>

            {showDropdownList ? (
                <ul className="account-dropdown">
                    <li onClick={() => dispatch(logout())}><p>Log Out</p><i class="fas fa-sign-out-alt"></i></li>
                </ul>) : null}
        </div>
    );
};
