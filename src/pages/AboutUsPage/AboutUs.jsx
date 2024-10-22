import { StickyNavbar } from "../LandingPage/StickyNavbar";
import Section6 from "../LandingPage/Section6";
import AboutSection3 from "./AboutSection3";
import AboutSection2 from "./AboutSection2";
import AboutSection1 from "./AboutSection1";
import AboutSection4 from "./AboutSection4";

function AboutUs() {

  return (
    <>
      <header>
        <StickyNavbar />
      </header>
      <main className="bg-white font-sans">
        <AboutSection1 />
        <AboutSection2 />
        <AboutSection3 />
        <AboutSection4 />
        <Section6 />
      </main>
    </>
  );
}

export default AboutUs;
