import React, { Component } from 'react';
import Header from './Header';
import './css/Trainings.css';
import NotLoggedIn from './NotLoggedIn';
import axios from 'axios';
import { login } from '../ducks/reducer';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class Trainings extends Component {
    constructor(){
        super()
        this.state = {
            categories: [],
        }
    }
   
    
    componentDidMount() {
        axios.get('/user-data/').then(response => {
            if (response.data.user) {
                this.props.login(response.data.user);
                // console.log(response.data.user)
            }
        });
        axios.get('/categories').then(response => {
            // console.log(response)
            this.setState({
                categories: response.data
            })
            // console.log(response.data)
        });
    }

    render() {
        const { user } = this.props;
        const categories = this.state.categories.map((items) => {
            return <div key={items.category} className='trainings-category'>
                        <div className='subject-boxs'>
                            <div>{items.category}</div>
                        </div>
                            <div className='subject-buttons'>
                                <div>
                                    <Link className='link subject-button' to={`/flashcards/${items.category}`}>
                                        {/* <button className='subject-button1'>Flaschards</button> */}
                                        Flaschards
                                    </Link>
                                </div>
                                <div>
                                    <Link className='link subject-button' to={`/tests/${items.category}`}>
                                        {/* <button className='subject-button1'>Test</button> */}
                                        Test
                                    </Link>
                                </div>
                                <div>
                                    <Link className='link subject-button' to={`/tests/edit/${items.category}`}>
                                        {/* <button className='subject-button1'>Edit</button> */}
                                        Edit
                                    </Link>
                                </div>
                            </div>
                    </div>
        })
        // console.log(this.state.question)
        return (
            
            <div className='trainings-main'>
                <div className='trainings-main-1'>
                    {user && 
                        <div className='trainings-main-2'>
                        <Header />
                            <div className='trainings-content'>
                                <div className='subject-box'>

                                    <Link to='/create-test'>
                                        <div className='link trainings-category'>
                                            Add New Test
                                        </div>
                                    </Link>
                                    {categories}
                                </div>
                            </div>
                        </div>}
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

export default connect(mapStateToProps, mapDispatchToProps )(Trainings);