import React from "react";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";

function Hero() {
  return (
    <section>
      <div className="bg-gray-200 h-[600px] px-5 md:px-20 lg:px-32 rounded container flex flex-col justify-center hero-background">
        <h1 className="text-7xl font-extrabold">
          Unleash Innovation <br /> in Every Byte.
        </h1>
        <h2 className="text-2xl font-bold mt-4">
          Explore a World of Cutting-Edge Tech
        </h2>
        <Link
          aria-label="Shop now"
          to={"/shop"}
          className="btn-primary mt-10 self-start"
        >
          <Button className="btn">Shop now</Button>
        </Link>
      </div>
    </section>
  );
}

export default Hero;
