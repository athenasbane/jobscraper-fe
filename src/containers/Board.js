import React, { Component } from 'react';
import axios from 'axios';

// import JobCards from '../components/JobCards/JobCards'

import Cards from '../components/Cards/Cards'

import classes from './Board.module.css';


class Board extends Component {

    state = {
        jobs: [],
        page: 0

    }

    

    dismissJobHandler = (index) => {

        const currentState = [ ...this.state.jobs ]
        currentState[index]['dismissed'] = true
        
        this.setState({ currentState })

        axios.patch(`https://jobscraperapi.herokuapp.com/jobs/${currentState[index]['_id']}`, {

            dismissed: true

        }).then(res => {
                console.log(res)
            })
    }


    appliedJobHandler = (index) => {

        const currentState = [ ...this.state.jobs ]
        currentState[index]['applied'] = true
        
        this.setState({ currentState })

        axios.patch(`https://jobscraperapi.herokuapp.com/jobs/${currentState[index]['_id']}`, {

            applied: true

        }).then(res => {
                console.log(res)
            })
    }

    appliedBtnHandler = () => {
        this.setState({ page: 1 })
    }

    activeBtnHandler= () => {
        this.setState({ page: 0})
    }


    componentDidMount() {
        axios.get('https://jobscraperapi.herokuapp.com/jobs')
        .then(res => {
           this.setState({ jobs: res.data })
           
            })
            
        }

    render() {
        return (
            <div className={classes.Board} >
                <header>
                    <nav>
                        <div className={classes.container}>
                            <div className={classes.navItem}>
                                <h1>Beedge Job Search Helper</h1>
                            </div>
                            <div className={classes.navButtonsBox}>
                                <button className={classes.pulse} onClick={this.activeBtnHandler} >Today's Jobs</button>
                                <button className={classes.appliedJobsBtn} onClick={this.appliedBtnHandler} >Applied</button>
                            </div>
                        </div>
                    </nav>
                </header>
        
                <div className={classes.boxWithShadow}>
                    <Cards
                    jobs={this.state.jobs} 
                    dismiss={this.dismissJobHandler}
                    appliedClick={this.appliedJobHandler}
                    status={this.state.page}
                    />
                </div>
                <footer>
                    <h3>Made by Athena's Bane</h3>
                </footer>
            </div>
        )
    }


};

export default Board;