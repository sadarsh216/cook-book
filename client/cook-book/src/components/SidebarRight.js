import React from "react";
import PropTypes from "prop-types";

const SidebarRight = () => {
  return (
    <div className="w-auto py-10 fixed z-0">
      <ul className="px-1">
        <h4 className="text-lg font-bold leading-7 text-gray-900 sm:text-lg sm:truncate ml-5">
          Ad section
        </h4>
        <li className="relative"></li>
      </ul>
    </div>
  );
};

SidebarRight.propTypes = {};

export default SidebarRight;
