import { createContext, useEffect, useState } from "react";
import { toast } from "sonner";

export const CartContext = createContext();

export const CartContextProvider = ({ children }) => {
  const [cart, setCart] = useState(
    JSON.parse(localStorage.getItem("cart")) || []
  );

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
    if (cart.length <= 0) {
      localStorage.removeItem("cart");
    }
  }, [cart]);

  const addToCart = (product) => {
    const alreadyExists = cart.find((p) => p._id === product._id);

    if (alreadyExists) {
      setCart((prevCart) =>
        prevCart.map((p) =>
          p._id === product._id ? { ...p, quantity: (p.quantity || 1) + 1 } : p
        )
      );
    } else {
      setCart((prevCart) => [...prevCart, { ...product, quantity: 1 }]);
    }
    toast.info(`${product.title} added to cart.`);
  };

  const removeFromCart = (id) => {
    setCart(cart.filter((item) => item._id != id));
  };

  const getGrandTotal = () => {
    return cart.reduce(
      (total, product) => total + product.price * product.quantity,
      0
    );
  };

  const incrementQuantity = (id) => {
    setCart(
      cart.map((p) =>
        p._id === id
          ? { ...p, quantity: p.quantity < 10 ? p.quantity + 1 : 10 }
          : p
      )
    );
  };

  const decrementQuantity = (id) => {
    setCart(
      cart.map((p) =>
        p._id === id
          ? {
              ...p,
              quantity: p.quantity > 2 ? p.quantity - 1 : 1,
            }
          : p
      )
    );
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        getGrandTotal,
        incrementQuantity,
        decrementQuantity,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
