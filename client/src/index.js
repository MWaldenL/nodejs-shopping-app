import React from 'react';
import ReactDOM from 'react-dom';
import { Route, Link, BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';
import App from './App';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import Logout from './components/auth/Login';
import Cart from './components/Cart';
import './index.css';

const routing = (
  <Provider store={store}>
    <Router>
        <Route exact path="/" component={App} />
        <Route path="/register" component={Register} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/logout" component={Logout} />
        <Route path="/cart" component={Cart} />
    </Router>
  </Provider>
)

ReactDOM.render(routing, document.getElementById('root'));
