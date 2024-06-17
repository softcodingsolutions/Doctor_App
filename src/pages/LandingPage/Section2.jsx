import { motion, useTransform } from "framer-motion";

function Section2({ scrollYProgress }) {
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1]);
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 0]);

  return (
    <motion.div
      style={{ scale, rotate }}
      className="sticky top-0 h-screen/2 bg-gray-300 flex flex-col items-center py-7"
    >
      <div className="flex flex-col items-center">
        <div className="text-4xl font-poppins font-medium mt-8">
          Weight Loss Treatments at Slim and Smile Ayu Care
        </div>
        <div className="border-[2.5px] rounded-md border-green-300 w-20 mt-3" />
      </div>
      <div className="font-poppins text-balance text-lg text-center mt-20 text-gray-700 w-2/3">
        Slim and Smile Ayu care is an Ayurvedic Weight Loss clinic located at 6
        various cities of Gujarat providing natural, side effect free medicines
        and ayurvedic treatments for weight loss. Dr. Bhavesh Thakkar and Dr.
        Manish Patel have experience of 21 Years and treating over 10,000 happy
        patients, that itself speaks about our success in weight loss
        treatments.
      </div>
      <button className="border border-gray-300 p-3 rounded-full text-xl font-poppins font-semibold bg-green-400 text-white hover:bg-white hover:text-green-500 transition-colors mt-20 mb-5">
        Book an Appointment Now
      </button>
    </motion.div>
  );
}

export default Section2;
