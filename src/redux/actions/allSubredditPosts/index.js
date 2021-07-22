import axios from 'axios';

export const FETCH_SUBREDDITPOSTS_REQUEST = "FETCH_SUBREDDITPOSTS_REQUEST";
export const FETCH_SUBREDDITPOSTS_SUCCESS = "FETCH_SUBREDDITPOSTS_SUCCESS";
export const FETCH_SUBREDDITPOSTS_FAILURE = "FETCH_SUBREDDITPOSTS_FAILURE";

export const fetchSubredditPostsRequest = () => ({
  type: FETCH_SUBREDDITPOSTS_REQUEST
});

export const fetchSubredditPostsSuccess = SUBREDDITPOSTS => ({
  type: FETCH_SUBREDDITPOSTS_SUCCESS,
  payload: SUBREDDITPOSTS
});

export const fetchSubredditPostsFailure = error => ({
  type: FETCH_SUBREDDITPOSTS_FAILURE,
  payload: error
});

export const fetchSubredditPosts = (subreddit) => (dispatch) => {
  dispatch({ type: FETCH_SUBREDDITPOSTS_REQUEST });

  axios.get(`http://127.0.0.1:8000/redditclone/?subreddit__name=${subreddit}`)
    .then(response => {
      return dispatch({ type: FETCH_SUBREDDITPOSTS_SUCCESS, payload: response.data })
    })
    .catch(err => dispatch({ type: FETCH_SUBREDDITPOSTS_FAILURE, payload: err }));
};