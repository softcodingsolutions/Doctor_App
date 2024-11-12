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
import ChatLeadForm from "../../components/Chat/ChatLeadForm";

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
      <main ref={container} className="relative  bg-white font-sans">
        <WeightLoss1  />
        <WeightLoss2 />
        <WeightLoss3  />
        <WeightLoss4  />
        <WeightLoss5 />
        <WeightLoss6  />
        <Section6  />
        <ChatLeadForm />
      </main>
    </>
  );
}

export default WeightLossPage;
