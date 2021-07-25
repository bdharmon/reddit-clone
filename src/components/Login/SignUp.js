import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import './login.css';
import { useDispatch, useSelector } from 'react-redux';
import { register } from '../../redux/actions/auth';
import rLogo from '../../images/_eddit Clone-orange.png';

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

                    <img className="login-img" src={rLogo} alt="" />

                    <div className="form-info">
                        <div className="username-div">
                            <i class="fas fa-envelope"></i>
                            <input placeholder="Email" name="email" value={credentials.email} onChange={(e) => onChangeHandler(e)} />
                        </div>

                        <div className="username-div">
                            <i class="fas fa-user"></i>
                            <input placeholder="Username" name="username" value={credentials.username} onChange={(e) => onChangeHandler(e)} />
                        </div>

                        <div className="password-div">
                            <i className="fas fa-lock"></i>
                            <input placeholder="Password" name="password" value={credentials.password} onChange={(e) => onChangeHandler(e)} />
                        </div>

                        <div className="password-div">
                            <i className="fas fa-lock"></i>
                            <input placeholder="Confirm Password" name="password2" value={credentials.password2} onChange={(e) => onChangeHandler(e)} />
                        </div>

                        <button type="submit" onClick={() => submitHandler()}>Sign Up</button>
                    </div>

                    <p>Already have an account? <Link to="/login"><span>Log In.</span></Link></p>

                    <div className="or-container">
                        <div></div>
                        <p>Or</p>
                        <div></div>
                    </div>

                    <div className="o-auth">
                        <div><i class="fab fa-facebook-f fa-2x" style={{color: "#4267B2"}}></i></div>
                        <div><i class="fab fa-twitter fa-2x" style={{color: "#1DA1F2"}}></i></div>
                        <div><i class="fab fa-google fa-2x" style={{color: "#DB4437"}}></i></div>
                    </div>

                </div>
            );
        }
    };

    return (
        authTest()
    );
};
