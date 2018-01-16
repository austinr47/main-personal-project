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
                console.log(response.data.user)
            }
        });
        axios.get('/categories').then(response => {
            // console.log(response)
            this.setState({
                categories: response.data
            })
            console.log(response.data)
        });
    }

    render() {
        const { user } = this.props;
        const categories = this.state.categories.map((items) => {
            return <Link to='/train' key={items.category} className='link trainings-category'>{items.category}</Link>
        })
        console.log(this.state.question)
        return (
            
            <div className='trainings-main'>
                {user && 
                    <div>
                    <Header />
                        <div className='trainings-content'>
                            {categories}
                            {/* <div className='trainings-category'>
                            Category</div>
                            <div className='trainings-category'>
                            Category</div>
                            <div className='trainings-category'>
                            Category</div>
                            <div className='trainings-category'>
                            Category</div>
                            <div className='trainings-category'>
                            Category</div>
                            <div className='trainings-category'>
                            Category</div> */}
                        </div>
                        {console.log(this.state.questions)}
                    </div>}
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

export default connect(mapStateToProps,  mapDispatchToProps )(Trainings);