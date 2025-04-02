import React, { useEffect } from "react";
import { RouterProvider } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {AuthRoutes} from "./component/AuthRoutes";
import SpinnersLoading from "../pages/comman/SpinnersLoading";
import { userProfile } from "../redux/action/profile";



function AuthenticateRouter() {
  const dispatch = useDispatch();
  const { profileLoading } = useSelector((state) => state.profile);

  useEffect(() => {
    dispatch(userProfile());
  }, [dispatch]);

  if (profileLoading) {
    return <SpinnersLoading />;
  }

  return <RouterProvider router={AuthRoutes} />;
}

export default AuthenticateRouter;