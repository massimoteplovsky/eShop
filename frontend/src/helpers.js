import axios from "axios";
import moment from "moment";
import {API_URL} from "./consts";

export const formatDate = (date) => moment(date).format("DD/MM/YYYY, HH:MM");

export const dispatchAction = (dispatch, type, payload = null) => {
  dispatch({type, payload});
};

export const calcTotalItemsInCart = (items) => items.reduce((total, item) => total += item.qty, 0);
export const calcTotalPrice = (items) => items.reduce((totalPrice, item) => totalPrice + item.qty * item.price, 0).toFixed(2);
export const getClientID = async () => {
  return await axios.get(`${API_URL}/config/paypal`);
}

export const asyncActionCreator = action => {
  const values = ["SUCCESS", "FAILURE","REQUEST"];
  const types = values.reduce((acc, value) => {
    const type = `${action}_${value}`;
    acc[value] = type;
    acc[value.toLowerCase()] = (payload = null) => ({
      type,
      payload,
    });
    return acc;
  }, {});
  return types;
};

export const actionCreator = (type) => {
  return (payload = null) => ({
    type,
    payload
  });
};

export const reducerHandler = (state, {type, payload}, actionHandler) => {
  switch(type) {
    case actionHandler.REQUEST:
      return {
        ...state,
        loading: true
      }
    case actionHandler.SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        data: payload,
        error: null
      }
    case actionHandler.FAILURE:
       return {
        ...state,
        loading: false,
        success: false,
        error: payload,
        data: state.data,
      }
    default:
      return state;
  }
}

export const loadState = () => {
  try {
    const state = localStorage.getItem("state");

    if (state === null) {
      return undefined;
    }

    return JSON.parse(state);
  } catch (err) {
    return undefined;
  }
};

export const saveState = (state) => {
  try {
    localStorage.setItem("state", JSON.stringify(state));
  } catch {}
};
