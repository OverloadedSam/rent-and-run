import { http } from '../../services';
import { vehicleTypes as actions } from '../action-types';

const getVehiclesList = (endpoint) => async (dispatch) => {
  dispatch({ type: actions.VEHICLES_REQUESTED });

  try {
    const { data } = await http.get(endpoint);
    dispatch({
      type: actions.VEHICLES_SUCCEEDED,
      payload: data.data,
    });
  } catch (error) {
    dispatch({
      type: actions.VEHICLES_FAILED,
      payload: {
        errorMessage:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      },
    });
  }
};

const getVehicleDetails = (endpoint) => async (dispatch) => {
  dispatch({ type: actions.VEHICLE_DETAILS_REQUESTED });

  try {
    const { data } = await http.get(endpoint);

    dispatch({ type: actions.VEHICLE_DETAILS_SUCCEEDED, payload: data.data });
  } catch (error) {
    dispatch({
      type: actions.VEHICLE_DETAILS_FAILED,
      payload: {
        errorMessage:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      },
    });
  }
};

export default { getVehiclesList, getVehicleDetails };
