import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { paymentActions as action, rentalActions } from '../redux/actions';
import { Button } from '../common';
import { loadScript } from '../utils';

const RazorpayButton = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.userLogin);
  const { data: rentalData } = useSelector((state) => state.rentalDetails);
  const {
    error: createOrderFailed,
    success: createOrderSucceeded,
    data: order,
  } = useSelector((state) => state.createRazorpayOrder);
  const { error: paymentError, success: paymentSuccess } = useSelector(
    (state) => state.createRazorpayPayment
  );

  const handleClick = () => {
    dispatch(action.createRazorpayOrder({ rentalId: rentalData.id }));
  };

  useEffect(async () => {
    try {
      await loadScript('https://checkout.razorpay.com/v1/checkout.js');
    } catch (error) {
      toast.error('Unable to load payment gateway!');
    }
  }, []);

  useEffect(() => {
    if (createOrderSucceeded) {
      const { key, amount, currency, id } = order;
      const options = {
        order_id: id,
        key,
        amount,
        currency,
        name: 'Rent & Run',
        description: `Pay rental for ${rentalData.vehicle_brand} ${rentalData.vehicle_model_name}`,
        handler(response) {
          dispatch(
            action.createPayment({
              rentalId: rentalData.id,
              transactionDetails: response,
            })
          );
        },
        prefill: {
          name: user.name,
          email: user.email,
        },
        theme: { color: '#f77f00' },
        modal: {
          confirm_close: true,
          ondismiss() {
            dispatch(action.resetCreateRazorpayOrder());
          },
        },
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();
    }

    if (createOrderFailed) {
      toast.error(createOrderFailed.errorMessage);
    }

    return () => {
      if (createOrderFailed) dispatch(action.resetCreateRazorpayOrder());
    };
  }, [createOrderSucceeded, createOrderFailed]);

  useEffect(() => {
    if (paymentSuccess) {
      toast.success('Payment is successful for the rental!');
      dispatch(rentalActions.getRentalDetails({ id: rentalData.id }));
    }
    if (paymentError) toast.error(paymentError.errorMessage);

    return () => {
      if (paymentError || paymentSuccess) {
        dispatch(action.resetCreatePayment());
        dispatch(action.resetCreateRazorpayOrder());
      }
    };
  }, [paymentSuccess, paymentError]);

  return (
    <Button
      variant='secondary'
      block
      id='razorpay-button'
      onClick={handleClick}
    >
      Pay With RazorPay
    </Button>
  );
};

export default RazorpayButton;
