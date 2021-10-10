import React from 'react';
import Joi from 'joi-browser';
import { Form, Container, StepCounter } from '../common';

export class PaymentMethod extends Form {
  constructor() {
    super();
    this.state = {
      data: { paymentMethod: '' },
      errors: {},
    };
  }

  schema = { paymentMethod: Joi.string().required().label('Payment Method') };

  render() {
    const paymentMethodSelect = {
      id: 'paymentMethod',
      label: 'Payment Method',
      options: [
        { value: '', text: 'Select payment method' },
        { value: 0, text: 'PayPal' },
        { value: 1, text: 'RazorPay' },
        { value: 2, text: 'Stripe' },
        { value: 3, text: 'PayTm' },
      ],
    };

    const continueButton = {
      label: 'Continue',
      variant: 'secondary',
      block: true,
    };
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

export default PaymentMethod;
