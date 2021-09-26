import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { userReducer, vehicleReducer } from './reducers';
import { auth } from '../services';

const rootReducer = combineReducers({
  userRegister: userReducer.userRegisterReducer,
  userLogin: userReducer.userLoginReducer,
  vehicles: vehicleReducer.vehiclesReducer,
  vehicleDetails: vehicleReducer.vehicleDetailsReducer,
});

const middleware = [thunk];

const user = auth.getCurrentUser();
const token = auth.getAuthToken();

const initialState = {
  userLogin: {
    isLoggedIn: !!(user && token),
    user,
    token,
  },
};

const store = createStore(
  rootReducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
