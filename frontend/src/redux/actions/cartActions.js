import { http } from '../../services';
import { cartTypes as actions } from '../action-types';

const addToCart = (payload) => async (dispatch, getState) => {
  dispatch({ type: actions.ADD_TO_CART_REQUESTED });
  const { vehicleId, bookingDate, returningDate } = payload;
  const endpoint = `/vehicle/${vehicleId}?bookingDate=${bookingDate}&returningDate=${returningDate}`;

  try {
    const { data: { data } } = await http.get(endpoint);

    if (data.available_count < 0) {
      throw new Error('Vehicle is not available for rental on requested date!');
    }

    const vehicle = {
      id: data.id,
      vehicleName: `${data.brand} ${data.model_name}`,
      vehicleImage: data.images[0],
      bookingDate,
      returningDate,
      dailyRentalRate: data.daily_rental_rate,
    };

    dispatch({
      type: actions.ADD_TO_CART_SUCCEEDED,
      payload: vehicle,
    });

    localStorage.setItem(
      'cartItems',
      JSON.stringify(getState().cart.cartItems)
    );
  } catch (error) {
    dispatch({
      type: actions.ADD_TO_CART_FAILED,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

const deleteItemFromCart = (payload) => (dispatch, getState) => {
  dispatch({ type: actions.REMOVE_ITEM_FROM_CART, payload });

  localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems));
};

export default { addToCart, deleteItemFromCart };
