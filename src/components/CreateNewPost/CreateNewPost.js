import React, { useState, useEffect } from 'react';
import { Link, Redirect } from 'react-router-dom';
import './css/createNewPost.css';
import { useSelector } from 'react-redux';

export const CreateNewPost = ({ thisSubReddit }) => {
    const [showCommunityDropdownList, setShowCommunityDropdownList] = useState(false);
    const { items } = useSelector(state => state.subredditListReducer);
    const { token, isAuthenticated, user } = useSelector(state => state.authReducer);
    const [createData, setCreateData] = useState({
        title: "",
        content: "",
        author: "",
        subreddit: ""
    });

    console.log(thisSubReddit);

    const showDropdownListHandler = () => {
        setShowCommunityDropdownList(!showCommunityDropdownList);
    };

    document.getElementsByTagName("BODY")[0].addEventListener("click", (e) => {
        if (e.target === document.getElementsByClassName("cnp-choose-comm")[0]) {
            return;
        }
        // setShowCommunityDropdownList(false);
    });

    useEffect(() => {
        if (user) {
            setCreateData({ ...createData, author: user.id, subreddit: thisSubReddit.id });
        }
    }, [thisSubReddit])

    const onChangeHandler = (e) => {
        setCreateData({ ...createData, [e.target.name]: e.target.value });
    };

    const createNewPost = () => {
        try {
            fetch(`http://127.0.0.1:8000/redditclone/?subreddit__name=${thisSubReddit.name}`, {
                method: "POST",
                body: JSON.stringify(createData),
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Token ${token}`
                }
            })
                .then(window.location.href = `/r/${thisSubReddit.name}`);
        } catch (error) {
            console.error(error);
        }
    };

    const privateTest = () => {
        if (!isAuthenticated) {
            return <Redirect to="/login" />;
        }
        else {
            return (
                <div className="create-new-post">
                    <div className="cnp-header">
                        <p>Create A Post</p>
                    </div>

                    <div className="cnp-choose-comm" onClick={() => showDropdownListHandler()}>
                        <div className="choose-circle"></div>
                        <p>{thisSubReddit ? `r/${thisSubReddit.display_name}` : "Choose a community"}</p>
                        <i className="fas fa-chevron-down"></i>
                        {showCommunityDropdownList ? (<ul id="community-dropdown-list">
                            {items.map((item => (
                                <Link to={`/r/${item.name}/submit`} key={item.id}><li>r/{item.display_name}</li></Link>)))}
                        </ul>) : null}
                    </div>

                    <div className="submission-header">
                        <ul>
                            <li><i className="fas fa-sticky-note fa-lg"></i><p>Post</p></li>
                            <li><i className="far fa-image fa-lg"></i><p>Images &#38; Video</p></li>
                            <li><i className="fas fa-link fa-lg"></i><p>Link</p></li>
                        </ul>
                    </div>

                    <div className="submission-title">
                        <input type="text" placeholder="Title" name="title" value={createData.title} onChange={(e) => onChangeHandler(e)} />
                        <p>0/200</p>
                    </div>

                    <div className="submission-content">
                        <textarea placeholder="Text (optional)" name="content" value={createData.content} onChange={(e) => onChangeHandler(e)} />
                    </div>

                    <div className="submission-flair">
                        <i className="fas fa-tag"></i>
                        <p>FLAIR</p>
                        <i className="fas fa-chevron-down"></i>
                    </div>

                    <div className="submission-submit">
                        <button onClick={() => createNewPost()}>Post</button>
                    </div>
                </div>
            );
        }
    };

    return (
        privateTest()
    );
};
