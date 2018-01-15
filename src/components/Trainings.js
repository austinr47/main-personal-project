import React, { Component } from 'react';
import Header from './Header';
import './css/Trainings.css';
import NotLoggedIn from './NotLoggedIn';
import axios from 'axios';
import { login } from '../ducks/reducer';
import { connect } from 'react-redux';

class Trainings extends Component {

    componentDidMount() {
        axios.get('/user-data/').then(response => {
            if (response.data.user) {
                this.props.login(response.data.user);
            }
        });
    }

    render() {
        const { user } = this.props;
        return (
            
            <div className='trainings-main'>
                {user && 
                    <div>
                    <Header />
                        <div className='trainings-content'>
                            <div className='trainings-category'>
                            Training Category One</div>
                            <div className='trainings-category'>
                            Training Category Two</div>
                            <div className='trainings-category'>
                            Training Category Three</div>
                            <div className='trainings-category'>
                            Training Category Four</div>
                            <div className='trainings-category'>
                            Training Category Five</div>
                            <div className='trainings-category'>
                            Training Category Six</div>
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
    const { user, firstName, picture, lastName } = state;
    return {
        user,
        firstName,
        picture,
        lastName
    };
};

const mapDispatchToProps = {
    login: login,


};

export default connect(mapStateToProps,  mapDispatchToProps )(Trainings);