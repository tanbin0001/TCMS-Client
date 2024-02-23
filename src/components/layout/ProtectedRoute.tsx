 
import { ReactNode } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { verifyToken } from "../../utils/verifyToken";
import { logOut, useCurrentToken } from "../../redux/features/authSlice";
import { Navigate } from "react-router-dom";
 

type TProtectedRoute = {
  children: ReactNode;
  role: string | undefined;
};

const ProtectedRoute = ({ children, role }: TProtectedRoute) => {
  const token = useAppSelector(useCurrentToken);
  let user;
  if(token){
    // user = verifyToken(token);
   user = verifyToken(token) as { role: string | undefined };

  }
 

  const dispatch = useAppDispatch();

    if( role !=undefined && role != user?.role){
      dispatch(logOut());
      return <Navigate to="/login" replace={true} />;
    }
 
  if (!token) {
    return <Navigate to="/login" replace={true} />;
  }
  return children;
};

export default ProtectedRoute;
