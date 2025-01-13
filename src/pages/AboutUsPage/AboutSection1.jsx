import image17 from "./../../assets/images/image17.jpg";
function AboutSection1() {
  return (
    <div className=" h-auto pt-16 flex flex-col items-center ">
      <div
        className="flex justify-center items-center w-full h-[50vh]  bg-cover bg-center opacity-95"
        style={{
          backgroundImage: `url(${image17})`,
          backgroundSize: "cover",
          backgroundPosition: "center",    
        }}
      >
        {/* Breadcrumb Navigation */}
        <div className="w-fit mt-20">
          <div className="text-lg md:text-3xl flex items-center gap-1.5 font-sans font-semibold text-gray-900">
            {/* <a href="/" className="hover:underline">
              Home
            </a>{" "}
            &gt;{" "} */}
            <span className="text-green-800 text-2xl md:text-4xl font-architects">About Us</span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="relative  bg-gray-50 flex flex-col items-center justify-center py-8 lg:py-12 px-4 sm:px-8">
        <div className="text-black font-sans text-center tracking-wide text-base md:text-lg lg:text-xl p-4 md:p-6 lg:p-8 rounded-lg">
          <span className="text-green-600 font-medium">Slim and Smile</span> Ayu
          Care is a renowned weight loss center based in Gujarat, India, with a
          network of six strategically located clinics throughout the state. Our
          treatments are grounded in Ayurvedic principles, ensuring a holistic
          and comprehensive approach to weight management and overall wellness.
        </div>
      </div>
    </div>
  );
}

export default AboutSection1;
