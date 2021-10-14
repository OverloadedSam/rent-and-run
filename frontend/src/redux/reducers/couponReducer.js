import { couponTypes as actions } from '../action-types';

const validateCouponInitState = {
  loading: false,
  error: null,
  success: false,
  data: null,
};

const validateCouponReducer = (state = validateCouponInitState, action) => {
  switch (action.type) {
    case actions.VALIDATE_COUPON_REQUESTED:
      return { ...state, loading: true };
    case actions.VALIDATE_COUPON_SUCCEEDED:
      return {
        ...state,
        loading: false,
        success: true,
        error: null,
        data: action.payload,
      };
    case actions.VALIDATE_COUPON_FAILED:
      return { ...state, loading: false, error: action.payload };
    case actions.VALIDATE_COUPON_RESET:
      return { ...validateCouponInitState };
    default:
      return state;
  }
};

export default { validateCouponReducer };
