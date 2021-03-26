import './App.css'
import React from 'react';
import { render } from 'react-dom';
import { Router } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import RouteContainer from './RouteContainer';
const history = createBrowserHistory();

class App extends React.Component {

  render() {
    return (
        <Router history={history}>
          <RouteContainer />
        </Router>
    )
  }
}

export default App;