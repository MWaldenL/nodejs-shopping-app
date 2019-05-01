import React from 'react';
import ReactDOM from 'react-dom';
import { Route, BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';
import App from './App';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import Profile from './components/auth/Profile';
import Cart from './components/Cart';
import ItemDetail from './components/mainpage/ItemDetail';
import './index.css';

const routing = (
  <Provider store={store}>
    <Router>  
        <Route exact path="/" component={App} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/cart" component={Cart} />
        <Route exact path="/watashi" component={Profile} />
        <Route exact path="/details/:id" component={ItemDetail} />
    </Router>
  </Provider>
)

ReactDOM.render(routing, document.getElementById('root'));
