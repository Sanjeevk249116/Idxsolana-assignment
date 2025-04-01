import { createBrowserRouter } from "react-router-dom";
import RegisterFrame from "../../pages/auth/RegisterFrame";
import LoginComponent from "../../pages/auth/component/LoginComponent";
import SignupPage from "../../pages/auth/component/SignupPage";
export const modifiedUnAuthorizedRoutes = createBrowserRouter([

    {
        element: <RegisterFrame />,
        children: [
          {
            path: "/",
            element: <LoginComponent />,
          },
          {
            path: "/signup",
            element: <SignupPage />,
          },
        ],
      },
  ]);