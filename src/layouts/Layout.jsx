import Header from "../components/Header";
import Footer from "../components/Footer";
import { Outlet, useLocation } from "react-router-dom";

function Layout() {
  const location = useLocation();
  const isAuthPage =
    location.pathname === "/login" || location.pathname === "/register";

  return (
    <div className="flex flex-col min-h-screen">
      {!isAuthPage && <Header />}
      <Outlet />
      <Footer />
      {!isAuthPage && <Footer />}
    </div>
  );
}

export default Layout;
