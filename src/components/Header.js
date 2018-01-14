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
        const { user } = this.props
        return (
            <div>
                <div>
                    Flash-Study
                </div>
                <div>
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