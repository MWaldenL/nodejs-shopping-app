import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { logout } from '../actions/authActions';
import '../css/navbar.css'

class AppNavbar extends Component {
  logout = () => {
    this.props.logout();
  }

  render() {
    const isAuth = this.props.auth.isAuth;

    const authLinks = (
      <Fragment>
        <li>
          <a href="/cart" className="nav-links">Cart</a>
        </li>
        <li>
          <a href="/watashi" className="nav-links">Me</a>
        </li>
        <li>
          <a href="/" className="nav-links" onClick={ this.logout }>Logout</a>
        </li>
      </Fragment>
    )

    const guestLinks = (
      <Fragment>
        <li>
          <a href="#" className="nav-links">Categories</a>
        </li>
        <li>
          <a href="/login" className="nav-links">Login</a>
        </li>
        <li>
          <a href="/register" className="nav-links">Register</a>
        </li>
      </Fragment>
    )

    return (
      <nav className="navbar">
        <a href="/" className="logo">shopping</a>
        <ul className="main-nav" id="js-menu">
          { isAuth ? authLinks : guestLinks }
        </ul>
      </nav>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, { logout })(AppNavbar);
