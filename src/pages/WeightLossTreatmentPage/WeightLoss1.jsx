import image22 from "./../../assets/images/image22.jpeg";
function WeightLoss1() {
  return (
    <div className="flex flex-col  items-center ">
      <div className="h-[60vh] flex justify-center items-center w-full  bg-cover bg-center opacity-90"
         style={{
          backgroundImage: `url(${image22})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}>
        {/* Breadcrumb Navigation */}
        <div className="w-fit px-4 md:px-0 ml-28">
          <div className="text-3xl flex items-center gap-1.5 font-sans font-semibold text-black">
            <a href="/" className="hover:underline">
              Home
            </a>{" "}
            &gt;{" "}
            <span className="text-[#1e3854] text-2xl md:text-4xl">
              Weight Loss Treatment
            </span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 bg-gray-50 py-8 md:py-12 flex flex-col items-center text-center">
        <div className="px-6 md:px-12">
          <div className="text-lg md:text-xl font-semibold tracking-wide mb-4">
            Ayurvedic principles remain at the core of all fat loss treatments
            offered at{" "}
            <span className="text-green-600 font-semibold">Slim and Smile</span>{" "}
            Ayu Care.
          </div>
          <div className="text-base md:text-lg font-sans text-gray-700 tracking-wider p-6 md:p-8 rounded-lg">
            When you lose weight, it could be due to water loss or muscle loss
            in your body, especially if you eat too little or engage in
            excessive exercise. Such weight loss can be harmful to your health.
            It is crucial that when you lose weight, you are actually losing
            excess fat from your body rather than muscle or water. At{" "}
            <span className="text-green-600 font-medium">Slim and Smile</span>,
            we conduct a thorough body analysis and provide treatments
            specifically designed to help you lose fat effectively for the best
            results.
          </div>
        </div>
      </div>
    </div>
  );
}

export default WeightLoss1;
