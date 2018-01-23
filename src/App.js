import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from './components/Login';
import Account from './components/Account';
import Trainings from './components/Trainings';
import Train from './components/Train';
import Results from './components/Results';
import TestResults from './components/Results.1';
import Create from './components/Create';
import Flashcards from './components/Flashcards';
import EditTests from './components/EditTests';
import NotLoggedIn from './components/NotLoggedIn';



class App extends Component {
  render() {
    return (
      <div>
        <Switch>
          <Route exact path='/(access_token.*)?' component={ Login } /> {/*good*/}
          <Route path='/account' component={ Account } /> {/*good*/}
          <Route path='/subjects' component={ Trainings } />  {/*good*/}
          <Route path='/flashcards/:category' component={ Flashcards } /> {/*good*/}
          <Route path='/tests/edit/:category' component={ EditTests } /> {/*good*/}
          <Route path='/tests/:category' component={ Train } /> {/*good*/}
          <Route path='/test-results/:id' component={ Results } /> {/*good*/}
          <Route path='/previous-results/results/:id' component={ TestResults } /> {/*good*/}
          <Route path='/create-test' component={ Create } /> {/*good*/}
          <Route path='/logout' component={ NotLoggedIn } /> {/*good*/}
        </Switch>
      </div>
    );
  }
}

export default App;
