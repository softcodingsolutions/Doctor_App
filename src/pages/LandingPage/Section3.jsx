import {
    Card,
    CardBody,
    CardHeader,
    Carousel,
    IconButton,
    Typography,
  } from "@material-tailwind/react";
  import { motion, useTransform } from "framer-motion";
  import obesity1 from "../../assets/images/obesity1.jpg";
  import obesity2 from "../../assets/images/obesity2.jpg";
  import obesity3 from "../../assets/images/obesity3.jpg";
  import obesity4 from "../../assets/images/obesity4.jpg";
  import obesity5 from "../../assets/images/obesity5.jpg";
  import obesity6 from "../../assets/images/obesity6.jpg";
  
  function Section3({ scrollYProgress }) {
    const scale = useTransform(scrollYProgress, [0, 1], [1, 1]);
    const rotate = useTransform(scrollYProgress, [0, 1], [0, 0]);
  
    const renderContent = (id, title, src) => (
      <Card key={id} className="mt-20 w-72">
        <CardHeader color="blue-gray" className="relative h-56">
          <img
            src={src}
            alt="card-image"
            className="hover:scale-105 transition-transform"
          />
        </CardHeader>
        <CardBody>
          <Typography variant="h5" color="blue-gray" className="mb-2">
            {title}
          </Typography>
        </CardBody>
      </Card>
    );
  
    const cardContents = [
      { id: 1, title: "Obesity & Stress", src: obesity1 },
      { id: 2, title: "Obesity & PCOD", src: obesity2 },
      { id: 3, title: "Obesity & Hypothyroidism", src: obesity3 },
      { id: 4, title: "Obesity & Hypertension", src: obesity4 },
      { id: 5, title: "Obesity & Diabetes Mellitus", src: obesity5 },
      { id: 6, title: "Obesity & Menopause", src: obesity6 },
    ];
  
    const groupedCards = [];
    const cardsPerGroup = 3;
    for (let i = 0; i < cardContents.length; i += cardsPerGroup) {
      groupedCards.push(cardContents.slice(i, i + cardsPerGroup));
    }
  
    return (
      <motion.div
        style={{ scale, rotate }}
        className="sticky top-0 h-screen bg-teal-50 flex flex-col items-center py-7"
      >
        <div className="flex flex-col items-center">
          <div className="text-4xl font-poppins font-medium mt-8">
            Special Treatments for Obesity
          </div>
          <div className="border-[2.5px] rounded-md border-green-300 w-20 mt-3" />
        </div>
  
        <div className="flex items-center justify-center mt-8">
          <Carousel
            className="flex w-2/3"
            autoplay={true}
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
                className="flex justify-center gap-4 w-full"
                style={{ flex: "0 0 100%" }} // Ensure each group takes up full carousel item space
              >
                {group.map((card) =>
                  renderContent(card.id, card.title, card.src)
                )}
              </div>
            ))}
          </Carousel>
        </div>
      </motion.div>
    );
  }
  
  export default Section3;
  