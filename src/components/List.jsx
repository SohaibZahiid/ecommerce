import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

function List({ ths, orders }) {
  return (
    <>
      <h2 className="font-bold text-2xl mb-2">Orders</h2>
      <Table>
        <TableCaption>A list of orders.</TableCaption>
        <TableHeader>
          <TableRow>
            {ths.map((th, i) => (
              <TableHead key={i}>{th}</TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {orders.map((order) => (
            <TableRow key={order._id}>
              <TableCell>{order.user.name}</TableCell>
              <TableCell>
                <ul>
                  {order.products.map((product) => (
                    <li key={product._id}>
                      {product.title} x {product.quantity}
                    </li>
                  ))}
                </ul>{" "}
              </TableCell>
              <TableCell>${order.amount}</TableCell>
              <TableCell>
                <p
                  className={`w-max px-1 rounded-md text-white ${
                    order.status !== "pending" ? "bg-green-600" : "bg-red-600"
                  }`}
                >
                  {order.status}
                </p>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
}

export default List;
