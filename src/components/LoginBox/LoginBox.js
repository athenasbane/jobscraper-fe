import React, { Component } from 'react';

import Login from './Login/Login';
import Register from './Register/Register'

import classes from './LoginBox.module.css';

class LoginBox extends Component {

    state = {
        register: {
            username: '',
            password: '',
            passwordRepeat: ''
        },
        login: {
            username: '',
            password: ''
        },
        errBox: false,
        errMsg: '',
    }

    loginSubmitHandler = () => {
        const login = { ...this.state.login }
        const { username, password } = login
        if(username === '' || password === '') {
            this.setState({ errBox: true, errMsg: 'Please complete all the fields'})
            return 
        }
        this.props.loginUser(username, password)
    }

    loginChangeHandler = (event) => {
        const currentState = {...this.state}
        currentState.login[event.target.name] = event.target.value

        this.setState({ currentState })
    }

    registerSubmitHandler = () => {
        const register = { ...this.state.register }
        const { username, password, passwordRepeat } = register
        if(username === '' || password === '' || passwordRepeat === '') {
            this.setState({ errBox: true, errMsg: 'Please complete all the fields'})
            return 
        } else if (password !== passwordRepeat) {
            this.setState({ errBox: true, errMsg: 'Passwords do not match'})
            return
        }
        this.props.registerUser(username, password)

    }

    registerChangeHandler = (event) => {
        const currentState = {...this.state}
        currentState.register[event.target.name] = event.target.value

        this.setState({ currentState })
    } 

    dismissMsgHandler = () => {
        this.setState({ errBox: false, errMsg: '' })
    }

    render() {
        let loginMsg
        loginMsg = this.props.loginMsg !== [] ? (this.props.loginMsg.map((msg, index) => {
        return <div className={classes.LoginMsgBox} onClick={this.props.dismissServerMsg} key={index}><p>{msg}</p></div>})) : (null)
        let errMsg
        errMsg = this.state.errBox ? (<div className={classes.ErrMsgBox} onClick={this.dismissMsgHandler}><p>{this.state.errMsg}</p></div>) : (null)

        return (
            <div className={classes.LoginBox}>
                {loginMsg}
                {errMsg}
                {this.props.loginState === 0 ? (<Login 
                loginStateChanger={this.props.loginStateChanger}
                loginChange={this.loginChangeHandler}
                loginSubmit={this.loginSubmitHandler}
                login={this.state.login}
                e
                />) : 
                (<Register 
                loginStateChanger={this.props.loginStateChanger}
                registerChange={this.registerChangeHandler}
                registerSubmit={this.registerSubmitHandler}
                register={this.state.register}
                />)}
        </div>
        )
    }
    
    
};

export default LoginBox;