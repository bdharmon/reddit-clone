import React, { useState } from 'react';
import './login.css';
import { Link, Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../redux/actions/auth';

export const Login = () => {
    const [credentials, setCredentials] = useState({
        username: '',
        password: ''
    });
    const { isAuthenticated } = useSelector(state => state.authReducer)
    const dispatch = useDispatch();

    const onChangeHandler = (e) => {
        const credentialsCopy = { ...credentials };
        credentialsCopy[e.target.name] = e.target.value;
        setCredentials(credentialsCopy);
    };

    const submitHandler = () => {
        dispatch(login(credentials.username, credentials.password));
    };

    const authTest = () => {
        if (isAuthenticated) {
            return <Redirect to="/" />;
        }
        else {
            return (
                <div className="login-form">
                    <p>Login</p>

                    <div className="form-info">
                        <input placeholder="USERNAME" name="username" value={credentials.email} onChange={(e) => onChangeHandler(e)} />
                        <input placeholder="PASSWORD" name="password" value={credentials.password} onChange={(e) => onChangeHandler(e)} />
                        <button type="submit" onClick={() => submitHandler()}>Log In</button>
                    </div>

                    <p>No Account? <Link to="/register"><span>Sign Up.</span></Link></p>
                </div>
            );
        }
    };

    return (
        authTest()
    );
};
