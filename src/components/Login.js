import React, { Component } from 'react';
import './css/Login.css';
import Auth0Lock from 'auth0-lock';
import axios from 'axios';
import { connect } from 'react-redux';
import { login } from '../ducks/reducer';

class Login extends Component {
    constructor() {
        super()
        
        this.lock = null;
        this.login = this.login.bind(this);
    }

    componentDidMount() {
        this.lock = new Auth0Lock(process.env.REACT_APP_AUTH0_CLIENT_ID, process.env.REACT_APP_AUTH0_DOMAIN);
        // console.log('this.lock', this.lock);
        this.lock.on('authenticated', authResult => {
            this.lock.getUserInfo(authResult.accessToken, (error, user) => {
                axios.post('/login', { userId: user.sub }).then(response => {
                    this.props.login(response.data.user);
                    // console.log(response.data.user)
                    this.props.history.push('/account');
            })
          })
        })
    }

    login() {
        this.lock.show()
    }

    render() {
        return (
            <div>
                <div className='login-main'>
                    <div className='login-box'>
                        <img alt='' src=''/>
                        <div className='login-text'>Flash-Study</div>
                        <button onClick={this.login}>Login / Register</button>
                    </div>
                        <div className='login-guest'>
                            <div>For guest access, use:</div>
                            <div>Email: guest@email.com</div>
                            <div>Password: guest</div>
                        </div>
                </div>
            </div>
        );
    }
}

const mapDispatchToProps = {
    login: login,
  };

export default connect(null, mapDispatchToProps)(Login);