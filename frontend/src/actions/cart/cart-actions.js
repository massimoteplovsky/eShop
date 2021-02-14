import {
  CART_ADD_ITEM,
  CART_REMOVE_ITEM,
  CART_REMOVE_ALL
} from "./cart-types";
import {fetchProduct} from "../product/product-actions";
import {actionCreator} from "../../helpers";
import {ApiPath} from "../../consts";

export const deleteAllCartItems = actionCreator(CART_REMOVE_ALL);
const addCartItem = actionCreator(CART_ADD_ITEM);
const deleteItem = actionCreator(CART_REMOVE_ITEM);

// Add item to cart action
export const addItemToCart = (prodID, qty) => async (dispatch, _, api) => {

  try {
    const {_id, name, image, price, countInStock} = await api.get(`/${ApiPath.PRODUCTS}/${prodID}`);
    const cartItem = {
      _id,
      name,
      image,
      price,
      countInStock,
      qty
    };
    dispatch(addCartItem(cartItem));
  } catch(err) {
    dispatch(fetchProduct.failure(err));
  }
}

// Delete item from cart action
export const deleteItemFromCart = (prodID) => (dispatch, getState) => {
  dispatch(deleteItem(prodID));
}

// Delete all items from the cart
export const resetCart = () => (dispatch) => {
  dispatch(deleteAllCartItems());
}
