import React from "react";
import { Outlet } from "react-router-dom";
import WeclomeSection from "./component/WelcomeSection";


function RegisterFrame() {
  return (
    <div className=" auth-page" style={{ overflow: "hidden" }}>
      <WeclomeSection />
      <Outlet />
    </div>
  );
}

export default RegisterFrame;
