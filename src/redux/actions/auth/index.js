import axios from "axios";

export const USER_LOADING = "USER_LOADING";
export const USER_LOADED = "USER_LOADED";
export const AUTH_ERROR = "AUTH_ERROR";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAIL = "LOGIN_FAIL";


// CHECK TOKEN & LOAD USER
export const loadUser = () => (dispatch, getState) => {
    dispatch({ type: USER_LOADING });
    console.log(getState().authReducer.token);

    // Get token from state
    const token = getState().authReducer.token;

    // Headers
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    // If token, add to headers config
    if (token) {
        config.headers['Authorization'] = `Token ${token}`;
    }

    axios.get('http://127.0.0.1:8000/redditclone/api/auth/user', config)
        .then(response => {
            dispatch({
                type: USER_LOADED,
                payload: response.data
            });
        })
        .catch(error => {
            dispatch({
                type: AUTH_ERROR,
                payload: error
            });
        });
};

// LOGIN USER
export const login = (username, password) => (dispatch) => {

    // Headers
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    // Request body
    const body = JSON.stringify({ username, password });

    axios.post('http://127.0.0.1:8000/redditclone/api/auth/login/', body, config)
        .then(response => {
            dispatch({
                type: LOGIN_SUCCESS,
                payload: response.data
            });
        })
        .catch(error => {
            dispatch({
                type: LOGIN_FAIL,
                payload: error
            });
        });
};