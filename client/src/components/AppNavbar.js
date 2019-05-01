import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { logout } from '../actions/authActions';
import '../css/navbar.css'

class AppNavbar extends Component {
  logout = () => {
    this.props.logout();
  }

  toggleNav = () => {
    let mainNav = document.getElementById('menu-nav');
    let login = document.getElementById('login');
    let navBarToggle = document.getElementById('js-navbar-toggle');
    let navHori = document.getElementById('nav-hr');

    navBarToggle.addEventListener('click', function(){
      mainNav.classList.toggle('active');
    })
  }

  render() {
    const isAuth = this.props.auth.isAuth;

    const userLinks = (
      <Fragment>
        <li>
          <a href="/cart" className="nav-links">CART</a>
        </li>
        <li>
          <a href="/watashi" className="nav-links">ME</a>
        </li>
        <li>
          <a href="/" className="nav-links" onClick={ this.logout }>LOGOUT</a>
          <div className="profile"></div>
        </li>
      </Fragment>
    )

    const guestLinks = (
      <Fragment>
        <li>
          <a href="#" className="nav-links">FIGURES</a>
        </li>
        <li>
          <a href="/#" className="nav-links">MANGA</a>
        </li>
        <li>
          <a href="/#" className="nav-links">ANIME</a>
        </li>
        <li>
          <a href="/#" className="nav-links">PILLOWS</a>
        </li>
      </Fragment>
    )

    const authLinks = (
      <Fragment>
        <li id="login">
          <a href="/login" className="nav-links">LOGIN</a>
        </li>
        <li>
          <a href="/register" className="nav-links">SIGN UP</a>
        </li>
      </Fragment>
    )

    return (
      <nav className="navbar">
        <span className="navbar-toggle" id="js-navbar-toggle" onClick={ this.toggleNav }>
            <i className="fas fa-bars"></i>
        </span>
        <a href="/" className="logo">øtakuland</a>
        <ul className="main-nav cat-nav" id="menu-nav">
          { guestLinks }
          { isAuth ? userLinks : null }
          {/* <hr className="hr-grey" id="nav-hr"></hr> */}
          { isAuth ? null : authLinks }
        </ul>
      </nav>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, { logout })(AppNavbar);
