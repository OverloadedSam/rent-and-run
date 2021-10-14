import { http } from '../../services';
import { couponTypes as actions } from '../action-types';

const validateCoupon = (payload) => async (dispatch) => {
  dispatch({ type: actions.VALIDATE_COUPON_REQUESTED });
  try {
    const { data: { data } } = await http.post('/validateCoupon', payload);
    dispatch({ type: actions.VALIDATE_COUPON_SUCCEEDED, payload: data });
  } catch (error) {
    dispatch({
      type: actions.VALIDATE_COUPON_FAILED,
      payload: {
        errorMessage:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      },
    });
  }
};

const resetValidateCoupon = () => async (dispatch) => {
  dispatch({ type: actions.VALIDATE_COUPON_RESET });
};

export default { validateCoupon, resetValidateCoupon };
