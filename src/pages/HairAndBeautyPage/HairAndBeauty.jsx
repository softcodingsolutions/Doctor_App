import { StickyNavbar } from "../LandingPage/StickyNavbar";
import Section6 from "../LandingPage/Section6";
import HairAndBeauty1 from "./HairAndBeauty1";
import HairAndBeauty2 from "./HairAndBeauty2";
import HairAndBeauty3 from "./HairAndBeauty3";
import HairAndBeauty4 from "./HairAndBeauty4";
import PatientRegistration from "../LandingPage/PatientRegistration";

function HairAndBeauty() {
  return (
    <>
      <header>
        <StickyNavbar />
      </header>
      <main className="relative max-h-[500vh] overflow-x-clip bg-white font-sans">
        <HairAndBeauty1 />
        <HairAndBeauty2 />
        <HairAndBeauty3 />
        <HairAndBeauty4 />
        <Section6 />
      </main>
    </>
  );
}

export default HairAndBeauty;
