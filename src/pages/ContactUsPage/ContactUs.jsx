import { StickyNavbar } from "../LandingPage/StickyNavbar";
import Section6 from "../LandingPage/Section6";
import ContactUs1 from "./ContactUs1";
import ContactUs2 from "./ContactUs2";
import ChatLeadForm from "../../components/Chat/ChatLeadForm";
function ContactUs() {
  return (
    <>
      <header>
        <StickyNavbar />
      </header>
      <main className="relative max-h-[310vh] overflow-x-clip bg-white font-sans">
        <ContactUs1 />
        <ContactUs2 />
        <Section6 />
        <ChatLeadForm />
      </main>
    </>
  );
}

export default ContactUs;
