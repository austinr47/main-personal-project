import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { login } from '../ducks/reducer';
import './css/Header.css';
import { Link } from 'react-router-dom';

class Header extends Component {
    componentDidMount() {
        axios.get('/user-data').then(response => {
          if (response.data.user) {
            this.props.login(response.data.user);
          }
        });
      }

    render() {
        const { user } = this.props
        return (
            <div className='header'>
                <div className='header-left'>
                    <div className='header-text'>
                        <Link className='link' to='/account' >Flash-Study</Link>
                        <Link className='link' to='/' >Login</Link>
                    </div>
                </div>
                <div className='header-right'>
                    <div className='header-text'>
                        {user[0].name}
                    </div>
                    <div className='header-logout'>
                        <Link className='link' to='/logout'> Logout </Link>
                    </div>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    const { user } = state;
    return {
      user,
    };
  };
  
  const mapDispatchToProps = {
    login: login,
  }
  
  export default connect(mapStateToProps, mapDispatchToProps)(Header);