import { Card, CardBody, Typography } from "@material-tailwind/react";
import { FaRegHandshake } from "react-icons/fa6";
import { IoGlobeOutline } from "react-icons/io5";
import { FaMedal } from "react-icons/fa";
import React, { useState, useEffect } from "react";

function Section4() {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [slideIn, setSlideIn] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);
    setSlideIn(true);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="cursor-default bg-white flex flex-col items-center py-7">
      <div className="flex flex-col items-center">
        <div className="lg:text-3xl text-xl font-sans font-medium">
          Why Choose Us?
        </div>
        <div className="border-[2.5px] rounded-md border-green-500 w-20" />
      </div>

      {!isMobile ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 m-2 lg:gap-5">
          <Card
            className={`hover:scale-105 transition-transform duration-1000 ${
              slideIn ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"
            }`}
          >
            <CardBody>
              <Typography
                variant="h5"
                color="blue-gray"
                className="flex gap-3 mb-5 font-sans text-green-500"
              >
                <FaRegHandshake size={30} /> Personalized Treatments
              </Typography>
              <Typography className="font-sans">
                We analyze your body to identify the reason for excess fat in
                your body and provide you with treatment and medicines to treat
                that reason for the best results.
              </Typography>
            </CardBody>
          </Card>

          <Card
            className={`hover:scale-105 transition-transform duration-1000 ${
              slideIn ? "translate-x-0 opacity-100" : "-translate-x-full opacity-0"
            }`}
          >
            <CardBody>
              <Typography
                variant="h5"
                color="blue-gray"
                className="flex mb-5 gap-3 font-sans text-green-500"
              >
                <IoGlobeOutline size={30} /> Advanced Technology
              </Typography>
              <Typography className="font-sans">
                Our state-of-the-art equipment ensures you receive the highest
                quality treatment and care.
              </Typography>
            </CardBody>
          </Card>

          <Card
            className={`hover:scale-105 transition-transform duration-1000 ${
              slideIn ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"
            }`}
          >
            <CardBody>
              <Typography
                variant="h5"
                color="blue-gray"
                className="flex gap-3 mb-5 font-sans text-green-500"
              >
                <FaMedal size={30} />
                Experienced Professionals
              </Typography>
              <Typography className="font-sans">
                Our team of experts is dedicated to providing you with the best
                possible care and support.
              </Typography>
            </CardBody>
          </Card>
        </div>
      ) : (
        <div className="text-center text-gray-600 mt-3 p-3">
          <div>
            <div
              className={`transition-all duration-1000 ${
                slideIn
                  ? "translate-x-0 opacity-100"
                  : "translate-x-full opacity-0"
              }`}
            >
              <Typography
                variant="h6"
                color="blue-gray"
                className="flex gap-2 mt-2 text-lg font-sans text-green-500"
              >
                <FaRegHandshake size={35} />
                Personalized Treatments
              </Typography>
              <Typography className="flex text-justify ml-12 font-sans">
                We analyze your body to identify the reason for excess fat in
                your body and provide you with treatment and medicines to treat
                that reason for the best results.
              </Typography>
            </div>

            <div
              className={`transition-all duration-1000 ${
                slideIn
                  ? "translate-x-0 opacity-100"
                  : "-translate-x-full opacity-0"
              }`}
            >
              <Typography
                variant="h6"
                color="blue-gray"
                className="flex gap-2 mt-2 text-lg font-sans text-green-500"
              >
                <IoGlobeOutline size={35} />
                Advanced Technology
              </Typography>
              <Typography className="flex text-justify ml-12 font-sans">
                Our state-of-the-art equipment ensures you receive the highest
                quality treatment and care.
              </Typography>
            </div>

            <div
              className={`transition-all duration-1000 ${
                slideIn
                  ? "translate-x-0 opacity-100"
                  : "translate-x-full opacity-0"
              }`}
            >
              <Typography
                variant="h6"
                color="blue-gray"
                className="flex gap-2 text-lg p-1 mt-2 font-sans text-green-500"
              >
                <FaMedal size={35} />
                Experienced Professionals
              </Typography>
              <Typography className="flex text-justify ml-12 font-sans">
                Our team of experts is dedicated to providing you with the best
                possible care and support.
              </Typography>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Section4;
