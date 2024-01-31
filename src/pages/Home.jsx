import React from "react";
import Services from "../components/Services";
import Hero from "../components/Hero";
import Categories from "../components/Categories";
import Promotion from "../components/Promotion";

function Home() {
  return (
    <>
      <Hero />
      <Categories />
      <Promotion />
      <Services />
    </>
  );
}

export default Home;
