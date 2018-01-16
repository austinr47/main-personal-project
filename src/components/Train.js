import React, { Component } from 'react';
import Header from './Header';
import './css/Trainings.css';
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
        // this.countUp=this.countUp.bind(this);
    }

    componentDidMount() {
        axios.get('/user-data/').then(response => {
            if (response.data.user) {
                this.props.login(response.data.user);
                console.log(response.data.user)
            }
        });
        axios.get('/questions').then(response => {
            const result = response.data.map(a => a.question)
            this.setState({
                question: result[this.state.count],
                questions: response.data
            })
            console.log(response.data)
        });
    console.log('component DID Mount')
}

    componentWillMount() {
        console.log('componentWill Mount')
        }

    renderQuestion() {
        const result = this.state.questions.map(a => a.question)
        this.setState({
            question: result[this.state.count],
            count: this.state.count + 1
        })
        console.log(this.state.count)
        console.log(result)
    }

    // countUp() {
    // }

    render() {
        const { user } = this.props;
        // const quest = this.state.questions.filter((obj) => {
        //     this.state.questions[obj] === this.state.count
        // })
        console.log('')
        return (
            <div>
                {user && 
                    <div>
                    <Header />
                        {this.state.question}
                        <button onClick={this.renderQuestion}>count up</button>
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

export default connect(mapStateToProps,  mapDispatchToProps )(Train);