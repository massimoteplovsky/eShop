import {
  RESET_LOGIN,
  RESET_REGISTRATION,
  RESET_UPDATE,
  CHECK_USER_AUTH,
  LOGIN_USER,
  REGISTRATE_USER,
  UPDATE_USER,
  LOGOUT_USER,
  FETCH_USERS,
  DELETE_USER,
  RESET_USERS
} from "./user-types";

import {deleteAllCartItems} from "../cart/cart-actions";
import {asyncActionCreator, actionCreator} from "../../helpers";
import {ApiPath} from "../../consts";

export const resetLogin = actionCreator(RESET_LOGIN);
export const resetRegistration = actionCreator(RESET_REGISTRATION);
export const resetUpdate = actionCreator(RESET_UPDATE);
export const resetUsers = actionCreator(RESET_USERS);
export const checkAuth = asyncActionCreator(CHECK_USER_AUTH);
export const login = asyncActionCreator(LOGIN_USER);
export const registrate = asyncActionCreator(REGISTRATE_USER);
export const update = asyncActionCreator(UPDATE_USER);
export const logout = asyncActionCreator(LOGOUT_USER);
export const fetchUsers = asyncActionCreator(FETCH_USERS);
export const remove = asyncActionCreator(DELETE_USER);

// Remove user
export const removeUser = (userID) => async (dispatch, getState, api) => {
  try {
    dispatch(remove.request());
    await api.delete(`${ApiPath.USER}/${userID}`);
    const prevUsers = getState().user.users.data;
    const users = prevUsers.filter((user) => user._id !== userID);
    dispatch(remove.success(users));
  } catch (err) {
    dispatch(remove.failure(err));
  }
}

// Fetch all users
export const fetchAllUsers = () => async (dispatch, _, api) => {
  try {
    dispatch(fetchUsers.request());
    const users = await api.get(`${ApiPath.USER}`);
    dispatch(fetchUsers.success(users));
  } catch (err) {
    dispatch(fetchUsers.failure(err));
  }
}

// Check if user is authorized on each route action
export const checkUserAuth = () => async (dispatch, _, api) => {
  try {
    dispatch(checkAuth.request());
    const userData = await api.get(`${ApiPath.USER}/auth`);
    dispatch(checkAuth.success(userData));
  } catch (err) {
    dispatch(checkAuth.failure(err));
  }
}

// Login user action
export const loginUser = (formData) => async (dispatch, _, api) => {
  try {
    dispatch(login.request());
    const userData = await api.post(`${ApiPath.USER}/login`, formData);
    dispatch(login.success(userData));
  } catch (err) {
    dispatch(login.failure(err));
  }
};


// Registrate a new user action
export const registerUser = (formData) => async (dispatch, _, api) => {
  try{
    dispatch(registrate.request());
    await api.post(`${ApiPath.USER}/register`, formData);
    dispatch(registrate.success());
  } catch (err) {
    dispatch(registrate.failure(err));
  }
}

// Update user data action
export const updateUser = (formData) => async (dispatch, _, api) => {
  try {
    dispatch(update.request());
    const userData = await api.put(`${ApiPath.USER}/profile`, formData);
    dispatch(update.success(userData));
  } catch(err) {
    dispatch(update.failure(err));
  }
}

// Logout user from application action
export const logoutUser = () => async (dispatch, _, api) => {
  try {
    await api.get(`${ApiPath.USER}/logout`);
    dispatch(logout.success());
    dispatch(deleteAllCartItems());
  } catch(err) {
    dispatch(logout.failure(err));
  }
}

