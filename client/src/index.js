import React from 'react';
import ReactDOM from 'react-dom';
import { Route, BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';
import App from './App';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import Cart from './components/Cart';
import ItemDetail from './components/ItemDetail';
import './index.css';

const routing = (
  <Provider store={store}>
    <Router>
        <Route exact path="/" component={App} />
        <Route path="/register" component={Register} />
        <Route exact path="/login" component={Login} />
        <Route path="/cart" component={Cart} />
        {/* <Route path="/:id" component={ItemDetail} /> */}
    </Router>
  </Provider>
)

ReactDOM.render(routing, document.getElementById('root'));
