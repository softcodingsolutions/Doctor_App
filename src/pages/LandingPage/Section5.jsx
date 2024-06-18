import { Carousel, IconButton } from "@material-tailwind/react";
import { motion, useTransform } from "framer-motion";
import review1 from "../../assets/videos/review1.mp4";
import review2 from "../../assets/videos/review2.mp4";
import review4 from "../../assets/videos/review4.mp4";
import review5 from "../../assets/videos/review5.mp4";
import review6 from "../../assets/videos/review6.mp4";

function Section5({ scrollYProgress }) {
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.9]);

  const renderContent = (src, id) => (
    <video key={id} className="size-96 rounded-lg" controls>
      <source src={src} type="video/mp4" />
      Your browser does not support the video tag.
    </video>
  );

  const cardContents = [
    { id: 1, src: review1 },
    { id: 2, src: review2 },
    { id: 3, src: review6 },
    { id: 4, src: review4 },
    { id: 5, src: review5 },
  ];

  const groupedCards = [];
  const cardsPerGroup = 2;
  for (let i = 0; i < cardContents.length; i += cardsPerGroup) {
    groupedCards.push(cardContents.slice(i, i + cardsPerGroup));
  }

  return (
    <motion.div
      style={{ scale }}
      className="sticky top-0 h-screen bg-teal-50 flex flex-col items-center py-7"
    >
      <div className="flex flex-col items-center">
        <div className="text-4xl font-poppins font-medium mt-8">
          Special Treatments for Obesity
        </div>
        <div className="border-[2.5px] rounded-md border-teal-200 w-20 mt-3" />
      </div>

      <div className="flex items-center justify-center mt-8">
        <Carousel
          className="flex w-2/3 mt-14"
          loop={true}
          prevArrow={({ handlePrev }) => (
            <IconButton
              variant="black"
              color="black"
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
              variant="black"
              color="black"
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
                    activeIndex === i ? "w-8 bg-black" : "w-4 bg-black/50"
                  }`}
                  onClick={() => setActiveIndex(i)}
                />
              ))}
            </div>
          )}
        >
          {groupedCards.map((group, index) => (
            <div
              key={index}
              className="flex justify-center gap-10 "
              style={{ flex: "0 0 100%" }}
            >
              {group.map((card) => renderContent(card.src, card.id))}
            </div>
          ))}
        </Carousel>
      </div>
    </motion.div>
  );
}

export default Section5;
