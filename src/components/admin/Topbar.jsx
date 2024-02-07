import { AuthContext } from "@/context/AuthContext";
import { useContext, useState } from "react";
import { HiMagnifyingGlass } from "react-icons/hi2";
import { Button } from "../ui/button";
import { Link, useNavigate } from "react-router-dom";
import { MdMenu } from "react-icons/md";

function Topbar() {
  const { currentUser, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  return (
    <div className="border-b w-full p-3 flex items-center px-5">
      <div className="w-full flex justify-center items-center">
        {/* <div className="flex items-center border rounded-md">
          <input
            type="text"
            className="outline-none px-2 py-1 rounded-md"
            placeholder="Search..."
          />
          <div className="px-2 cursor-pointer">
            <HiMagnifyingGlass className="text-xl" />
          </div>
        </div> */}

        <div className="ml-auto">
          <Link to={"/"}>Home</Link>
          <Button
            className="ml-3"
            onClick={() => {
              logout();
              navigate("/login");
            }}
          >
            Logout
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Topbar;
