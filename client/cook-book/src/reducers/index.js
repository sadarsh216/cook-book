import { userConstants } from "../constants";

let _user = localStorage.getItem("user");
let user = JSON.parse(_user)
const initialState = user ? { loggedIn: true, user,error:"" } : {loggedIn:false};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case userConstants.LOGIN_REQUEST:
      return {
        loggingIn: true,
        user: action.payload.email,
      };
    case userConstants.LOGIN_SUCCESS:
      return {
        loggedIn: true,
        user: action.payload.data,
      };
    case userConstants.LOGIN_FAILURE:
      return {
        loggedIn: false,
        error:action.payload.msg
      };
    case userConstants.LOGOUT_REQUEST:
      localStorage.removeItem("user");
      return {
        loggedIn: false,
      };
    default:
      return state;
  }
}

export default rootReducer;
