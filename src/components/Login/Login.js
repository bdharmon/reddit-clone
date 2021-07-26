import React, { useState } from 'react';
import './login.css';
import { Link, Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../redux/actions/auth';
import rLogo from '../../images/_eddit Clone-orange.png';

export const Login = () => {
    const [credentials, setCredentials] = useState({
        username: '',
        password: ''
    });
    const { isAuthenticated } = useSelector(state => state.authReducer)
    const dispatch = useDispatch();

    const onChangeHandler = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
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

                    <img className="login-img" src={rLogo} alt="" />

                    <div className="form-info">
                        <div className="username-div">
                            <i className="fas fa-user"></i>
                            <input placeholder="Username" name="username" value={credentials.username} onChange={(e) => onChangeHandler(e)} />
                        </div>

                        <div className="password-div">
                            <i className="fas fa-lock"></i>
                            <input placeholder="Password" name="password" value={credentials.password} onChange={(e) => onChangeHandler(e)} />
                        </div>

                        <button type="submit" onClick={() => submitHandler()}>Log In</button>
                    </div>

                    <p>No Account? <Link to="/register"><span>Sign Up.</span></Link></p>

                    <div className="or-container">
                        <div></div>
                        <p>Or</p>
                        <div></div>
                    </div>

                    <div className="o-auth">
                        <div><i className="fab fa-facebook-f fa-2x" style={{ color: "#4267B2" }}></i></div>
                        <div><i className="fab fa-twitter fa-2x" style={{ color: "#1DA1F2" }}></i></div>
                        <div><i className="fab fa-google fa-2x" style={{ color: "#DB4437" }}></i></div>
                    </div>

                </div>
            );
        }
    };

    return (
        authTest()
    );
};
