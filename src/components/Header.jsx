import { useContext, useEffect, useRef, useState } from "react";
import { HiOutlineShoppingBag } from "react-icons/hi2";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { HiMiniChevronDown, HiOutlineNewspaper } from "react-icons/hi2";
import {
  HiMiniArrowRightOnRectangle,
  HiOutlineSquares2X2,
} from "react-icons/hi2";
import { Button } from "./ui/button";
import { CartContext } from "@/context/CartContext";

function Header() {
  const { currentUser, logout } = useContext(AuthContext);
  const { cart } = useContext(CartContext);
  const [toggleDropdown, setToggleDropdown] = useState(false);
  const toggleRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    let handler = (e) => {
      if (!toggleRef?.current?.contains(e.target)) {
        setToggleDropdown(false);
      }
    };
    document.addEventListener("mousedown", handler);

    return () => {
      document.removeEventListener("mousedown", handler);
    };
  }, [toggleDropdown]);

  return (
    <header>
      <div className="flex justify-between items-center py-6 container">
        <h2 className="text-2xl font-bold">
          <Link aria-label="apple home page" to={"/"}>
            Apple
          </Link>
        </h2>
        <ul className="flex items-center gap-5">
          <li>
            <Link aria-label="home" to={"/"}>
              Home
            </Link>
          </li>
          <li>
            <Link aria-label="shop" to={"/shop"}>
              Shop
            </Link>
          </li>

          <li>
            {!currentUser ? (
              <Link aria-label="login" to={"/login"}>
                <Button>Login</Button>
              </Link>
            ) : (
              <div className="relative" ref={toggleRef}>
                <div
                  className="flex items-center font-bold uppercase cursor-pointer"
                  onClick={() => setToggleDropdown(!toggleDropdown)}
                >
                  <h2>{currentUser?.user?.name}</h2>
                  <HiMiniChevronDown className="text-xl" />
                </div>
                {toggleDropdown && (
                  <div className="absolute z-50 bg-white left-[50%] -translate-x-[50%] w-[150px] p-2 border rounded-md">
                    <h2 className="font-bold">My Account</h2>
                    <hr className="my-2" />
                    <div className="flex flex-col gap-2">
                      {currentUser.user.role === "admin" && (
                        <div className="flex items-center gap-2">
                          <HiOutlineSquares2X2 className="text-xl" />
                          <Link to={"/dashboard"}>Dashboard</Link>
                        </div>
                      )}
                      {currentUser.user.role !== "admin" && (
                        <div className="flex items-center gap-2">
                          <HiOutlineNewspaper className="text-xl" />
                          <Link to={"/myorders"}>Orders</Link>
                        </div>
                      )}
                      <div className="flex items-center gap-2">
                        <HiMiniArrowRightOnRectangle className="text-xl" />
                        <button
                          onClick={() => {
                            logout();
                            navigate("/login");
                          }}
                        >
                          Log out
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </li>
          <li>
            <div className="relative">
              <Link aria-label="cart" to={"/cart"}>
                <HiOutlineShoppingBag className="text-xl" />
              </Link>
              {cart.length > 0 && (
                <div className="bg-red-500 text-white text-sm absolute -right-2 -top-2 w-4 h-4 flex items-center justify-center rounded-full">
                  {cart.length}
                </div>
              )}
            </div>
          </li>
        </ul>
      </div>
    </header>
  );
}

export default Header;
