import { rentalTypes as actions } from '../action-types';

const rentalsInitState = {
  loading: false,
  error: null,
  success: false,
  data: null,
};

const rentalsReducer = (state = rentalsInitState, action) => {
  switch (action.type) {
    case actions.RENTALS_REQUESTED:
      return { ...state, loading: true };
    case actions.RENTALS_SUCCEEDED:
      return {
        ...state,
        loading: false,
        success: true,
        error: null,
        data: action.payload,
      };
    case actions.RENTALS_FAILED:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

const rentalDetailsInitState = {
  loading: false,
  error: null,
  success: false,
  data: null,
};

const rentalDetailsReducer = (state = rentalDetailsInitState, action) => {
  switch (action.type) {
    case actions.RENTAL_DETAILS_REQUESTED:
      return { ...state, loading: true };
    case actions.RENTAL_DETAILS_SUCCEEDED:
      return {
        ...state,
        loading: false,
        success: true,
        error: null,
        data: action.payload,
      };
    case actions.RENTAL_DETAILS_FAILED:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

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

const completeRentalInitState = {
  loading: false,
  error: null,
  success: false,
  data: null,
};

const completeRentalReducer = (state = completeRentalInitState, action) => {
  switch (action.type) {
    case actions.COMPLETE_RENTAL_REQUESTED:
      return { ...state, loading: true };
    case actions.COMPLETE_RENTAL_SUCCEEDED:
      return {
        ...state,
        loading: false,
        success: true,
        error: null,
        data: action.payload,
      };
    case actions.COMPLETE_RENTAL_FAILED:
      return { ...state, loading: false, error: action.payload };
    case actions.COMPLETE_RENTAL_RESET:
      return { ...completeRentalInitState };
    default:
      return state;
  }
};

export default {
  rentalsReducer,
  rentalDetailsReducer,
  createRentalReducer,
  completeRentalReducer,
};
