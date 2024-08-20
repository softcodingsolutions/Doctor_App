import { useScroll } from "framer-motion";
import Lenis from "lenis";
import { useEffect, useRef } from "react";
import { StickyNavbar } from "../LandingPage/StickyNavbar";
import Section6 from "../LandingPage/Section6";
import HairAndBeauty1 from "./HairAndBeauty1";
import HairAndBeauty2 from "./HairAndBeauty2";
import HairAndBeauty3 from "./HairAndBeauty3";
import HairAndBeauty4 from "./HairAndBeauty4";

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
        className="relative max-h-[500vh] overflow-x-clip bg-white font-teachers"
      >
        <HairAndBeauty1 scrollYProgress={scrollYProgress} />
        <HairAndBeauty2 scrollYProgress={scrollYProgress} />
        <HairAndBeauty3 scrollYProgress={scrollYProgress} />
        <HairAndBeauty4 scrollYProgress={scrollYProgress} />
        <Section6 scrollYProgress={scrollYProgress} />
      </main>
    </>
  );
}

export default HairAndBeauty;
