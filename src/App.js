import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import Login from './components/Login';
import Account from './components/Account';
import Trainings from './components/Trainings';
import Train from './components/Train';
import Results from './components/Results';



class App extends Component {
  render() {
    return (
      <div>
        <Route exact path='/(access_token.*)?' component={ Login } />
        <Route path='/account' component={ Account } />
        <Route path='/trainings' component={ Trainings } />
        <Route path='/train/:category' component={ Train } />
        <Route path='/test-results' component={ Results } />
      </div>
    );
  }
}

export default App;
