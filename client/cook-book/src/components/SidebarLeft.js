import React from "react";
import PropTypes from "prop-types";

const SidebarLeft = () => {
  return (
    <div className="w-auto py-10">
      <ul className="px-1">
        <h4 className="text-lg font-bold leading-7 text-gray-900 sm:text-lg sm:truncate ml-5">
          Explore more
        </h4>
        <li className="relative"></li>
      </ul>
    </div>
  );
};

SidebarLeft.propTypes = {};

export default SidebarLeft;
