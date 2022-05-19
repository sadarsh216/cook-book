import React, { useEffect } from "react";
import { connect } from "react-redux";
import { useLocation } from "react-router-dom";
import { getRecipeDetails } from "../actions/recipe";
import Reviews from "./Review";

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
  return (
    <div>
      {props.details?.description}
      <hr />
      {props.loggedIn && props.details ? (
        <Reviews item={props.details} />
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
