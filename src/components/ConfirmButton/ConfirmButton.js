import React from 'react';
import classes from './ConfirmButton.module.css';

const confirmButton = (props) => {
    let classVar = props.job.timesPressed <= 0 ? classes.ConfirmButton : classes.ConfirmButtonActive  
    const content = ['Dismiss', 'Confirm Dismiss?']
    return (<button className={classVar} 
        onClick={() => props.dismissClick(props.index)}>{content[props.job.timesPressed]}</button>)
};

export default confirmButton;