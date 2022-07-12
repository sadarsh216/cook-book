import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../config";

import Reviews from "./Review";

const Main = (props) => {
  let navigate = useNavigate();

  const handleClick = (id) => {
    navigate(`/detail`, { state: { id: id } });
  };
  const showDescription = (desc, id) => {
    var showMore = false;
    var _desc = desc;
    if (desc.length > 150) {
      showMore = true;
      _desc = desc.slice(0, 150);
    }
    return (
      <p>
        {_desc}
        {showMore ? (
          <>
            ...&nbsp;
            <u className="cursor-pointer" onClick={() => handleClick(id)}>
              Read More
            </u>
          </>
        ) : null}{" "}
      </p>
    );
  };
  return (
    <>
      {props.data?.map((item, key) => (
        <div
          key={item._id}
          className="w-11/12 mx-auto mb-5 rounded-md overflow-hidden shadow-lg"
        >
          <img
            className="w-full h-64"
            src={`${BASE_URL}/recipe/image/${item.image}`}
            alt="Sunset in the mountains"
          />
          <div className="px-6 py-4">
            <div
              onClick={() => handleClick(item._id)}
              className=" cursor-pointer font-bold text-gray-800 text-xl mb-2 "
            >
              {item.name}
            </div>
            <p className="text-gray-600 text-base">
              {showDescription(item.description, item._id)}
            </p>
          </div>
          <div className="px-6 pt-4 pb-2">
            {item.ingredients.map((elem, index) => (
              <span
                key={index}
                className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2"
              >
                {elem}
              </span>
            ))}
          </div>
          {props.loggedIn && <Reviews item={item} />}
        </div>
      ))}
    </>
  );
};

Main.propTypes = {};

function mapStateToProps(state) {
  return {
    data: state.recipeReducer.data,
    loggedIn: state.rootReducer.loggedIn,
  };
}

export default connect(mapStateToProps, null)(Main);
