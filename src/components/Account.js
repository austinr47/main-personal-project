import React, { Component } from 'react';
import Header from './Header';
import './css/Account.css';
import axios from 'axios';
import { login } from '../ducks/reducer';
import { connect } from 'react-redux';
import NotLoggedIn from './NotLoggedIn';
import { Link } from 'react-router-dom';
import Chart from './Charts.1'

class Account extends Component {
    constructor(){
        super()
        this.state = {
            data: [],
        }
    }
    
    componentDidMount() {
        axios.get('/user-data/').then(response => {
            if (response.data.user) {
                this.props.login(response.data.user);
                // console.log(response.data.user)
            }
        });
        axios.get('/user-tests-results').then(response => {
            // console.log(response)
            this.setState({
                data: response.data
            })

        })
    }
    
    render() {
        const { user } = this.props;
        const result = this.state.data.map((item, index) => {
            console.log(item)
            const date = item.date
            const year = date.slice(0, 4)
            var month = () => {
                var mon = (date.slice(5, 7))
                if(mon = 1){
                    return 'Jan'
                } else if (mon = 2){
                    return 'Feb'
                } else if (mon = 3){
                    return 'Mar'
                } else if (mon = 4){
                    return 'Apr'
                } else if (mon = 5){
                    return 'May'
                } else if (mon = 6){
                    return 'Jun'
                } else if (mon = 7){
                    return 'July'
                } else if (mon = 8){
                    return 'Aug'
                } else if (mon = 9){
                    return 'Sept'
                } else if (mon = 10){
                    return 'Oct'
                } else if (mon = 11){
                    return 'Nov'
                } else 
                    return 'Dec'
            }
            const day = date.slice(8, 10)
            // console.log(date)
            const newDate = month() + ' ' + day + ', ' + year;
            return <div key={index}>
                        <Link className='account-link' to={`/previous-results/results/${item.indi_test}`}>
                            <div className='account-right-stats'>
                                <div className='account-subject'>{item.category}</div>
                                <div className='account-date'>{newDate}</div>
                                <div className='account-percent'>{item.percent}%</div>
                            </div>
                        </Link>
                    </div>
        })
        
        return (
            <div className='account-bck'>
            {user &&
                <div className='account-center'>
                    <Header />
                    <div className='account-margin'>
                        <div className='account-content'>
                            <div className='account-left-column'>
                                <Link type="button" className='css-button link account-left-text' to='/subjects'>
                                    <div className='center-text'>
                                        View/Create Subjects
                                    </div>
                                </Link>
                                {/* <Link className='link account-left-text' to='/create-cards'>
                                    Create Flashcards
                                </Link> */}
                                {/* <div className='account-left-text'>
                                    Edit Flashcards
                                </div> */}
                                <div>Subject Results</div>
                                <div>
                                    <Chart/>
                                </div>
                            </div>
                            <div className='account-right'>
                                <div className='account-right-label'>
                                    <div>Subject</div>
                                    <div>Date</div>
                                    <div>% Correct</div>
                                </div>
                                {result}
                            </div>
                        </div>
                    </div>
                </div>
            }
            {!user && 
            <NotLoggedIn />
            }
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    const { user } = state;
    return {
        user,
    };
};

const mapDispatchToProps = {
    login: login,


};

export default connect(mapStateToProps,  mapDispatchToProps )(Account);