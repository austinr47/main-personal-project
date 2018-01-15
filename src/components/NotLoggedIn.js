import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './css/Login.css';

export default class NotLoggedIn extends Component {
    render() {
        return (
            <div>
                <div className='login-main'>
                    <div className='login-box'>
                        <img alt='' src=''/>
                        <div className='login-text1'>You have been logged out</div>
                        <Link className='' to='/'><button>Go back to login</button></Link>
                    </div>
                </div>
            </div>
        );
    }
}