import { http } from '../../services';
import { paymentTypes as actions } from '../action-types';

const createRazorpayOrder = (payload) => async (dispatch) => {
  dispatch({ type: actions.CREATE_RAZORPAY_ORDER_REQUESTED });
  try {
    const { data: { data } } = await http.post(`/createRazorpayOrder/${payload.rentalId}`);
    dispatch({ type: actions.CREATE_RAZORPAY_ORDER_SUCCEEDED, payload: data });
  } catch (error) {
    dispatch({
      type: actions.CREATE_RAZORPAY_ORDER_FAILED,
      payload: {
        errorMessage:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      },
    });
  }
};

const resetCreateRazorpayOrder = () => async (dispatch) => {
  dispatch({ type: actions.CREATE_RAZORPAY_ORDER_RESET });
};

const createPayment = (payload) => async (dispatch) => {
  dispatch({ type: actions.CREATE_PAYMENT_REQUESTED });
  try {
    const { data: { data } } = await http.post(`/payment/${payload.rentalId}`, payload);
    dispatch({
      type: actions.CREATE_PAYMENT_SUCCEEDED,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: actions.CREATE_PAYMENT_FAILED,
      payload: {
        errorMessage:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      },
    });
  }
};

const resetCreatePayment = () => async (dispatch) => {
  dispatch({ type: actions.CREATE_PAYMENT_RESET });
};

export default {
  createRazorpayOrder,
  resetCreateRazorpayOrder,
  createPayment,
  resetCreatePayment,
};
