import axios from "axios";

export const USER_LOADING = "USER_LOADING";
export const USER_LOADED = "USER_LOADED";
export const AUTH_ERROR = "AUTH_ERROR";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAIL = "LOGIN_FAIL";
export const LOGOUT_SUCCESS = "LOGOUT_SUCCESS";
export const REGISTER_SUCCESS = "REGISTER_SUCCESS";
export const REGISTER_FAIL = "REGISTER_FAIL";


// CHECK TOKEN & LOAD USER
export const loadUser = () => (dispatch, getState) => {
    dispatch({ type: USER_LOADING });

    axios.get('http://127.0.0.1:8000/redditclone/api/auth/user', tokenConfig(getState))
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

// LOGOUT USER
export const logout = () => (dispatch, getState) => {

    axios.post('http://127.0.0.1:8000/redditclone/api/auth/logout', null, tokenConfig(getState))
        .then(response => {
            dispatch({
                type: LOGOUT_SUCCESS
            });
        })
        .catch(error => {
            console.error("ERROR!: ", error);
        });
};

// REGISTER USER
export const register = ({username, password, email}) => (dispatch) => {

    // Headers
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    // Request body
    const body = JSON.stringify({ username, password, email });

    axios.post('http://127.0.0.1:8000/redditclone/api/auth/register/', body, config)
        .then(response => {
            dispatch({
                type: REGISTER_SUCCESS,
                payload: response.data
            });
        })
        .catch(error => {
            dispatch({
                type: REGISTER_FAIL,
                payload: error
            });
        });
};

// TOKEN CONFIG
export const tokenConfig = (getState) => {
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

    return config;
};

