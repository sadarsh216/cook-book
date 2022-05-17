import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

const Main = (props) => {
  return (
    <>
      {props.data?.map((item, key) => (
        <div
          key={item._id}
          className=" w-full mb-5 rounded overflow-hidden shadow-lg"
        >
          <img
            className="w-full h-64"
            src={"http://localhost:8080/recipe/image/" + item.image}
            alt="Sunset in the mountains"
          />
          <div className="px-6 py-4 cursor-pointer" onClick={() => alert(item._id)}>
            <div className="font-bold text-xl mb-2">{item.name}</div>
            <p className="text-gray-700 text-base">{item.description}</p>
          </div>
          <div className="px-6 pt-4 pb-2">
            {item.ingredients.map((elem) => (
              <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                {elem}
              </span>
            ))}
          </div>
        </div>
      ))}
      ;
    </>
  );
};

Main.propTypes = {};

function mapStateToProps(state) {
  return {
    data: state.recipeReducer.data,
  };
}

export default connect(mapStateToProps, null)(Main);
