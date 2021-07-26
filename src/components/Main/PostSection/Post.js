import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'
import './css/post.css';
import { useSelector } from 'react-redux';

export const Post = ({ item }) => {
    const { token, user } = useSelector(state => state.authReducer);
    const [votes, setVotes] = useState([]);
    const [upVotes, setUpvotes] = useState([]);
    const [downVotes, setDownvotes] = useState([]);
    const [ownerVote, setOwnerVote] = useState(null);

    useEffect(() => {
        fetch(`http://127.0.0.1:8000/redditclone/votes/?original_post=${item.id}`)
            .then(response => response.json())
            .then(data => setVotes(data))
            .catch(error => console.log(error));
    }, []);

    useEffect(() => {
        votes.forEach(item => {
            if (item.vote_choice === 1) {
                setUpvotes([...upVotes, item]);
            }
            else if (item.vote_choice === 2) {
                setDownvotes([...downVotes, item]);
            }
            if (item.owner === user.username) {
                setOwnerVote(item);
            }
        });
    }, [votes]);

    const castVote = (vote_type) => {
        if (ownerVote) {
            if (vote_type === ownerVote.vote_choice) {
                return;
            }
            fetch(`http://127.0.0.1:8000/redditclone/votes/${ownerVote.id}/`, {
                method: "PUT",
                body: JSON.stringify({
                    "owner": user.id,
                    "vote_choice": vote_type,
                    "original_post": item.id
                }),
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Token ${token}`
                }
            })
                .then(response => response.json())
                .then(data => {
                    const voteListCopy = [...votes];
                    const updateVote = voteListCopy.findIndex(item => item.id === data.id);
                    voteListCopy[updateVote].vote_choice = data.vote_choice;
                    setVotes(voteListCopy);

                    if (vote_type === 1) {
                        const newD = downVotes.filter(item => item.id !== data.id)
                        setUpvotes([...upVotes, data]);
                        setDownvotes(newD);
                    }
                    if (vote_type === 2) {
                        const newU = upVotes.filter(item => item.id !== data.id);
                        setDownvotes([...downVotes, data]);
                        setUpvotes(newU);
                    }
                    setOwnerVote(data);
                })
                .catch(error => console.log(error));
            return;
        }

        fetch(`http://127.0.0.1:8000/redditclone/votes/`, {
            method: "POST",
            body: JSON.stringify({
                "owner": user.id,
                "vote_choice": vote_type,
                "original_post": item.id
            }),
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Token ${token}`
            }
        })
            .then(response => response.json())
            .then(data => {
                setVotes([...votes, data]);
            })
            .catch(error => console.log(error));
    };

    return (
        <div className="post">
            <div className="post-content-votes">
                <i className="fas fa-arrow-up fa-lg" onClick={() => castVote(1)}></i>
                <p>{upVotes.length}</p>
                <div className="vote-divider"></div>
                <p>{downVotes.length}</p>
                <i className="fas fa-arrow-down fa-lg" onClick={() => castVote(2)}></i>
            </div>

            <Link to={`/r/${item.subreddit}/post/${item.id}`} style={{width: "100%"}}>
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
            </Link>

        </div>
    );
};