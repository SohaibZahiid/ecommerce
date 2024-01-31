import React, { useContext } from "react";
import { HiMiniMinus, HiOutlineTrash } from "react-icons/hi2";
import { HiMiniPlus } from "react-icons/hi2";
import { CartContext } from "../context/CartContext";

function CartItem({ product }) {
  const { removeFromCart, incrementQuantity, decrementQuantity } =
    useContext(CartContext);

  return (
    <div className="flex justify-between items-center">
      <div className="flex items-center gap-4 min-w-[300px]">
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

      <div className="flex w-20 justify-between items-center">
        <HiMiniMinus
          className="cursor-pointer"
          onClick={() => decrementQuantity(product._id)}
        />
        <p className="">{product.quantity}</p>
        <HiMiniPlus
          className="cursor-pointer"
          onClick={() => incrementQuantity(product._id)}
        />
      </div>
      <div>
        <HiOutlineTrash
          onClick={() => removeFromCart(product._id)}
          className="cursor-pointer"
        />
      </div>
    </div>
  );
}

export default CartItem;
