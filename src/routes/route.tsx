
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

  const authDataString = localStorage.getItem("persist:auth");

 
  if (authDataString) {

    const authData = JSON.parse(authDataString);
 

    const token = authData.token;

    return token && token !== "null";
  }

  return false;

};

export const AuthRoute = ({  element,path } : any) => {
  const navigate = useNavigate();

  React.useEffect(() => {
    if (isAuthenticated()) {
      // Redirect to a different route if the user is authenticated
      navigate("/user/dashboard");
    }else{
      navigate(path);
    }
  }, [navigate]);

  return <>{element}</>;
};



isAuthenticated()
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
        element: <AuthRoute element={<Login />} path={'/login'}><Login /></AuthRoute>,
      },
      {
        path: "/reset-password",
        element: <ResetPassword />,
      },

      {
        path: "/register",
        element: <AuthRoute element={<Register />} path={'/register'}><Register /></AuthRoute>,
      },
])

