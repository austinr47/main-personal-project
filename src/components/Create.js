import React, { Component } from 'react';
import Header from './Header';
import './css/Trainings.css';
import NotLoggedIn from './NotLoggedIn';
import axios from 'axios';
import { login } from '../ducks/reducer';
import { connect } from 'react-redux';
// import { Link } from 'react-router-dom';

class Create extends Component {
    constructor(){
        super()
        this.state={
            category: 'JavaScript',
            question: 'question1',
            answer: 'answer1',
        }
        this.addToDb=this.addToDb.bind(this)
        this.updateCategory=this.updateCategory.bind(this)
        this.updateQuestion=this.updateQuestion.bind(this)
        this.updateAnswer=this.updateAnswer.bind(this)
    }

    componentDidMount() {
        axios.get('/user-data/').then(response => {
            if (response.data.user) {
                this.props.login(response.data.user);
                // console.log(response.data.user)
            }
        });
    }
 
    addToDb() {
        axios.post('/create', { category: `${this.state.category}`, question: `${this.state.question}`, answer: `${this.state.answer}`} ).then(response => {
            // console.log(response)
            // console.log(this.state.card)
        }).catch(error => {
            console.log('error2');
          });
    }

    updateCategory(category){
        this.setState({
            category: category,
        })
    }

    updateQuestion(question){
        this.setState({
            question: question,
        })
    }

    updateAnswer(answer){
        this.setState({
            answer: answer,
        })
    }

    render() {
        return (
            <div>
                <Header />
                <input placeholder='Category' onChange={event => this.updateCategory(event.target.value)}/>
                <input placeholder='Question' onChange={event => this.updateQuestion(event.target.value)}/>
                <input placeholder='Answer' onChange={event => this.updateAnswer(event.target.value)}/>
                <button onClick={this.addToDb}>Add</button>
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

export default connect(mapStateToProps, mapDispatchToProps )(Create);