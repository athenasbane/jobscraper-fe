import React from 'react';
import classes from './Register.module.css';


const register = (props) => (
    <div className={classes.Register}>
        <h3>Create an Account</h3>
        <label>
            Username:
            <input onChange={(e) => props.registerChange(e)} name="username" value={props.register['username']}/>
        </label>
        <label>
            Password:
            <input onChange={(e) => props.registerChange(e)} name="password" value={props.register['password']}/>
        </label>
        <label>
            Password Repeat:
            <input onChange={(e) => props.registerChange(e)} name="passwordRepeat" value={props.register['passwordRepeat']}/>
        </label>
        <button onClick={props.registerSubmit}>Register</button>
        <button className={classes.BottomButton} onClick={() => props.loginStateChanger(0)}>Login?</button>
    </div>
);

export default register;