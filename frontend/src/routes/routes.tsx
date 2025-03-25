import { createBrowserRouter } from "react-router-dom";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import Test from "../pages/Test";
import { Dashboard } from "../pages/Dashboard";

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
  },
  {
    path: "/dashboard",
    element: <Dashboard />
  }
])

export default router;
