import {
  Elements,
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import React from "react";
import { useContext } from "react";
import { useState } from "react";
import { CartContext } from "../context/CartContext";
import { AuthContext } from "../context/AuthContext";
import { useLocation, useNavigate } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import { toast } from "sonner";
import axios from "axios";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_KEY);

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [isProcessing, setIsProcessing] = useState(false);
  const navigate = useNavigate();

  const { cart, getGrandTotal, clearCart } = useContext(CartContext);
  const { currentUser } = useContext(AuthContext);

  const submitHandler = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) return;
    setIsProcessing(true);

    const orderData = {
      products: cart,
      amount: getGrandTotal(),
      user: currentUser.user._id,
      status: "approved",
    };

    const { paymentIntent, error } = await stripe.confirmPayment({
      elements,
      confirmParams: { return_url: window.location.origin },
      redirect: "if_required",
    });

    if (error) {
      setIsProcessing(false);
      return toast.error(error.message || "Something Went Wrong");
    }

    if (paymentIntent.status === "succeeded") {
      try {
        const res = await axios.post(
          `${import.meta.env.VITE_API_BASE_URL}/orders`,
          orderData,
          {
            headers: {
              "auth-token": `Bearer ${currentUser.token}`,
            },
          }
        );
        if (res.data) {
          clearCart();
          navigate("/success", { state: res.data._id });
        }
      } catch (error) {
        toast.error(error.message);
      }
    }
    setIsProcessing(false);
  };

  return (
    <div className="max-w-[400px] m-auto">
      <form onSubmit={submitHandler}>
        <PaymentElement />
        <button
          type="submit"
          className="btn-primary w-full mt-4"
          disabled={isProcessing}
        >
          {isProcessing ? "Processing..." : "Pay"}
        </button>
      </form>
    </div>
  );
};

function Checkout() {
  const location = useLocation();

  const clientSecret = location.state;

  if (!clientSecret) return <Navigate to={"/cart"} />;

  return (
    <Elements
      options={{
        clientSecret,
      }}
      stripe={stripePromise}
    >
      <CheckoutForm />
    </Elements>
  );
}

export default Checkout;
