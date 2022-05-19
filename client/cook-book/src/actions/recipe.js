import axios from "axios";
import { recipeConstants } from "../constants";
const BASE_URL = "http://localhost:8080";

export const getAllRecipes = () => {
  return (dispatch) => {
    axios
      .get(`${BASE_URL}/recipe`)
      .then((result) => {
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

export const getRecipeDetails = (id) => {
  return (dispatch) => {
    axios
      .get(`${BASE_URL}/recipe/${id}`)
      .then((result) => {
        dispatch({
          type: recipeConstants.RECIPE_DETAIL_REQUEST_SUCCESS,
          payload: result.data,
        });
      })
      .catch((error) => {
        dispatch({
          type: recipeConstants.RECIPE_DETAIL_REQUEST_FAILURE,
          payload: error.response,
        });
      });
  };
};
