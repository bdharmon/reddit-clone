import axios from 'axios';

export const FETCH_POSTS_REQUEST = "FETCH_POSTS_REQUEST";
export const FETCH_POSTS_SUCCESS = "FETCH_POSTS_SUCCESS";
export const FETCH_POSTS_FAILURE = "FETCH_POSTS_FAILURE";

export const fetchPostsRequest = () => ({
  type: FETCH_POSTS_REQUEST
});

export const fetchPostsSuccess = POSTS => ({
  type: FETCH_POSTS_SUCCESS,
  payload: POSTS
});

export const fetchPostsFailure = error => ({
  type: FETCH_POSTS_FAILURE,
  payload: error
});

export const fetchPosts = () => (dispatch) => {
  dispatch({ type: FETCH_POSTS_REQUEST });

  axios.get("http://127.0.0.1:8000/redditclone/")
    .then(response => {
      return dispatch({ type: FETCH_POSTS_SUCCESS, payload: response.data })
    })
    .catch(err => dispatch({ type: FETCH_POSTS_FAILURE, payload: err }));
};