import { vehicleTypes as actions } from '../action-types';

const vehiclesInitState = {
  loading: false,
  error: null,
  success: false,
  data: null,
};

const vehiclesReducer = (state = vehiclesInitState, action) => {
  switch (action.type) {
    case actions.VEHICLES_REQUESTED:
      return { ...state, loading: true };
    case actions.VEHICLES_SUCCEEDED:
      return {
        ...state,
        loading: false,
        success: true,
        error: null,
        data: action.payload,
      };
    case actions.VEHICLES_FAILED:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export default { vehiclesReducer };
