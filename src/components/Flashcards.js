import React, { Component } from 'react';
import Header from './Header';
import './css/Flashcards.css';
import NotLoggedIn from './NotLoggedIn';
import axios from 'axios';
import { login } from '../ducks/reducer';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class Flashcards extends Component {
    constructor() {
        super()
        this.state= {
            count: 0,
            question: '',
            questions: '',
            answer: '',
            showQuestion: true,
            animation: true,
            flipCard: true,
            slideCard: true,
            fadout: false,
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
            // console.log(response.data)
        });
    }

    nextCard() {
        this.setState({
            flipCard: false,
        })
        const question = this.state.questions.map(a => a.question);
        const answer = this.state.questions.map(a => a.answer);
        const newCount = Math.floor(Math.random() * Math.floor(this.state.questions.length))
        const oddEven = () => {
            const num = Math.floor(Math.random() * Math.floor(50))
            if(num % 2 === 0) {
                return true
            } else return false
        }
        this.setState({
            question: question[this.state.count],
            answer: answer[this.state.count],
            count: newCount,
            showQuestion: oddEven(),
            animation: !this.state.animation,
            fadeOut: !this.state.fadeOut,
        })
    }

    showAnswer() {
        // console.log(this.state.showQuestion, this.state.animation)
        this.setState({
            showQuestion: !this.state.showQuestion,
            animation: !this.state.animation,
            flipCard: true,
            fadeOut: false,
        });
    }

    render() {
        const { user } = this.props
        // console.log(this.state.flipCard)
        const flipCard = (this.state.flipCard ? 'flashcard-content' : 'flashcard-content-1')
        const fadeOut = (this.state.fadeOut ? 'flashcard-new-card-1' : 'flashcard-new-card')
        return (
            <div className='flashcard-main'>
                <div className='flashcard-main-1'>
                    {user && 
                        <div className='flashcard-main-2'>
                            <Header />
                            <div className='flaschard-box-3'>
                                <div className='flashcard-big-box'>
                                    {this.state.animation && 
                                        <div className={fadeOut}>
                                            <div className={flipCard} onClick={() => this.showAnswer()}>
                                                <div className='flashcard-flipping' id='card'>
                                                    <div className='flashcard-side-1'>
                                                        {this.state.showQuestion &&
                                                            <div className='flashcard-view'>
                                                                <div className='flaschard-question'>
                                                                    {this.state.question}
                                                                </div>
                                                            </div>
                                                        } 
                                                    </div>
                                                    <div className='flashcard-side-2'>
                                                        {!this.state.showQuestion &&
                                                            <div className='flashcard-view'>
                                                                <div className='flashcard-answer'>
                                                                    {this.state.answer}
                                                                </div>
                                                            </div>
                                                        }
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    }
                                    {!this.state.animation && 
                                        <div className={flipCard} onClick={() => this.showAnswer()}>
                                            <div className='flashcard-flipping' id='card'>
                                                <div className='flashcard-side-1'>
                                                    {this.state.showQuestion &&
                                                        <div className='flashcard-view'>
                                                            <div className='flaschard-question'>
                                                                {this.state.question}
                                                            </div>
                                                        </div>
                                                    } 
                                                </div>
                                                <div className='flashcard-side-2'>
                                                    {!this.state.showQuestion &&
                                                        <div className='flashcard-view'>
                                                            <div className='flashcard-answer'>
                                                                {this.state.answer}
                                                            </div>
                                                        </div>
                                                    }
                                                </div>
                                            </div>
                                        </div>
                                    }
                                    <div className='flashcard-buttons'>
                                        <Link to='/subjects' className='link-1'>
                                            <button className='flashcard-button' onClick={() => this.nextCard()}>Go to Subjects</button>
                                        </Link>
                                        <button className='flashcard-button' onClick={() => this.showAnswer()}>Show Answer</button>
                                        <button className='flashcard-button' onClick={this.nextCard}>Next</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        }
                    {!user &&
                        <NotLoggedIn />
                    }
                </div>
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