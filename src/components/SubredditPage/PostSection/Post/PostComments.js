import React, { useEffect, useState } from 'react';
import '../../css/postComments.css';
import { Comment } from './Comment';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router';
import { fetchComments } from '../../../../redux/actions/postComments';

export const PostComments = () => {
    const { loading, items } = useSelector(state => state.allCommentsReducer);
    const { postid } = useParams();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchComments(postid));
    }, []);

    const loadedComments = () => {
        if (items.length < 1) {
            return ("No comment(s) to display.");
        }
        else {
            return (items.map((item) => <Comment key={item.id} item={item} />))
        }
    }

    return (
        <div>
            <div className="sort-by-container">
                <div className="sort-by">
                    <p>Sort By: Best</p>
                    <i className="fas fa-chevron-down fa-sm"></i>
                </div>
            </div>

            {loading ? "Loading..." : loadedComments()}
        </div>
    );
};
