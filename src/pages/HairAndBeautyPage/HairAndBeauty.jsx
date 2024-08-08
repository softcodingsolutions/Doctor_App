import { useScroll } from "framer-motion";
import Lenis from "lenis";
import { useEffect, useRef } from "react";
import { StickyNavbar } from "../LandingPage/StickyNavbar";
import Section6 from "../LandingPage/Section6";
import HairAndBeauty1 from "./HairAndBeauty1";

function HairAndBeauty() {
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
        className="relative max-h-[575vh] overflow-x-clip bg-white font-poppins"
      >
        <HairAndBeauty1 scrollYProgress={scrollYProgress} />

        <Section6 scrollYProgress={scrollYProgress} />
      </main>
    </>
  );
}

export default HairAndBeauty;
