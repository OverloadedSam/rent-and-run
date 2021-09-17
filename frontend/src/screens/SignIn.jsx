import React from 'react';
import Joi from 'joi-browser';
import { Link, Navigate } from 'react-router-dom';
import { connect } from 'react-redux';
import { userActions } from '../redux/actions';
import { Container, Form } from '../common';

class SignIn extends Form {
  constructor() {
    super();
    this.state = {
      data: { email: '', password: '' },
      errors: {},
      responseError: null,
      showPassword: false,
    };
  }

  schema = {
    email: Joi.string().email().label('E-mail'),
    password: Joi.string().label('Password'),
  };

  handleShowPassword = () => {
    const { showPassword } = this.state;
    this.setState({ showPassword: !showPassword });
  };

  performSubmit = () => {
    const payload = this.state.data;
    this.props.loginUser(payload);
  };

  componentDidUpdate() {
    const { success, error } = this.props.userLogin;

    if (success) {
      window.location = '/';
    }
    if (error) {
      this.setState({ responseError: error });
      this.props.resetLoginUser();
    }
  }

  render() {
    const { loading, isLoggedIn } = this.props.userLogin;
    const { showPassword, responseError } = this.state;
    if (isLoggedIn) return <Navigate to='/' />;

    const iconPath = showPassword
      ? '/assets/icons/eye-close.svg#eye-close'
      : '/assets/icons/eye.svg#eye';

    const emailInput = {
      id: 'email',
      type: 'email',
      label: 'E-Mail',
      placeholder: 'Email goes here',
      autoComplete: 'email',
      autoFocus: true,
      groupElement: {
        left: (
          <div className='input-group__icon'>
            <svg className='icon icon--primary'>
              <use href='/assets/icons/email.svg#email' />
            </svg>
          </div>
        ),
      },
    };

    const passwordInput = {
      id: 'password',
      type: showPassword ? 'text' : 'password',
      label: 'Password',
      placeholder: 'Enter password',
      autoComplete: 'current-password',
      groupElement: {
        left: (
          <div className='input-group__icon'>
            <svg className='icon icon--primary'>
              <use href='/assets/icons/lock.svg#lock' />
            </svg>
          </div>
        ),
        right: (
          <div className='input-group__icon signin__password-toggler'>
            <svg
              className='icon icon--primary'
              onClick={this.handleShowPassword}
            >
              <use href={iconPath} />
            </svg>
          </div>
        ),
      },
    };

    const signInButton = {
      label: loading ? 'Please wait...' : 'Sign In',
      variant: 'primary',
      block: true,
      disabled: loading,
    };

    return (
      <Container>
        <form className='signin'>
          <svg className='signin__logo'>
            <use href='/assets/icons/user.svg#user' />
          </svg>
          <h2 className='signin__heading'>SIGN IN</h2>
          {responseError && (
            <p className='signin__response-error'>{responseError}</p>
          )}
          {this.renderInput(emailInput)}
          {this.renderInput(passwordInput)}
          {this.renderButton(signInButton)}
          <p className='signin__prompt'>
            Don&rsquo;t have an account? <Link to='/signup'>Sign Up here</Link>
          </p>
        </form>
      </Container>
    );
  }
}

const mapStateToProps = (state) => ({ userLogin: state.userLogin });

const mapDispatchToProps = (dispatch) => ({
  loginUser: (payload) => dispatch(userActions.loginUser(payload)),
  resetLoginUser: () => dispatch(userActions.resetLoginUser()),
});

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
