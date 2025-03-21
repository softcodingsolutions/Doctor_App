import { StickyNavbar } from "../LandingPage/StickyNavbar";
import Section6 from "../LandingPage/Section6";
import AboutSection3 from "./AboutSection3";
import AboutSection2 from "./AboutSection2";
import AboutSection1 from "./AboutSection1";
import AboutSection4 from "./AboutSection4";
import PatientRegistration from "../LandingPage/PatientRegistration";
import ChatLeadForm from "../../components/Chat/ChatLeadForm";
function AboutUs() {
  return (
    <>
      <header>
        <StickyNavbar />
      </header>
      <main className="relative max-h-[575vh] overflow-x-clip bg-white font-sans">
        <AboutSection1 />
        <AboutSection2 />
        <AboutSection3 />
        <AboutSection4 />
        <Section6 />
        <ChatLeadForm />
      </main>
    </>
  );
}

export default AboutUs;
