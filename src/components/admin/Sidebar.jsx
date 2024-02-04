import {
  MdDashboard,
  MdAccountBox,
  MdShoppingBag,
  MdArticle,
} from "react-icons/md";

import { Link } from "react-router-dom";

function Sidebar() {
  return (
    <aside className="p-5 py sticky min-h-screen min-w-[300px] border-r hidden md:block">
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
            <Link to={"/dashboard"}>
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
          </div>
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;
