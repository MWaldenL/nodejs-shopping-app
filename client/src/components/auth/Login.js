import React, { Component } from 'react'
import { login } from '../../actions/authActions'
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import '../../css/register.css'


class Login extends Component {
  state = {
    email: '',
    password: '',
    msg: null
  }


  static propTypes = {
    isAuthenticated: PropTypes.bool,
    error: PropTypes.object.isRequired,
    register: PropTypes.func.isRequired,
  };

  componentDidUpdate(prevProps) {
    const { error, isAuthenticated } = this.props;
    if (error !== prevProps.error) {
      // Check for register error
      if (error.id === 'LOGIN_FAIL') {
        this.setState({ msg: error.msg.msg });
      } else {
        this.setState({ msg: null });
      }
    }

    // If authenticated, for now, show a success message
    if (isAuthenticated) {
      alert("Successfully logged in!");
    }
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();

    const { email, password } = this.state;

    const user = {
      email,
      password
    };

    // Attempt to login
    this.props.login(user);
  };

  render() {
    return (
      <div className="container">
        <header>
          <a href="/">Back</a>
        </header>
        <div className="card">
            <h1>Login</h1>
            <form className="form-group" onSubmit={ this.onSubmit }> 
              <label for="name">Email</label>
              <input type='email' name='name' id='item' placeholder='Email' />

              <label for="name">Password</label>
              <input type='password' name='name' id='item' placeholder='Password' />
              
              <input type="submit" className="btn" value="Login"/>
            </form>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  error: state.error
});

export default connect(mapStateToProps, { login })(Login);
