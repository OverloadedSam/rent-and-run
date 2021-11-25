import { http } from '../../services';
import { rentalTypes as actions } from '../action-types';

const getRentalsList = () => async (dispatch) => {
  dispatch({ type: actions.RENTALS_REQUESTED });

  try {
    const { data: { data } } = await http.get('/myRentals');
    dispatch({
      type: actions.RENTALS_SUCCEEDED,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: actions.RENTALS_FAILED,
      payload: {
        errorMessage:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      },
    });
  }
};

const getRentalDetails = (payload) => async (dispatch) => {
  dispatch({ type: actions.RENTAL_DETAILS_REQUESTED });

  try {
    const { data: { data } } = await http.get(`rental/${payload.id}`);
    dispatch({ type: actions.RENTAL_DETAILS_SUCCEEDED, payload: data });
  } catch (error) {
    dispatch({
      type: actions.RENTAL_DETAILS_FAILED,
      payload: {
        errorMessage:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      },
    });
  }
};

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

const completeRental = (payload) => async (dispatch) => {
  dispatch({ type: actions.COMPLETE_RENTAL_REQUESTED });
  try {
    const { data: { data } } = await http.put(`/completeRental/${payload.id}`, payload);
    dispatch({ type: actions.COMPLETE_RENTAL_SUCCEEDED, payload: data });
  } catch (error) {
    dispatch({
      type: actions.COMPLETE_RENTAL_FAILED,
      payload: {
        errorMessage:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      },
    });
  }
};

const resetCompleteRental = () => async (dispatch) => {
  dispatch({ type: actions.COMPLETE_RENTAL_RESET });
};

export default {
  getRentalsList,
  getRentalDetails,
  createRental,
  resetCreateRental,
  completeRental,
  resetCompleteRental,
};
