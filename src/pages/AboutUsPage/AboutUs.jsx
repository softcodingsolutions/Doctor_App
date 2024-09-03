import { StickyNavbar } from "../LandingPage/StickyNavbar";
import { useScroll } from "framer-motion";
import { useEffect, useRef } from "react";
import Lenis from "lenis";
import Section6 from "../LandingPage/Section6";
import AboutSection3 from "./AboutSection3";
import AboutSection2 from "./AboutSection2";
import AboutSection1 from "./AboutSection1";
import AboutSection4 from "./AboutSection4";

function AboutUs() {
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
      <main ref={container} className="relative h-[500vh] bg-white font-sans">
        <AboutSection1 scrollYProgress={scrollYProgress} />
        <AboutSection2 scrollYProgress={scrollYProgress} />
        <AboutSection3 scrollYProgress={scrollYProgress} />
        <AboutSection4 scrollYProgress={scrollYProgress} />
        <Section6 scrollYProgress={scrollYProgress} />
      </main>
    </>
  );
}

export default AboutUs;
