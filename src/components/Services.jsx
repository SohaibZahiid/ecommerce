import Service from "./Service";
import { HiOutlineTruck } from "react-icons/hi2";
import { HiOutlineCurrencyDollar } from "react-icons/hi2";
import { HiOutlinePhone } from "react-icons/hi2";
import { HiOutlineWallet } from "react-icons/hi2";

function Services() {
  return (
    <section className="my-20">
      <div className="flex flex-wrap gap-4 container">
        <Service
          title={"Free Shipping"}
          desc={"Free shipping for order above $150"}
          icon={<HiOutlineTruck className="text-4xl mb-2" />}
        />
        <Service
          title={"Money Guarantee"}
          desc={"WIthin 30 days for an exchange"}
          icon={<HiOutlineCurrencyDollar className="text-4xl mb-2" />}
        />
        <Service
          title={"Online Support"}
          desc={"24 hours a day, 7 days a week"}
          icon={<HiOutlinePhone className="text-4xl mb-2" />}
        />
        <Service
          title={"Flexible Payment"}
          desc={"Pay with multiple credit cards"}
          icon={<HiOutlineWallet className="text-4xl mb-2" />}
        />
      </div>
    </section>
  );
}

export default Services;
