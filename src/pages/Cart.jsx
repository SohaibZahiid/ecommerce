import { Link, useNavigate } from "react-router-dom";

import CartItem from "../components/CartItem";
import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { AuthContext } from "../context/AuthContext";
import { toast } from "sonner";
import axios from "axios";
import { Button } from "@/components/ui/button";

function Cart() {
  const { cart, getGrandTotal } = useContext(CartContext);
  const { currentUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleCheckout = async () => {
    if (currentUser) {
      try {
        // const res = await axios.post(
        //   `${import.meta.env.VITE_API_BASE_URL}/stripe/checkout`,
        //   cart,
        //   {
        //     headers: {
        //       "auth-token": `Bearer ${currentUser.token}`,
        //     },
        //   }
        // );

        // if (res.status === 200) {
        //   // window.open(res.data.url, "_blank");
        //   // window.open(res.data.url);
        // }

        const { data } = await axios.post(
          `${import.meta.env.VITE_API_BASE_URL}/stripe/checkout`,
          { amount: getGrandTotal() },
          {
            headers: {
              "auth-token": `Bearer ${currentUser.token}`,
            },
          }
        );
        if (data) {
          navigate("/checkout", { state: data });
        }
      } catch (error) {
        toast.error(error.message);
      }
    } else {
      navigate("/login");
    }
  };

  return (
    <section className="my-10 flex-1">
      <div className="container">
        <h2 className="font-bold text-2xl">Cart</h2>

        {cart.length > 0 ? (
          <div className="flex flex-col md:flex-row gap-8 mt-8">
            <div className="flex flex-1 flex-col gap-4">
              {cart.map((product) => (
                <CartItem key={product._id} product={product} />
              ))}
            </div>
            <div className="w-full md:w-2/6 xl:w-1/4 border border-gray-100 p-4">
              <p className="font-bold mb-4">Summary</p>
              <hr />
              <div className="flex justify-between py-4">
                <p>Delivery Charge</p>
                <p>${getGrandTotal() > 1200 ? 0 : "4.99"}</p>
              </div>
              <hr />
              <div className="flex justify-between pt-4">
                <p className="font-bold">Grand total</p>
                <p>${getGrandTotal()}</p>
              </div>
              <div className="flex">
                <Button
                  onClick={handleCheckout}
                  className="btn-primary w-full mt-4"
                >
                  Checkout
                </Button>
              </div>
            </div>
          </div>
        ) : (
          <h2 className="text-center mt-10">Please add products to cart.</h2>
        )}
        <div className="bg-gray-100 rounded-md p-10 my-20 flex flex-col gap-4 md:flex-row md:justify-between md:items-center">
          <div>
            <h2 className="text-2xl mb-2">Continue Shopping</h2>
            <p className="max-w-[600px]">
              Discover more products that are perfect for gift, for your
              wardrobe, or a unique addition to your collection.
            </p>
          </div>
          <Link
            aria-label="Continue shopping"
            to={"/shop"}
            className="btn-primary w-max"
          >
            <Button>Continue shopping</Button>
          </Link>
        </div>
      </div>
    </section>
  );
}

export default Cart;
