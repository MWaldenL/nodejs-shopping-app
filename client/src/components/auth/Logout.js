import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux';
import { logout } from '../../actions/authActions';


class Logout extends Component {
  render() {
    return (
        <Fragment>
            <li className="nav-links">
              <a href="#" onClick={ this.props.logout }>
                  Logout
              </a>
            </li>
        </Fragment>
    )
  }
}


export default connect(null, { logout })(Logout);