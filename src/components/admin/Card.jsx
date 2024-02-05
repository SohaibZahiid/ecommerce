import {
  HiOutlineUser,
  HiChevronUp,
  HiOutlineArchiveBoxArrowDown,
  HiOutlineCurrencyDollar,
  HiOutlineWallet,
  HiChevronDown,
} from "react-icons/hi2";

function Card({ type, stats }) {
  let data;

  switch (type) {
    case "users":
      console.log(stats);
      data = {
        title: "USERS",
        isMoney: false,
        link: "See all users",
        value: stats.userStats[1]?.["Active Users"],
        percentage:
          (stats.userStats[1]?.["Active Users"] * 100) /
            stats.userStats[0]?.["Active Users"] -
            100 || 0,
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
        value: stats.orderStats[1]?.totalOrders || 0,
        percentage:
          (stats.orderStats[1]?.totalOrders * 100) /
            stats.orderStats[0]?.totalOrders -
            100 || 0,
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
        value: stats.incomeStats[1]?.totalEarnings || 0,
        percentage:
          (stats.incomeStats[1]?.totalEarnings * 100) /
            stats.incomeStats[0]?.totalEarnings -
            100 || 0,
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
          <div
            className={`${
              data.percentage < 0 ? "text-red-600" : "text-green-600"
            }  flex items-center gap-1`}
          >
            {data.percentage < 0 ? (
              <HiChevronDown className="text-red-600" />
            ) : (
              <HiChevronUp className="text-green-600" />
            )}
            <p>{Math.floor(data.percentage)} %</p>
          </div>
        </div>
        <h2 className="text-3xl">
          {data.isMoney && "$"} {data.value}
        </h2>
        <div className="flex justify-between">
          <p className="underline">{data.link}</p>
          {data.icon}
        </div>
      </div>
    </div>
  );
}

export default Card;
