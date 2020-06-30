import React from 'react';

import Cards from '../Cards/Cards'
import SearchBox from '../SearchBox/SearchBox'
import About from '../About/About'
import LoginBox from '../LoginBox/LoginBox'


import Aux from '../../hoc/Aux'

const pageSelector = (props) => {
    let page
    if(props.page === 3) {
        page=(<SearchBox titleValue={props.state.searchTitle}
            loading={props.state.loading}
            locationValue={props.state.searchLocation} 
            titleChange={props.titleChange} 
            locationChange={props.locationChange} 
            searchSubmit={props.searchSubmit}
            />)
    }  else if (props.page <= 1 || props.page === 6 || props.page === 7) {
        page = (<Cards
            dismissClick={props.dismissClick} 
            dismiss={props.dismiss}
            appliedClick={props.appliedClick}
            userJobs={props.state.userJobs}
            jobs={props.state.jobs}
            saveClick={props.saveClick}
            status={props.state.page}
            emptyMsg={props.state.emptyMsg}
            loggedin={props.state.loggedin}
            />)
    } else if (props.page === 4) {
        page = (<About />)
    } else if (props.page === 5) {
        page = (<LoginBox 
            loginMsg={props.loginMsg}
            loginStateChanger={props.loginStateChanger} 
            loginState={props.loginState}
            registerUser={props.registerUser}
            loginUser={props.loginUser}
            dismissServerMsg={props.dismissServerMsg}
            />)
    } else {
        page = (<SearchBox 
            titleValue={props.state.searchTitle}
            loading={props.state.loading}
            locationValue={props.state.searchLocation} 
            titleChange={props.titleChange} 
            locationChange={props.locationChange} 
            searchSubmit={props.searchSubmit} />)
    }

    return (
        <Aux>
            {page}
        </Aux>
    )
}

export default pageSelector