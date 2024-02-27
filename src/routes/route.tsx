
import { createBrowserRouter, useNavigate } from "react-router-dom";
import { routeGenerator } from "../utils/routeGenetor";
 
import App from "../App";
import Login from "../pages/Login";
import Register from "../pages/Register";
import ProtectedRoute from "../components/layout/ProtectedRoute";
import { userRoutePaths } from "./userRoutes";
import ResetPassword from "../pages/ResetPassword";
import React from "react";
 


 
const isAuthenticated = () => {
 
  const token = localStorage.getItem("persist:auth");
  return !!token;  
};
 
export const AuthRoute = ({  element } : any) => {
  const navigate = useNavigate();

  React.useEffect(() => {
    if (isAuthenticated()) {
      // Redirect to a different route if the user is authenticated
      navigate("/user/dashboard");
    }
  }, [navigate]);

  return <>{element}</>;
};



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
        element: <AuthRoute><Login /></AuthRoute>,
      },
      {
        path: "/reset-password",
        element: <AuthRoute><ResetPassword /></AuthRoute>,
      },

      {
        path: "/register",
        element: <AuthRoute><Register /></AuthRoute>,
      },
])