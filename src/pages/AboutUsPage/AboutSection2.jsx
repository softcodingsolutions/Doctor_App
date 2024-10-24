import { Carousel, IconButton } from "@material-tailwind/react";
import img1 from "../../assets/images/about-01.jpg";
import img2 from "../../assets/images/about-02.jpg";
import img3 from "../../assets/images/about-03.jpg";
import img4 from "../../assets/images/about-04.jpg";
import img5 from "../../assets/images/about-05.jpg";

function AboutSection2() {
  return (
    <div className="w-full bg-gray-200 flex flex-col items-center">
      <div className="flex flex-col md:flex-row w-full p-6 md:p-14 items-center gap-10 md:gap-20 justify-evenly">
        <div className="w-full md:w-1/2 tracking-wide leading-relaxed text-base md:text-lg lg:text-xl">
          At <span className="text-green-600 font-medium">Slim and Smile</span>{" "}
          Ayu Care, we specialize in providing 100% Ayurvedic medications that
          are also FDA-approved, ensuring that concerns about side effects are
          minimized. Our approach goes beyond merely addressing excess weight;
          we focus on identifying and addressing the root causes of weight gain,
          which is often a symptom of underlying issues rather than the problem
          itself. By diagnosing the underlying causes, we create customized
          plans that encompass diet, exercise, and medication tailored
          specifically to each individual. This comprehensive approach
          significantly reduces the likelihood of weight regain. While over 80%
          of individuals typically experience weight regain after losing it, our
          tailored treatments at{" "}
          <span className="text-green-600 font-medium">Slim and Smile</span> Ayu
          Care result in a substantially lower rate of weight recidivism among
          our patients.
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

      <div className="flex flex-col gap-5 p-6 md:px-14 text-pretty items-center justify-center mt-3">
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
