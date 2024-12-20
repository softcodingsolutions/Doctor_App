import { useState, useEffect } from "react";
import { Carousel, IconButton } from "@material-tailwind/react";
import review1 from "../../assets/videos/review1.mp4";
import review2 from "../../assets/videos/review2.mp4";
import review4 from "../../assets/videos/review4.mp4";
import review5 from "../../assets/videos/review5.mp4";
import review6 from "../../assets/videos/review6.mp4";

function Section5() {
  const [cardsPerGroup, setCardsPerGroup] = useState(2);

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

  useEffect(() => {
    const updateCardsPerGroup = () => {
      if (window.innerWidth < 1024) {
        setCardsPerGroup(1);
      } else {
        setCardsPerGroup(2);
      }
    };

    updateCardsPerGroup();
    window.addEventListener("resize", updateCardsPerGroup);

    return () => window.removeEventListener("resize", updateCardsPerGroup);
  }, []);

  const groupedCards = [];
  for (let i = 0; i < cardContents.length; i += cardsPerGroup) {
    groupedCards.push(cardContents.slice(i, i + cardsPerGroup));
  }

  return (
    <div className="bg-gray-50 flex flex-col items-center py-7">
      <div className="flex flex-col items-center">
        <div className="lg:text-4xl text-xl font-sans font-medium">
          Special Treatments for Obesity
        </div>
        <div className="border-[2.5px] rounded-md border-teal-200 w-20 mt-3" />
      </div>

      <div className="flex items-center justify-center">
        <Carousel
          className="flex w-4/5 mt-14" 
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
          // navigation={({ setActiveIndex, activeIndex, length }) => (
          //   <div className="absolute bottom-4 left-2/4 z-50 flex -translate-x-2/4 gap-2">
          //     {new Array(length).fill("").map((_, i) => (
          //       <span
          //         key={i}
          //         className={`block h-1 cursor-pointer rounded-2xl transition-all content-[''] ${
          //           activeIndex === i ? "w-8 bg-black" : "w-4 bg-black/50"
          //         }`}
          //         onClick={() => setActiveIndex(i)}
          //       />
          //     ))}
          //   </div>
          // )}
        >
          {groupedCards.map((group, index) => (
            <div
              key={index}
              className="flex justify-center gap-10"
              style={{ flex: "0 0 100%" }}
            >
              {group.map((card) => renderContent(card.src, card.id))}
            </div>
          ))}
        </Carousel>
      </div>
    </div>
  );
}

export default Section5;
