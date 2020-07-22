import React, { Component } from 'react';
import axios from 'axios';


import BackDrop from '../hoc/BackDrop/BackDrop';
import NavBar from '../components/NavBar/NavBar';

import classes from './Board.module.css';
import PageSelector from '../components/PageSelector/PageSelector';


class Board extends Component {

    state = {
        jobs: [],
        page: 3,
        backDrop: false,
        searchTitle: 'Recruitment',
        searchLocation: 'Leeds',
        loading: false,
        loggedin: false,
        loginMsg: [],
        loginState: 0,
        user: {},
        userJobs: [],
        emptyMsg: "There's Nothing Here! Please run a search or change your search terms",
        menuToggle: false,
        menuClass: classes.navButtonsBox
    
    }

    loginUserHandler = (username, password) => {
        axios.post('https://jobscraperapi.herokuapp.com/users/login', {
            username: username,
            password: password
        }).then((response, error) => {
            
            this.setState({ user: response.data, loggedin: true, page: 3 })
            console.log(this.state.user)
        }).catch(err => {
            let loginMsg = this.state.loginMsg
            loginMsg.push('Username or password not recognised, please try again')
            this.setState({loginMsg})
        })
    }

    registerUserHandler = (username, password) => {
        axios.post('https://jobscraperapi.herokuapp.com/users', {
            username: username,
            password: password
        }).then((response) => {
            this.setState({ user: response.data, loginState: 0 })
            console.log(this.state.user)
            
        }).catch(error => {
            console.log(error)
        })
    }

    locationChangeHandler = (event) => {
        let currentValue = event.target.value
        this.setState({searchLocation: currentValue}) 
    }

    titleChangeHandler = (event) => {
        let currentValue = event.target.value
        this.setState({searchTitle: currentValue}) 
    }

    searchSubmitHandler = (event) => {
        this.setState({loading: true})
        axios.post('https://jobscraperapi.herokuapp.com/jobs',{
            title: this.state.searchTitle,
            location: this.state.searchLocation
        }).then((res, err) => {
            
            this.setState({jobs: res.data, page: 0, loading: false})
        
        }).catch(e => {
            console.log(e)
        })
    }

    searchBtnHandler = () => {
        this.setState({ page: 3,
            menuToggle: false,
            menuClass: classes.navButtonsBox
        })
    }

    dismissJobHandler = (index) => {

        if(!this.state.loggedin) {
            let loginMsg = this.state.loginMsg
            loginMsg.push('Please Login to do that')
            this.setState({ page: 5, loginMsg })
            return
        }

        let token = this.state.user.token

        const config = {
            headers: { Authorization: `Bearer ${token}` }
        };

        const bodyParameters = {
            dismissed: true
        };
        
        const currentState = [ ...this.state.userJobs ]
        currentState[index]['dismissed'] = true
        
        axios.patch( 
          `https://jobscraperapi.herokuapp.com/jobs/${currentState[index]['_id']}`,
          bodyParameters,
          config
        ).then(response => {
            console.log(response)

            this.setState({ currentState })
        })
    }

    dismissServerMsgHandler = () => {
        this.setState({ loginMsg: [] })
    }


    appliedJobHandler = (index) => {


        if(!this.state.loggedin) {
            let loginMsg = this.state.loginMsg
            loginMsg.push('Please Login to do that')
            this.setState({ page: 5, loginMsg })
            return
        }

        let token = this.state.user.token

        const config = {
            headers: { Authorization: `Bearer ${token}` }
        };

        const bodyParameters = {
            applied: true
        };
        
        const currentState = [ ...this.state.userJobs ]
        currentState[index]['applied'] = true
        
        axios.patch( 
          `https://jobscraperapi.herokuapp.com/jobs/${currentState[index]['_id']}`,
          bodyParameters,
          config
        ).then(response => {
            console.log(response)

            this.setState({ currentState })
        })
    }

    appliedBtnHandler = () => {

        if(!this.state.loggedin) {
            let loginMsg = this.state.loginMsg
            loginMsg.push('Please login to track jobs you have applied for')
            this.setState({ page: 5, 
                            loginMsg,
                            menuToggle: false,
                            menuClass: classes.navButtonsBox })
            return
        }

        let token = this.state.user.token


        const config = {
            headers: { Authorization: `Bearer ${token}` }
        };
        
        
        axios.get( 
          'https://jobscraperapi.herokuapp.com/users/jobs',
          config
        ).then(response => {
            if(response.data.length === 0) {
                this.setState({emptyMsg: "You haven't applied for any jobs yet!"})
            }
            const jobUpdate = response.data.map(job => {
                return {...job, timesPressed: 0}
            })
            this.setState({ userJobs: jobUpdate, 
                page: 7 })

        })
    }

    activeBtnHandler = () => {
        this.setState({ page: 0,
                        menuToggle: false,
                        menuClass: classes.navButtonsBox
        })
    }

