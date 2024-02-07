import { useEffect, useRef, useState } from "react";
import { HiCurrencyDollar } from "react-icons/hi2";
import {
  MdDashboard,
  MdAccountBox,
  MdShoppingBag,
  MdArticle,
  MdManageAccounts,
  MdMenu,
} from "react-icons/md";

import { Link } from "react-router-dom";

function Sidebar() {
  const [open, setOpen] = useState(false);
  const toggleOpen = useRef(null);

  useEffect(() => {
    let handler = (e) => {
      if (!toggleOpen?.current?.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);

    return () => {
      document.removeEventListener("mousedown", handler);
    };
  }, [open]);

  return (
    <>
      <div
        className={`text-2xl cursor-pointer h-8 w-8 flex items-center justify-center absolute top-4 bg-black text-white rounded-full ${
          open ? "left-[210px] md:left-[270px]" : "left-5"
        }`}
        onClick={() => setOpen(!open)}
      >
        <MdMenu />
      </div>

      <aside
        ref={toggleOpen}
        className={`p-5 fixed bg-white z-50 min-h-screen min-w-[200px] md:min-w-[250px] border-r ${
          !open ? "hidden" : "block"
        }`}
      >
        <h2 className="font-bold uppercase text-xl mb-10">
          <Link to={"/dashboard"}>AppleAdmin</Link>
        </h2>
        <div className="flex flex-col gap-6">
          <div>
            <h2 className="font-bold mb-3 uppercase text-sm ">Main</h2>
            <div className="flex flex-col gap-2">
              <Link to={"/dashboard"}>
                <div className="flex items-center gap-2">
                  <MdDashboard className="text-xl" />
                  Dashboard
                </div>
              </Link>
            </div>
          </div>

          <div>
            <h2 className="font-bold mb-3 uppercase text-sm">Lists</h2>
            <div className="flex flex-col gap-2">
              <Link to={"users"}>
                <div className="flex items-center gap-2">
                  <MdAccountBox className="text-xl" />
                  Users
                </div>
              </Link>
              <Link to={"products"}>
                <div className="flex items-center gap-2">
                  <MdShoppingBag className="text-xl" />
                  Products
                </div>
              </Link>
              <Link to={"orders"}>
                <div className="flex items-center gap-2">
                  <MdArticle className="text-xl" />
                  Orders
                </div>
              </Link>
              <Link to={"earnings"}>
                <div className="flex items-center gap-2">
                  <HiCurrencyDollar className="text-xl" />
                  Earnings
                </div>
              </Link>
            </div>
          </div>

          <div>
            <h2 className="font-bold mb-3 uppercase text-sm ">Account</h2>
            <div className="flex flex-col gap-2">
              <Link to={"profile"}>
                <div className="flex items-center gap-2">
                  <MdManageAccounts className="text-xl" />
                  Profile
                </div>
              </Link>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}

export default Sidebar;
