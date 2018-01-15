import React, { Component } from 'react';
import Header from './Header';
import './css/Account.css';

export default class Account extends Component {
    render() {
        return (
            <div className='account-bck'>
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
        );
    }
}