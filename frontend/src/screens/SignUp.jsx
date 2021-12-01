import React from 'react';
import Joi from 'joi-browser';
import { Link, Navigate } from 'react-router-dom';
import { connect } from 'react-redux';
import { userActions } from '../redux/actions';
import { Container, Grid, Form } from '../common';

class SignUp extends Form {
  constructor() {
    super();
    this.state = {
      data: {
        first_name: '',
        last_name: '',
        email: '',
        phone: '',
        password: '',
        confirm_password: '',
      },
      errors: {},
      responseError: null,
      show: {
        password: false,
        confirm_password: false,
      },
    };
  }

  schema = {
    first_name: Joi.string()
      .min(3)
      .max(64)
      .trim()
      .required()
      .label('First name'),
    last_name: Joi.string().min(1).max(64).trim().allow('').label('Last name'),
    phone: Joi.string()
      .regex(/^[6-9]\d{9}$/gi)
      .required()
      .label('Phone number'),
    email: Joi.string().email().required().label('E-mail'),
    password: Joi.string().min(1).max(256).required().label('Password'),
    confirm_password: Joi.string().required().label('Confirm password'),
  };

  handleShowPassword = (e) => {
    const { show } = this.state;
    const fieldName = e.target.dataset.passwordToggler;
    this.setState({ show: { ...show, [fieldName]: !show[fieldName] } });
  };

  performSubmit = () => {
    const { password, confirm_password } = this.state.data;
    let errors = { ...this.state.errors };
    if (password !== confirm_password) {
      errors.confirm_password = 'Passwords are not matching!';
      return this.setState({ errors });
    }

    const { first_name, last_name } = this.state.data;
    const payload = {
      ...this.state.data,
      first_name: first_name.trim(),
      last_name: last_name.trim(),
    };
    if (!payload.last_name) delete payload.last_name;
    delete payload.confirm_password;

    return this.props.registerUser(payload);
  };

  componentDidUpdate() {
    const { success, error } = this.props.userRegister;

    if (success) {
      window.location = '/';
      return;
    }
    if (error) {
      this.setState({ responseError: error });
      this.props.resetRegisterUser();
    }
  }

  render() {
    const { loading } = this.props.userRegister;
    const { show, responseError } = this.state;
    if (this.props.isLoggedIn) return <Navigate to='/' />;

    const passwordIcon = show.password
      ? '/assets/icons/sprite.svg#eye-close'
      : '/assets/icons/sprite.svg#eye';
    const confirmPasswordIcon = show.confirm_password
      ? '/assets/icons/sprite.svg#eye-close'
      : '/assets/icons/sprite.svg#eye';

    const firstNameInput = {
      id: 'first_name',
      type: 'text',
      label: 'First Name',
      autoFocus: true,
    };
    const lastNameInput = {
      id: 'last_name',
      type: 'text',
      label: 'Last Name',
    };
    const emailInput = {
      id: 'email',
      type: 'email',
      label: 'E-Mail',
      placeholder: 'E.g: example@email.com',
      autoComplete: 'email',
      groupElement: {
        left: (
          <div className='input-group__icon'>
            <svg className='icon icon--accent'>
              <use href='/assets/icons/sprite.svg#email' />
            </svg>
          </div>
        ),
      },
    };
    const phoneInput = {
      id: 'phone',
      type: 'text',
      label: 'Phone',
      placeholder: 'Your phone number',
      groupElement: {
        left: (
          <div className='input-group__icon'>
            <svg className='icon icon--accent'>
              <use href='/assets/icons/sprite.svg#phone' />
            </svg>
          </div>
        ),
      },
    };
    const passwordInput = {
      id: 'password',
      type: show.password ? 'text' : 'password',
      label: 'Password',
      placeholder: 'Enter password',
      autoComplete: 'new-password',
      groupElement: {
        left: (
          <div className='input-group__icon'>
            <svg className='icon icon--accent'>
              <use href='/assets/icons/sprite.svg#lock' />
            </svg>
          </div>
        ),
        right: (
          <div className='input-group__icon signup__password-toggler'>
            <svg
              className='icon icon--accent'
              data-password-toggler='password'
              onClick={this.handleShowPassword}
            >
              <use href={passwordIcon} data-password-toggler='password' />
            </svg>
          </div>
        ),
      },
    };
    const confirmPasswordInput = {
      id: 'confirm_password',
      type: show.confirm_password ? 'text' : 'password',
      label: 'Confirm Password',
      placeholder: 'Re-enter password',
      autoComplete: 'new-password',
      groupElement: {
        left: (
          <div className='input-group__icon'>
            <svg className='icon icon--accent'>
              <use href='/assets/icons/sprite.svg#lock' />
            </svg>
          </div>
        ),
        right: (
          <div className='input-group__icon signup__password-toggler'>
            <svg
              className='icon icon--accent'
              data-password-toggler='confirm_password'
              onClick={this.handleShowPassword}
            >
              <use
                href={confirmPasswordIcon}
                data-password-toggler='confirm_password'
              />
            </svg>
          </div>
        ),
      },
    };
    const signUpButton = {
      label: loading ? 'Please wait...' : 'Sign Up',
      variant: 'accent',
      block: true,
      disabled: loading,
    };

    return (
      <Container>
        <form className='signup'>
          <svg className='signup__logo'>
            <use href='/assets/icons/sprite.svg#register' />
          </svg>
          <h2 className='signup__heading'>SIGN UP</h2>
          {responseError && (
            <p className='signup__response-error'>{responseError}</p>
          )}
          <Grid layout='grid--1x2'>
            <div className='signup__name-container'>
              {this.renderInput(firstNameInput)}
            </div>
            <div className='signup__name-container'>
              {this.renderInput(lastNameInput)}
            </div>
          </Grid>
          {this.renderInput(emailInput)}
          {this.renderInput(phoneInput)}
          {this.renderInput(passwordInput)}
          {this.renderInput(confirmPasswordInput)}
          {this.renderButton(signUpButton)}
          <p className='signup__prompt'>
            Already have a Rent and Run account?{' '}
            <Link to='/signin'>Sign In here</Link>
          </p>
        </form>
      </Container>
    );
  }
}

const mapStateToProps = (state) => ({
  userRegister: state.userRegister,
  isLoggedIn: state.userLogin.isLoggedIn,
});

const mapDispatchToProps = (dispatch) => ({
  registerUser: (payload) => dispatch(userActions.registerUser(payload)),
  resetRegisterUser: () => dispatch(userActions.resetRegisterUser()),
});

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
