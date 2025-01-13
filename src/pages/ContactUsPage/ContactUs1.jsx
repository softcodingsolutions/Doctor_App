import image34 from "./../../assets/images/image34.jpg";
function ContactUs1() {
  return (
    <div className=" flex flex-col items-center">
      <div
        className="h-[60vh] flex justify-center items-center w-full"
        style={{
          backgroundImage: `url(${image34})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* Breadcrumb Navigation */}
        <div className="w-fit">
          <div className="flex items-center gap-1.5 font-sans font-semibold text-green-500">
            {/* <a href="/" className="text-xl md:text-2xl hover:underline">
              Home
            </a>{" "}
            &gt;{" "} */}
            <span className="text-gray-900 text-2xl md:text-4xl font-architects">
              Contact Us
            </span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 bg-gray-100 h-1/2 flex flex-col items-center justify-center p-10">
        <div className="text-black font-sans tracking-wider leading-relaxed text-base md:text-lg lg:text-xl text-center px-4 md:px-11 rounded-lg">
          In today’s world, where attractive looks and charming personalities
          are showcased everywhere—from magazines and social media to TV and the
          internet—it's evident that healthy hair and skin play a vital role in
          your overall appearance. For personalized solutions and effective
          treatments for your hair and skin, contact us at{" "}
          <span className="text-green-600 font-medium">Slim and Smile</span> Ayu
          Care. Book an appointment to enhance your natural beauty and achieve
          glowing, healthy skin and hair.
        </div>
      </div>
    </div>
  );
}

export default ContactUs1;
