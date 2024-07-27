import { useScroll } from "framer-motion";
import { useEffect, useRef } from "react";
import Section1 from "./Section1";
import Section2 from "./Section2";
import Section3 from "./Section3";
import Section4 from "./Section4";
import Section5 from "./Section5";
import Section6 from "./Section6";
import Lenis from "lenis";
import { StickyNavbar } from "./StickyNavbar";

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

    localStorage.clear();
  }, []);

  return (
    <>
      <header>
        <StickyNavbar />
      </header>
      <main ref={container} className="relative h-[575vh] bg-white">
        <Section1 scrollYProgress={scrollYProgress} />
        <Section2 scrollYProgress={scrollYProgress} />
        <Section3 scrollYProgress={scrollYProgress} />
        <Section4 scrollYProgress={scrollYProgress} />
        <Section5 scrollYProgress={scrollYProgress} />
        <Section6 scrollYProgress={scrollYProgress} />
      </main>
    </>
  );
}

export default LandingPage;
