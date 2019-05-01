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
  };

  componentDidUpdate(prevProps) {
    const { error } = this.props;
    if (error !== prevProps.error) {
      if (error.id === 'LOGIN_FAIL') {
        this.setState({ msg: error.msg.msg });
      } else {
        this.setState({ msg: null });
      }
    }
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value })
  }

  onSubmit = e => {
    e.preventDefault();

    const { email, password } = this.state
    const user = { email, password }

    this.props.login(user)
    this.props.history.push({
      pathname: '/',
      state: {
        id: this.props.id
      }
    })
  }

  render() {
    return (
      <div className="container">
        <nav className="navbar">
          <a href="/"><i className="fas fa-chevron-left"></i></a>
        </nav>
        <div className="card">
            <h1>Login</h1>
            <form className="form-group" onSubmit={ this.onSubmit }> 
              <label htmlFor="email">Email</label>
              <input type="text" name="email" id="email" placeholder="Email" 
                onChange={ this.onChange }/>

              <label htmlFor="password">Password</label>
              <input type="password" name="password" id="password" placeholder="Password" 
                onChange={ this.onChange }/>
              
              <input type="submit" className="btn" value="Login"  />
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