import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { CartContext } from "../context/CartContext";
import { toast } from "sonner";
import { useLocation } from "react-router-dom";

function Success() {
  // const urlParams = new URLSearchParams(window.location.search);
  // const encodedData = urlParams.get("data");
  // const cart = JSON.parse(decodeURIComponent(encodedData));

  const { currentUser } = useContext(AuthContext);
  const { cart, getGrandTotal } = useContext(CartContext);

  const [orderId, setOrderId] = useState(null);

  const location = useLocation();

  useEffect(() => {
    const createOrder = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/stripe/order/success`,
          // {
          //   userId: currentUser.user._id,
          //   products: cart.map((item) => ({
          //     productId: item._id,
          //     quantity: item._quantity,
          //   })),
          //   amount: getGrandTotal(),
          // },
          {
            headers: {
              "auth-token": `Bearer ${currentUser.token}`,
            },
          }
        );
        console.log(res);
        // setOrderId(res.data._id);
      } catch (error) {
        toast.error(error.message);
      }
    };
    const queryParameters = new URLSearchParams(window.location.search);
    console.log(queryParameters.get("session_id"));
    // const queryParams = new URLSearchParams(location.search);
    // const orderData = JSON.parse(decodeURIComponent(queryParams.get("data")));

    // if (orderData && !orderId) {
    //   createOrder();
    // }
  }, [cart, currentUser, orderId]);

  return (
    <section className="flex-1 grid place-items-center">
      {orderId ? (
        <div className="container flex flex-col gap-2 justify-center items-center">
          <h1 className="text-4xl font-bold ">Than you for your order!</h1>
          <p>
            Your order has been confirmed. You will receive an email
            confirmation shortly. Your order id is: {orderId}
          </p>
          <div className="flex gap-2">
            <button className="btn-primary">View order</button>
            <button className="btn-primary bg-transparent text-black border border-black">
              View all orders
            </button>
          </div>
        </div>
      ) : (
        <h1 className="text-xl"> Something went wrong. Try Again</h1>
      )}
    </section>
  );
}

export default Success;
