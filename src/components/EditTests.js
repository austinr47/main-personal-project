import React, { Component } from 'react';
import Header from './Header';
import './css/EditTests.css';
import NotLoggedIn from './NotLoggedIn';
import axios from 'axios';
import { login } from '../ducks/reducer';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class Create extends Component {
    constructor(){
        super()
        this.state={
            cards: [],
            showEditTitle: true,
            testName: '',
            testId: '',
            cardId: '',
            rerender: true,
            showAdd: true,
            waiting: false,
        }

        this.editTestName=this.editTestName.bind(this);
        this.updateTestName=this.updateTestName.bind(this);
        this.deleteCard=this.deleteCard.bind(this);
        this.deleteSubject=this.deleteSubject.bind(this);
        this.showAdd=this.showAdd.bind(this);
    }

    componentDidMount() {
        axios.get('/user-data/').then(response => {
            // console.log(response)
            if (response.data.user) {
                this.props.login(response.data.user);
            }
        });
        axios.get(`/questions/${this.props.match.params.category}`).then(response => {
            // console.log(response)
            // console.log(response.data[0].test_id)
            this.setState({
                testId: response.data[0].test_id,
                cards: response.data,
                testName: response.data[0].category,
            })
        });
    }

    showAdd() {
        this.setState({
            showAdd: !this.state.showAdd
        })
    }

    editTestName() {
        this.setState({
            showEditTitle: !this.state.showEditTitle
        })
    }

    deleteSubject(i) {
        // console.log(this.state.cards[0].id)
        if(this.state.cards[0].id != null) {
            axios.delete(`/subject-content/${i}`).then(response => {
                // console.log(this.state.testId)
                axios.delete(`/subject-delete/${this.state.testName}`).then(response => {
                    this.props.history.push('/account')
                })
            })
        } else axios.delete(`/subject-delete/${this.state.testName}`).then(response => {
            this.props.history.push('/account')
        })
    }

    updateTestName() {
        // console.log(this.state.testId, this.state.testName)
        axios.patch(`/test-name-update/${this.state.testId}`, {test_id: this.state.testId, category: this.state.testName}).then(response => {
            // console.log(response)
            this.setState({
                waiting: !this.state.waiting
            })
        })
        .then(() => {
            setTimeout(() => {
                // console.log('url-update')
                this.props.history.push(`/tests/edit/${this.state.testName}`)
                // alert("Subject name updated!")
            this.setState({
                showEditTitle: !this.state.showEditTitle,
                waiting: !this.state.waiting
            })
            }, 1000)
    })
    // console.log('done with update')
    }

    updateStateTestName(name) {
        this.setState({
            testName: name
        })
    }

    deleteCard(i) {
        axios.delete(`/card-delete/${i}`).then(response => {
            axios.get(`/questions/${this.props.match.params.category}`).then(response => {
                console.log(response.data)
                this.setState({
                    // testId: response.data[0].id,
                    cards: response.data,
                    testName: response.data[0].category,
                })
            })
        })
    }

    render() {
        const { user } = this.props;
        // console.log(this.state.cards[0].test_id)
        // console.log(this.state.testId)
        // console.log(this.state.cards)
        const cards = this.state.cards.map((item, i) => {
            if(this.state.cards[0].id != null) {
                return <div className='edit-card-content'key={item.id}>
                <div className='edit-cards'>
                    <div className='edit-cards-info'>
                        <div>{item.question}</div>
                        <div>{item.answer}</div>
                    </div>
                    <button onClick={() => this.deleteCard(`${item.id}`)}>Delete</button>
                </div>
            </div>
            } else return ''
        })

        return (
            <div className='edit-main'>
                {this.state.waiting && 
                    <div className='updating-body'>
                        <div className='updating-box'>
                            <div className='updating-text'>
                                Updating...
                            </div>
                        </div>
                    </div>
                }
                {user && 
                <div className='edit-main-2'>
                    <Header />
                    <div className='edit-main-3'>
                        <div className='edit-content'>
                            <div className='edit-name'>
                                <div className='edit-name-20'>
                                    <Link to='/account' className='result-link'>
                                        <div className='edit-to-account'>Go To Account</div>
                                    </Link>
                                    {this.state.showEditTitle &&
                                        <div>
                                            {this.state.testName}
                                            <button className='edit-button-edit' onClick={this.editTestName}>Edit</button>
                                        </div>
                                    }
                                    {!this.state.showEditTitle &&
                                        <div>
                                            <input value={this.state.testName} onFocus={(e) => e.target.select()} onChange={(event) => this.updateStateTestName(event.target.value)}/>
                                            <button onClick={this.updateTestName}>Update</button>
                                            <button className='edit-button-edit' onClick={() => this.deleteSubject(this.state.testId)}>Delete Subject</button>
                                        </div>
                                    }
                                    <Link className='result-link' to={`/subjects`}>
                                        <div className='edit-to-subject'>Go to Subjects</div>
                                    </Link>
                                </div>
                            </div>
                            <div className='edit-cards-label'>
                                <div className='edit-cards-info-1'>
                                    <div>Question/Description</div>
                                    <div>Answer</div>
                                </div>
                            </div>
                            {cards}
                            <div className='edit-add-section'>
                                {this.state.showAdd &&
                                    <div onClick={this.showAdd}>+ ADD</div>
                                }
                                {!this.state.showAdd &&
                                    <div>
                                        <div className='edit1-labels'>
                                            <div className='edit1-description'>Descriptions</div>
                                            <div className='edit1-answer'>Answer</div>
                                            <div className='edit1-answer'></div>
                                        </div>
                                        <div className='edit1-cards'>
                                            <div className='edit1-cards-info'>
                                                <input onFocus={(e) => e.target.select()} className='edit1-input-1' />
                                                <input onFocus={(e) => e.target.select()} className='edit1-input-2' />
                                            </div>
                                            <button className='edit1-button'>ADD</button>
                                        </div>
                                    </div>
                                }
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
    const { user } = state;
    return {
        user,
    };
};

const mapDispatchToProps = {
    login: login,


};

export default connect(mapStateToProps, mapDispatchToProps )(Create);