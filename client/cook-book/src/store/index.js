import { applyMiddleware, combineReducers, createStore } from "redux";
import rootReducer from "../reducers";
import registerReducer from "../reducers/registerUser";
import recipeReducer from "../reducers/recipeReducer";
import { composeWithDevTools } from "redux-devtools-extension";
import thunkMiddleware from "redux-thunk";

const composedEnhancer = composeWithDevTools(applyMiddleware(thunkMiddleware));
const reducers = combineReducers({
  rootReducer,
  registerReducer,
  recipeReducer
});

const store = createStore(reducers, composedEnhancer);
export default store;
