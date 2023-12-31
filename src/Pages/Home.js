import React from "react";
import Banner from "../components/Banner";
import AboutUs from "../components/HomePage/AboutUs";
import OurSpeciality from "../components/HomePage/OurSpeciality";
import Portfolio from "../components/HomePage/Portfolio";
import RoadMap from "../components/HomePage/RoadMap";
import Team from "../components/HomePage/Team";
import Testimonials from "../components/HomePage/Testimonials";
import FeaturesPage from "./FeaturesPage";
import ServicesList from "../components/HomePage/ServicesList";

const Home = () => {
  return (
    <div>
      <Banner></Banner>
      <ServicesList></ServicesList>
      <AboutUs></AboutUs>
      <FeaturesPage></FeaturesPage>
      <OurSpeciality></OurSpeciality>
      <Portfolio></Portfolio>

      <RoadMap></RoadMap>
      <Team></Team>
      <Testimonials></Testimonials>
    </div>
  );
};

export default Home;
