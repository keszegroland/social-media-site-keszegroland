import { createBrowserRouter } from "react-router-dom";
import SignUpPage from "./Pages/SignUp";

export const router = createBrowserRouter([
  {
    children: [
      {
        path: "/signup",
        element: <SignUpPage />
      }
    ]
  }
]);