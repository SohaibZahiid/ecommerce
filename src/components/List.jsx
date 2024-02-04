import { useContext } from "react";
import {
  HiMiniPencilSquare,
  HiOutlineEye,
  HiOutlineTrash,
} from "react-icons/hi2";
import { AuthContext } from "../context/AuthContext";

function List({ ths, orders }) {
  const { currentUser } = useContext(AuthContext);
  return (
    <div className="flex flex-col">
      <div className="-m-1.5 overflow-x-auto">
        <div className="p-1.5 min-w-full inline-block align-middle">
          <div className="overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="border-b font-medium">
                <tr>
                  {ths.map((th, i) => (
                    <th
                      key={i}
                      scope="col"
                      className="px-6 py-3 text-start font-bold uppercase"
                    >
                      {th}
                    </th>
                  ))}
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
                          <li key={product._id}>
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
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default List;
