import React from 'react';

import Card from './Card/Card';

import classes from './Cards.module.css';

const cards = (props) => {

    

    const jobCards = props.jobs.map((job, index) => {
        const condition = [!job.dismissed, job.applied && !job.dismissed]
        return condition[props.status] ? (<Card
                            key={job._id}
                            dismiss={props.dismiss} 
                            appliedClick={props.appliedClick}
                            index={index}
                            job={job}
                            />) : null
    })

    return (
        <div className={classes.Cards}>
            {jobCards}
        </div>
    )
}

export default cards