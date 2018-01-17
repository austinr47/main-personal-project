import React, { Component } from 'react';
import Header from './Header';
import NotLoggedIn from './NotLoggedIn';
import axios from 'axios';
import { login } from '../ducks/reducer';
import { connect } from 'react-redux';
// import { Link } from 'react-router-dom';

class Create extends Component {
    constructor(){
        super()
        this.state={
            category: '',
            question: '',
            answer: '',
            showAdd: false,
            showTestButton: true,
        }
        this.addToDb=this.addToDb.bind(this)
        this.updateCategory=this.updateCategory.bind(this)
        this.updateQuestion=this.updateQuestion.bind(this)
        this.updateAnswer=this.updateAnswer.bind(this)
        this.createTest=this.createTest.bind(this)
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
        axios.post(`/create/${this.props.match.params.category}`, { category: `${this.state.category}`, question: `${this.state.question}`, answer: `${this.state.answer}`} ).then(response => {
            // console.log(response)
            // console.log(this.state.card)
        }).catch(error => {
            console.log('error2');
        });
    }

    createTest() {
        axios.post(`/new-test/:category`, {category: `${this.state.category}`}).then(response => {
            console.log(response + 'this is resp1')
            console.log(this.state.category)
        }).catch(error => {
            console.log('error2');
        });
        this.setState({
            showAdd: !this.state.showAdd,
            showTestButton: !this.state.showTestButton
        })
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
        const { user } = this.props;
        return (
            <div>
                {user && 
                <div>
                <Header />
                <input placeholder='Test Name' onChange={event => this.updateCategory(event.target.value)}/>
                {this.state.showTestButton &&
                <button onClick={this.createTest}>Add</button>
                }
                {this.state.showAdd && 
                    <div>
                    <input placeholder='Question' onChange={event => this.updateQuestion(event.target.value)}/>
                    <input placeholder='Answer' onChange={event => this.updateAnswer(event.target.value)}/>
                    <button onClick={this.addToDb}>Add</button>
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
    const { user } = state;
    return {
        user,
    };
};

const mapDispatchToProps = {
    login: login,


};

export default connect(mapStateToProps, mapDispatchToProps )(Create);