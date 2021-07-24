import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import './login.css';
import { useDispatch, useSelector } from 'react-redux';
import { register } from '../../redux/actions/auth';

export const SignUp = () => {
    const { isAuthenticated } = useSelector(state => state.authReducer);
    const [credentials, setCredentials] = useState({
        email: '',
        username: '',
        password: '',
        password2: ''
    });

    const dispatch = useDispatch();

    const onChangeHandler = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    };

    const submitHandler = () => {
        const { username, password, email } = credentials;
        if (credentials.password !== credentials.password2) {
            console.log("Passwords do not match.");
            setCredentials({
                email: '',
                username: '',
                password: '',
                password2: ''
            });
            return;
        }
        else {
            dispatch(register({ username, password, email }));
        }
    };

    const authTest = () => {
        if (isAuthenticated) {
            return <Redirect to="/" />;
        }
        else {
            return (
                <div className="login-form">
                    <p>Sign Up</p>

                    <div className="form-info">
                        <input name="email" placeholder="EMAIL" value={credentials.email} onChange={(e) => onChangeHandler(e)} />
                        <input name="username" placeholder="USERNAME" value={credentials.username} onChange={(e) => onChangeHandler(e)} />
                        <input name="password" placeholder="PASSWORD" value={credentials.password} onChange={(e) => onChangeHandler(e)} />
                        <input name="password2" placeholder="CONFIRM PASSWORD" value={credentials.password2} onChange={(e) => onChangeHandler(e)} />
                        <button type="submit" onClick={(e) => submitHandler(e)}>Sign Up</button>
                    </div>

                    <p>Already have an account? <Link to="/login"><span>Log In.</span></Link></p>
                </div>
            );
        }
    };

    return (
        authTest()
    );
};
