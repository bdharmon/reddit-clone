import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../../css/postContent.css';
import { useSelector } from 'react-redux';

export const PostContent = ({ postData, totalComments }) => {
    const { token, user } = useSelector(state => state.authReducer);
    const [showOptions, setShowOptions] = useState(false);
    const [votes, setVotes] = useState([]);
    const [upVotes, setUpvotes] = useState([]);
    const [downVotes, setDownvotes] = useState([]);
    const [createComment, setCreateComment] = useState({
        content: "",
        author: "",
        original_post: ""
    });

    useEffect(() => {
        if (user) {
            setCreateComment({ author: user.id, original_post: postData.id });
        }
    }, []);

    useEffect(() => {
        fetch(`http://127.0.0.1:8000/redditclone/votes/?original_post=${postData.id}`)
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

    // POST COMMENT
    const createNewComment = () => {
        try {
            fetch(`http://127.0.0.1:8000/redditclone/comments/?original_post=${postData.id}`, {
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

    // DELETE COMMENT
    const deletePost = () => {
        try {
            fetch(`http://127.0.0.1:8000/redditclone/${postData.id}/`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Token ${token}`
                }
            })
                .then(window.location.href = '/');
        } catch (error) {
            console.error(error);
        }
        setCreateComment({
            content: "",
            author: "",
            original_post: ""
        });
    };

    const castVote = (vote_type) => {
        fetch(`http://127.0.0.1:8000/redditclone/votes/`, {
            method: "POST",
            body: JSON.stringify({
                "owner": user.id,
                "vote_choice": vote_type,
                "original_post": postData.id
            }),
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Token ${token}`
            }
        })
            .then(response => response.json())
            .then(data => {
                setVotes([...votes, data]);
                console.log(data);
            })
            .catch(error => console.log(error));
    };

    return (
        <div className="post-content">
            <div className="post-content-votes">
                <i className="fas fa-arrow-up fa-lg" onClick={() => castVote(1)}></i>
                <p>{upVotes.length}</p>
                <div className="vote-divider"></div>
                <p>{downVotes.length}</p>
                <i className="fas fa-arrow-down fa-lg" onClick={() => castVote(2)}></i>
            </div>

            <div className="post-content-main">
                <div className="post-content-header">
                    <div className="post-header-top">
                        <div style={{ display: "flex" }}><Link style={{ marginRight: "5px" }} to={`/r/${postData.subreddit}`}><i className="fas fa-icons"></i></Link>
                            <Link to={`/r/${postData.subreddit}`}><p className="post-subreddit">r/{postData.subreddit}</p></Link></div>

                        <div style={{ display: "flex", marginLeft: "10px" }}><p className="posted-by">Posted by <span className="author">u/{postData.author}</span> <span className="bull-sep">&bull;</span> <span className="date-created">{postData.date_created} hours ago</span></p></div>

                        {user && user.username === postData.author ? <div style={{ marginLeft: "auto", position: "relative", cursor: "pointer" }}>
                            <i class="fas fa-ellipsis-h" onClick={() => setShowOptions(!showOptions)}></i>
                            {showOptions ? <ul className="post-dropdown">
                                <li><p>Edit Post</p> <i class="fas fa-edit"></i></li>
                                <li onClick={() => deletePost()}><p style={{ marginRight: "20px" }}>Delete Post</p> <i class="fas fa-trash-alt"></i></li>
                            </ul> : null}
                        </div> : null}
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
                            <p>{Math.floor((upVotes.length / votes.length) * 100)}% UpVoted</p>
                            <p>{Math.floor((downVotes.length / votes.length) * 100)}% DownVoted</p>
                        </li>
                    </ul>
                </div>

                {user ? <div className="post-comment-box">
                    <p>Comment as <span>{user.username}</span></p>
                    <div className="comment">
                        <textarea rows="20" placeholder="What are your thoughts?" value={createComment.content} onChange={(e) => setCreateComment({ ...createComment, content: e.target.value })} />
                        <div className="comment-btn-div"><button onClick={() => createNewComment()}>Comment</button></div>
                    </div>
                </div> : <p style={{ marginBottom: "25px", textAlign: "center", fontSize: "1.1rem", fontWeight: "700" }}>You must <Link style={{ color: "#4FBCFF" }} to="/login">log in</Link> to post comments.</p>}

            </div>
        </div>
    );
};
