import { AuthContext } from "@/context/AuthContext";
import React, { useContext } from "react";
import { Navigate } from "react-router-dom";

function PrivateRoute({ children }) {
  const { currentUser } = useContext(AuthContext);
  if (!currentUser || !currentUser.user || currentUser.user.role !== "admin") {
    return <Navigate to={"/"} />;
  }

  return children;
}

export default PrivateRoute;
