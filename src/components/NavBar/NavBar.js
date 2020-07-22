import React from 'react';

import classes from './NavBar.module.css';

const navBar = (props) => (
    <nav className={classes.NavBar}>
        <div className={classes.container}>
            <div className={classes.navItem}>
                <h1>Beedge Job Search Helper</h1>
            </div>
            <div className={classes.navButtonsBox}>
                <button 
                    className={classes.appliedJobsBtn} 
                    onClick={props.searchBtnHandler}>Search</button>
                <button 
                    className={classes.pulse} 
                    onClick={props.aboutBtnHandler}>How to Use</button>
                <button 
                    className={classes.appliedJobsBtn} 
                    onClick={props.activeBtnHandler} >Today's Jobs</button>
                <button 
                    className={classes.appliedJobsBtn} 
                    onClick={props.savedBtnHandler}>Saved</button>
                <button 
                    className={classes.appliedJobsBtn} 
                    onClick={props.appliedBtnHandler}>Applied</button>
                <button 
                    className={classes.appliedJobsBtn}
                    onClick={props.loginBtnHandler} 
                    >Login</button>
            </div>
        </div>
    </nav>
)

export default navBar;