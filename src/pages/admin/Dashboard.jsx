import React from "react";
import Sidebar from "../../components/admin/Sidebar";
import { Outlet } from "react-router-dom";
import Topbar from "../../components/admin/Topbar";

function Dashboard() {
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
