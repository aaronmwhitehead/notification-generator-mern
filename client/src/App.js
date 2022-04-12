import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './styles/css/App.css';
import CreateEmailTest from './components/dragAndDrop/CreateEmailTest';
import UpdateEmail from './components/dragAndDrop/UpdateEmail';

class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/" component={(props) => <CreateEmailTest {...props} defaultTemplate={true} />} />
          <Route exact path="/:id"  component={(props) => <CreateEmailTest {...props} defaultTemplate={false} />} />
        </Switch>
      </Router>
    );
  }
}

export default App;
