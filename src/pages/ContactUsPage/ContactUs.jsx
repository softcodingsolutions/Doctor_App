import { useScroll } from "framer-motion";
import Lenis from "lenis";
import { useEffect, useRef } from "react";
import { StickyNavbar } from "../LandingPage/StickyNavbar";
import Section6 from "../LandingPage/Section6";
import ContactUs1 from "./ContactUs1";
import ContactUs2 from "./ContactUs2";

function ContactUs() {
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
        className="relative max-h-[310vh] overflow-x-clip bg-white font-teachers"
      >
        <ContactUs1 scrollYProgress={scrollYProgress} />
        <ContactUs2 scrollYProgress={scrollYProgress} />
        <Section6 scrollYProgress={scrollYProgress} />
      </main>
    </>
  );
}

export default ContactUs;
