import image34 from "./../../assets/images/image34.jpg";
import mobileviewcontact from "./../../assets/images/mobileviewcontact.jpg";
import React, { useState, useEffect } from "react";

function ContactUs1() {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="flex flex-col items-center">
      <div
        className="h-[60vh] flex justify-center items-center w-full"
        style={{
          backgroundImage: `url(${isMobile ? mobileviewcontact : image34})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="w-full">
          <div className="flex  gap-1.5 font-sans font-semibold text-green-500">
            {/* <a href="/" className="text-xl md:text-2xl hover:underline">
              Home
            </a>{" "}
            &gt;{" "} */}
            {/* <span className="text-gray-900 text-4xl font-architects">
              Contact Us
            </span> */}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 bg-gray-100 h-1/2 flex flex-col items-center justify-center p-10">
        <div className="text-black font-sans tracking-wider leading-relaxed text-base md:text-lg lg:text-xl text-center px-4 md:px-11 rounded-lg">
          In today’s world, where attractive looks and charming personalities
          are showcased everywhere—from magazines and social media to TV and the
          internet—it's evident that healthy hair and skin play a vital role in
          your overall appearance. For personalized solutions and effective
          treatments for your hair and skin, contact us at{" "}
          <span className="text-green-600 font-medium">Slim and Smile</span> Ayu
          Care. Book an appointment to enhance your natural beauty and achieve
          glowing, healthy skin and hair.
        </div>
      </div>
    </div>
  );
}

export default ContactUs1;
