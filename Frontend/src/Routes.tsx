import { Outlet, createBrowserRouter } from "react-router-dom";
import SignUp from "./Pages/SignUp";
import SignIn from "./Pages/SignIn";
import App from "./App";
import ProtectedRoute from "./Utils/ProtectedRoute";
import Home from "./Pages/Home";
import SideNavbar from "./Components/Home/SideBar/SideNavbar";

export const router = createBrowserRouter(
  [
    {
      path: '/',
      element: <ProtectedRoute>
        <div className="w-full h-full flex">
          <SideNavbar />
          <div className="grid grid-cols-1 gap-4 md:ml-60 lg:ml-64 xl:ml-72 h-full w-full">
            <Outlet />
          </div>
        </div>
      </ProtectedRoute>,
      children: [
        {
          path: "",
          element: <App />
        },
      ],
    },
    {
      path: "/signin",
      element: <SignIn />
    },
    {
      path: "/signup",
      element: <SignUp />
    },
    {
      path: "/home",
      element: <Home />
    }
  ]
);