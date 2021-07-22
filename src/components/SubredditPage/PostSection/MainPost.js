import React, { useEffect, useState, } from 'react';
import '../css/mainPost.css';
import { useParams } from 'react-router';
import { PostContent } from './Post/PostContent';
import { PostComments } from './Post/PostComments';
import { useSelector, useDispatch, connect } from 'react-redux';
import { fetchComments } from '../../../redux/actions';

export const MainPost = () => {
    const subreddit__name = window.location.pathname.split("/")[2];
    const fetchedComments = useSelector(state => state.commentReducer)
    const { postid } = useParams();
    const [postData, setPostData] = useState(null);
    const dispatch = useDispatch()

    useEffect(() => {
        try {
            fetch(`http://127.0.0.1:8000/redditclone/?subreddit__name=${subreddit__name}&id=${postid}`)
                .then(response => response.json())
                .then(data => {
                    setPostData(data);
                });
        } catch (error) {
            console.error(error);
        }
    }, []);

    useEffect(() => {
        dispatch(fetchComments(postid));
    }, []);

    return (
        <div className="main-post">
            {postData ? (<div><PostContent postData={postData[0]} /> <PostComments /></div>) : "Loading..."}
        </div>
    );
};