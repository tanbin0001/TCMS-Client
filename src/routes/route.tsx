
import { createBrowserRouter } from "react-router-dom";
import { routeGenerator } from "../utils/routeGenetor";
 
import App from "../App";
import Login from "../pages/Login";
import Register from "../pages/Register";
import ProtectedRoute from "../components/layout/ProtectedRoute";
import { userRoutePaths } from "./userRoutes";
import ResetPassword from "../pages/ResetPassword";
 


export const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
      },
      
      {
        path: '/user',
        element:  <ProtectedRoute role="user">
        <App />
      </ProtectedRoute>,
        children: routeGenerator(userRoutePaths),
      },
      
       
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/reset-password",
        element: <ResetPassword />,
      },

      {
        path: "/register",
        element: <Register />,
      },
])