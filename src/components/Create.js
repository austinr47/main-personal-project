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
            cards: [],
            showCreateSubject: true,
            questionInput: '',
            answerInput: '',
            rerender: false,

            quesitonValue: '',
            answerValue: '',
            disableButton: true,
            disableAdd: true,
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
                    cards: response.data,
                    rerender: !this.state.rerender,
                    question: '',
                    answer: '',
                    disableAdd: true,
                })
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
            disableButton: false,
        })
    }

    updateQuestion(question){
        this.setState({
            question: question,
            disableAdd: false,
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
        const disableUpdate = ((this.state.category.length === 0) ? true : false)
        const cards = this.state.cards.map((item, i) => {
            return <div className='' key={i}>
                <div className='create-labels-1'>
                    <div className='create-description-1'>{item.question}</div>
                    <div className='create-description-2'>{item.answer}</div>
                    <img className='create-10-button' src='https://d30y9cdsu7xlg0.cloudfront.net/png/3823-200.png' onClick={() => this.deleteCard(`${item.id}`)}/>
                </div>
            </div>
        })

        return (
            <div className='create-main'>
                {user && 
                    <div className='create-main-2'>
                        <Header />
                        <div className='create-content'>
                            <div className='create-left'>
                                { this.state.showSubjectName &&
                                    <div className='create-subject'>
                                        <input placeholder='Subject Name Here' value={this.state.category} onFocus={(e) => e.target.select()} onChange={event => this.updateCategory(event.target.value)} required/>
                                        {this.state.showCreateSubject && <button disabled={this.state.disableButton} onClick={this.createTest}>Create Subject</button>}
                                        {!this.state.showCreateSubject && <button disabled={disableUpdate} onClick={this.updateTestName}>Update Subject Name</button>}
                                    </div>
                                }
                                {!this.state.showSubjectName &&
                                    <div className='create-edit-name'>
                                        {this.state.category}
                                        <button onClick={this.showEdit}>Edit</button>
                                    </div>
                                }
                                {this.state.showAdd && 
                                    <div className='create-label'>
                                        <input placeholder='Description' value={this.state.question} onFocus={(e) => e.target.select()} type='text' ref='fieldQuestion' onChange={event => this.updateQuestion(event.target.value)}/>
                                        <input placeholder='Answer' value={this.state.answer} onFocus={(e) => e.target.select()} type='text' ref='fieldAnswer' onChange={event => this.updateAnswer(event.target.value)}/>
                                        <button className='create-1-button' onClick={this.addToDb} disabled={this.state.disableAdd}>- Add -</button>
                                        <button className='create-2-button' onClick={() => this.props.history.push('/account')}>- Finish -</button>
                                    </div>
                                }
                                <div className='create-labels'>
                                    <div className='create-description'>Descriptions</div>
                                    <div className='create-answer'>Answers</div>
                                    <div className='create-answer'></div>
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