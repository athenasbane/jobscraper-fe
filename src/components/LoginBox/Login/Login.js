import React from 'react';

import classes from './Login.module.css';

const login = (props) => (
    <div className={classes.Login}>
        <h3>Login</h3>
        <label>Username
            <input onChange={(e) => props.loginChange(e)} name="username" value={props.login['username']} />
            </label>
        <label>
            Password
            <input type="password" onChange={(e) => props.loginChange(e)} name="password" value={props.login['password']}/>
        </label>
        <button onClick={props.loginSubmit}>Login</button>
        <button className={classes.ButtonBottom} onClick={() => props.loginStateChanger(1)}>or click here to register...</button>
    </div>
);

export default login;