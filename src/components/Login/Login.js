import React, { useState } from 'react';
import './login.css';

export const Login = () => {
    const [credentials, setCredentials] = useState({
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
        fetch("http://127.0.0.1:8000/redditclone/login/", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(credentials)
        })
            .then(data => console.log(data))
            .catch(error => console.error(error));
        setCredentials({
            username: '',
            password: '',
            password: ''
        });
    };

    return (
        <div className="login-form">
            <p>Login</p>

            <div className="form-info">
                <input placeholder="EMAIL" name="email" value={credentials.email} onChange={(e) => onChangeHandler(e)} />
                <input placeholder="PASSWORD" name="password" value={credentials.password} onChange={(e) => onChangeHandler(e)} />
                <button type="submit" onClick={(e) => submitHandler(e)}>Log In</button>
            </div>

            <p>No Account? <span>Sign Up.</span></p>
        </div>
    );
};
