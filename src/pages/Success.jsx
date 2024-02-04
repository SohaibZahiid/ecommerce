import { Link, useLocation } from "react-router-dom";

function Success() {
  const location = useLocation();

  const orderId = location.state;

  return (
    <section className="flex-1 grid place-items-center">
      {orderId ? (
        <div className="container flex flex-col gap-2 justify-center items-center">
          <h1 className="text-4xl font-bold ">Than you for your order!</h1>
          <p>
            Your order has been confirmed. You will receive an email
            confirmation shortly. Your order id is: {orderId}
          </p>
          <div className="flex gap-2">
            <Link to={"/myorders"}>
              <button className="btn-primary">View orders</button>
            </Link>
            {/* <button className="btn-primary bg-transparent text-black border border-black">
              View all orders
            </button> */}
          </div>
        </div>
      ) : (
        <h1 className="text-xl"> Something went wrong. Try Again</h1>
      )}
    </section>
  );
}

export default Success;
