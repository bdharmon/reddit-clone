import axios from 'axios';

export const FETCH_SUBREDDITS_REQUEST = "FETCH_SUBREDDITS_REQUEST";
export const FETCH_SUBREDDITS_SUCCESS = "FETCH_SUBREDDITS_SUCCESS";
export const FETCH_SUBREDDITS_FAILURE = "FETCH_SUBREDDITS_FAILURE";

export const fetchSubredditsRequest = () => ({
  type: FETCH_SUBREDDITS_REQUEST
});

export const fetchSubredditsSuccess = subreddits => ({
  type: FETCH_SUBREDDITS_SUCCESS,
  payload: subreddits
});

export const fetchSubredditsFailure = error => ({
  type: FETCH_SUBREDDITS_FAILURE,
  payload: error
});

export const fetchSubreddits = () => (dispatch) => {
  dispatch({ type: FETCH_SUBREDDITS_REQUEST });

  axios.get("http://127.0.0.1:8000/redditclone/subreddits/")
    .then(response => {
      return dispatch({ type: FETCH_SUBREDDITS_SUCCESS, payload: response.data })
    })
    .catch(err => dispatch({ type: FETCH_SUBREDDITS_FAILURE, payload: err }));
};