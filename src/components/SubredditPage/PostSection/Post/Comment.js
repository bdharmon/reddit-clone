import React from 'react';
import '../../css/comment.css';

export const Comment = ({ item }) => {
    return (
        <div className="user-comment">
            <div className="avi-container">
                <i className="fas fa-user fa-lg"></i>
                <div className="vert-comment-line"></div>
            </div>

            <div className="comment-right">
                <div className="comment-header">
                    <p>{item.author}</p>
                    <p className="bullet">&bull;</p>
                    <p>{item.date_created}</p>
                </div>

                <div className="comment-text">
                    <p>{item.content}</p>
                </div>

                <div className="comment-footer">
                    <ul>
                        <li>
                            <div className="votes">
                                <i className="fas fa-arrow-up fa-lg"></i>
                                <p>99</p>
                                <div className="votes-divider"></div>
                                <p>55</p>
                                <i className="fas fa-arrow-down fa-lg"></i>
                            </div>
                        </li>

                        <li>
                            <ul className="comment-options">
                                <li><i className="far fa-comment-alt"></i><p>Reply</p></li>
                                <li>Give Award</li>
                                <li>Share</li>
                                <li>Report</li>
                                <li>Save</li>
                            </ul>
                        </li>
                    </ul>
                </div>
            </div>

        </div>
    );
};
