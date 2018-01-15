import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { login } from '../ducks/reducer';

class Header extends Component {
    componentDidMount() {
        axios.get('/user-data').then(response => {
            console.log(response)
          if (response.data.user) {
            this.props.login(response.data.user);
          }
        });
      }

    render() {
        // const { user } = this.props
        return (
            <div className='header'>
                <div className='header-left'>
                    <div className='header-text'>
                        Flash-Study
                    </div>
                    <img className='header-icons' src='https://raw.githubusercontent.com/austinr47/simulation-3/master/assets/home.png' alt='home'/>
                </div>
                <div className='header-right'>
                    {this.props.user.name}
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
      user: state.user
    };
  };
  
  const mapDispatchToProps = {
    login: login,
  }
  
  export default connect(mapStateToProps, mapDispatchToProps)(Header);