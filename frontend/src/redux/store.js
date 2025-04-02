import { createStore, combineReducers, applyMiddleware } from "redux";
import { thunk } from "redux-thunk";
import { loadingReducer } from "./reducer/loading";
import { profileReducer } from "./reducer/profile";
import { noteReducer } from "./reducer/noteMaking";

const reducer = combineReducers({
  loading: loadingReducer,
  profile: profileReducer,
  note: noteReducer,
});

const initialstate = {};
const middleware = [thunk];
const store = createStore(
  reducer,
  initialstate,
  applyMiddleware(...middleware)
);

export default store;
