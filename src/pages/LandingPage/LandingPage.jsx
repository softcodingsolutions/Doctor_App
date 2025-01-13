import Section1 from "./Section1";
import Section2 from "./Section2";
import Section3 from "./Section3";
import Section4 from "./Section4";
import Section5 from "./Section5";
import Section6 from "./Section6";
import { StickyNavbar } from "./StickyNavbar";
import ChatLeadForm from "../../components/Chat/ChatLeadForm";


function LandingPage() {
  return (
    <>
      <header>
        <StickyNavbar />
      </header>
      <main className="relative max-h-[575vh] overflow-x-clip bg-white font-sans">
        <Section1 />
        <Section2 />
        <Section3 />
        <Section4 />
        <Section5 />
        <Section6 />
        <ChatLeadForm/>
      </main>
    </>
  );
}

export default LandingPage;
