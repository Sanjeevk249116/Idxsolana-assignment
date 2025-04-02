import { Suspense } from "react";
import { createBrowserRouter } from "react-router-dom";
import FrameStructure from "../../pages/layout/FrameStructure";
import Dashboard from "../../pages/dashboard/Dashboard";
import AddNewNote from "../../pages/dashboard/components/AddNewNote";
import SingleNote from "../../pages/singleNote/SingleNote";

export const AuthRoutes = createBrowserRouter([
    {
      path: "/",
      element: (
        <Suspense fallback={<div>loading...</div>}>
          <FrameStructure />
        </Suspense>
      ),
      children:[
        { path: "/", element: <Dashboard /> },
        { path: "/add/new-note", element: <AddNewNote /> },
        { path: "/single-note/:id", element: <SingleNote /> },
      ]
    },
  ]);