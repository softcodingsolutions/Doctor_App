import { motion, useTransform } from "framer-motion";

function AboutSection4({ scrollYProgress }) {
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1]);

  return (
    <motion.div
      style={{ scale }}
      className="sticky top-0 h-[100vh] w-full bg-teal-100 flex flex-col items-center text-pretty"
    >
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

        <div className="flex flex-col gap-8 md:gap-12">
          <div className="flex flex-col gap-1">
            <div className="font-semibold text-lg md:text-xl">
              <span className="text-lg md:text-xl pr-1">&#11037;</span>20 Years
              of Experience
            </div>
            <div className="pl-3 leading-relaxed text-sm md:text-base">
              Achieving two decades of exceptional success in Ayurvedic weight
              loss is a rarity, but{" "}
              <span className="text-green-700 font-medium">Slim and Smile</span>{" "}
              Ayu Care has demonstrated consistent proficiency and expertise in
              this specialized field.
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <div className="font-semibold text-lg md:text-xl">
              <span className="text-lg md:text-xl pr-1">&#11037;</span>100%
              Dedicated Weight Loss Plan
            </div>
            <div className="pl-3 leading-relaxed text-sm md:text-base">
              Our weight loss plans are entirely focused on helping you achieve
              your goal of becoming a slimmer version of yourself. While many
              offer grand promises, we ensure tangible results without
              compromise.
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <div className="font-semibold text-lg md:text-xl">
              <span className="text-lg md:text-xl pr-1">&#11037;</span>100%
              Ayurvedic
            </div>
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
    </motion.div>
  );
}

export default AboutSection4;
