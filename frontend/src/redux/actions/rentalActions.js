import { http } from '../../services';
import { rentalTypes as actions } from '../action-types';

const createRental = (payload) => async (dispatch) => {
  dispatch({ type: actions.CREATE_RENTAL_REQUESTED });
  try {
    const { data: { data } } = await http.post(`/createRental/${payload.vehicle}`, payload);
    dispatch({ type: actions.CREATE_RENTAL_SUCCEEDED, payload: data });
  } catch (error) {
    dispatch({
      type: actions.CREATE_RENTAL_FAILED,
      payload: {
        errorMessage:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      },
    });
  }
};

const resetCreateRental = () => async (dispatch) => {
  dispatch({ type: actions.CREATE_RENTAL_RESET });
};

export default { createRental, resetCreateRental };
