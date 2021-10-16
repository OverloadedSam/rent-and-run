import React from 'react';
import Joi from 'joi-browser';
import { Navigate } from 'react-router-dom';
import { withRouterProps } from '../hoc';
import { Form, Container, StepCounter } from '../common';

export class PaymentMethod extends Form {
  constructor() {
    super();
    this.state = {
      data: { payment_method: '' },
      errors: {},
    };
  }

  schema = { payment_method: Joi.string().required().label('Payment Method') };

  performSubmit = () => {
    const { location, navigate } = this.props;
    const options = { replace: true, state: { ...location.state, ...this.state.data } };
    navigate('/checkout/placerental', options);
  };

  render() {
    const paymentMethodSelect = {
      id: 'payment_method',
      label: 'Payment Method',
      options: [
        { value: '', text: 'Select payment method' },
        { value: 1, text: 'PayPal' },
        { value: 2, text: 'RazorPay' },
      ],
    };

    const continueButton = {
      label: 'Continue',
      variant: 'secondary',
      block: true,
    };

    if (!this.props.location.state) return <Navigate to='/' />;
    return (
      <Container className='block block-checkout'>
        <StepCounter totalSteps={3} activeStepNumber={2} />
        <form className='checkout-form'>
          {this.renderSelect(paymentMethodSelect)}
          {this.renderButton(continueButton)}
        </form>
      </Container>
    );
  }
}

export default withRouterProps(PaymentMethod);
