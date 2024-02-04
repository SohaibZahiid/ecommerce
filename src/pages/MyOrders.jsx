import { useContext, useEffect, useState } from "react";
import List from "../components/List";
import { toast } from "sonner";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";

function MyOrders() {
  const [orders, setOrders] = useState([]);
  const { currentUser } = useContext(AuthContext);

  const getOrders = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/orders/${currentUser.user._id}`,
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
    <section className="flex-1 my-10">
      <div className="container">
        {/* <div className="flex flex-col">
          <div className="-m-1.5 overflow-x-auto">
            <div className="p-1.5 min-w-full inline-block align-middle">
              <div className="overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                  <thead className="border-b font-medium">
                    <tr>
                      <th
                        scope="col"
                        className="px-6 py-3 text-start font-bold uppercase"
                      >
                        User
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-start font-bold uppercase"
                      >
                        Products
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-start font-bold uppercase"
                      >
                        Amount
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-start font-bold uppercase"
                      >
                        Status
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-start font-bold uppercase"
                      >
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.map((order) => (
                      <tr key={order._id} className="border-b">
                        <td className="whitespace-nowrap px-6 py-4">
                          <p>{order.user.name}</p>
                        </td>
                        <td className="whitespace-nowrap px-6 py-4">
                          <ul>
                            {order.products.map((product) => (
                              <li>
                                {product.title} x {product.quantity}
                              </li>
                            ))}
                          </ul>{" "}
                        </td>
                        <td className="whitespace-nowrap px-6 py-4">
                          ${order.amount}
                        </td>
                        <td className="whitespace-nowrap px-6 py-4">
                          <p
                            className={`w-max px-1 rounded-md text-white ${
                              order.status !== "pending"
                                ? "bg-green-600"
                                : "bg-red-600"
                            }`}
                          >
                            {order.status}
                          </p>
                        </td>
                        <td className="whitespace-nowrap px-6 py-4">
                          {currentUser.user.role === "admin" ? (
                            <div className="flex gap-2 text-xl">
                              <HiOutlineTrash
                                className="cursor-pointer"
                                onClick={() => handleDelete(order._id)}
                              />
                              <HiMiniPencilSquare
                                className="cursor-pointer"
                                onClick={() => {}}
                              />
                              <HiOutlineEye className="cursor-pointer" />
                            </div>
                          ) : (
                            <HiOutlineEye className="cursor-pointer" />
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div> */}
        <List ths={["User", "Order", "Amount", "Status"]} orders={orders} />
      </div>
    </section>
  );
}

export default MyOrders;