    savedBtnHandler = () => {

        if(!this.state.loggedin) {
            let loginMsg = this.state.loginMsg
            loginMsg.push('Please Login to do that')
            this.setState({ page: 5, 
                            loginMsg,
                            menuToggle: false,
                            menuClass: classes.navButtonsBox
                        })
            return
        }

        let token = this.state.user.token


        const config = {
            headers: { Authorization: `Bearer ${token}` }
        };
        
        
        axios.get( 
          'https://jobscraperapi.herokuapp.com/users/jobs',
          config
        ).then(response => {
            if(response.data.length === 0) {
                this.setState({emptyMsg: "You haven't saved any jobs yet!"})
            }
            const jobUpdate = response.data.map(job => {
                return {...job, timesPressed: 0}
            })
            this.setState({ userJobs: jobUpdate, page: 6 })

        })
        
    }
    

    aboutBtnHandler = () => {
        this.setState({ page: 4,
            menuToggle: false,
            menuClass: classes.navButtonsBox })
    }
    
    loginBtnHandler = () => {
        this.setState({ page: 5,
            menuToggle: false,
            menuClass: classes.navButtonsBox })
    }

    dismissClickHandler = (index) => {
        if (this.state.userJobs[index].timesPressed === 0) {
            const currentState = [ ...this.state.userJobs ]
            currentState[index]['timesPressed'] = 1
            this.setState({ currentState, backDrop: true })
        } else {

            this.dismissJobHandler(index)
            this.setState({ backDrop: false })
        } 
    }

    saveClickHandler = (index) => {

        if(!this.state.loggedin) {
            let loginMsg = this.state.loginMsg
            loginMsg.push('Please Login to do that')
            this.setState({ page: 5, loginMsg })
            return
        }

        let token = this.state.user.token


        const config = {
            headers: { Authorization: `Bearer ${token}` }
        };
        
        const bodyParameters = {
           ...this.state.jobs[index]
        };
        
        axios.post( 
          'https://jobscraperapi.herokuapp.com/jobs/save',
          bodyParameters,
          config
        ).then(response => {
            console.log(response)
        })
        
    }

    loginStateChangeHandler = (stateNum) => {
        console.log(stateNum)
        this.setState({loginState: stateNum })
    }

    clearCountHandler = () => {
        const currentState = [ ...this.state.userJobs]
        const newState = currentState.map(job => (
            job.timesPressed = 0
        ))

        this.setState({ newState, backDrop: false })
    }

    menuToggleHandler = () => {
        
        this.setState({menuToggle: !this.state.menuToggle})
        if(this.state.menuToggle) {
            this.setState({
                        menuClass: classes.menuOpen
                            })
        } else {
            this.setState({menuClass: classes.navButtonsBox})
        }
    }
    
    render() {    
        const isMobile = window.innerWidth < 480;
        let nav = (<NavBar 
            searchBtnHandler={this.searchBtnHandler}
            aboutBtnHandler={this.aboutBtnHandler}
            activeBtnHandler={this.activeBtnHandler}
            savedBtnHandler={this.savedBtnHandler}
            appliedBtnHandler={this.appliedBtnHandler}
            loginBtnHandler={this.loginBtnHandler}
        />)
        if (isMobile) {
            nav = (
            <div >
                <div className={classes.navItem}>
                    <h1>Beedge Job Search Helper</h1>
                    <button className={classes.menuToggleBtn} 
                    onClick={this.menuToggleHandler}>Menu</button>
                </div>  
                <div className={this.state.menuClass}>
                    <button 
                        className={classes.appliedJobsBtn} 
                        onClick={this.searchBtnHandler}>Search</button>
                    <button 
                        className={classes.pulse} 
                        onClick={this.aboutBtnHandler}>How to Use</button>
                    <button 
                        className={classes.appliedJobsBtn} 
                        onClick={this.activeBtnHandler} >Today's Jobs</button>
                    <button 
                        className={classes.appliedJobsBtn} 
                        onClick={this.savedBtnHandler}>Saved</button>
                    <button 
                        className={classes.appliedJobsBtn} 
                        onClick={this.appliedBtnHandler}>Applied</button>
                    <button 
                        className={classes.appliedJobsBtn}
                        onClick={this.loginBtnHandler} 
                        >Login</button>
                    <BackDrop clearCount={this.menuToggleHandler} />
                </div>
            </div>)
        }

        return (
            <div className={classes.Board} >
                {this.state.backDrop ? (<BackDrop
                                           clearCount={this.clearCountHandler} 
                                            />) : null}
                <header>
                    {nav}
                </header>
        
                <div className={classes.boxWithShadow} onClick={this.clearHandler}>
                    <PageSelector 
                    page={this.state.page} 
                    state={this.state} 
                    titleChange={this.titleChangeHandler} 
                    locationChange={this.locationChangeHandler} 
                    searchSubmit={this.searchSubmitHandler}

                    dismissClick={this.dismissClickHandler} 
                    dismiss={this.dismissJobHandler}
                    appliedClick={this.appliedJobHandler}
                    saveClick={this.saveClickHandler}

                    loginState={this.state.loginState}
                    loginStateChanger={this.loginStateChangeHandler}
                    loginMsg={this.state.loginMsg}
                    dismissServerMsg={this.dismissServerMsgHandler}

                    registerUser={this.registerUserHandler}
                    loginUser={this.loginUserHandler}
                    
                    />          
                </div>

            </div>
        )
    }


};

export default Board;