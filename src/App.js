import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import Login from './components/Login';
// import Account from ;
// import Trainings from ;
// import Results from ;



class App extends Component {
  render() {
    return (
      <div>
        <Route exact path='/(access_token.*)?' component={ Login } />
        {/* <Route path='/account' component={ Account } />
        <Route path='/trainings' component={ Trainings } />
        <Route path='/test-results' component={ Results } /> */}
      </div>
    );
  }
}

export default App;
