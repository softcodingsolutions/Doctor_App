import { useState, useEffect } from "react";
import { useTransform, motion } from "framer-motion";
import {
  Card,
  CardBody,
  CardHeader,
  Carousel,
  IconButton,
  Typography,
} from "@material-tailwind/react";
import img1 from "../../assets/images/result01.jpg";
import img2 from "../../assets/images/result02.jpg";
import img3 from "../../assets/images/result03.jpg";
import img4 from "../../assets/images/result04.jpg";

function WeightLoss6({ scrollYProgress }) {
  const [cardsPerGroup, setCardsPerGroup] = useState(2);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1]);

  const renderContent = (id, details, src) => (
    <Card key={id} className="w-full sm:w-72 h-auto sm:h-[26rem] mt-5">
      <CardHeader color="blue-gray">
        <img
          src={src}
          alt="card-image"
          className="w-full h-48 object-cover rounded-t-md" // Ensures the image fits well and maintains aspect ratio
        />
      </CardHeader>
      <CardBody className="p-4">
        {" "}
        {/* Add padding for spacing */}
        <Typography
          variant="h7"
          color="blue-gray"
          className="leading-relaxed font-sans text-sm sm:text-base" // Adjust font size for better readability
        >
          {details}
        </Typography>
      </CardBody>
    </Card>
  );
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

  const cardContents = [
    {
      id: 1,
      details:
        "A weight loss of 57 kg (from 137 kg to 80 kg) achieved by one patient at Slim and Smile Ayu Care is one of our many successful outcomes.",
      src: img1,
    },
    {
      id: 2,
      details:
        "Dr. Manish Patel of Slim and Smile Ayu Care lost 30 kg and has successfully maintained the weight loss for over 15 years without regaining it.",
      src: img2,
    },
    {
      id: 3,
      details:
        "Successful weight loss of 30 kg, along with maintaining the weight loss through our Ayurvedic treatments and carefully crafted reverse diet plans.",
      src: img3,
    },
    {
      id: 4,
      details:
        "Weight loss journey from 81 kg to 69 kg, guided by Slim and Smile Ayu Care, with no side effects or weakness felt throughout the entire transformation.",
      src: img4,
    },
  ];

  const groupedCards = [];
  for (let i = 0; i < cardContents.length; i += cardsPerGroup) {
    groupedCards.push(cardContents.slice(i, i + cardsPerGroup));
  }

  return (
    <motion.div
      style={{ scale }}
      className="sticky top-0 h-screen bg-deep-orange-50 flex flex-col items-center py-2"
    >
      <div className="flex flex-col items-center px-4 md:px-0">
        {/* Title and description */}
        <div className="text-2xl md:text-4xl font-sans font-medium mt-8 text-center">
          Our results speak for themselves:
        </div>
        <div className="text-base md:text-lg font-sans mt-1.5 text-center">
          We have successfully treated over 10,000 obese patients in the past 20
          years
        </div>
        <div className="border-[2.5px] rounded-md border-deep-orange-200 w-16 md:w-20 mt-3" />
      </div>

      {/* Carousel */}
      <div className="flex items-center justify-center pt-8 md:pt-14">
        <Carousel
          className="flex w-full md:w-3/4"
          autoplay={true}
          loop={true}
          prevArrow={({ handlePrev }) => (
            <IconButton
              variant="black"
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
              variant="black"
              color="black"
              size="lg"
              onClick={handleNext}
              className="!absolute top-2/4 !right-2 md:!right-4 -translate-y-2/4"
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
              className="flex justify-center gap-2 md:gap-4 w-full"
              style={{ flex: "0 0 100%" }}
            >
              {group.map((card) =>
                renderContent(card.id, card.details, card.src)
              )}
            </div>
          ))}
        </Carousel>
      </div>
    </motion.div>
  );
}

export default WeightLoss6;
