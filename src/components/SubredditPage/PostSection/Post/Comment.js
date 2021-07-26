import React, { useState, useEffect } from 'react';
import '../../css/comment.css';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

export const Comment = ({ postData, item }) => {
    const { token, user } = useSelector(state => state.authReducer);
    const [showReply, setShowReply] = useState(false);
    const [votes, setVotes] = useState([]);
    const [upVotes, setUpvotes] = useState([]);
    const [downVotes, setDownvotes] = useState([]);
    const [createComment, setCreateComment] = useState({
        content: "",
        author: "",
        original_post: "",
        parent_comment: ""
    });

    useEffect(() => {
        if (user) {
            setCreateComment({ author: user.id, original_post: postData.id, parent_comment: item.id });
        }
    }, []);

    useEffect(() => {
        fetch(`http://127.0.0.1:8000/redditclone/votes/?original_comment=${item.id}`)
            .then(response => response.json())
            .then(data => setVotes(data))
            .catch(error => console.log(error));
    }, []);

    useEffect(() => {
        const uVotes = [];
        const dVotes = [];
        votes.forEach(item => {
            if (item.vote_choice === 1) {
                uVotes.push(item);
            }
            if (item.vote_choice === 2) {
                dVotes.push(item);
            }
        });

        setUpvotes(uVotes);
        setDownvotes(dVotes);
    }, [votes]);

    const castVote = (vote_type) => {
        fetch(`http://127.0.0.1:8000/redditclone/votes/`, {
            method: "POST",
            body: JSON.stringify({
                "owner": user.id,
                "vote_choice": vote_type,
                "original_comment": item.id
            }),
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Token ${token}`
            }
        })
            .then(response => response.json())
            .then(data => {
                setVotes([...votes], data);
                console.log(data);
            })
            .catch(error => console.log(error));
    };

    const createNewComment = () => {
        try {
            fetch(`http://127.0.0.1:8000/redditclone/comments/?original_post=${item.id}`, {
                method: "POST",
                body: JSON.stringify(createComment),
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Token ${token}`
                }
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
        <div id={item.id} className="user-comment">
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
                                <i className="fas fa-arrow-up fa-lg" onClick={() => castVote(1)}></i>
                                <p>{upVotes.length}</p>
                                <div className="votes-divider"></div>
                                <p>{downVotes.length}</p>
                                <i className="fas fa-arrow-down fa-lg" onClick={() => castVote(2)}></i>
                            </div>
                        </li>

                        <li>
                            <ul className="comment-options">
                                <li onClick={() => setShowReply(!showReply)}><i className="far fa-comment-alt"></i><p>Reply</p></li>
                                <li>Give Award</li>
                                <li>Share</li>
                                <li>Report</li>
                                <li>Save</li>
                            </ul>
                        </li>
                    </ul>
                </div>

                {showReply ? <div>
                    {user ? <div className="post-comment-box reply-box">
                        <p>Comment as <span>{user.username}</span></p>
                        <div className="comment">
                            <textarea rows="20" placeholder="What are your thoughts?" value={createComment.content} onChange={(e) => setCreateComment({ ...createComment, content: e.target.value })} />
                            <div className="comment-btn-div"><button onClick={() => createNewComment()}>Comment</button></div>
                        </div>
                    </div> : <p style={{ marginBottom: "10px", marginTop: "10px", textAlign: "center", fontSize: "1.1rem", fontWeight: "700" }}>You must <Link style={{ color: "#4FBCFF" }} to="/login">log in</Link> to reply to comments.</p>}
                </div> : null}

                {item.childComments ? item.childComments.map(item => <div style={{ marginTop: "15px" }}>{item}</div>) : null}
            </div>
        </div>
    );
};

