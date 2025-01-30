import hairandbeauty from "./../../assets/images/hairandbeauty_converted.webp";
import React, { useState, useEffect } from "react";
function HairAndBeauty1() {
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
    <div className=" flex flex-col items-center ">
      <div
        className="h-[60vh] flex justify-center items-center w-full  bg-cover bg-center "
        style={{
          backgroundImage: `url(${hairandbeauty})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* Breadcrumb Navigation */}
        <div className="w-full ">
          <div
            className={`text-3xl flex items-start ${
              isMobile ? "p-3" : "p-56"
            } gap-1.5 font-sans font-semibold text-black`}
          >
            {/* <a href="/" className="hover:underline">
              Home
            </a>{" "}
            &gt;{" "} */}
            <span className="flex  text-teal-600  text-2xl md:text-4xl font-architects">
              Hair & Beauty Treatment
            </span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 bg-gray-100 h-1/2 flex flex-col items-center justify-center p-4">
        <div className="text-black font-sans tracking-wider leading-relaxed text-lg sm:text-xl text-center px-4 sm:px-11 rounded-lg">
          Every day, we encounter images of people with attractive looks and
          charming personalities in magazines, social media, television, or the
          internet. Many modern mobile phones come with camera filters that add
          smooth skin and a glowing effect to photos. Given this, it's clear
          that the health of your hair and skin is crucial to your overall
          appearance and adds character to your visible personality.
        </div>
      </div>
    </div>
  );
}

export default HairAndBeauty1;
