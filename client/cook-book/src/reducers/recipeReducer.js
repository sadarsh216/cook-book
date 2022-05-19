import { recipeConstants } from "../constants";

const initialState = { loading: false, data: null, details: null };

export default function recipeReducer(state = initialState, action) {
  switch (action.type) {
    case recipeConstants.RECIPE_REQUEST:
      return {
        loading: true,
      };
    case recipeConstants.RECIPE_REQUEST_SUCCESS:
      return {
        loading: false,
        data: action.payload,
      };
    case recipeConstants.RECIPE_REQUEST_FAILURE:
      return {
        loading: false,
      };
    case recipeConstants.RECIPE_DETAIL_REQUEST:
      return {
        loading: true,
      };
    case recipeConstants.RECIPE_DETAIL_REQUEST_SUCCESS:
      return {
        ...state,
        loading: false,
        details: action.payload,
      };
    case recipeConstants.RECIPE_DETAIL_REQUEST_FAILURE:
      return {...state,
        loading: false,
      };
    default:
      return state;
  }
}
