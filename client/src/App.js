import React, { Component } from 'react';
import { Provider } from 'react-redux';
import store from './store';
import AppNavbar from './components/AppNavbar';
import './App.css';


class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <div className="App">
          <AppNavbar />
        </div>
      </Provider>
    );
  }
}

export default App;
