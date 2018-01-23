import React, { Component } from 'react';
import Header from './Header';
import './css/EditTests.css';
import NotLoggedIn from './NotLoggedIn';
import axios from 'axios';
import { login } from '../ducks/reducer';
import { connect } from 'react-redux';
// import { Link } from 'react-router-dom';

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
        }
        this.editTestName=this.editTestName.bind(this);
        this.updateTestName=this.updateTestName.bind(this);
        this.deleteCard=this.deleteCard.bind(this);
    }

    componentDidMount() {
        axios.get('/user-data/').then(response => {
            if (response.data.user) {
                this.props.login(response.data.user);
            }
        });
        axios.get(`/questions/${this.props.match.params.category}`).then(response => {
            // console.log(response)
            this.setState({
                testId: response.data[0].test_id,
                cards: response.data,
                testName: response.data[0].category,
            })
        });
    }

    editTestName() {
        this.setState({
            showEditTitle: !this.state.showEditTitle
        })
    }

    updateTestName() {
        console.log(this.state.testId, this.state.testName)
        axios.patch(`/test-name-update/${this.state.testId}`, {test_id: this.state.testId, category: this.state.testName}).then(response => {
            // console.log(response)
        })
        this.setState({
            showEditTitle: !this.state.showEditTitle
        })
    }

    updateStateTestName(name) {
        this.setState({
            testName: name
        })
    }

    deleteCard(i) {
        axios.delete(`/card-delete/${i}`).then(response => {
            axios.get(`/questions/${this.props.match.params.category}`).then(response => {
                // console.log(response)
                this.setState({
                    testId: response.data[0].id,
                    cards: response.data,
                    testName: response.data[0].category,
                })
        })
    })
}

    render() {
        const { user } = this.props;
        // console.log(this.state.testId)
        // console.log(this.state.testName)
        const cards = this.state.cards.map((item, i) => {
            if(this.state.cards) {
                return <div className='edit-card-content'key={item.id}>
                <div className='edit-cards'>
                    <div className='edit-cards-info'>
                        <div>{item.question}</div>
                        <div>{item.answer}</div>
                    </div>
                    <button onClick={() => this.deleteCard(`${item.id}`)}>Delete</button>
                </div>
            </div>
            } else return ('')
        })

        return (
            <div className='edit-main'>
                {user && 
                <div className='edit-main-2'>
                    <Header />
                    <div className='edit-main-3'>
                        <div className='edit-content'>
                            <div className='edit-name'>
                                {this.state.showEditTitle &&
                                <div>
                                    {this.state.testName}
                                    <button onClick={this.editTestName}>Edit</button>
                                </div>
                                }
                                {!this.state.showEditTitle &&
                                <div>
                                    <input value={this.state.testName} onChange={(event) => this.updateStateTestName(event.target.value)}/>
                                    <button onClick={this.updateTestName}>Update</button>
                                </div>}
                            </div>
                            <div className='edit-cards-label'>
                                <div className='edit-cards-info'>
                                    <div>Question/Description</div>
                                    <div>Answer</div>
                                </div>
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