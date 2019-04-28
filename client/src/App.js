import React, { Component } from 'react';
import { Provider } from 'react-redux';
import store from './store';
import { loadUser } from './actions/authActions';
import AppNavbar from './components/AppNavbar';
import MainPage from './components/MainPage';
import './App.css';


class App extends Component {
  componentDidMount() {
    store.dispatch(loadUser());
  }

  render() {
    return (
      <Provider store={store}>
        <div className="App">
          <AppNavbar />
          <MainPage />
        </div>
      </Provider>
    );
  }
}

export default App;
