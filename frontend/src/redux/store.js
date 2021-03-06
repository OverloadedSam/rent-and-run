import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import {
  cartReducer,
  userReducer,
  vehicleReducer,
  rentalReducer,
  couponReducer,
  paymentReducer,
} from './reducers';
import { auth } from '../services';

const rootReducer = combineReducers({
  userRegister: userReducer.userRegisterReducer,
  userLogin: userReducer.userLoginReducer,
  user: userReducer.userDetailsReducer,
  userUpdate: userReducer.userUpdateReducer,
  vehicles: vehicleReducer.vehiclesReducer,
  vehicleDetails: vehicleReducer.vehicleDetailsReducer,
  rentals: rentalReducer.rentalsReducer,
  rentalDetails: rentalReducer.rentalDetailsReducer,
  createRental: rentalReducer.createRentalReducer,
  completeRental: rentalReducer.completeRentalReducer,
  cart: cartReducer.cartItemReducer,
  coupon: couponReducer.validateCouponReducer,
  createRazorpayOrder: paymentReducer.createRazorpayOrderReducer,
  createRazorpayPayment: paymentReducer.createPaymentReducer,
});

const middleware = [thunk];

const user = auth.getCurrentUser();
const token = auth.getAuthToken();
const cartItems = localStorage.getItem('cartItems')
  ? JSON.parse(localStorage.getItem('cartItems'))
  : [];

const initialState = {
  userLogin: {
    isLoggedIn: !!(user && token),
    user,
    token,
  },
  cart: {
    loading: false,
    error: null,
    success: false,
    cartItems,
  },
};

const store = createStore(
  rootReducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
