import { toast } from "sonner";
import Card from "../../components/admin/Card";
import Chart from "../../components/admin/Chart";
import axios from "axios";
import { useContext, useEffect, useMemo, useState } from "react";
import { AuthContext } from "../../context/AuthContext";

function Panel() {
  const { currentUser } = useContext(AuthContext);
  const [stats, setStats] = useState({
    userStats: null,
    incomeStats: null,
  });

  const MONTHS = useMemo(
    () => [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "Octuber",
      "November",
      "December",
    ],
    []
  );

  const getStats = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/stats`,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            "auth-token": `Bearer ${currentUser.token}`,
          },
        }
      );
      if (data) {
        const newUserStats = data.users.map((item) => ({
          name: MONTHS[item._id - 1],
          "Active Users": item.totalUsers,
        }));

        const newIncomeStats = data.orders.map((item) => ({
          name: MONTHS[item._id - 1],
          earnings: item.totalEarnings,
          orders: item.totalOrders,
        }));

        setStats({ userStats: newUserStats, incomeStats: newIncomeStats });
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    getStats();
  }, [MONTHS]);

  const sortedUserStats = stats?.userStats
    ?.slice()
    .sort((a, b) => MONTHS.indexOf(a.name) - MONTHS.indexOf(b.name));

  return (
    <section className="h-full p-5">
      <div className="flex justify-between flex-wrap gap-5">
        <Card type={"users"} data={stats.userStats} />
        <Card type={"orders"} />
        <Card type={"earnings"} stats={{ incomeStats: stats.incomeStats }} />
      </div>
      <div className="shadow-md rounded-md p-2 pb-6 mt-5">
        <Chart data={sortedUserStats} />
      </div>
    </section>
  );
}

export default Panel;
