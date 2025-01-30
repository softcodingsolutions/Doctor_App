import { Carousel, IconButton } from "@material-tailwind/react";
import img1 from "../../assets/images/about-01_converted.webp";
import img2 from "../../assets/images/about-02_converted.webp";
import img3 from "../../assets/images/about-03_converted.webp";
import img4 from "../../assets/images/about-04_converted.webp";
import img5 from "../../assets/images/about-05_converted.webp";
import { RiMedicineBottleLine } from "react-icons/ri";
import { GiWeightScale } from "react-icons/gi";
import { PiChartLineUp } from "react-icons/pi";
import { BsArrowRepeat } from "react-icons/bs";
import { FaRegSmile } from "react-icons/fa";
function AboutSection2() {
  return (
    <div className="w-full bg-gray-200 flex flex-col items-center">
      <div className="flex flex-col md:flex-row w-full p-6 md:p-14 items-center gap-10 md:gap-20 justify-evenly">
        <div className="w-full md:w-1/2 tracking-wide leading-relaxed text-base md:text-lg lg:text-xl">
          {/* <h2 className="text-green-600 font-medium text-xl md:text-2xl lg:text-3xl mb-4 font-sans">
            Key Features of Slim and Smile Ayu Care
          </h2> */}
          <ul className=" list-none space-y-4">
            <li className="flex gap-2  ">
              <div>
                <RiMedicineBottleLine className="mt-1" size={25} />
              </div>
              <div>
                <strong className="text-green-600">
                  Ayurvedic and FDA-Approved Medications:
                </strong>{" "}
                Offers 100% Ayurvedic, FDA-approved treatments with minimal side
                effects.
              </div>
            </li>
            <li className="flex gap-2 ">
              <div>
                <GiWeightScale className="mt-1" size={25} />
              </div>
              <div>
                <strong className="text-green-600">Root Cause Analysis:</strong>{" "}
                Focuses on identifying and addressing the underlying causes of
                weight gain rather than treating it as an isolated issue.
              </div>
            </li>
            <li className="flex gap-2 ">
              <div>
                <PiChartLineUp className="mt-1" size={25} />
              </div>
              <div>
                <strong className="text-green-600">
                  Customized Treatment Plans:
                </strong>{" "}
                Provides tailored solutions, including diet, exercise, and
                medication, specific to individual needs.
              </div>
            </li>
            <li className="flex gap-2 ">
              <div>
                <BsArrowRepeat className="mt-1" size={25} />
              </div>
              <div>
                <strong className="text-green-600">
                  Comprehensive Approach:
                </strong>{" "}
                Aims to reduce the risk of weight regain by addressing root
                causes and offering holistic treatments.
              </div>
            </li>
            <li className="flex gap-2 ">
              <div>
                <FaRegSmile className="mt-1" size={25} />
              </div>
              <div>
                <strong className="text-green-600">
                  Low Weight Recidivism:
                </strong>{" "}
                Achieves significantly lower rates of weight regain compared to
                the typical 80% experienced by others.
              </div>
            </li>
          </ul>
        </div>

        <Carousel
          prevArrow={({ handlePrev }) => (
            <IconButton
              variant="text"
              color="black"
              size="lg"
              onClick={handlePrev}
              className="!absolute top-2/4 left-2 md:left-4 -translate-y-2/4"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="h-6 w-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
                />
              </svg>
            </IconButton>
          )}
          nextArrow={({ handleNext }) => (
            <IconButton
              variant="text"
              color="black"
              size="lg"
              onClick={handleNext}
              className="!absolute top-2/4 right-2 md:!right-4 -translate-y-2/4"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="h-6 w-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                />
              </svg>
            </IconButton>
          )}
          navigation={({ setActiveIndex, activeIndex, length }) => (
            <div className="absolute bottom-4 left-2/4 z-50 flex -translate-x-2/4 gap-2">
              {new Array(length).fill("").map((_, i) => (
                <span
                  key={i}
                  className={`block h-1 cursor-pointer rounded-2xl transition-all content-[''] ${
                    activeIndex === i ? "w-8 bg-black" : "w-4 bg-black/50"
                  }`}
                  onClick={() => setActiveIndex(i)}
                />
              ))}
            </div>
          )}
          autoplay={true}
          loop={true}
          className="rounded-xl w-full md:w-1/2"
        >
          <img
            src={img1}
            alt="image 1"
            className="w-full h-full object-cover"
          />
          <img
            src={img2}
            alt="image 2"
            className="w-full h-full object-cover"
          />
          <img
            src={img3}
            alt="image 3"
            className="w-full h-full object-cover"
          />
          <img
            src={img4}
            alt="image 4"
            className="w-full h-full object-cover"
          />
          <img
            src={img5}
            alt="image 5"
            className="w-full h-full object-cover"
          />
        </Carousel>
      </div>

      <div className="flex flex-col gap-5 p-1 md:px-14 text-pretty items-center justify-center ">
        <div className="tracking-wide leading-relaxed text-base md:text-lg lg:text-xl">
          Our primary focus is to normalize the weight loss process as much as
          possible, ensuring that patients experience it as a natural and
          seamless part of their daily lives. The goal is for the weight loss
          journey to feel like a regular, everyday experience, with the only
          noticeable difference being the successful reduction of excess weight.
        </div>

        <div className="tracking-wide leading-relaxed text-base md:text-lg lg:text-xl">
          Weight gain can stem from a wide range of factors, and it is a common
          misconception to attribute it solely to excessive food intake. Our
          approach recognizes that the underlying causes of weight gain are
          often multifaceted and not always related to diet alone.
        </div>
      </div>
    </div>
  );
}

export default AboutSection2;
