import React, { Component } from 'react';
import Header from './Header';
import './css/Flashcards.css';
import NotLoggedIn from './NotLoggedIn';
import axios from 'axios';
import { login } from '../ducks/reducer';
import { connect } from 'react-redux';

class Flashcards extends Component {
    constructor() {
        super()
        this.state= {
            count: 0,
            question: '',
            questions: '',
            answer: '',
            showQuestion: true,
        }
        this.showAnswer=this.showAnswer.bind(this);
        this.nextCard=this.nextCard.bind(this);
    }

    componentDidMount() {
        axios.get('/user-data/').then(response => {
            if (response.data.user) {
                this.props.login(response.data.user);
                // console.log(response.data.user)
            }
        });

        axios.get(`/questions/${this.props.match.params.category}`).then(response => {
            const question = response.data.map(a => a.question)
            const answer = response.data.map(a => a.answer)
            this.setState({
                question: question[this.state.count],
                questions: response.data,
                answer: answer[this.state.count]
            })
            console.log(response.data)
        });
    }

    nextCard() {
        const question = this.state.questions.map(a => a.question);
        const answer = this.state.questions.map(a => a.answer);
        this.setState({
            question: question[this.state.count + 1],
            answer: answer[this.state.count + 1],
            count: this.state.count + 1
        })
    }

    showAnswer() {
        this.setState({
            showQuestion: !this.state.showQuestion
        })
    }

    render() {
        const { user } = this.props
        return (
            <div className='flashcard-main'>
                {user && 
                    <div>
                        <Header />
                        <div className='flashcard-content'>
                            <div className='flashcard-view' onClick={this.showAnswer}>
                                {this.state.showQuestion &&
                                    <div className='flaschard-question'>
                                        {this.state.question}
                                    </div>
                                } 
                                {!this.state.showQuestion &&
                                    <div className='flashcard-answer'>
                                        {this.state.answer}
                                    </div>
                                }
                            </div>
                            <button className='flashcard-button' onClick={this.showAnswer}>Show Answer</button>
                            <button className='flashcard-button' onClick={this.nextCard}>Next</button>
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
    const { user } = state;
    return {
        user,
    };
};

const mapDispatchToProps = {
    login: login,


};

export default connect(mapStateToProps,  mapDispatchToProps )(Flashcards);