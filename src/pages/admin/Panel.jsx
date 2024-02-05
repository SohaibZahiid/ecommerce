import { toast } from "sonner";
import Card from "../../components/admin/Card";
import Chart from "../../components/admin/Chart";
import axios from "axios";
import { useContext, useEffect, useMemo, useState } from "react";
import { AuthContext } from "../../context/AuthContext";

function Panel() {
  const { currentUser } = useContext(AuthContext);
  const [stats, setStats] = useState({
    userStats: [],
    incomeStats: [],
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

        setStats({
          incomeStats: data.orders,
          userStats: newUserStats,
        });
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    getStats();
  }, [MONTHS]);

  return (
    <section className="h-full p-5">
      <div className="flex justify-between flex-wrap gap-5">
        <Card type={"users"} stats={{ userStats: stats.userStats }} />
        <Card type={"orders"} stats={{ orderStats: stats.incomeStats }} />
        <Card
          type={"earnings"}
          stats={{
            incomeStats: stats.incomeStats,
          }}
        />
      </div>
      <div className="shadow-md rounded-md p-2 pb-6 mt-5">
        <Chart data={stats.userStats} />
      </div>
    </section>
  );
}

export default Panel;
