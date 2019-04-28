import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { register } from '../../actions/authActions'
import '../../css/register.css'


export class Register extends Component {
  state = {
    name: '',
    email: '',
    password: '',
    number: '',
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
      if (error.id === 'REGISTER_FAIL') {
        this.setState({ msg: error.msg.msg });
      } else {
        this.setState({ msg: null });
      }
    }

    // If authenticated, for now, show a success message
    if (isAuthenticated) {
      alert("Successfully registered!");
    }
  }

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });  
  } 

  onSubmit = (e) => {
    e.preventDefault();

    const { name, email, password, number } = this.state; 
    const newUser = {
      name, email, password, number
    }

    this.props.register(newUser);
  }
  
  render() {
    return (
      <div className="container">
        <header>
          <a href="/">Back</a>
        </header>
        <div className="card">
            <h1>Register</h1>
            <form className="form-group" onSubmit={ this.onSubmit }> 
                <label htmlFor="name">Name</label>
                <input type='text' name='name' id='name' placeholder='Name' 
                  onChange={ this.onChange }/>

                <label htmlFor="name">Email</label>
                <input type='email' name='email' id='email' placeholder='Email' 
                  onChange={ this.onChange }/>

                <label htmlFor="name">Password</label>
                <input type='password' name='password' id='password' placeholder='Password' 
                  onChange={ this.onChange }/>

                <label htmlFor="name">Number</label>
                <input type='text' name='number' id='number' placeholder='Number' 
                  onChange={ this.onChange }/>

                <input type="submit" className="btn" value="Submit" />
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

export default connect(mapStateToProps, { register })(Register);