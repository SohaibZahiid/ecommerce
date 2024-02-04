import {
  HiOutlineUser,
  HiChevronUp,
  HiOutlineArchiveBoxArrowDown,
  HiOutlineCurrencyDollar,
  HiOutlineWallet,
} from "react-icons/hi2";

function Card({ type }) {
  let data;

  switch (type) {
    case "users":
      data = {
        title: "USERS",
        isMoney: false,
        link: "See all users",
        icon: (
          <div className="p-1 bg-red-500 rounded-md">
            <HiOutlineUser className="text-white" />
          </div>
        ),
      };
      break;
    case "orders":
      data = {
        title: "ORDERS",
        isMoney: false,
        link: "View all users",
        icon: (
          <div className="p-1 bg-yellow-400 rounded-md">
            <HiOutlineArchiveBoxArrowDown className="text-white" />
          </div>
        ),
      };
      break;
    case "earnings":
      data = {
        title: "EARNINGS",
        isMoney: true,
        link: "View all earnings",
        icon: (
          <div className="p-1 bg-green-500 rounded-md">
            <HiOutlineCurrencyDollar className="text-white" />
          </div>
        ),
      };
      break;

    case "balance":
      data = {
        title: "BALANCE",
        isMoney: true,
        link: "See details",
        icon: (
          <div className="p-1 bg-purple-500 rounded-md">
            <HiOutlineWallet className="text-white" />
          </div>
        ),
      };
      break;
    default:
      break;
  }

  return (
    <div className="shadow-md rounded-md p-2 flex-1 min-w-[200px]">
      <div className="flex flex-col gap-3">
        <div className="flex justify-between">
          <h2 className="uppercase font-bold">{data.title}</h2>
          <div className="text-green-600 flex items-center gap-1">
            <HiChevronUp />
            <p>20 %</p>
          </div>
        </div>
        <h2 className="text-3xl">{data.isMoney && "$"} 100</h2>
        <div className="flex justify-between">
          <p className="underline">{data.link}</p>
          {data.icon}
        </div>
      </div>
    </div>
  );
}

export default Card;
