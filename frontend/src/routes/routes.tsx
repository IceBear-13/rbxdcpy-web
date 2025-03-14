import React from "react";
import { createBrowserRouter } from "react-router-dom";
import Login from "../pages/Login";
import Signup from "../pages/Signup";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />
  },
  {
    path: "/test",
    element: <div>Test</div>
  },
  {
    path:"/signup",
    element: <Signup />
  }
])

export default router;
