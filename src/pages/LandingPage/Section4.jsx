import { Card, CardBody, Typography } from "@material-tailwind/react";
import { FaHandshakeSimple } from "react-icons/fa6";
import { TbStarsFilled } from "react-icons/tb";
import { IoSettingsSharp } from "react-icons/io5";
import { GiStarsStack } from "react-icons/gi";
function Section4() {
  return (
    <div className="cursor-default  bg-gray-200 flex flex-col items-center py-7">
      <div className="flex flex-col items-center">
        <div className="lg:text-3xl text-xl font-sans font-medium ">
          Why Choose Us?
        </div>
        <div className="border-[2.5px] rounded-md border-green-500 w-20 " />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3  m-2 lg:gap-5">
        <Card className="  hover:scale-105 transition-transform ">
          <CardBody>
            <Typography
              variant="h5"
              color="blue-gray"
              className="flex gap-3 mb-5 font-sans text-green-500"
            >
              <FaHandshakeSimple size={30} /> Personalized Treatments
            </Typography>
            <Typography className="font-sans">
              We analyze your body to identify the reason for excess fat in your
              body and provide you with treatment and medicines to treat that
              reason for the best results.
            </Typography>
          </CardBody>
        </Card>

        <Card className="  hover:scale-105 transition-transform">
          <CardBody>
            <Typography
              variant="h5"
              color="blue-gray"
              className="flex mb-5 gap-3 font-sans text-green-500"
            >
              <IoSettingsSharp size={30} /> Advanced Technology
            </Typography>
            <Typography className="font-sans">
              Our state-of-the-art equipment ensures you receive the highest
              quality treatment and care.
            </Typography>
          </CardBody>
        </Card>

        <Card className="  hover:scale-105 transition-transform">
          <CardBody>
            <Typography
              variant="h5"
              color="blue-gray"
              className="flex gap-3 mb-5 font-sans text-green-500"
            >
              <GiStarsStack size={30} />
              Experienced Professionals
            </Typography>
            <Typography className="font-sans">
              Our team of experts is dedicated to providing you with the best
              possible care and support.
            </Typography>
          </CardBody>
        </Card>
      </div>
    </div>
  );
}

export default Section4;
