import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchSubreddits } from '../../redux/actions/subredditDropdownList';

export const Subreddit = () => {
    const [showDropdownList, setShowDropdownList] = useState(false);
    const dropDownRef = useRef(null);
    const { items } = useSelector(state => state.subredditListReducer);
    const dispatch = useDispatch();

    const showDropdownListHandler = () => {
        setShowDropdownList(!showDropdownList);
    };

    useEffect(() => {
        dispatch(fetchSubreddits());
    }, []);

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
        <div className="subreddit-list" onClick={() => showDropdownListHandler()}>
            <i className="fas fa-home fa-lg" style={{ "color": "white" }}></i>
            <p className="subreddit-title">Home</p>
            <i className="fas fa-chevron-down"></i>

            {showDropdownList ? (<ul id="subreddit-dropdown-list" ref={dropDownRef}>
                {items.map((item => (
                    <Link to={`/r/${item.name}`} key={item.id}><li>r/{item.display_name}</li></Link>)))}
            </ul>) : null}
        </div>
    );
};