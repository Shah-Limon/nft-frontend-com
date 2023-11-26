import React from "react";
import Banner from "../components/Banner";
import AboutUs from "../components/HomePage/AboutUs";
import OurSpeciality from "../components/HomePage/OurSpeciality";
import Portfolio from "../components/HomePage/Portfolio";

import RoadMap from "../components/HomePage/RoadMap";
import Team from "../components/HomePage/Team";
import Testimonials from "../components/HomePage/Testimonials";

import Pricing from "../components/HomePage/Pricing";
import FeaturesPage from "./FeaturesPage";

const Home = () => {
  return (
    <div>
      <Banner></Banner>
      <FeaturesPage></FeaturesPage>
      <AboutUs></AboutUs>
   
      <OurSpeciality></OurSpeciality>
      <Portfolio></Portfolio>
      <Pricing></Pricing>

      <RoadMap></RoadMap>
      <Team></Team>
      <Testimonials></Testimonials>
    </div>
  );
};

export default Home;
