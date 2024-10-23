function ContactUs1() {
  return (
    <div className=" flex flex-col items-center">
      <div className="h-[60vh] flex justify-center items-center w-full bg-[url('https://images.unsplash.com/photo-1499159058454-75067059248a?h=1000&w=1571&auto=format&fit=cover&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')]">
        {/* Breadcrumb Navigation */}
        <div className="w-fit">
          <div className="flex items-center gap-1.5 font-sans font-semibold text-green-500">
            <a href="/" className="text-xl md:text-2xl hover:underline">
              Home
            </a>{" "}
            &gt;{" "}
            <span className="text-teal-600 text-2xl md:text-3xl">
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
