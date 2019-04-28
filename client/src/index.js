import React from 'react';
import ReactDOM from 'react-dom';
import { Route, Link, BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';
import App from './App';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import './index.css';

const routing = (
  <Provider store={store}>
    <Router>
        <Route exact path="/" component={App} />
        <Route path="/register" component={Register} />
        <Route path="/login" component={Login} />
    </Router>
  </Provider>
)

ReactDOM.render(routing, document.getElementById('root'));
