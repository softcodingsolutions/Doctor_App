import { Carousel, IconButton } from "@material-tailwind/react";
import { motion, useTransform } from "framer-motion";
import image1 from "./../../assets/images/image1.jpg";
import image2 from "./../../assets/images/image2.jpg";
import image3 from "./../../assets/images/image3.jpg";
import image4 from "./../../assets/images/image4.jpg";
import image5 from "./../../assets/images/image5.jpg";

function Section1({ scrollYProgress }) {
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.5]);

  const renderContent = (image, text1, text2, text3, text4, key) => (
    <div key={key} className="relative h-full">
      <img src={image} alt={key} className="object-cover h-full w-screen" />
      <div className="absolute text-white top-72 right-20 bg-opacity-50 space-y-8">
        <div
          key={`${key}-1`}
          className="animate-fade-down animate-normal animate-once animate-ease-out animate-delay-300 text-7xl font-semibold font-architects"
        >
          {text1} <span className="text-green-500">{text2}</span>
        </div>
        <div key={`${key}-2`} className="font-teachers space-y-2">
          <div className="text-4xl font-semibold animate-fade-down animate-once animate-ease-out animate-normal animate-delay-500">
            {text3}
          </div>
          <div className="text-2xl animate-fade-down animate-once animate-ease-out animate-normal animate-delay-700 w-3/4">
            {text4}
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <motion.div
      style={{ scale }}
      className="sticky top-0 h-screen flex flex-col items-center justify-center text-white"
    >
      <Carousel
        autoplay={true}
        loop={true}
        prevArrow={({ handlePrev }) => (
          <IconButton
            variant="text"
            color="white"
            size="lg"
            onClick={handlePrev}
            className="!absolute top-2/4 left-4 -translate-y-2/4"
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
            color="white"
            size="lg"
            onClick={handleNext}
            className="!absolute top-2/4 !right-4 -translate-y-2/4"
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
                  activeIndex === i ? "w-8 bg-white" : "w-4 bg-white/50"
                }`}
                onClick={() => setActiveIndex(i)}
              />
            ))}
          </div>
        )}
      >
        {renderContent(
          image1,
          "Weight",
          "Loss",
          "Ayurvedic Treatments",
          "We provide 100% Ayurvedic FDA Approved Medicines for Weight Loss."
        )}
        {renderContent(
          image2,
          "Personalized ",
          "Diet",
          "Just For You",
          "Make your own Password to Lose your Own Weight - Because you are different!"
        )}
        {renderContent(
          image3,
          "Experienced ",
          "Experts",
          "To Help You",
          "We have been helping patients loose weight using authentic methods with no side effects!"
        )}
        {renderContent(
          image4,
          "Successful ",
          "Results",
          "For 21 Years",
          "Till date we have helped over 10,000 patients to successfully lose weight, with 57 Kgs being maximum weight lose in a single patient."
        )}
        {renderContent(
          image5,
          "Our ",
          "Presence",
          "Across Gujarat",
          "We have 6 clinics across Gujarat providing online consultation across the world to help overweight patients."
        )}
      </Carousel>
    </motion.div>
  );
}

export default Section1;
