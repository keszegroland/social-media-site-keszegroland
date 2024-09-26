import { Outlet, createBrowserRouter } from "react-router-dom";
import SignUp from "./Pages/SignUp";
import SignIn from "./Pages/SignIn";
import App from "./App";
import ProtectedRoute from "./Utils/ProtectedRoute";

export const router = createBrowserRouter(
  [
    {
      path: '/',
      element: <ProtectedRoute><Outlet /></ProtectedRoute>,
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
    }
  ]
);