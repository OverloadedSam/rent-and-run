import React from 'react';
import Joi from 'joi-browser';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';
import { userActions as action } from '../redux/actions';
import { Form, Container, Grid, Loader, Error } from '../common';

class MyProfile extends Form {
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
      show: {
        password: false,
        confirm_password: false,
      },
      editProfileMode: false,
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
    password: Joi.string().min(1).max(256).label('New password').allow(''),
    confirm_password: Joi.string().label('Confirm password').allow(''),
  };

  handleShowPassword = (e) => {
    const { show } = this.state;
    const fieldName = e.target.dataset.passwordToggler;
    this.setState({ show: { ...show, [fieldName]: !show[fieldName] } });
  };

  discardEditing = () => {
    const { editProfileMode } = this.state;
    const user = { ...this.props.user.user };
    delete user.id;
    this.setState({
      editProfileMode: !editProfileMode,
      data: { ...user, password: '', confirm_password: '' },
      errors: {},
      show: {
        password: false,
        confirm_password: false,
      },
    });
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
    if (!payload.password.trim()) delete payload.password;
    delete payload.confirm_password;

    return this.props.updateUserDetails(payload);
  };

  componentDidMount() {
    this.props.getUserDetails();
  }

  componentDidUpdate(prevProps) {
    const { user } = this.props.user;
    const { error: userUpdateError, userUpdatedData } = this.props.userUpdate;

    if (user && !prevProps.user.user) {
      const userData = { ...user };
      delete userData.id;
      this.setState({ data: { ...this.state.data, ...userData } });
    }

    if (userUpdatedData && !prevProps.userUpdate.userUpdatedData) {
      const { editProfileMode, data } = this.state;
      this.setState({
        editProfileMode: !editProfileMode,
        data: {
          ...data,
          password: '',
          confirm_password: '',
        },
        errors: {},
        show: {
          password: false,
          confirm_password: false,
        },
      });
      this.props.resetUpdateUserDetails();
      toast.success('Details has been updated!');
    }

    if (userUpdateError) {
      this.props.resetUpdateUserDetails();
      toast.error(userUpdateError);
    }
  }

  render() {
    const { loading, error, success } = this.props.user;
    const { editProfileMode, show } = this.state;
    const passwordIcon = show.password
      ? '/assets/icons/eye-close.svg#eye-close'
      : '/assets/icons/eye.svg#eye';
    const confirmPasswordIcon = show.confirm_password
      ? '/assets/icons/eye-close.svg#eye-close'
      : '/assets/icons/eye.svg#eye';

    const firstNameInput = {
      id: 'first_name',
      type: 'text',
      label: 'First Name',
      autoFocus: true,
      disabled: !editProfileMode,
    };
    const lastNameInput = {
      id: 'last_name',
      type: 'text',
      label: 'Last Name',
      disabled: !editProfileMode,
    };
    const emailInput = {
      id: 'email',
      type: 'email',
      label: 'E-Mail',
      placeholder: 'E.g: example@email.com',
      autoComplete: 'email',
      disabled: !editProfileMode,
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
    const phoneInput = {
      id: 'phone',
      type: 'text',
      label: 'Phone',
      placeholder: 'Your phone number',
      disabled: !editProfileMode,
      groupElement: {
        left: (
          <div className='input-group__icon'>
            <svg className='icon icon--primary'>
              <use href='/assets/icons/phone.svg#phone' />
            </svg>
          </div>
        ),
      },
    };
    const newPasswordInput = {
      id: 'password',
      type: show.password ? 'text' : 'password',
      label: 'New Password',
      placeholder: 'Enter new password',
      autoComplete: 'new-password',
      disabled: !editProfileMode,
      groupElement: {
        left: (
          <div className='input-group__icon'>
            <svg className='icon icon--primary'>
              <use href='/assets/icons/lock.svg#lock' />
            </svg>
          </div>
        ),
        right: (
          <div className='input-group__icon profile__password-toggler'>
            <svg
              className='icon icon--primary'
              data-password-toggler='password'
              onClick={this.handleShowPassword}
            >
              <use href={passwordIcon} data-password-toggler='password' />
            </svg>
          </div>
        ),
      },
    };
    const confirmNewPasswordInput = {
      id: 'confirm_password',
      type: show.confirm_password ? 'text' : 'password',
      label: 'Confirm Password',
      placeholder: 'Re-enter new password',
      autoComplete: 'new-password',
      disabled: !editProfileMode,
      groupElement: {
        left: (
          <div className='input-group__icon'>
            <svg className='icon icon--primary'>
              <use href='/assets/icons/lock.svg#lock' />
            </svg>
          </div>
        ),
        right: (
          <div className='input-group__icon profile__password-toggler'>
            <svg
              className='icon icon--primary'
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
    const editProfileButton = {
      label: 'Edit Profile',
      variant: 'outline',
      size: 'small',
      onClickHandler: () => {
        this.setState({ editProfileMode: !this.state.editProfileMode });
      },
    };
    const discardButton = {
      label: 'Discard',
      variant: 'accent',
      size: 'small',
      onClickHandler: this.discardEditing,
    };
    const updateProfileButton = {
      label: 'Update Profile',
      type: 'submit',
      variant: 'primary',
      block: true,
    };

    return (
      <Container>
        <form className='profile'>
          <svg className='profile__logo icon--primary'>
            <use href='/assets/icons/profile.svg#user' />
          </svg>
          <h2 className='profile__heading'>My Profile</h2>

          {loading ? (
            <Loader />
          ) : error ? (
            <Error {...error} />
          ) : success ? (
            <>
              {' '}
              <Grid layout='grid--1x2'>
                <div className='profile__name-container'>
                  {this.renderInput(firstNameInput)}
                </div>
                <div className='profile__name-container'>
                  {this.renderInput(lastNameInput)}
                </div>
              </Grid>
              {this.renderInput(emailInput)}
              {this.renderInput(phoneInput)}
              {this.renderInput(newPasswordInput)}
              {this.renderInput(confirmNewPasswordInput)}
              {!editProfileMode
                ? this.renderButton(editProfileButton)
                : this.renderButton(discardButton)}{' '}
              {editProfileMode && this.renderButton(updateProfileButton)}{' '}
            </>
          ) : null}
        </form>
      </Container>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.user,
  userUpdate: state.userUpdate,
});

const mapDispatchToProps = (dispatch) => ({
  getUserDetails: () => dispatch(action.getUserDetails()),
  updateUserDetails: (payload) => dispatch(action.updateUserDetails(payload)),
  resetUpdateUserDetails: () => dispatch(action.resetUpdateUserDetails()),
});

export default connect(mapStateToProps, mapDispatchToProps)(MyProfile);
