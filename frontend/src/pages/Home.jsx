
import React from "react";
import Hero from "../components/Layout/Hero";
import Electronics from "../components/Products/Electronics";
import MenOnly from "../components/Products/MenOnly";
import WomenOnly from "../components/Products/WomenOnly";
import Furniture from "../components/Products/Furniture";
import Toys from "../components/Products/Toys";
import FoodItems from "../components/Products/FoodItems";

const Home = () => (
  <div>
    <Hero />
    <Electronics />
    <MenOnly />
    <WomenOnly />
    <Furniture />
    <Toys />
    <FoodItems />
  </div>
);

export default Home;
