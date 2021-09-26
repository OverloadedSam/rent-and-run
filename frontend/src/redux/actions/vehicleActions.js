import { http } from '../../services';
import { vehicleTypes as actions } from '../action-types';

const getVehiclesList = () => async (dispatch) => {
  dispatch({ type: actions.VEHICLES_REQUESTED });

  try {
    const { data } = await http.get('/vehicles');
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

const getVehicleDetails = (id) => async (dispatch) => {
  dispatch({ type: actions.VEHICLE_DETAILS_REQUESTED });

  try {
    const { data } = await http.get(`/vehicle/${id}`);

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
