import { Outlet, createBrowserRouter } from "react-router-dom";
import SignUp from "./Pages/SignUp";
import SignIn from "./Pages/SignIn";
import ProtectedRoute from "./Utils/ProtectedRoute";
import Home from "./Pages/Home";
import SideNavbar from "./Components/Home/SideBar/SideNavbar";
import People from "./Pages/People";

export const router = createBrowserRouter(
  [
    {
      path: '/',
      element: <ProtectedRoute>
        <div className="w-full h-full">
          <SideNavbar />
          <div className="w-full h-full md:ml-60 lg:ml-64 xl:ml-72">
            <Outlet />
          </div>
        </div>
      </ProtectedRoute>,
      children: [
        {
          path: "/home",
          element: <Home />
        },
        {
          path: "/people",
          element: <People />
        }
      ],
    },
    {
      path: "/signin",
      element: <SignIn />
    },
    {
      path: "/signup",
      element: <SignUp />
    }
  ]
);