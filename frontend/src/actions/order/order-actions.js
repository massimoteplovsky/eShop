import {
  CREATE_ORDER,
  FETCH_ORDER,
  ADD_SHIPPING_INFO,
  ADD_PAYMENT_METHOD,
  CHANGE_ORDER_STEPS,
  RESET_ORDER,
  PAY_ORDER,
  FECTH_USER_ORDERS
} from "./order-types";
import {asyncActionCreator, actionCreator} from "../../helpers";
import {ApiPath} from "../../consts";

export const create = asyncActionCreator(CREATE_ORDER);
export const fetchOrderById = asyncActionCreator(FETCH_ORDER);
export const payOrder = asyncActionCreator(PAY_ORDER);
export const fetchUserOrders = asyncActionCreator(FECTH_USER_ORDERS);
export const addShippingInfo = actionCreator(ADD_SHIPPING_INFO);
export const addPaymentMethod = actionCreator(ADD_PAYMENT_METHOD);
export const changeOrderStep = actionCreator(CHANGE_ORDER_STEPS);
export const resetOrder = actionCreator(RESET_ORDER);

// Create a new order
export const createOrder = (orderData) => async (dispatch, _, api) => {
  try {
    dispatch(create.request());
    const order = await api.post(`/${ApiPath.ORDERS}`, orderData);
    dispatch(create.success(order));
  } catch (err) {
    dispatch(create.failure(err));
  }
}

// Get user's orders
export const getUserOrders = () => async (dispatch, _, api) => {
  try {
    dispatch(fetchUserOrders.request());
    const orders = await api.get(`/${ApiPath.ORDERS}`);
    dispatch(fetchUserOrders.success(orders));
  } catch (err) {
    dispatch(fetchUserOrders.failure(err));
  }
}

// Get order by id
export const fetchOrder = (orderID) => async (dispatch, _, api) => {
  try {
    dispatch(fetchOrderById.request());
    const order = await api.get(`/${ApiPath.ORDERS}/${orderID}`);
    dispatch(fetchOrderById.success(order));
  } catch (err) {
    dispatch(fetchOrderById.failure(err));
  }
}

// Order payment
export const payUserOrder = (orderID, paymentResult) => async (dispatch, _, api) => {
  try {
    dispatch(payOrder.request());
    const updatedOrder = await api.put(`/${ApiPath.ORDERS}/${orderID}`, paymentResult);
    dispatch(payOrder.success(updatedOrder));
  } catch (err) {
    dispatch(payOrder.failure(err));
  }
}
