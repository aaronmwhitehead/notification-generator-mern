import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './styles/css/App.css';
import CreateEmailTest from './components/dragAndDrop/CreateEmailTest';
import UpdateEmail from './components/dragAndDrop/UpdateEmail';
// import ShowEmailList from './components/ShowEmailList';
// import ShowEmailDetails from './components/ShowEmailDetails';
import UpdateEmailInfo from './components/UpdateEmailInfo';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend'

/* <Route path='/create-email' component={CreateEmail} />
<Route path='/edit-email/:id' component={UpdateEmailInfo} />
<Route exact path='/' component={ShowEmailList} />
<Route path='/show-email/:id' component={ShowEmailDetails} /> */

class App extends Component {
  render() {
    return (
      <DndProvider backend={HTML5Backend}>
        <Router>
            <Route exact path='/' component={CreateEmailTest} />
            <Route path='/:id' component={UpdateEmail} />
        </Router>
      </DndProvider>
    );
  }
}

export default App;
