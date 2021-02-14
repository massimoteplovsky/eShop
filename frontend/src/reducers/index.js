import {combineReducers} from "redux";
import productsReducer from "./products-reducer";
import cartReducer from "./cart-reducer";
import userReducer from "./user-reducer";
import orderReducer from "./order-reducer";

const rootReducer = combineReducers({
  products: productsReducer,
  cart: cartReducer,
  user: userReducer,
  order: orderReducer
});

export default rootReducer;
