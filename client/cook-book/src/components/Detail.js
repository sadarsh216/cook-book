import React, { useEffect } from "react";
import { connect } from "react-redux";
import { useLocation } from "react-router-dom";
import { getRecipeDetails } from "../actions/recipe";
import Reviews from "./Review";
import { BASE_URL } from "../config";

function mapDispatchToProps(dispatch) {
  return {
    getRecipeDetails: (id) => dispatch(getRecipeDetails(id)),
  };
}

const Details = (props) => {
  const params = useLocation();
  const id = params.state.id;
  useEffect(() => {
    props.getRecipeDetails(id);
  }, [id]);
  let stepCounter = 1;
  let ingredientsCounter = 1;
  return (
    <div className="p-5">
      <h1 className="text-2xl font-bold text-gray-800">
        {props.details?.name}
      </h1>
      <div className="py-5">
        <img
          className="w-full h-96 rounded-t-md shadow-md"
          src={`${BASE_URL}/recipe/image/${props.details?.image}`}
          alt="Sunset in the mountains"
        />
      </div>
      <div className="flex flex-row my-5">
        <div className="flex-none w-1 bg-gradient-to-r from-gray-500 to-white mr-1" />
        <div className="flex-auto">
          <h1 className="text-xl font-bold text-gray-800 mb-2">Description</h1>
          <p className="text-justify">{props.details?.description}</p>
        </div>
      </div>
      {/* Ingredients */}
      <h1 className="text-xl font-bold text-gray-800">{"Ingredients"}</h1>
      <div className="my-5 pl-5">
        {props.details?.ingredients.map((item, key) => (
          <>
            <div className="flex flex-row">
              <p className="text-md font-light text-gray-900">
                {ingredientsCounter++}.&nbsp;
              </p>
              <p className="text-md font-medium text-gray-900">{item}</p>
            </div>
          </>
        ))}
      </div>
      {/* steps */}
      <h1 className="text-xl font-bold text-gray-800">{"Steps"}</h1>
      <div className="my-5 pl-5">
        {props.details?.steps.map((item, key) => (
          <>
            <div className="flex flex-row">
              <p className="text-md font-medium text-gray-900">
                {stepCounter++}.&nbsp;
              </p>
              <p className="text-md font-medium text-gray-900">{item}</p>
            </div>
          </>
        ))}
      </div>
      <hr />
      {props.loggedIn && props.details ? (
        <Reviews item={props.details?._id} />
      ) : null}
      {}
    </div>
  );
};

Details.propTypes = {};

function mapStateToProps(state) {
  return {
    loading: state.recipeReducer.loading,
    details: state.recipeReducer.details,
    loggedIn: state.rootReducer.loggedIn,
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(Details);
