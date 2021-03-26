import React from 'react';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import Dashboard from './components/Dashboard';
import Login from './components/Login';
import Register from './components/Register';

class RouteContainer extends React.Component {
  constructor() {
    super()
    this.state = {
    }
  }

  render() {
    return (
      <TransitionGroup>
        <CSSTransition
          key={this.props.location.key}
          timeout={{ enter: 600, exit: 600 }}
          classNames="fade"
          unmountOnExit
        >
          <Switch location={this.props.location}>
            <Route exact path="/" component={Login} />
            <Route exact path="/dashboard" component={Dashboard} />
            <Route exact path="/register" component={Register} />
          </Switch>
        </CSSTransition>
      </TransitionGroup>
    );
  }
}

export default withRouter(RouteContainer);