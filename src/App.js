import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from './components/Login';
import Account from './components/Account';
import Trainings from './components/Trainings';
import Train from './components/Train';
import Results from './components/Results';
import Create from './components/Create';
import Flashcards from './components/Flashcards';



class App extends Component {
  render() {
    return (
      <div>
        <Switch>
          <Route exact path='/(access_token.*)?' component={ Login } /> {/*good*/}
          <Route path='/account' component={ Account } /> {/*good*/}
          <Route path='/all-tests' component={ Trainings } />
          <Route path='/flashcards/:category' component={ Flashcards } /> {/*good*/}
          <Route path='/tests/:category' component={ Train } /> {/*good*/}
          <Route path='/tests/edit/:category' component={ Create } />
          <Route path='/test-results' component={ Results } />
          <Route path='/create-test' component={ Create } />
        </Switch>
      </div>
    );
  }
}

export default App;
