import { Outlet } from "react-router-dom";
import Sidebar from "../components/admin/Sidebar";

function AdminLayout() {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="bg-red-100 flex-1">
        <Outlet />
      </div>
    </div>
  );
}

export default AdminLayout;
