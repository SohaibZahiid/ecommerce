import { AuthContext } from "@/context/AuthContext";
import { useContext } from "react";
import { HiMagnifyingGlass } from "react-icons/hi2";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";

function Topbar() {
  const { currentUser, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  return (
    <div className="border-b w-full h-16 flex items-center px-5">
      <div className="w-full flex justify-between items-center">
        <div className="flex items-center border rounded-md">
          <input
            type="text"
            className="outline-none px-2 py-1 rounded-md"
            placeholder="Search..."
          />
          <div className="px-2 cursor-pointer">
            <HiMagnifyingGlass className="text-xl" />
          </div>
        </div>
        <Button
          onClick={() => {
            console.log("here");
            logout();
            navigate("/login");
          }}
        >
          Logout
        </Button>
      </div>
    </div>
  );
}

export default Topbar;
