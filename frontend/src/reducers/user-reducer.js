import {
  RESET_LOGIN,
  RESET_REGISTRATION,
  RESET_UPDATE,
  RESET_USERS
} from "../actions/user/user-types";

import {
  checkAuth,
  login,
  registrate,
  update,
  logout,
  fetchUsers,
  remove
} from "../actions/user/user-actions";
import {reducerHandler} from "../helpers";

const initialAsyncState = {
  data: null,
  loading: false,
  error: null,
  success: false
}

const initialState = {
  users: {...initialAsyncState, data: []},
  auth: initialAsyncState,
  login: initialAsyncState,
  registration: initialAsyncState,
  update: initialAsyncState,
  logout: initialAsyncState
}

const userReducer = (state = initialState, {type, payload = null}) => {
  switch (type) {
    case remove.REQUSET:
    case remove.SUCCESS:
    case remove.FAILURE:
      return {
        ...state,
        users: reducerHandler(state.users, {type, payload}, remove)
      };
    case fetchUsers.REQUSET:
    case fetchUsers.SUCCESS:
    case fetchUsers.FAILURE:
      return {
        ...state,
        users: reducerHandler(state.users, {type, payload}, fetchUsers)
      };
    case checkAuth.REQUSET:
    case checkAuth.SUCCESS:
    case checkAuth.FAILURE:
      return {
        ...state,
        auth: reducerHandler(state.auth, {type, payload}, checkAuth)
      };
    case login.REQUEST:
    case login.SUCCESS:
    case login.FAILURE:
      return {
        ...state,
        login: reducerHandler(state.login, {type, payload}, login)
      }
    case registrate.REQUEST:
    case registrate.SUCCESS:
    case registrate.FAILURE:
      return {
        ...state,
        registration: reducerHandler(state.registration, {type, payload}, registrate)
      }
    case update.REQUEST:
    case update.FAILURE:
      return {
        ...state,
        update: reducerHandler(state.update, {type, payload}, update)
      }
    case update.SUCCESS:
      return {
        ...state,
        update: reducerHandler(state.update, {type, payload}, update),
        auth: {
          ...state.auth,
          data: payload
        }
      }
    case logout.SUCCESS:
    case logout.FAILURE:
      return {
        ...state,
        auth: initialAsyncState
      }
    case RESET_LOGIN:
      return {
        ...state,
        login: initialAsyncState
      }
    case RESET_REGISTRATION:
      return {
        ...state,
        registration: initialAsyncState
      }
    case RESET_UPDATE:
      return {
        ...state,
          update: initialAsyncState
      }
    case RESET_USERS:
      return {
        ...state,
        users: {...initialAsyncState, data: []}
      }
    default:
      return state
  }
}

export default userReducer;
