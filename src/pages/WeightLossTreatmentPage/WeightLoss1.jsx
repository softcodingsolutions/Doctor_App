import { motion, useTransform } from "framer-motion";

function WeightLoss1({ scrollYProgress }) {
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.45]);

  return (
    <motion.div
      style={{ scale }}
      className="sticky top-0 h-[100vh] flex flex-col items-center py-5"
    >
      <div className="h-2/3 flex justify-center items-center  w-full bg-[url('https://plus.unsplash.com/premium_photo-1671028546491-f70b21a32cc2?h=405&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')] object-cover">
        {/* Breadcrumb Navigation */}
        <div className=" w-fit">
          <div className="text-xl flex items-center gap-1.5 font-poppins font-semibold text-green-500">
            <a href="/" className=" hover:underline">
              Home
            </a>{" "}
            &gt;{" "}
            <span className="text-teal-600 text-2xl">
              Weight Loss Treatment
            </span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 bg-gray-100 h-1/2 flex flex-col items-center ">
        <div className="pt-5 text-xl font-semibold tracking-wide">
          Ayurvedic principles remain at the core of all fat loss treatments
          offered at{" "}
          <span className="text-green-600 font-semibold">Slim and Smile</span> Ayu
          Care.
        </div>
        <div className="text-black font-poppins text-balance tracking-wider text-lg text-center p-8 rounded-lg">
          When you lose weight, it could be due to water loss or muscle loss in
          your body, especially if you eat too little or engage in excessive
          exercise. Such weight loss can be harmful to your health. It is
          crucial that when you lose weight, you are actually losing excess fat
          from your body rather than muscle or water. At{" "}
          <span className="text-green-600 font-medium">Slim and Smile</span>, we
          conduct a thorough body analysis and provide treatments specifically
          designed to help you lose fat effectively for the best results.
        </div>
      </div>
    </motion.div>
  );
}

export default WeightLoss1;
