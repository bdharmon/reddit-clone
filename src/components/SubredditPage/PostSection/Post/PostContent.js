import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../../css/postContent.css';

export const PostContent = ({ postData, totalComments }) => {
    const [createComment, setCreateComment] = useState({
        content: "",
        author: 10,
        original_post: postData.id
    });

    const createNewComment = () => {
        try {
            fetch(`http://127.0.0.1:8000/redditclone/comments/?original_post=${postData.id}`, {
                method: "POST",
                body: JSON.stringify(createComment),
                headers: { "Content-Type": "application/json" }
            })
                .then(window.location.reload());
        } catch (error) {
            console.error(error);
        }
        setCreateComment({
            content: "",
            author: "",
            original_post: ""
        });
    };

    return (
        <div className="post-content">
            <div className="post-content-votes">
                <i className="fas fa-arrow-up fa-lg"></i>
                <p>99</p>
                <div className="vote-divider"></div>
                <p>55</p>
                <i className="fas fa-arrow-down fa-lg"></i>
            </div>

            <div className="post-content-main">
                <div className="post-content-header">
                    <div className="post-header">
                        <Link to={`/r/${postData.subreddit}`}><i className="fas fa-icons"></i></Link>
                        <Link to={`/r/${postData.subreddit}`}><p className="post-subreddit">r/{postData.subreddit}</p></Link>
                        <p className="posted-by">Posted by <span className="author">u/{postData.author}</span> <span className="bull-sep">&bull;</span> <span className="date-created">{postData.date_created} hours ago</span></p>
                    </div>
                    <p className="main-post-title">{postData.title}</p>
                    <p className="main-post-flair">Discussion</p>
                </div>

                <div className="post-content-body">
                    <p>{postData.content}</p>
                </div>

                <div className="post-content-footer">
                    <ul>
                        <li><i className="far fa-comment-alt"></i><p>{totalComments} Comment(s)</p></li>
                        <li><i className="fas fa-award"></i><p>Award</p></li>
                        <li><i className="fas fa-share"></i><p>Share</p></li>
                        <li><i className="far fa-bookmark"></i><p>Save</p></li>
                        <li><i className="far fa-eye-slash"></i><p>Hide</p></li>
                        <li><i className="far fa-flag"></i><p>Report</p></li>
                        <li className="vote-percent">
                            <p>98% UpVoted</p>
                            <p>2% DownVoted</p>
                        </li>
                    </ul>
                </div>

                <div className="post-comment-box">
                    <p>Comment as <span>John Doe</span></p>
                    <div className="comment">
                        <textarea rows="20" placeholder="What are your thoughts?" value={createComment.content} onChange={(e) => setCreateComment({ ...createComment, content: e.target.value })} />
                        <div className="comment-btn-div"><button onClick={() => createNewComment()}>Comment</button></div>
                    </div>
                </div>
            </div>
        </div>
    );
};
