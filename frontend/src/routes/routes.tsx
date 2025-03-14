import React from "react";
import { createBrowserRouter } from "react-router-dom";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import Test from "../pages/Test";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />
  },
  {
    path: "/test",
    element: <Test />  
  },
  {
    path:"/signup",
    element: <Signup />
  }
])

export default router;
