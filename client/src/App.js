import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './styles/css/App.css';
import CreateEmail from './components/dragAndDrop/CreateEmail';

class App extends Component {

  render() {
    return (
      <div className="app">
        <Router>
          <Switch>
            <Route exact path="/" component={(props) => <CreateEmail {...props} defaultTemplate={true} />} />
            <Route exact path="/:id"  component={(props) => <CreateEmail {...props} defaultTemplate={false} />} />
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
