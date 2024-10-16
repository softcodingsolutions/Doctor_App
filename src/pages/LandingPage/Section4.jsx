import { Card, CardBody, Typography } from "@material-tailwind/react";
import { motion, useTransform } from "framer-motion";

function Section4({ scrollYProgress }) {
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.83]);

  return (
    <motion.div
      style={{ scale }}
      className="sticky cursor-default top-0 h-screen bg-green-100 flex flex-col items-center py-7"
    >
      <div className="flex flex-col items-center">
        <div className="lg:text-4xl text-xl font-sans font-medium lg:mt-8 mt-0">
          Why Choose Us?
        </div>
        <div className="border-[2.5px] rounded-md border-green-200 w-20 mt-3" />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 lg:mt-12 -mt-5 m-2 lg:gap-5 ">
        <Card className="lg:mt-6 mt-1 hover:scale-105 transition-transform ">
          <CardBody>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="http://www.w3.org/2000/svg"
              fill="currentColor"
              className="lg:h-12 lg:w-12 w-5 h-1 text-gray-900"
            >
            </svg>
            <Typography
              variant="h5"
              color="blue-gray"
              className="mb-5 font-sans"
            >
              Personalized Treatments
            </Typography>
            <Typography className="font-sans">
              We analyze your body to identify the reason for excess fat in your body and provide you with treatment and medicines to treat that reason for the best results.
            </Typography>
          </CardBody>
        </Card>

        <Card className="lg:mt-6 mt-1 hover:scale-105 transition-transform">
          <CardBody>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
              fill="currentColor"
              className="lg:h-12 lg:w-12 w-5 h-1 text-gray-900"
            >
              {/* SVG Path for the icon */}
            </svg>
            <Typography
              variant="h5"
              color="blue-gray"
              className="mb-5 font-sans"
            >
              Advanced Technology
            </Typography>
            <Typography className="font-sans">
              Our state-of-the-art equipment ensures you receive the highest quality treatment and care.
            </Typography>
          </CardBody>
        </Card>

        <Card className="lg:mt-6 mt-1 hover:scale-105 transition-transform">
          <CardBody>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
              fill="currentColor"
              className="lg:h-12 lg:w-12 w-5 h-1 text-gray-900"
            >
              {/* SVG Path for the icon */}
            </svg>
            <Typography
              variant="h5"
              color="blue-gray"
              className="mb-5 font-sans"
            >
              Experienced Professionals
            </Typography>
            <Typography className="font-sans">
              Our team of experts is dedicated to providing you with the best possible care and support.
            </Typography>
          </CardBody>
        </Card>
      </div>
    </motion.div>
  );
}

export default Section4;
