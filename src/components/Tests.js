import React, { Component } from 'react';
import Header from './Header';
import './css/Tests.css';
import NotLoggedIn from './NotLoggedIn';
import axios from 'axios';
import { login, testId } from '../ducks/reducer';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class Tests extends Component {
    constructor() {
        super()
        this.state = {
            count: 0,
            questions: [],
            
            myAnswer: '',
            correctAnser: '',
            question: [],
            testId: '',
            category: '',
            indiTest: '',
        }

        this.renderQuestion = this.renderQuestion.bind(this);
        this.answer = this.answer.bind(this);
    }

    componentDidMount() {
        axios.get('/user-data/').then(response => {
            if (response.data.user) {
                this.props.login(response.data.user);
            }
        });
        axios.get(`/questions/${this.props.match.params.category}`).then(response => {
            const result = response.data.map(a => a.question)
            const answer = response.data.map(a => a.answer)
            this.setState({
                question: result[this.state.count],
                questions: response.data,
                testId: response.data[0].test_id,
                category: response.data[0].category,
                correctAnswer: answer[this.state.count],
            })
        });
        axios.post(`/indi-test/${this.props.match.params.category}`).then(response => {
            this.setState({
                indiTest: response.data[0].indi_test
            })
        });
    }

    renderQuestion() {
        axios.post('/results-indi-test', { my_answer: `${this.state.myAnswer}`, correct_answer: `${this.state.correctAnswer}`, question: `${this.state.question}`,  test_id: `${this.state.testId}`, category: `${this.state.category}`, result_table_id: `${this.state.indiTest}` }).then(response => {
            this.props.testId(this.state.indiTest);
        })
        const result = this.state.questions.map(a => a.question)
        const answer = this.state.questions.map(a => a.answer)
        this.setState({
            question: result[this.state.count + 1],
            correctAnswer: answer[this.state.count + 1],
            count: this.state.count + 1
        });
    }

    answer(answer) {
        this.setState({
            myAnswer: answer
        })
    }

    render() {
        const { user, myTestId } = this.props;
        const { question } = this.state;
        // console.log( myTestId )
        return (
            <div className='train-main-01'>
                {user && 
                    <div className='train-main-02'>
                    <Header />
                        {question &&
                        <div className='train-content'>
                            <div className='train-question'>
                                {this.state.question}
                            </div>
                            <div className='train-input'>
                                <input onFocus={(e) => e.target.select()} className='train-input-box' onChange={event => this.answer(event.target.value)}placeholder='Enter Answer Here'/>
                            </div>
                            <button onClick={this.renderQuestion} className='train-button'>next question</button>
                        </div>
                        }
                        {!question &&
                        <div className='train-content'>
                            <div className='train-question'>
                            Done!
                            </div>
                            <Link to={`/test-results/${myTestId}`} className='link'><button className='train-button'>Get Results</button></Link>
                        </div>
                        }
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
    const { user, myTestId } = state;
    return {
        user,
        myTestId,
    };
};

const mapDispatchToProps = {
    login: login,
    testId: testId,
};

export default connect(mapStateToProps,  mapDispatchToProps )(Tests);