import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchSubreddits } from '../../redux/actions/index';

export const Subreddit = () => {
    const [showDropdownList, setShowDropdownList] = useState(false);
    const [subredditList, setSubredditList] = useState(null);
    const subreddits = useSelector(state => state.subredditListReducer);
    const dispatch = useDispatch();

    const showDropdownListHandler = () => {
        setShowDropdownList(!showDropdownList);
    };

    document.getElementsByTagName("BODY")[0].addEventListener("click", (e) => {
        if (e.target === document.getElementsByClassName("subreddit-list")[0]) {
            return;
        }
        setShowDropdownList(false);
    });

    useEffect(() => {
        dispatch(fetchSubreddits());
        setSubredditList(subreddits);
    }, []);

    return (
        <div className="subreddit-list" onClick={() => showDropdownListHandler()}>
            <i className="fas fa-home fa-lg" style={{ "color": "white" }}></i>
            <p className="subreddit-title">Home</p>
            <i className="fas fa-chevron-down"></i>

            {showDropdownList ? (<ul id="subreddit-dropdown-list">
                {subredditList.fetchedData.map((item => (
                    <Link to={`/r/${item.name}`} key={item.id}><li>r/{item.display_name}</li></Link>)))}
            </ul>) : null}
        </div>
    );
};