import React from "react";
import { createBrowserRouter } from "react-router-dom";
import Login from "../pages/Login";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />
  },
  {
    path: "/test",
    element: <div>Test</div>
  }
])

export default router;
