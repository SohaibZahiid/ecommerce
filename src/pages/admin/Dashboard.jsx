import React, { useContext, useEffect } from "react";
import Sidebar from "../../components/admin/Sidebar";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import Topbar from "../../components/admin/Topbar";
import { AuthContext } from "@/context/AuthContext";

function Dashboard() {
  const { currentUser } = useContext(AuthContext);

  if (!currentUser?.user) {
    return <Navigate to={"/login"} />;
  }

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Topbar />
        <Outlet />
      </div>
    </div>
  );
}

export default Dashboard;
