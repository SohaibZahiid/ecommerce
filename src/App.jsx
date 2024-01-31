import { Outlet, useLocation } from "react-router-dom";
import Footer from "./components/Footer";
import Header from "./components/Header";
import { Toaster } from "sonner";

function App() {
  const location = useLocation();
  const isAuthPage =
    location.pathname === "/login" || location.pathname === "/register";
  // || location.pathname === "/admin" ||
  // location.pathname === "/admin/dashboard";
  return (
    <div className="flex flex-col min-h-screen">
      {!isAuthPage && <Header />}
      <Outlet />
      {!isAuthPage && <Footer />}
    </div>
  );
}

export default App;
