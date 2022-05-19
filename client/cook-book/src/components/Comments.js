import React from "react";
import PropTypes from "prop-types";
import { BiSend } from "react-icons/bi";

const Comments = (props) => {
  return (
    <div className="mt-1">
        {/* show all comments */}
      <div className="relative rounded-lg shadow-sm border-2 bg-gray-200 py-1">
        <input
          type="text"
          name="comment"
          id="comment"
          className="bg-gray-200 focus:none text-gray-700 font-medium block w-full py-1 outline-0 pl-7 pr-12 rounded-md"
          placeholder="Comment"
        />
        <div className="absolute inset-y-0 right-0 flex items-center m-2 rounded-full">
          <button className="p-2 rounded-full bg-blue-600  drop-shadow-md">
            <BiSend className="text-white h-4 w-4" />{" "}
          </button>
        </div>
      </div>
    </div>
  );
};

Comments.propTypes = {};

export default Comments;
