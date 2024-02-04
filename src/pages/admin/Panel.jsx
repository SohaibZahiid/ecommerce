import Card from "../../components/admin/Card";
import Chart from "../../components/admin/Chart";

function Panel() {
  return (
    <section className="h-full p-5">
      <div className="flex justify-between flex-wrap gap-5">
        <Card type={"users"} />
        <Card type={"orders"} />
        <Card type={"earnings"} />
        <Card type={"balance"} />
      </div>
      <div className="shadow-md rounded-md p-2 pb-6">
        <Chart />
      </div>
    </section>
  );
}

export default Panel;
