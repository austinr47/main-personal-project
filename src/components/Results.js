import React, { Component } from 'react';
import Header from './Header';
import './css/Results.css';
import NotLoggedIn from './NotLoggedIn';
import axios from 'axios';
import { login } from '../ducks/reducer';
import { connect } from 'react-redux';

class Results extends Component {
    constructor() {
        super()
        this.state = {
            results: [],
        }
    }

    componentDidMount() {
        axios.get('/user-data/').then(response => {
            if (response.data.user) {
                this.props.login(response.data.user);
            }
        });
        axios.get(`/indi-results/${this.props.match.params.id}`).then(response => {
            console.log(response)
            this.setState({
                results: response.data
            })
        })       
    }

    render() {
        const { user } = this.props;
        console.log(this.state.results)
        return (
            
            <div className='results-main'>
            {user &&
                <div>
                    <Header />

                    <div className='results-title'>
                        <div className='results-to-account'>Account</div>
                        <div className='results-main-title'>Flash-Study Results</div>
                        <div className='results-try-again'>Train Again</div>
                    </div>

                    <div className='results-content'>
                        <div className='results-left'>
                            <div className='results-label'>
                                <div className='results-stats-1'>Right</div>
                                <div className='results-stats-2'>Description/Question</div>
                                <div className='results-stats-3'>Correct</div>
                                <div className='results-stats-4'>Answered</div>
                            </div>
                            <div className='results-stats'>
                                <div className='results-stats-1'>Right</div>
                                <div className='results-stats-2'>Description/Question</div>
                                <div className='results-stats-3'>Correct</div>
                                <div className='results-stats-4'>Answered</div>
                            </div>
                            <div className='results-stats'>
                                <div className='results-stats-1'>Right</div>
                                <div className='results-stats-2'>Description/Question</div>
                                <div className='results-stats-3'>Correct</div>
                                <div className='results-stats-4'>Answered</div>
                            </div>
                            <div className='results-stats'>
                                <div className='results-stats-1'>Right</div>
                                <div className='results-stats-2'>Description/Question</div>
                                <div className='results-stats-3'>Correct</div>
                                <div className='results-stats-4'>Answered</div>
                            </div>
                        </div>
                        
                        <div className='results-right'>
                            <div className='results-result'>Congrats!!!</div>
                            <div className='results-percent'>
                                <div>70%</div>
                                <div>Correct</div>
                            </div>
                        </div>
                    </div>
                </div>}
                {!user &&
                <NotLoggedIn />
                }
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    const { user, testId } = state;
    return {
        user,
        testId,
    };
};

const mapDispatchToProps = {
    login: login,


};

export default connect(mapStateToProps,  mapDispatchToProps )(Results);