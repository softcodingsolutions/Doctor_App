import { useEffect, useRef } from "react";
import { StickyNavbar } from "../LandingPage/StickyNavbar";
import { useScroll } from "framer-motion";
import Lenis from "lenis";
import Section6 from "../LandingPage/Section6";
import WeightLoss1 from "./WeightLoss1";
import WeightLoss2 from "./WeightLoss2";
import WeightLoss3 from "./WeightLoss3";
import WeightLoss4 from "./WeightLoss4";
import WeightLoss5 from "./WeightLoss5";
import WeightLoss6 from "./WeightLoss6";

function WeightLossPage() {
  const container = useRef();
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start start", "end end"],
  });

  useEffect(() => {
    const lenis = new Lenis();

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    localStorage.clear();
  }, []);

  return (
    <>
      <header>
        <StickyNavbar />
      </header>
      <main
        ref={container}
        className="relative h-[700vh] bg-white font-teachers"
      >
        <WeightLoss1 scrollYProgress={scrollYProgress} />
        <WeightLoss2 scrollYProgress={scrollYProgress} />
        <WeightLoss3 scrollYProgress={scrollYProgress} />
        <WeightLoss4 scrollYProgress={scrollYProgress} />
        <WeightLoss5 scrollYProgress={scrollYProgress} />
        <WeightLoss6 scrollYProgress={scrollYProgress} />
        <Section6 scrollYProgress={scrollYProgress} />
      </main>
    </>
  );
}

export default WeightLossPage;
