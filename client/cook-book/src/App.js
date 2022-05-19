import React from "react";
import Header from "./components/Header";
import { Routes, Route, Link } from "react-router-dom";
import Main from "./components/Main";
import SidebarLeft from "./components/SidebarLeft";
import SidebarRight from "./components/SidebarRight";
import Details from "./components/Detail";

function App() {
  return (
    <>
      <Header />
      <div className="flex flex-row">
        <div id="sidebar" className="flex-auto w-8 ml-10 d-block">
          <SidebarLeft />
        </div>
        <div className="flex-auto bg-white h-fit mb-5 w-72 p-5">
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/detail" element={<Details />} />
          </Routes>
        </div>
        <div id="sidebar" className="flex-auto w-8 mr-10 d-block">
          <SidebarRight />
        </div>
      </div>
    </>
  );
}

export default App;
