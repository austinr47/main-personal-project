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
            category: 'Subject Name',
            question: '',
            answer: '',
            showAdd: false,
            showTestButton: true,
            testId: '',
            showSubjectName: true,
            cards: [],
            showCreateSubject: true,
        }
        this.addToDb=this.addToDb.bind(this)
        this.updateCategory=this.updateCategory.bind(this)
        this.updateQuestion=this.updateQuestion.bind(this)
        this.updateAnswer=this.updateAnswer.bind(this)
        this.createTest=this.createTest.bind(this)
        this.showEdit=this.showEdit.bind(this)
        this.updateTestName=this.updateTestName.bind(this)
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
            // console.log(response, this.state.testId)
        }).then(() => {
            axios.get(`/during-create-test/${this.state.testId}`  ).then(response => {
                // console.log(response, this.state.testId)
                this.setState({
                    cards: response.data
                })
            }).then(() => {
                // console.log(this.state.cards)
            })
        }
    )}

    createTest() {
        axios.post(`/new-test/:category`, {category: `${this.state.category}`}).then(response => {
            // console.log(response.data)
            this.setState({
                testId: response.data[0].id
            })
        }).then(() => {
        this.setState({
            showAdd: true,
            showTestButton: !this.state.showTestButton,
            showSubjectName: !this.state.showSubjectName,
            showCreateSubject: false,
        }
        )}
    )}

    updateTestName() {
        // console.log(this.state.testId)
        axios.patch(`/test-name-update/${this.state.testId}`, {test_id: this.state.testId, category: this.state.category}).then(response => {
            // console.log(response)
            this.setState({
                showTestButton: !this.state.showTestButton,
                showSubjectName: !this.state.showSubjectName,
            })
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

    showEdit() {
        this.setState({
            showSubjectName: true
        })
    }

    deleteCard(i) {
        axios.delete(`/card-delete/${i}`).then(response => {
            axios.get(`/during-create-test/${this.state.testId}`  ).then(response => {
                // console.log(response, this.state.testId)
                this.setState({
                    cards: response.data
                })
            }).then(() => {
                // console.log(this.state.cards)
            })
        })
    }


    render() {
        // console.log(this.state.testId)
        const { user } = this.props;
        const cards = this.state.cards.map((item, i) => {
            return <div className='' key={i}>
                <div className='results-stats'>
                    <div className='results-stats-2'>{item.question}</div>
                    <div className='results-stats-3'>{item.answer}</div>
                    <button onClick={() => this.deleteCard(`${item.id}`)}>Delete</button>
                </div>
            </div>
        })

        return (
            <div>
                {user && 
                    <div>
                        <Header />
                        <div className='results-content'>
                            <div className='results-left'>
                        { this.state.showSubjectName &&
                            <div>
                                <input placeholder={this.state.category} onChange={event => this.updateCategory(event.target.value)}/>
                                {this.state.showCreateSubject && <button onClick={this.createTest}>Create Subject</button>}
                                {!this.state.showCreateSubject && <button onClick={this.updateTestName}>Update Subject Name</button>}
                            </div>
                        }
                        {!this.state.showSubjectName &&
                            <div>
                                {this.state.category}<button onClick={this.showEdit}>Edit</button>
                            </div>
                        }
                        {this.state.showAdd && 
                            <div className='results-label'>
                                <input placeholder='Content Decription/Question' onChange={event => this.updateQuestion(event.target.value)}/>
                                <input placeholder='Content Answer' onChange={event => this.updateAnswer(event.target.value)}/>
                                <button onClick={this.addToDb}>Add</button>
                            </div>
                        }
                                <div className='results-label'>
                                    <div className='results-stats-2'>Description/Question</div>
                                    <div className='results-stats-3'>Correct</div>
                                </div>
                                {cards}
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
    const { user } = state;
    return {
        user,
    };
};

const mapDispatchToProps = {
    login: login,


};

export default connect(mapStateToProps, mapDispatchToProps )(Create);