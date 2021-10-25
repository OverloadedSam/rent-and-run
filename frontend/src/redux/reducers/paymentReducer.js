import { paymentTypes as actions } from '../action-types';

const createRazorpayOrderInitState = {
  loading: false,
  error: null,
  success: false,
  data: null,
};

const createRazorpayOrderReducer = (
  state = createRazorpayOrderInitState,
  action
) => {
  switch (action.type) {
    case actions.CREATE_RAZORPAY_ORDER_REQUESTED:
      return { ...createRazorpayOrderInitState, loading: true };
    case actions.CREATE_RAZORPAY_ORDER_SUCCEEDED:
      return {
        ...state,
        loading: false,
        success: true,
        error: null,
        data: action.payload,
      };
    case actions.CREATE_RAZORPAY_ORDER_FAILED:
      return { ...state, loading: false, error: action.payload };
    case actions.CREATE_RAZORPAY_ORDER_RESET:
      return { ...createRazorpayOrderInitState };
    default:
      return state;
  }
};

const createPaymentInitState = {
  loading: false,
  error: null,
  success: false,
  data: null,
};

const createPaymentReducer = (state = createPaymentInitState, action) => {
  switch (action.type) {
    case actions.CREATE_PAYMENT_REQUESTED:
      return { ...createPaymentInitState, loading: true };
    case actions.CREATE_PAYMENT_SUCCEEDED:
      return {
        ...state,
        loading: false,
        success: true,
        error: null,
        data: action.payload,
      };
    case actions.CREATE_PAYMENT_FAILED:
      return { ...state, loading: false, error: action.payload };
    case actions.CREATE_PAYMENT_RESET:
      return { ...createPaymentInitState };
    default:
      return state;
  }
};

export default { createRazorpayOrderReducer, createPaymentReducer };
