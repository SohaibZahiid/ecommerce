import React, { useContext } from "react";
import { HiMiniMinus, HiOutlineTrash } from "react-icons/hi2";
import { HiMiniPlus } from "react-icons/hi2";
import { CartContext } from "../context/CartContext";
import { Button } from "./ui/button";

function CartItem({ product }) {
  const { removeFromCart, incrementQuantity, decrementQuantity } =
    useContext(CartContext);

  return (
    <div className="flex justify-between items-center">
      <div className="flex items-center gap-4 min-w-[200px] md:min-w-[300px]">
        <div className="bg-gray-100 rounded-md p-4 w-[80px] h-[80px] flex justify-center items-center">
          <img
            src={product.image}
            alt="product"
            className="h-full object-contain"
          />
        </div>
        <div>
          <p className="text-sm">
            {product.title} <br />
            <span className="font-bold">${product.price}</span>
          </p>
        </div>
      </div>

      <div className="flex rounded-md border justify-between items-center">
        <div className="px-1 md:px-2 border-r">
          <HiMiniMinus
            className="cursor-pointer  "
            onClick={() => decrementQuantity(product._id)}
          />
        </div>

        <p className="px-2 md:px-4">{product.quantity}</p>

        <div className="px-1 md:px-2 border-l">
          <HiMiniPlus
            className="cursor-pointer"
            onClick={() => incrementQuantity(product._id)}
          />
        </div>
      </div>
      <div>
        <HiOutlineTrash
          onClick={() => removeFromCart(product._id)}
          className="cursor-pointer text-xl"
        />
      </div>
    </div>
  );
}

export default CartItem;
