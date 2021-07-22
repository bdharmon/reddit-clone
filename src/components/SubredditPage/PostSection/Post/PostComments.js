import React, { useEffect, useState } from 'react';
import '../../css/postComments.css';
import { Comment } from './Comment';
import { useSelector } from 'react-redux';

export const PostComments = () => {
    const fetchedComments = useSelector(state => state.commentReducer)
    const [comments, setComments] = useState(fetchedComments.comments);

    useEffect(() => {
        setComments(fetchedComments.comments);
    }, []);

    return (
        <div>
            <div className="sort-by-container">
                <div className="sort-by">
                    <p>Sort By: Best</p>
                    <i className="fas fa-chevron-down fa-sm"></i>
                </div>
            </div>

            {comments.length > 0 ? comments.map((item) => <Comment key={item.id} item={item} />) : "No comment(s) to display."}
        </div>
    );
};
