function AboutSection1() {
  return (
    <div className=" h-auto pt-16 flex flex-col items-center ">
      <div className="flex justify-center items-center w-full h-[50vh] bg-[url('https://images.unsplash.com/photo-1649134296132-56606326c566?h=810&w=2400&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')] bg-cover bg-center">
        {/* Breadcrumb Navigation */}
        <div className="w-fit">
          <div className="text-lg md:text-xl flex items-center gap-1.5 font-sans font-semibold text-green-500">
            <a href="/" className="hover:underline">
              Home
            </a>{" "}
            &gt;{" "}
            <span className="text-teal-600 text-xl md:text-2xl">About Us</span>
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
