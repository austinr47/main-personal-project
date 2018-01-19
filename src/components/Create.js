import React, { Component } from 'react';
import Header from './Header';
import './css/Create.css';
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
            testId: '',
            showSubjectName: true,
        }
        this.addToDb=this.addToDb.bind(this)
        this.updateCategory=this.updateCategory.bind(this)
        this.updateQuestion=this.updateQuestion.bind(this)
        this.updateAnswer=this.updateAnswer.bind(this)
        this.createTest=this.createTest.bind(this)
        this.showEdit=this.showEdit.bind(this)
    }

    componentDidMount() {
        axios.get('/user-data/').then(response => {
            if (response.data.user) {
                this.props.login(response.data.user);
            }
        });
    }
 
    addToDb() {
        axios.post(`/create/${this.props.match.params.category}`, { question: `${this.state.question}`, answer: `${this.state.answer}`, test_id: `${this.state.testId}` } ).then(response => {
            console.log(response, this.state.testId)
        }).then(() => {
            axios.get(`/during-create-test/${this.state.testId}`  ).then(response => {
                console.log(response, this.state.testId)
            })
        }
    )}

    createTest() {
        axios.post(`/new-test/:category`, {category: `${this.state.category}`}).then(response => {
            this.setState({
                testId: response.data[0].id
            })
        }).then(() => {
        this.setState({
            showAdd: true,
            showTestButton: !this.state.showTestButton,
            showSubjectName: !this.state.showSubjectName
        }
        )}
    )}


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

    showEdit() {
        this.setState({
            showSubjectName: true
        })
    }

    render() {
        // console.log(this.state.testId)
        const { user } = this.props;
        return (
            <div>
                {user && 
                    <div>
                    <Header />
                    { this.state.showSubjectName &&
                        <div>
                            <input placeholder='Subject Name' onChange={event => this.updateCategory(event.target.value)}/>
                            <button onClick={this.createTest}>Create Subject</button>
                        </div>
                    }
                    {!this.state.showSubjectName &&
                        <div>
                            {this.state.category}<button onClick={this.showEdit}>Edit</button>
                        </div>
                    }
                    {this.state.showAdd && 
                        <div>
                        <input placeholder='Content Decription/Question' onChange={event => this.updateQuestion(event.target.value)}/>
                        <input placeholder='Content Answer' onChange={event => this.updateAnswer(event.target.value)}/>
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