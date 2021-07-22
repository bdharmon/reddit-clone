import axios from 'axios';

export const fetchSubreddits = () => {
    return {
        type: "FETCH_SUBREDDITS"
    };
};

export const fetchAsubreddit = (subRedditName) => {
    return {
        type: "FETCH_A_SUBREDDIT",
        payload: subRedditName
    };
};

// Comment actions
export const fetchCommentsRequest = () => {
    return {
        type: "FETCH_COMMENTS_REQUEST"
    };
};

export const fetchCommentsSuccess = (comments) => {
    return {
        type: "FETCH_COMMENTS_SUCCESS",
        payload: comments
    };
};

export const fetchCommentsFailure = (error) => {
    return {
        type: "FETCH_COMMENTS_FAILURE",
        payload: error
    };
};

export const fetchComments = (postid) => {
    return (dispatch) => {
        dispatch(fetchCommentsRequest());
        axios.get(`http://127.0.0.1:8000/redditclone/comments/?original_post=${postid}`)
            .then(response => {
                const comments = response.data;
                dispatch(fetchCommentsSuccess(comments));
            })
            .catch(error => {
                const errorMsg = error.message;
                dispatch(fetchCommentsFailure(errorMsg));
            });
    };
};