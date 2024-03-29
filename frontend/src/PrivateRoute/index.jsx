import { isAuthenticated, checkPermission } from "../Utils/index";
import { Outlet, Navigate } from "react-router-dom";

const PrivateRoutes = ({ roles }) => {
  return isAuthenticated() && checkPermission(roles) ? (
    <Outlet />
  ) : (
    <Navigate to="/" />
  );
};

export default PrivateRoutes;
