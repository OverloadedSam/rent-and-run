import React from 'react';
import Joi from 'joi-browser';
import { Navigate } from 'react-router-dom';
import { connect } from 'react-redux';
import { couponActions } from '../redux/actions';
import { withRouterProps } from '../hoc';
import { Form, Container, StepCounter } from '../common';

export class CouponAndDropAddress extends Form {
  constructor() {
    super();
    this.state = {
      data: {
        coupon: '',
        drop_address: '',
      },
      errors: {},
      responseError: null,
    };
  }

  schema = {
    coupon: Joi.string().allow('').trim().label('Coupon'),
    drop_address: Joi.string()
      .min(15)
      .allow('')
      .trim()
      .label('Dropping Location'),
  };

  performSubmit = () => {
    const { coupon } = this.state.data;
    const { validateCoupon, location, navigate } = this.props;
    if (coupon.trim()) {
      validateCoupon({ coupon });
    } else {
      const options = { replace: true, state: { ...location.state, ...this.state.data } };
      navigate('/checkout/payment', options);
    }
  };

  componentDidUpdate() {
    const {
      location,
      navigate,
      coupon: { success, error, data },
    } = this.props;

    if (success) {
      const options = { replace: true, state: { ...location.state, ...this.state.data, ...data } };
      navigate('/checkout/payment', options);
      return this.props.resetValidateCoupon();
    }

    if (error) {
      this.setState({ responseError: error.errorMessage });
      return this.props.resetValidateCoupon();
    }
    return null;
  }

  render() {
    const { responseError } = this.state;
    const { loading } = this.props.coupon;

    const couponInput = {
      id: 'coupon',
      type: 'text',
      label: 'Coupon',
      placeholder: 'Apply coupon here',
      autoFocus: true,
      groupElement: {
        left: (
          <div className='input-group__icon'>
            <svg className='icon icon--primary'>
              <use href='/assets/icons/coupon.svg#coupon' />
            </svg>
          </div>
        ),
      },
    };

    const dropAddressInput = {
      id: 'drop_address',
      label: 'Drop Address',
      placeholder: `Location for dropping vehicle after you are done with rental. (Charges may apply)`,
    };

    const continueButton = {
      label: loading ? 'Validating Coupon...' : 'Continue',
      variant: 'secondary',
      type: 'submit',
      block: true,
      disabled: loading,
    };

    if (!this.props.location.state) return <Navigate to='/' />;
    return (
      <Container className='block block-checkout'>
        <StepCounter totalSteps={3} activeStepNumber={1} />
        <form className='checkout-form'>
          {responseError && (
            <p className='checkout-form__error-response'>{responseError}</p>
          )}
          {this.renderInput(couponInput)}
          {this.renderTextArea(dropAddressInput)}
          {this.renderButton(continueButton)}
        </form>
      </Container>
    );
  }
}

const mapStateToProps = (state) => ({ coupon: state.coupon });

const mapDispatchToProps = (dispatch) => ({
  validateCoupon: (payload) => dispatch(couponActions.validateCoupon(payload)),
  resetValidateCoupon: () => dispatch(couponActions.resetValidateCoupon()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouterProps(CouponAndDropAddress));
