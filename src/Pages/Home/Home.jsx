import "./Home.css";

import Hero from "../../Hero/Hero";
import Promises from "../../Promises/Promises";
import Gallery from "../../Gallery/Gallery";
import Marquee from "../../Marquee/Marquee";

function Home() {
  return (
    <>
      <Hero />
      <Promises />
      <Gallery />
      <Marquee />
    </>
  );
}

export default Home;