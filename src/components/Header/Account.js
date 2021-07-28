import React, { useEffect, useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../redux/actions/auth';

export const Account = () => {
    const [showDropdownList, setShowDropdownList] = useState(false);
    const dropDownRef = useRef(null);
    const { user } = useSelector(state => state.authReducer);
    const dispatch = useDispatch();

    const showDropdownListHandler = () => {
        setShowDropdownList(!showDropdownList);
    };

    useEffect(() => {
        const pageClickEvent = (e) => {
            if (dropDownRef.current !== null && !dropDownRef.current.contains(e.target)) {
               setShowDropdownList(!showDropdownList);
            }
        };

        if (showDropdownList) {
            window.addEventListener("click", pageClickEvent)
        }

        return () => {
            window.removeEventListener("click", pageClickEvent)
        }
        
    }, [showDropdownList])

    return (
        <div className="account-btn" onClick={() => showDropdownListHandler()}>
            <i className="fas fa-user-circle fa-2x"><div className="account-status"></div></i>
            <div className="account-name">
                <p>{user.username}</p>
                <div className="karma"><i className="far fa-compass"></i><p>1.5k karma</p></div>
            </div>
            <i className="fas fa-chevron-down"></i>

            {showDropdownList ? (
                <ul className="account-dropdown" ref={dropDownRef}>
                    <li onClick={() => dispatch(logout())}><p>Log Out</p><i className="fas fa-sign-out-alt"></i></li>
                </ul>) : null}
        </div>
    );
};
