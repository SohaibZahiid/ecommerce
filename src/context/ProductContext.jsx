import axios from "axios";
import { createContext, useContext, useState } from "react";
import { AuthContext } from "./AuthContext";

export const ProductContext = createContext();

export const ProdcuctContextProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const { currentUser } = useContext(AuthContext);

  const getProducts = async () => {
    const res = await axios.get(
      `${import.meta.env.VITE_API_BASE_URL}/products`
    );

    if (res.data) {
      setProducts(res.data);
    }
    return res;
  };

  const deleteProduct = async (id) => {
    const res = await axios.delete(
      `${import.meta.env.VITE_API_BASE_URL}/products/${id}`,
      {
        headers: {
          "auth-token": `Bearer ${currentUser.token}`,
        },
      }
    );

    return res;
  };

  return (
    <ProductContext.Provider
      value={{ products, setProducts, getProducts, deleteProduct }}
    >
      {children}
    </ProductContext.Provider>
  );
};
