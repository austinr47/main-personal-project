import React, { Component } from 'react';
import Header from './Header';
import './css/Results.css';
import NotLoggedIn from './NotLoggedIn';
import axios from 'axios';
import { login } from '../ducks/reducer';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

///////need to check timestamp

class Results extends Component {
    constructor() {
        super()
        this.state = {
            results: [],
            score: [],

            category: '',
            percent: '',
        }
        // this.addResults=this.addResults.bind(this)
    }

    componentDidMount() {
        axios.get('/user-data/').then(response => {
            if (response.data.user) {
                this.props.login(response.data.user);
            }
        });
        axios.get(`/indi-results/${this.props.match.params.id}`).then(response => {
            // console.log(response)
            this.setState({
                results: response.data,
                category: response.data[0].category
            })
            response.data.map((item, i) => {
                const myanswer = item.my_answer;
                const coranswer = item.correct_answer;
                const outcomePercent = () => myanswer.toLowerCase() === coranswer.toLowerCase() ? 100 : 0;

                return this.setState({
                    score: [...this.state.score,  outcomePercent()],
                })
            }
        )} ).then (() => {
            const score = this.state.score
            const percent1 = score.reduce(( acc, cur ) => acc + cur, 0) / score.length
            // console.log(percent1)
            this.setState({
                percent: percent1
            })
        })
        .then (() => {
            // console.log(this.state.category, this.state.percent, this.props.match.params.id)
            axios.post(`/general-account-results/${this.props.match.params.id}`, { category: `${this.state.category}`, percent: `${this.state.percent}` } ).then(response => {
                // console.log(response)
            })
        })
    }

    // addResults() {
    //         // console.log(this.state.category, this.state.percent, this.props.match.params.id)
    //         axios.post(`/general-account-results/${this.props.match.params.id}`, { category: `${this.state.category}`, percent: `${this.state.percent}` } ).then(response => {
    //             console.log(response)
    //         })
    // }

    render() {
        const { user } = this.props;
        const result = this.state.results.map((item, i) => {
                const myanswer = item.my_answer;
                const coranswer = item.correct_answer;
                const outcome = () => myanswer.toLowerCase() === coranswer.toLowerCase() ? 'right' : 'wrong';
            return <div key={item.result_id}>
                <div className='results-stats'>
                    <div className='results-stats-1'>{outcome()}</div>
                    <div className='results-stats-2'>{item.question}</div>
                    <div className='results-stats-3'>{item.correct_answer}</div>
                    <div className='results-stats-4'>{item.my_answer}</div>
                </div>
            </div>
        })

        return (
            
            <div className='results-main'>
            {user &&
                <div className='results-main-2'>
                    <Header />
                    <div className='results-main-3'>
                        <div className='results-title'>
                            <Link to='/account' className=''><div /*onClick={this.addResults}*/ className='results-to-account'>Go To Account</div></Link>
                            <div className='results-main-title'>Flash-Study Results</div>
                            <div className='results-try-again'>Train Again</div>
                        </div>

                        <div className='results-content'>
                            <div className='results-right'>
                                <div className='results-result'>
                                    {this.state.percent > 80 ? <div>Congrats!!!</div> : <div>More practice!</div>}
                                </div>
                                <div className='results-percent'>
                                    <div>{this.state.percent}%</div>
                                    <div>Correct</div>
                                </div>
                            </div>
                            
                            <div className='results-left'>
                                <div className='results-label'>
                                    <div className='results-stats-1'>Right</div>
                                    <div className='results-stats-2'>Description/Question</div>
                                    <div className='results-stats-3'>Correct</div>
                                    <div className='results-stats-4'>Answered</div>
                                </div>
                                {result}
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