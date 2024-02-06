import { AuthContext } from "@/context/AuthContext";
import React, { useContext } from "react";
import { Navigate } from "react-router-dom";

function UserRoute({ children }) {
  const { currentUser } = useContext(AuthContext);

  if (!currentUser || !currentUser.user || currentUser.user.role !== "user") {
    return <Navigate to={"/login"} />;
  }

  return children;
}

export default UserRoute;
