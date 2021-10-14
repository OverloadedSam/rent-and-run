import { rentalTypes as actions } from '../action-types';

const createRentalInitState = {
  loading: false,
  error: null,
  success: false,
  data: null,
};

const createRentalReducer = (state = createRentalInitState, action) => {
  switch (action.type) {
    case actions.CREATE_RENTAL_REQUESTED:
      return { ...state, loading: true };
    case actions.CREATE_RENTAL_SUCCEEDED:
      return {
        ...state,
        loading: false,
        success: true,
        error: null,
        data: action.payload,
      };
    case actions.CREATE_RENTAL_FAILED:
      return { ...state, loading: false, error: action.payload };
    case actions.CREATE_RENTAL_RESET:
      return { ...createRentalInitState };
    default:
      return state;
  }
};

export default { createRentalReducer };
