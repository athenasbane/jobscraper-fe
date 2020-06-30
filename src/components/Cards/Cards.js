import React from 'react';

import Card from './Card/Card';

import classes from './Cards.module.css';

const cards = (props) => {
    let jobCards = []

    if(props.status === 6 || props.status === 7) {
        jobCards = props.userJobs.map((job, index) => {
            const condition = [!job.dismissed, job.applied && !job.dismissed]
            return condition[props.status - 6] ? (<Card
                                key={job._id || job.link}
                                dismissClick={props.dismissClick}
                                status={props.status}
                                appliedClick={props.appliedClick}
                                index={index}
                                job={job}
                                />) : null
        })
    } else {
        jobCards = props.jobs.map((job, index) => {
            const condition = [!job.dismissed, job.applied && !job.dismissed]
            return condition[props.status] ? (<Card
                                key={job._id || job.link}
                                dismissClick={props.dismissClick}
                                status={props.status}
                                saveClick={props.saveClick} 
                                appliedClick={props.appliedClick}
                                index={index}
                                job={job}
                                />) : null
        })
    }

    return (
        <div className={classes.Cards}>
            {jobCards.length === 0 ? <div><h2>{props.emptyMsg}</h2></div> : null}
            {jobCards}
        </div>
    )
}

export default cards