import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import Shop from "./pages/Shop.jsx";
import ProductDetails from "./pages/ProductDetails.jsx";
import App from "./App.jsx";
import Register from "./pages/Register.jsx";
import Cart from "./pages/Cart.jsx";
import { CartContextProvider } from "./context/CartContext.jsx";
import { AuthContextProvier } from "./context/AuthContext.jsx";
import Admin from "./pages/admin/Admin.jsx";
import Dashboard from "./pages/admin/Dashboard.jsx";
import AdminLayout from "./layouts/AdminLayout.jsx";
import Products from "./pages/admin/Products.jsx";
import Profile from "./pages/admin/Profile.jsx";
import { Toaster } from "sonner";
import {
  ProdcuctContextProvider,
  ProductContext,
} from "./context/ProductContext.jsx";

// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <App />,
//     children: [
//       {
//         path: "",
//         element: <Home />,
//       },
//       {
//         path: "shop",
//         element: <Shop />,
//       },
//       {
//         path: "product/:id",
//         element: <ProductDetails />,
//       },
//       {
//         path: "cart",
//         element: <Cart />,
//       },
//       {
//         path: "login",
//         element: <Login />,
//       },
//       {
//         path: "register",
//         element: <Register />,
//       },
//       {
//         path: "admin",
//         element: <Admin />,
//       },
//       {
//         path: "admin/dashboard",
//         element: <Dashboard />,
//       },
//     ],
//   },
// ]);

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "shop",
        element: <Shop />,
      },
      {
        path: "product/:id",
        element: <ProductDetails />,
      },
      {
        path: "cart",
        element: <Cart />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
    ],
  },
  {
    path: "admin",
    element: <Admin />,
  },
  {
    path: "dashboard",
    element: <Dashboard />,
    children: [
      {
        path: "products",
        element: <Products />,
      },
      {
        path: "profile",
        element: <Profile />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthContextProvier>
      <ProdcuctContextProvider>
        <CartContextProvider>
          <Toaster />
          <RouterProvider router={router} />
        </CartContextProvider>
      </ProdcuctContextProvider>
    </AuthContextProvier>
  </React.StrictMode>
);
