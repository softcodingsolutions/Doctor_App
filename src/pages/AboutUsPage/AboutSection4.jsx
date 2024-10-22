function AboutSection4() {
  return (
    <div className="w-full bg-gray-200 flex flex-col items-center text-pretty ">
      <div className="flex flex-col items-center">
        <div className="text-2xl md:text-4xl font-sans font-medium mt-6 md:mt-8 text-center">
          Why Choose{" "}
          <span className="text-green-700 font-semibold">Slim and Smile</span>{" "}
          Ayu Care?
        </div>
        <div className="border-[2.5px] rounded-md border-teal-300 w-16 md:w-20 mt-3" />
      </div>

      <div className="px-6 md:px-10 pt-6 md:pt-10">
        <div>
          <div className="pb-6 md:pb-8 text-base md:text-lg text-center md:text-left">
            <span className="text-green-700 font-medium">Slim and Smile</span>{" "}
            Ayu Care offers unparalleled value in Ayurvedic weight loss
            treatment:
          </div>
        </div>

        {/* Grid container for cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Card 1 */}
          <div className="bg-white shadow-md rounded-lg p-8 flex flex-col mb-10">
            <div className="font-semibold text-lg md:text-xl">
              <span className="text-lg md:text-xl pr-1">&#11037;</span>20 Years
              of Experience
            </div>
            <hr className="text-black  my-2" />
            <div className="pl-3 leading-relaxed text-sm md:text-base">
              Achieving two decades of exceptional success in Ayurvedic weight
              loss is a rarity, but{" "}
              <span className="text-green-700 font-medium">Slim and Smile</span>{" "}
              Ayu Care has demonstrated consistent proficiency and expertise in
              this specialized field.
            </div>
          </div>

          {/* Card 2 */}
          <div className="bg-white shadow-md rounded-lg p-8 flex flex-col mb-10">
            <div className="font-semibold text-lg md:text-xl">
              <span className="text-lg md:text-xl pr-1">&#11037;</span>100%
              Dedicated Weight Loss Plan
            </div>
            <hr className="text-black  my-2" />
            <div className="pl-3 leading-relaxed text-sm md:text-base">
              Our weight loss plans are entirely focused on helping you achieve
              your goal of becoming a slimmer version of yourself. While many
              offer grand promises, we ensure tangible results without
              compromise.
            </div>
          </div>

          {/* Card 3 */}
          <div className="bg-white shadow-md rounded-lg p-8 flex flex-col mb-10">
            <div className="font-semibold text-lg md:text-xl">
              <span className="text-lg md:text-xl pr-1">&#11037;</span>100%
              Ayurvedic
            </div>
            <hr className="text-black  my-2" />
            <div className="pl-3 leading-relaxed text-sm md:text-base">
              Ayurvedic principles are the cornerstone of our approach at Slim
              and Smile Ayu Care. There are no deviations from this commitment;
              Ayurveda remains the fundamental aspect of our treatment
              philosophy.
            </div>
            <div className="pl-3 pt-3 leading-relaxed text-sm md:text-base">
              Remember that at the end of the day, weight gain is simply a
              symptom, not a disease per se. At{" "}
              <span className="text-green-700 font-medium">Slim and Smile</span>{" "}
              Ayu Care, we go above and beyond to find the actual disease that
              leads to weight gain and then treat you for that.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AboutSection4;
