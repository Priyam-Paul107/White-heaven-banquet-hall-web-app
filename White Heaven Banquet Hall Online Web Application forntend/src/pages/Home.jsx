import React, { useContext } from "react";
import HeroSection from "../components/HeroSection";
import Feedback from "../components/feedback";
import { AppContext } from "../context/AppContext";
const Home = () => {
  const {navigate} = useContext(AppContext);
  return (
    <div>
      <div className="s:mb-10">

      <HeroSection />
      </div>
      
   
      <Feedback />
    </div>
  );
};

export default Home;
