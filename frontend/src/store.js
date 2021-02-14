import {createStore, applyMiddleware} from "redux";
import thunk from "redux-thunk";
import {composeWithDevTools} from "redux-devtools-extension";
import throttle from 'lodash.throttle';
import rootReducer from "./reducers";
import createAPI from "./api";
import {saveState, loadState} from "./helpers";

const api = createAPI();

// const persistedState = loadState();
const store = createStore(
  rootReducer,
  //persistedState,
  composeWithDevTools(applyMiddleware(thunk.withExtraArgument(api)))
);

// store.subscribe(throttle(() => {
//   saveState(store.getState());
// }), 1000);

export default store;
