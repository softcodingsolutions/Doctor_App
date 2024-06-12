import { useScroll } from "framer-motion";
import { useEffect, useRef } from "react";
import Section1 from "./Section1";
import Section2 from "./Section2";
import Lenis from "lenis";

function LandingPage() {
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
  }, []);

  return (
    <main ref={container} className="relative h-[200vh]">
      <Section1 scrollYProgress={scrollYProgress} />
      <Section2 scrollYProgress={scrollYProgress} />
    </main>
  );
}

export default LandingPage;
