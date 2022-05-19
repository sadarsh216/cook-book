import React, { useState } from "react";
import PropTypes from "prop-types";
import * as Outline from "@heroicons/react/outline";
import * as Fill from "@heroicons/react/solid";
import { BiComment } from "react-icons/bi";
import { RiShareForwardLine } from "react-icons/ri";
import Comments from "./Comments";

const Reviews = ({ item }) => {
  const [like, setLike] = useState("");
  const [showComment, setShowComment] = useState("");

  const addLike = (id) => {
    setLike(id);
  };

  const removeLike = (id) => {
    setLike("");
  };
  return (
    <>
      <div className="flex px-6 py-4">
        <div className="flex">
          {like === item._id ? (
            <Fill.HeartIcon
              onClick={() => removeLike(item._id)}
              className="h-7 w-7 text-red-400 cursor-pointer"
              aria-hidden="true"
            />
          ) : (
            <Outline.HeartIcon
              onClick={() => addLike(item._id)}
              className="h-7 w-7 text-gray-400 cursor-pointer"
              aria-hidden="true"
            />
          )}
          <p className="text-gray-400 ml-1">Like</p>

          <BiComment
            onClick={() =>
              setShowComment(showComment === item._id ? "" : item._id)
            }
            className="h-7 w-7 ml-2 text-gray-400 cursor-pointer"
            aria-hidden="true"
          />
          <p className="text-gray-400 ml-1">Comment</p>
        </div>
        <div className="flex ml-5">
          <p className="text-gray-400">
            {item.likecount} likes | {item.commentcount} Comments
          </p>
        </div>
        <div className="flex-1 flex flex-row-reverse">
          <RiShareForwardLine
            className="h-7 w-7 ml-2 text-gray-400 cursor-pointer"
            aria-hidden="true"
          />
        </div>
      </div>
      {showComment === item._id && (
        <div className="p-5 mx-5 border-t-2">
          <Comments id={item._id} />
        </div>
      )}
    </>
  );
};

Reviews.propTypes = {};

export default Reviews;
