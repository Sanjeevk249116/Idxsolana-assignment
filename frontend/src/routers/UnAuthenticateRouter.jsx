import { RouterProvider } from "react-router-dom";
import { modifiedUnAuthorizedRoutes } from "./component/UnAuthRoutes";

export const UnAuthenticateRouter = () => {
    return <RouterProvider router={modifiedUnAuthorizedRoutes} />;
  };
  
