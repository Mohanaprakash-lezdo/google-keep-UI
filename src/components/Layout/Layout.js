import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../Sidebar/Sidebar"; 

const Layout = ({ openModal }) => {
  return (
    <div className="layout">
      <Sidebar openModal={openModal} />
      <div className="content">
        <Outlet /> 
      </div>
    </div>
  );
};

export default Layout;
