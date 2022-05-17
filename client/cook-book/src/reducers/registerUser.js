import { userConstants } from "../constants";

const initialState = { registering: false, registered: false, registerError: "" };

function registerReducer(state = initialState, action) {
  switch (action.type) {
    case userConstants.REGISTER_REQUEST:
      return {
        registering: true,
      };
    case userConstants.REGISTER_SUCCESS:
      return {
        registering: false,
        registered: true,
      };
    case userConstants.REGISTER_FAILURE:
      return {
        registering: false,
        registered: false,
        registerError: action.payload.msg,
      };
    default:
      return state;
  }
}

export default registerReducer;
