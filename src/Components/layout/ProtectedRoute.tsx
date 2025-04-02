import { Navigate } from "react-router";
import {  useCurrentToken } from "../../redux/features/auth/authSlice";
import {  useAppSelector } from "../../redux/features/hook";
import { verifyToken } from "../../utils/verifyToken";
import { ReactNode } from "react";

type TProtectedRoute = {
  children: ReactNode;
  // role: string | undefined;
};

const ProtectedRoute = ({ children }:TProtectedRoute) => {
  const token = useAppSelector(useCurrentToken);
  // let user;
  if (token) {
    verifyToken(token);
  }

  // const dispatch = useAppDispatch();

  // if (role !== undefined && role !== user?.role) {
  //   dispatch(logout());
  //   return <Navigate to={"/login"} replace={true} />;
  // }

  if (!token) {
    return <Navigate to={"/login"} replace={true} />;
  }
  return children;
};

export default ProtectedRoute;
