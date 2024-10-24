import { Card, CardBody, Typography } from "@material-tailwind/react";

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
              className="mb-5 font-sans text-green-500"
            >
              Personalized Treatments
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
              className="mb-5 font-sans text-green-500"
            >
              Advanced Technology
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
              className="mb-5 font-sans text-green-500"
            >
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
