import React, { useEffect, useState, } from 'react';
import '../css/mainPost.css';
import { useParams } from 'react-router';
import { PostContent } from './Post/PostContent';
import { PostComments } from './Post/PostComments';

export const MainPost = () => {
    const subreddit__name = window.location.pathname.split("/")[2];
    const { postid } = useParams();
    const [postData, setPostData] = useState(null);

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

    return (
        <div className="main-post">
            {postData ? (<div><PostContent postData={postData[0]} /> <PostComments postData={postData[0]} /></div>) : "Loading..."}
        </div>
    );
};