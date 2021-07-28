import React, { useState } from 'react';
import './css/sortPost.css';
import { useDispatch } from 'react-redux';
import { fetchPosts } from '../../../redux/actions/allPosts';

export const SortPost = () => {
    const [activeSort, setActiveSort] = useState({
        best: null,
        hot: null,
        new: null,
        top: null,
        rising: null
    });
    const dispatch = useDispatch();

    const activeSortHandler = (sort) => {
        const sortCopy = {
            best: null,
            hot: null,
            new: null,
            top: null,
            rising: null
        };
        sortCopy[sort] = "#FF4500";
        setActiveSort(sortCopy);
    };

    const onClickHandler = (sortDispatch, sortActive) => {
        activeSortHandler(sortActive);
        dispatch(fetchPosts(sortDispatch));
    };

    return (
        <ul className="sort-post">
            <li className="sort-item" style={{ color: activeSort.best }} onClick={() => activeSortHandler("best")}><i className="fas fa-rocket"></i><p>Best</p></li>

            <li className="sort-item" style={{ color: activeSort.hot }} onClick={() => activeSortHandler("hot")}><i className="fas fa-fire"></i><p>Hot</p></li>

            <li className="sort-item" style={{ color: activeSort.new }} onClick={() => onClickHandler("", "new")}><i className="fas fa-certificate"></i><p>New</p></li>

            <li className="sort-item" style={{ color: activeSort.top }} onClick={() => onClickHandler("top_posts/", "top")}><i className="fas fa-arrow-up"></i><p>Top</p></li>

            <li className="sort-item" style={{ color: activeSort.rising }} onClick={() => activeSortHandler("rising")}><i className="fas fa-chart-line"></i><p>Rising</p></li>

            <li className="sort-item"><i className="fas fa-layer-group"></i><i className="fas fa-chevron-down"></i></li>
        </ul>
    );
};
