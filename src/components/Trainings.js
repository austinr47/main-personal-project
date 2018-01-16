import React, { Component } from 'react';
import Header from './Header';
import './css/Trainings.css';
import NotLoggedIn from './NotLoggedIn';
import axios from 'axios';
import { login, updateCategory } from '../ducks/reducer';
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
            console.log(response)
            this.setState({
                categories: response.data
            })
            // console.log(response.data)
        });
    }

    render() {
        const { user, updateCategory } = this.props;
        const categories = this.state.categories.map((items) => {
            return <Link to={`/train/${items.category}`} key={items.category} onClick={(event) => updateCategory(items.category)} className='link trainings-category'>{items.category}</Link>
        })
        // console.log(this.state.question)
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
                    </div>}
                {!user &&
                    <NotLoggedIn />
                }
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    const { user, updateCategory } = state;
    return {
        user,
        updateCategory
    };
};

// const mapDispatchToProps = {
//     login: login,


// };

export default connect(mapStateToProps,  { login, updateCategory } )(Trainings);