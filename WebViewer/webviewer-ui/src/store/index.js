import { combineReducers, createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import studies from "./studies";
import ui from "./ui";

const reducer = combineReducers({
  studies: studies,
  ui: ui
});

const middleware = [thunk];

const initialState = {};
const store = createStore(
  reducer,
  initialState,
  compose(
    applyMiddleware(...middleware),
    window.__REDUX_DEVTOOLS_EXTENSION__
      ? window.__REDUX_DEVTOOLS_EXTENSION__()
      : f => f
  )
);

export default store;
