import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class AppNavbar extends Component {
  state = {
    isOpen: false
  };

  static propTypes = {
    auth: PropTypes.object.isRequired
  };

  toggle = () => {
    this.setState({
      isOpen: !this.state.isOpen
    });
  };

  render() {
    const { isAuthenticated, user } = this.props.auth;

    return (
      <div>
        <nav class="navbar">
          <a href="#" class="logo">shopping</a>
          <ul class="main-nav" id="js-menu">
              <li>
                  <a href="/register" class="nav-links">Register</a>
              </li>
              <li>
                  <a href="/login" class="nav-links">Login</a>
              </li>
          </ul>
        </nav>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  null
)(AppNavbar);
