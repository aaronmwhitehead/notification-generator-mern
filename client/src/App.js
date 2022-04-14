import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './styles/css/App.css';
import CreateEmail from './components/dragAndDrop/CreateEmail';
import Joyride from 'react-joyride';

class App extends Component {
  state = {
    steps: [
      {
        target: '.element',
        content: 'This is my awesome feature!',
        disableBeacon: true,
        disableOverlayClose: true,
        hideCloseButton: true,
        hideFooter: true,
        placement: 'bottom',
        spotlightClicks: true,
      },
      {
        target: '.my-other-step',
        content: 'This another awesome feature!',
      },
    ]
  };

  render() {
    const { steps } = this.state;
    return (
      <div className="app">
        {/* <Joyride steps={steps}/> */}
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
