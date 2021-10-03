import { cartTypes as actions } from '../action-types';

const cartReducerInitState = {
  loading: false,
  error: null,
  success: false,
  cartItems: [],
};

export const cartItemReducer = (state = cartReducerInitState, action) => {
  switch (action.type) {
    case actions.ADD_TO_CART_REQUESTED: {
      return {
        ...state,
        loading: true,
      };
    }

    case actions.ADD_TO_CART_SUCCEEDED: {
      const itemExist = state.cartItems.find(
        (item) => item.id === action.payload.id
      );

      if (itemExist) {
        const items = state.cartItems.map((item) => {
          if (item.id === itemExist.id) return action.payload;
          return item;
        });
        return {
          ...state,
          success: true,
          cartItems: items,
        };
      }

      return {
        ...state,
        loading: false,
        success: true,
        cartItems: [...state.cartItems, action.payload],
      };
    }

    case actions.ADD_TO_CART_FAILED: {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    }

    case actions.REMOVE_ITEM_FROM_CART: {
      const items = state.cartItems.filter(
        (item) => item.id !== action.payload.id
      );
      return { ...state, cartItems: items };
    }

    default: {
      return state;
    }
  }
};

export default { cartItemReducer };
