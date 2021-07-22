import React from 'react';
import '../css/subredditPost.css';

export const Post = ({item}) => {
    return (
        <div className="post">
            <div className="left">
                <i className="fas fa-arrow-up fa-lg"></i>
                <p>99</p>
                <i className="fas fa-arrow-down fa-lg"></i>
            </div>

            <div className="right">
                <div className="post-header">
                    <i className="fas fa-icons"></i>
                    <p>r/{item.subreddit}</p>
                    <p>&bull;</p>
                    <p className="posted-by">Posted by u/{item.author} {item.date_created}</p>
                </div>

                <div className="post-title">
                    <p>Post Title</p>
                </div>

                <div className="post-body">
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam turpis augue, varius ut sem non, tristique blandit magna. Fusce luctus urna at dui efficitur maximus. Etiam aliquam ac risus non dignissim. Ut auctor felis nec maximus dapibus. Phasellus vitae nisl augue. Fusce condimentum quis quam ac ullamcorper. Morbi sodales nisl.</p>
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
    );
};