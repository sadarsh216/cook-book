import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { ArrowCircleRightIcon } from "@heroicons/react/outline";
import { connect } from "react-redux";
import { getAllRecipes } from "../actions/recipe";

function mapDispatchToProps(dispatch) {
  return {
    getAllRecipes: () => dispatch(getAllRecipes()),
  };
}

const SidebarLeft = (props) => {
  useEffect(() => {
    props.getAllRecipes();
  }, []);
  return (
    <div className="w-auto py-10 px-5">
      <ul className="px-1">
        <h4 className="text-lg font-bold leading-7 text-gray-900 sm:text-lg sm:truncate ml-5">
          Explore more
        </h4>
        <div className="flex mt-4 justify-center">
          <ul className=" rounded-lg w-96 text-gray-900">
            {props.data?.map((item, key) => (
              <li
                key={item._id}
                onClick={() => alert(item._id)}
                className="px-6 py-2 w-full rounded-t-lg cursor-pointer hover:text-indigo-600 hover:underline"
              >
                <div className="flex items-center">
                  <div className="flex-none">
                    <ArrowCircleRightIcon
                      className="h-5 w-5  text-red-400 "
                      aria-hidden="true"
                    />
                  </div>
                  <div className="flex-1 ml-1">{item.name}</div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </ul>
    </div>
  );
};

SidebarLeft.propTypes = {};

function mapStateToProps(state) {
  return {
    data: state.recipeReducer.data,
    loading: state.recipeReducer.loading,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SidebarLeft);
