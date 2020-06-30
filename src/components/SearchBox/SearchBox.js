import React from 'react';

import classes from './SearchBox.module.css';

import Spinner from '../../assets/spinner.svg'

const searchBox = (props) => (
    <div className={classes.SearchBox}>
            <label>
                Title Search:
                <input type="text" value={props.titleValue} onChange={props.titleChange}/>
            </label>
            <label className={classes.LocationSearch}>
                Location Search:
                <input type="text" value={props.locationValue} onChange={props.locationChange}/>
            </label>
            {!props.loading ? (<button onClick={props.searchSubmit}>Search</button>) : (
            <div className={classes.LoadingSpinner}>
                <object type="image/svg+xml" data={Spinner}>Spinner</object>
            </div>)}
    </div>
)

export default searchBox;