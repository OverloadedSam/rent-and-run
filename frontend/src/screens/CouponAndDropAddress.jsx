import React from 'react';
import Joi from 'joi-browser';
import { Form, Container, StepCounter } from '../common';

export class CouponAndDropAddress extends Form {
  constructor() {
    super();
    this.state = {
      data: {
        coupon: '',
        dropAddress: '',
      },
      errors: {},
    };
  }

  schema = {
    coupon: Joi.string().allow('').trim().label('Coupon'),
    dropAddress: Joi.string()
      .min(15)
      .allow('')
      .trim()
      .label('Dropping Location'),
  };

  render() {
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
      id: 'dropAddress',
      label: 'Drop Address',
      placeholder: `Location for dropping vehicle after you are done with rental. (Charges may apply)`,
    };

    const continueButton = {
      label: 'Continue',
      variant: 'secondary',
      block: true,
    };
    return (
      <Container className='block block-checkout'>
        <StepCounter totalSteps={3} activeStepNumber={1} />
        <form className='checkout-form'>
          {this.renderInput(couponInput)}
          {this.renderTextArea(dropAddressInput)}
          {this.renderButton(continueButton)}
        </form>
      </Container>
    );
  }
}

export default CouponAndDropAddress;
