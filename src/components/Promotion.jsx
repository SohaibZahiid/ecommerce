import { useEffect, useState } from "react";
import image from "../assets/images/image-4.svg";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";

function Promotion() {
  const [countdown, setCountdown] = useState({
    days: 0,
    hours: 0,
    min: 0,
    sec: 0,
  });

  const targetDate = new Date();
  targetDate.setDate(targetDate.getDate() + 7);

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const diff = Math.max(targetDate - now, 0);

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const min = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const sec = Math.floor((diff % (1000 * 60)) / 1000);

      setCountdown({ days, hours, min, sec });

      if (diff === 0) {
        clearInterval(interval);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section>
      <div className="container flex flex-wrap gap-8 items-center">
        <div className="flex-1">
          <h2 className="text-2xl mb-8">Deals of the Month</h2>
          <p>
            Get ready for a shopping experience like never before with aur Deals
            of the Month! Every purchase comes with excvlusive perks and offers,
            making this month a celebration of savvy choices and amazing deals.
            Don't miss out!
          </p>
          <div className="flex flex-wrap gap-8 mt-4">
            <div className="min-w-[100px] flex flex-col items-center justify-center py-2 px-4 border border-gray-100">
              <h2 className="text-2xl font-bold">{countdown.days}</h2>
              <p>Days</p>
            </div>
            <div className="min-w-[100px] flex flex-col items-center justify-center py-2 px-4 border border-gray-100">
              <h2 className="text-2xl font-bold">{countdown.hours}</h2>
              <p>Hours</p>
            </div>
            <div className="min-w-[100px] flex flex-col items-center justify-center py-2 px-4 border border-gray-100">
              <h2 className="text-2xl font-bold">{countdown.min}</h2>
              <p>Mins</p>
            </div>
            <div className="min-w-[100px] flex flex-col items-center justify-center py-2 px-4 border border-gray-100">
              <h2 className="text-2xl font-bold">{countdown.sec}</h2>
              <p>Sec</p>
            </div>
          </div>
          <Link
            aria-label="View products"
            to={"/shop"}
            className="inline-block mt-4"
          >
            <Button>View products</Button>
          </Link>
        </div>
        <div>
          <img
            src={image}
            className="flex-1 w-full max-w-[500px]"
            alt="promotion"
          />
        </div>
      </div>
    </section>
  );
}

export default Promotion;
