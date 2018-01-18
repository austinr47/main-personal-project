import React, { Component } from 'react';
import Header from './Header';
import './css/Train.css';
import NotLoggedIn from './NotLoggedIn';
import axios from 'axios';
import { login } from '../ducks/reducer';
import { connect } from 'react-redux';

class Train extends Component {
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
                // console.log(response.data.user)
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
            console.log(response.data)
        });
        axios.post(`/indi-test/${this.props.match.params.category}`).then(response => {
            this.setState({
                indiTest: response.data[0].indi_test
            })
        })
}

    renderQuestion() {
        axios.post('/results-indi-test', { my_answer: `${this.state.myAnswer}`, correct_answer: `${this.state.correctAnswer}`, question: `${this.state.question}`,  test_id: `${this.state.testId}`, category: `${this.state.category}`, result_table_id: `${this.state.indiTest}` }).then(response => {

        })
        const result = this.state.questions.map(a => a.question)
        const answer = this.state.questions.map(a => a.answer)
        this.setState({
            question: result[this.state.count + 1],
            correctAnswer: answer[this.state.count + 1],
            count: this.state.count + 1
        })
        // console.log(this.state.count)
        // console.log(result)
    }

    answer(answer) {
        this.setState({
            myAnswer: answer
        })
    }

    render() {
        console.log(this.state.indiTest)
        const { user } = this.props;
        return (
            <div className='train-main'>
                {user && 
                    <div>
                    <Header />
                        <div className='train-content'>
                            <div className='train-question'>
                                {this.state.question}
                            </div>
                            <div className='train-input'>
                                <input className='train-input-box' onChange={event => this.answer(event.target.value)}placeholder='Enter Answer Here'/>
                            </div>
                            <button onClick={this.renderQuestion} className='train-button'>next question</button>
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

export default connect(mapStateToProps,  mapDispatchToProps )(Train);