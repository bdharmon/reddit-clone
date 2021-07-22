import React from 'react';
import { Link } from 'react-router-dom'
import './css/post.css';

export const Post = ({ item }) => {
    return (
        <Link to={`/r/${item.subreddit}/post/${item.id}`}>
            <div className="post">
                <div className="post-content-votes">
                    <i className="fas fa-arrow-up fa-lg"></i>
                    <p>99</p>
                    <div className="vote-divider"></div>
                    <p>55</p>
                    <i className="fas fa-arrow-down fa-lg"></i>
                </div>

                <div className="right">
                    <div className="post-header">
                        <Link to={`/r/${item.subreddit}`}><i className="fas fa-icons"></i></Link>
                        <Link to={`/r/${item.subreddit}`}><p className="post-subreddit">r/{item.subreddit}</p></Link>
                        <p>&bull;</p>
                        <p className="posted-by">Posted by <span className="author">u/{item.author}</span> <span className="bull-sep">&bull;</span> <span className="date-created">{item.date_created}</span></p>
                    </div>

                    <div className="post-title">
                        <p>{item.title}</p>
                    </div>

                    <div className="post-body">
                        <p>{item.content}</p>
                    </div>

                    <div className="post-footer">
                        <ul>
                            <li><i className="far fa-comment-alt"></i><p>Comments</p></li>
                            <li><i className="fas fa-award"></i><p>Award</p></li>
                            <li><i className="fas fa-share"></i><p>Share</p></li>
                            <li><i className="far fa-bookmark"></i><p>Save</p></li>
                            <li><i className="fas fa-ellipsis-h"></i></li>
                        </ul>
                    </div>
                </div>
            </div>
        </Link>

    );
};