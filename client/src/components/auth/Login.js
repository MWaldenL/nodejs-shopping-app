import React, { Component } from 'react'
import { withRouter, Redirect } from 'react-router-dom'
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
    const { error, isAuthenticated } = this.props;
    if (error !== prevProps.error) {
      // Check for login error
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
    e.preventDefault()
    const { email, password } = this.state
    const user = { email, password }
    this.props.login(user)
  }

  render() {
    const Button = withRouter(({ history }) => (
      <input type="submit" className="btn" value="Login" 
        onClick={ () => history.push('/') } />
    ))

    return (
      <div className="container">
        <header>
          <a href="/">Back</a>
        </header>
        <div className="card">
            <h1>Login</h1>
            <form className="form-group" onSubmit={ this.onSubmit }> 
              <label htmlFor="email">Email</label>
              <input type="text" name="email" id="email" placeholder="Email" 
                onChange={ this.onChange }/>

              <label htmlFor="password">Password</label>
              <input type="password" name="password" id="password" placeholder="Password" 
                onChange={ this.onChange }/>
              
              {/* <Button /> */}
              <input type="submit" className="btn" value="Login" />
                {/* onClick={ () => history.push('/') } /> */}
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
