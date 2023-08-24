import React from "react";
import { Outlet } from "react-router-dom";
import NavBar from "./../NavBar/NavBar";

export default function MasterLayout({ userData, logout }) {
  return (
    <>
      <NavBar userData={userData} logout={logout} />
      <div className="container py-5 my-5">
        <Outlet />
      </div>
    </>
  );
}
