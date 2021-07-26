import React, { useEffect } from 'react';
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
            return (<p style={{ fontSize: "1.2rem", marginBottom: "10px", textAlign: "center" }}>No comment(s) to display.</p>);
        }
        else {
            return (items.map((item) => {
                item["childComments"] = [];
                if (!item.parent_comment) {
                    return <Comment postData={postData} key={item.id} item={item} />;
                }
                if (item.parent_comment) {
                    const parentComment = items.find(itemx => itemx.id === item.parent_comment);
                    return (parentComment.childComments.push(<Comment postData={postData} key={item.id} item={item} />));
                }
                else {
                    return null;
                }
            }));
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
