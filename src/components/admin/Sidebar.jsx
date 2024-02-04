import { useState } from "react";
import {
  HiOutlineUser,
  HiMiniChevronDown,
  HiMiniChevronUp,
  HiOutlineArchiveBoxArrowDown,
  HiOutlineNewspaper,
} from "react-icons/hi2";
import { Link } from "react-router-dom";

function Sidebar() {
  const [toggleDropdown, setToggleDropdown] = useState(false);

  return (
    <aside className="p-5 sticky min-h-screen min-w-[300px] border-r  hidden md:block">
      <h1 className="font-bold text-2xl mb-10">
        <Link to={"/dashboard"}>AppleAdmin</Link>
      </h1>
      <div>
        <h2 className="font-bold mb-6 uppercase text-sm">Main</h2>
        <div className="flex flex-col gap-2">
          <Link to={"profile"}>
            <div className="flex items-center gap-2 py-2">
              <HiOutlineUser className="text-xl" />
              Profile
            </div>
          </Link>
          <div className="" onClick={() => setToggleDropdown(!toggleDropdown)}>
            <div className="flex items-center justify-between py-2 cursor-pointer">
              <div className="flex items-center gap-2">
                <HiOutlineArchiveBoxArrowDown className="text-xl" />
                <p>Products</p>
              </div>
              {!toggleDropdown ? (
                <HiMiniChevronDown className="text-xl" />
              ) : (
                <HiMiniChevronUp className="text-xl" />
              )}
            </div>
            {toggleDropdown && (
              <div className="pl-6 py-2 bg-white text-black rounded-md">
                <div>
                  <Link to={"products"}>
                    <div className="">View products</div>
                  </Link>
                </div>
              </div>
            )}
          </div>
          <Link to={"orders"}>
            <div className="flex items-center gap-2 py-2">
              <HiOutlineNewspaper className="text-xl" />
              Orders
            </div>
          </Link>
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;
