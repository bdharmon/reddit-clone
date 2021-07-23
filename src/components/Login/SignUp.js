import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './login.css';

export const SignUp = () => {
    const [credentials, setCredentials] = useState({
        email: '',
        username: '',
        password: '',
        password2: ''
    });

    const onChangeHandler = (e) => {
        const credentialsCopy = { ...credentials };
        credentialsCopy[e.target.name] = e.target.value;
        setCredentials(credentialsCopy);
    };

    const submitHandler = (e) => {
        e.preventDefault();
        fetch("http://127.0.0.1:8000/redditclone/register/", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(credentials)
        })
            .then(data => console.log(data))
            .catch(error => console.error(error));
        setCredentials({
            email: '',
            username: '',
            password: '',
            password2: ''
        });
    };

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
};
