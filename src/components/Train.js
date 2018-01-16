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
            question: [],
        }
        this.renderQuestion = this.renderQuestion.bind(this);
    }

    componentDidMount() {
        axios.get('/user-data/').then(response => {
            if (response.data.user) {
                this.props.login(response.data.user);
                // console.log(response.data.user)
            }
        });
        axios.get(`/questions?category=${this.props.match.params.category}`).then(response => {
            const result = response.data.map(a => a.question)
            this.setState({
                question: result[this.state.count],
                questions: response.data
            })
            console.log(response.data)
        });
}

    renderQuestion() {
        const result = this.state.questions.map(a => a.question)
        this.setState({
            question: result[this.state.count + 1],
            count: this.state.count + 1
        })
        // console.log(this.state.count)
        // console.log(result)
    }

    render() {
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
                                <input className='train-input-box' placeholder='Enter Answer Here'/>
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
    const { user, category } = state;
    return {
        user,
        category,
    };
};

const mapDispatchToProps = {
    login: login,


};

export default connect(mapStateToProps,  mapDispatchToProps )(Train);