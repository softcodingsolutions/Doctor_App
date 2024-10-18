import { motion, useTransform } from "framer-motion";

function Section2({ scrollYProgress }) {
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.6]);

  return (
    <motion.div
      style={{ scale }}
      className="sticky top-0 h-[75vh] bg-gray-300 flex flex-col items-center py-7"
    >
      <div className="flex flex-col items-center">
        <div className="text-2xl sm:text-3xl lg:text-4xl font-sans font-medium mt-4 sm:mt-8 text-center px-4">
          Weight Loss Treatments at{" "}
          <span className="text-green-600 font-medium">Slim and Smile</span> Ayu
          Care
        </div>
        <div className="border-[2.5px] rounded-md border-gray-500 w-12 sm:w-16 lg:w-20 mt-3" />
      </div>
      <div className="font-sans text-base sm:text-lg lg:text-xl tracking-wider text-center mt-10 sm:mt-16 lg:mt-20 text-gray-700 w-11/12 sm:w-3/4 lg:w-2/3 px-4">
        <span className="text-green-600 font-medium">Slim and Smile</span> Ayu
        care is an Ayurvedic Weight Loss clinic located in 6 various cities of
        Gujarat providing natural, side effect-free medicines and Ayurvedic
        treatments for weight loss. Dr. Bhavesh Thakkar and Dr. Manish Patel
        have over 21 years of experience treating more than 10,000 happy
        patients, which speaks volumes about our success in weight loss
        treatments.
      </div>
      <button className="border border-gray-300 p-2 sm:p-3 lg:p-4 tracking-wide rounded-full text-base sm:text-lg lg:text-xl font-sans font-semibold bg-green-400 text-white hover:bg-white hover:text-green-500 transition-colors  sm:mt-8 lg:mt-8 mb-4 sm:mb-6 lg:mb-8">
        Book an Appointment Now
      </button>
    </motion.div>
  );
}

export default Section2;
