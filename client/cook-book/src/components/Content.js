import React from "react";
import PropTypes from "prop-types";
import SidebarLeft from "./SidebarLeft";
import SidebarRight from "./SidebarRight";

const Content = () => {
  return (
    <div className="flex flex-row">
      <div id="sidebar" className="flex-auto w-8 ml-10 d-block">
        <SidebarLeft/>
      </div>
      <div className="flex-auto bg-white w-72">
        <p>Hey</p>
      </div>
      <div id="sidebar"  className="flex-auto w-8 mr-10 d-block">
      <SidebarRight/>
      </div>
    </div>
  );
};

Content.propTypes = {};

export default Content;
