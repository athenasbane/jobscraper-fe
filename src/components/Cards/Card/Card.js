import React from 'react';

import ConfirmButton from '../../ConfirmButton/ConfirmButton'

import classes from './Card.module.css';

const card = (props) => (
    <div className={classes.Card}>
        <a href={props.job.link} target="_blank" rel="noopener noreferrer">
        <h2>{props.job.title}</h2>
        <h2>{props.job.company}</h2>
        <h3>{props.job.location}</h3>
        </a>
        <div className={classes.buttonBox}>
            <button 
                className={props.job.applied ? classes.appliedBtnActive : classes.appliedBtn} 
                onClick={() => props.appliedClick(props.index)}>Applied</button>
            {/* create a second click to dismiss */}
            {props.status >= 6 ? (
                <ConfirmButton 
                job={props.job}
                btnConfirm={props.btnConfirm}
                dismissClick={props.dismissClick}
                index={props.index}/>
            ) : ( <button className={classes.dismissBtn} onClick={() => props.saveClick(props.index)}>Save</button> )}
            
            {/*  */}
            {/* <button className={classes.dismissBtn} 
            onClick={() => props.dismiss(props.index)}
            >Dismiss</button> */}
        </div>
        
    </div>
);

export default card;