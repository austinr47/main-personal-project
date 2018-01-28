import React, { Component } from 'react';
import Header from './Header';
import './css/Subjects.css';
import NotLoggedIn from './NotLoggedIn';
import axios from 'axios';
import { login } from '../ducks/reducer';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class Subjects extends Component {
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
                        <div>_________________</div>
                        <div className='subject-buttons'>
                                <Link className=' subject-button' to={`/flashcards/${items.category}`}>Flashcards</Link>
                                <Link className=' subject-button' to={`/tests/${items.category}`}>Test</Link>
                                <Link className=' subject-button' to={`/tests/edit/${items.category}`}>Edit</Link>
                        </div>
                    </div>
        })
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
                        </div>
                    }
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

export default connect(mapStateToProps, mapDispatchToProps )(Subjects);