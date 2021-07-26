import React from 'react';
import { useHistory } from 'react-router-dom';
import './css/createPost.css';

export const CreatePost = () => {
    const history = useHistory();

    return (
        <div className="create-post">
            <i className="fas fa-align-left fa-lg"></i>
            <input className="search" placeholder="Create Post" onChange={() => history.push("/submit")} onClick={() => history.push("/submit")}/>
            <i className="far fa-image fa-lg"></i>
            <i className="fas fa-link fa-lg"></i>
        </div>
    );
};
