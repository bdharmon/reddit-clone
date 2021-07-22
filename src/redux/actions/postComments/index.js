import axios from 'axios';

export const FETCH_COMMENTS_REQUEST = "FETCH_COMMENTS_REQUEST";
export const FETCH_COMMENTS_SUCCESS = "FETCH_COMMENTS_SUCCESS";
export const FETCH_COMMENTS_FAILURE = "FETCH_COMMENTS_FAILURE";

export const fetchCommentsRequest = () => ({
  type: FETCH_COMMENTS_REQUEST
});

export const fetchCommentsSuccess = COMMENTS => ({
  type: FETCH_COMMENTS_SUCCESS,
  payload: COMMENTS
});

export const fetchCommentsFailure = error => ({
  type: FETCH_COMMENTS_FAILURE,
  payload: error
});

export const fetchComments = (postid) => (dispatch) => {
  dispatch({ type: FETCH_COMMENTS_REQUEST });

  axios.get(`http://127.0.0.1:8000/redditclone/comments/?original_post=${postid}`)
    .then(response => {
      return dispatch({ type: FETCH_COMMENTS_SUCCESS, payload: response.data })
    })
    .catch(err => dispatch({ type: FETCH_COMMENTS_FAILURE, payload: err }));
};