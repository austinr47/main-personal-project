import React, { Component } from 'react';
import Header from './Header';
import './css/Account.css';
import axios from 'axios';
import { login } from '../ducks/reducer';
import { connect } from 'react-redux';
import NotLoggedIn from './NotLoggedIn';

class Account extends Component {
    
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
            <div className='account-bck'>
            {user &&
                <div>
                    <Header />
                    <div className='account-margin'>
                        <div className='account-content'>
                            <div className='account-left'>
                                <div className='account-left-column'>
                                    <div className='account-left-text'>
                                        Flashcard Training
                                    </div>
                                    <div className='account-left-text'>
                                        Create Flashcards
                                    </div>
                                    {/* <div className='account-left-text'>
                                        Edit Flashcards
                                    </div> */}
                                </div>
                            </div>
                            <div className='account-right'>
                                <div className='account-right-label'>
                                    <div>Category</div>
                                    <div>Percent Correct</div>
                                </div>
                                <div className='account-right-stats'>
                                    <div>Category</div>
                                    <div>Percent Correct</div>
                                </div>
                                <div className='account-right-stats'>
                                    <div>Category</div>
                                    <div>Percent Correct</div>
                                </div>
                                <div className='account-right-stats'>
                                    <div>Category</div>
                                    <div>Percent Correct</div>
                                </div>
                                <div className='account-right-stats'>
                                    <div>Category</div>
                                    <div>Percent Correct</div>
                                </div>
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

export default connect(mapStateToProps,  mapDispatchToProps )(Account);