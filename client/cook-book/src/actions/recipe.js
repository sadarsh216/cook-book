import axios from "axios";
import { recipeConstants } from "../constants";
const BASE_URL = "http://localhost:8080";

export const getAllRecipes = () => {
  return (dispatch) => {
    axios
      .get(`${BASE_URL}/recipe`)
      .then((result) => {
        console.log(result);
        dispatch({
          type: recipeConstants.RECIPE_REQUEST_SUCCESS,
          payload: result.data,
        });
      })
      .catch((error) => {
        dispatch({
          type: recipeConstants.RECIPE_REQUEST_FAILURE,
          payload: error.response.data,
        });
      });
  };
};
