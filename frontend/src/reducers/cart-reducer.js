import {
  CART_ADD_ITEM,
  CART_REMOVE_ITEM,
  CART_REMOVE_ALL
} from "../actions/cart/cart-types";

const initialState = {
  cartItems: []
};

const cartReducer = (state = initialState, {type, payload = null}) => {

  switch(type) {
    case CART_ADD_ITEM:
      const newItem = payload;
      const isItemExist = state.cartItems.find((product) => product._id === newItem._id);

      if (isItemExist) {
        return {
          ...state,
          cartItems: state.cartItems.map((item) => item._id === newItem._id ? newItem : item)
        }
      }

      return {
        ...state,
        cartItems: [...state.cartItems, newItem]
      }
    case CART_REMOVE_ITEM:
      return {
        ...state,
        cartItems: state.cartItems.filter((item) => item._id !== payload)
      }
    case CART_REMOVE_ALL:
      return {
        ...state,
        cartItems: []
      }
    default:
      return state;
  }
};

export default cartReducer;
