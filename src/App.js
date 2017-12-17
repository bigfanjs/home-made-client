/* globals FB */

import React, { Component } from 'react';
import {connect} from 'react-redux';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';

import Async from './components/async-component';
import PrivateRoute from './components/private-route';
import LoadingIndicator from './components/loading-indicator';
import {load} from './actions/fb-javascript-sdk';
import {getLoginStatus} from './actions/fb-login';

import './App.css';

const Topics = Async(() => import('./scenes/topics'));
const Login = Async(() => import('./scenes/fb-login'));

class App extends Component {
  componentWillMount() {
    const {getStatus, loadSDK} = this.props;

    loadSDK().then(() => {
      this.initiateSDK();
      getStatus();
    });
  }

  initiateSDK() {
    FB.init({
      appId: '766331086899371',
      autoLogAppEvents: true,
      xfbml: true,
      version: 'v2.10'
    });
  }

  render() {
    const {verifying, loading} = this.props;

    if (loading && verifying) {
      return <LoadingIndicator />;
    }

    return (
      <Router>
        <Switch>
          <PrivateRoute exact path="/" component={Topics} />
          <Route path="/login" component={Login} />
        </Switch>
      </Router>
    );
  }
}

const mapStateToProps = (state) => ({
  loading: state.user.loading,
  verifying: state.user.status === 'verify'
});
const mapDispatchToProps = (dispatch) => ({
  getStatus() {
    dispatch(getLoginStatus());
  },
  loadSDK() {
    return dispatch(load());
  }
});
export default connect(mapStateToProps, mapDispatchToProps)(App);