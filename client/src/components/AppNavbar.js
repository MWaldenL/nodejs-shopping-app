import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import Logout from "./auth/Logout";

class AppNavbar extends Component {
  render() {
    const isAuth = this.props.auth.isAuth;

    const authLinks = (
      <Fragment>
        <li>
          <a href="/cart" className="nav-links">Cart</a>
        </li>
        <Logout />
      </Fragment>
    )

    const guestLinks = (
      <Fragment>
        <li>
          <a href="/register" className="nav-links">Register</a>
        </li>
        <li>
          <a href="/login" className="nav-links">Login</a>
        </li>
      </Fragment>
    )

    return (
      <div>
        <nav className="navbar">
          <a href="#" className="logo">shopping</a>
          <ul className="main-nav" id="js-menu">
            { isAuth ? authLinks : guestLinks }
          </ul>
        </nav>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, {})(AppNavbar);
