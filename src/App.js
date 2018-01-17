import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import Login from './components/Login';
import Account from './components/Account';
import Trainings from './components/Trainings';
import Train from './components/Train';
import Results from './components/Results';
import Create from './components/Create';



class App extends Component {
  render() {
    return (
      <div>
        <Route exact path='/(access_token.*)?' component={ Login } />
        <Route path='/account' component={ Account } />
        <Route path='/subjects' component={ Trainings } />
        <Route path='/tests/:category' component={ Train } />
        <Route path='/test-results' component={ Results } />
        <Route path='/create-cards' component={ Create } />
      </div>
    );
  }
}

export default App;
