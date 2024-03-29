import { useContext, useEffect, useState } from "react";
import List from "../../components/List";
import { AuthContext } from "../../context/AuthContext";
import { toast } from "sonner";
import axios from "axios";

function Orders() {
  const { currentUser } = useContext(AuthContext);
  const [orders, setOrders] = useState([]);

  const getOrders = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/orders`,
        {
          headers: {
            "auth-token": `Bearer ${currentUser.token}`,
          },
        }
      );
      if (data) {
        setOrders(data);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    getOrders();
  }, []);

  return (
    <section>
      <div className="p-5 my-5">
        <List ths={["User", "Order", "Amount", "Status"]} orders={orders} />
      </div>
    </section>
  );
}

export default Orders;
