import {
  RESET_ORDER,
  ADD_SHIPPING_INFO,
  ADD_PAYMENT_METHOD,
  CHANGE_ORDER_STEPS
} from "../actions/order/order-types";
import {create, fetchOrderById, payOrder, fetchUserOrders} from "../actions/order/order-actions";
import {reducerHandler} from "../helpers";

const initialAsyncState = {
  loading: false,
  success: false,
  data: null,
  error: null
}

const initialState = {
  userOrders: initialAsyncState,
  order: initialAsyncState,
  shippingInfo: null,
  paymentMethod: null,
  orderStep: null
};

const orderReducer = (state = initialState, {type, payload = null}) => {

  switch(type) {
    case create.REQUEST:
    case create.SUCCESS:
    case create.FAILURE:
      return {
        ...state,
        order: reducerHandler(state.order, {type, payload}, create)
      }
    case fetchOrderById.REQUEST:
    case fetchOrderById.SUCCESS:
    case fetchOrderById.FAILURE:
      return {
        ...state,
        order: reducerHandler(state.order, {type, payload}, fetchOrderById)
      }
    case payOrder.REQUEST:
    case payOrder.SUCCESS:
    case payOrder.FAILURE:
      return {
        ...state,
        order: reducerHandler(state.order, {type, payload}, payOrder)
      }
    case fetchUserOrders.REQUEST:
    case fetchUserOrders.SUCCESS:
    case fetchUserOrders.FAILURE:
      return {
        ...state,
        userOrders: reducerHandler(state.order, {type, payload}, fetchUserOrders)
      }
    case ADD_SHIPPING_INFO:
      return {
        ...state,
        shippingInfo: payload
      }
    case ADD_PAYMENT_METHOD:
      return {
        ...state,
        paymentMethod: payload
      }
    case CHANGE_ORDER_STEPS:
      return {
        ...state,
        orderStep: payload
      }
    case RESET_ORDER:
      return initialState;
    default:
      return state;
  }
};

export default orderReducer;
