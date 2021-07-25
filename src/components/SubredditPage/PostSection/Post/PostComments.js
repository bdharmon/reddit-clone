import React, { useEffect, useState } from 'react';
import '../../css/postComments.css';
import { Comment } from './Comment';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router';
import { fetchComments } from '../../../../redux/actions/postComments';

export const PostComments = ({ postData }) => {
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
            // return (items.map((item) => <Comment postData={postData} key={item.id} item={item} />))
            return (items.map((item) => {
                item["childComments"] = [];
                if (!item.parent_comment) {
                    return <Comment postData={postData} key={item.id} item={item} />
                }
                if (item.parent_comment) {
                    const parentComment = items.find(itemx => itemx.id === item.parent_comment);
                    parentComment.childComments.push(<Comment postData={postData} key={item.id} item={item} />)
                    console.log("parent: ", parentComment);
                }
            }))
        }
    };

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
