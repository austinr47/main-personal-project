import React, { Component } from 'react';
import Header from './Header';
import './css/Results.css';
import NotLoggedIn from './NotLoggedIn';
import axios from 'axios';
import { login } from '../ducks/reducer';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';


class Results extends Component {
    constructor() {
        super()
        this.state = {
            results: [],
            score: [],

            category: '',
            percent: '',
        }
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
            const percent1 = Math.round((score.reduce(( acc, cur ) => acc + cur, 0) / score.length)*1)/1
            // console.log(percent1)
            this.setState({
                percent: percent1
            })
        }).then (() => {
        //    console.log(this.state.category, this.state.percent, this.props.match.params.id)
                axios.post(`/general-account-results/${this.props.match.params.id}`, { category: `${this.state.category}`, percent: `${this.state.percent}` } ).then(response => {
            //    console.log(response)
            })
        })
    }

    render() {
        const { user } = this.props;
        const right = <img className='result-right' src='https://cdn0.iconfinder.com/data/icons/hamburg/32/check.png' alt='right'/>
        const wrong = <img className='result-wrong' src='https://upload.wikimedia.org/wikipedia/commons/a/a2/X_mark.svg' alt='wrong'/>
        const right1 = <img className='result-right1' src='https://cdn0.iconfinder.com/data/icons/hamburg/32/check.png' alt='right'/>
        const wrong1 = <img className='result-wrong1' src='https://upload.wikimedia.org/wikipedia/commons/a/a2/X_mark.svg' alt='wrong'/>
        const result = this.state.results.map((item, i) => {
                const myanswer = item.my_answer;
                const coranswer = item.correct_answer;
                const outcome = () => myanswer.toLowerCase() === coranswer.toLowerCase() ? right : wrong;
            return <div key={item.result_id}>
                <div className={outcome() === right ? 'results-stats-right' : 'results-stats-wrong'}>
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
                                <Link to='/account' className='result-link'>
                                    <div className='results-to-account'>Go To Account</div>
                                </Link>
                                <div className='results-main-title'>Test Results</div>
                                <Link to={`/tests/${this.state.category}`} className='result-link'>
                                    <div className='results-try-again'>Test Again</div>
                                </Link>
                            </div>

                            <div className='results-content'>
                                <div className='results-right'>
                                    <div className='results-percent'>
                                        <div>{this.state.percent}%</div>
                                        <div>Correct</div>
                                    </div>
                                    <div className='results-result'>
{this.state.percent === 100 ? <div>Perfection!</div> : (this.state.percent > 89 ? <div>Congrats!</div> : (this.state.percent > 79 ? <div>Getting there!</div> : (this.state.percent > 69 ? <div>Keep on studying!</div> : (this.state.percent > 49 ? <div>Study study study!</div> : (this.state.percent > 19 ? <div>Tray again!</div> : <div>Well that...sucks</div>)))))}
                                    </div>
                                </div>
                                
                                <div className='results-left'>
                                    <div className='results-label'>
                                        <div className='results-stats-1'>{right1}/{wrong1}</div>
                                        <div className='results-stats-2'>Description/Question</div>
                                        <div className='results-stats-3'>Correct</div>
                                        <div className='results-stats-4'>Answered</div>
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