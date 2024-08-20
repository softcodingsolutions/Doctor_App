import { motion, useTransform } from "framer-motion";

function AboutSection4({ scrollYProgress }) {
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1]);

  return (
    <motion.div
      style={{ scale }}
      className="sticky top-0 h-[100vh] w-full bg-teal-100 flex flex-col items-center text-pretty"
    >
      <div className="flex flex-col items-center">
        <div className="text-4xl font-teachers font-medium mt-8">
          Why Choose{" "}
          <span className="text-green-700 font-semibold">Slim and Smile</span>{" "}
          Ayu Care?
        </div>
        <div className="border-[2.5px] rounded-md border-teal-300 w-20 mt-3" />
      </div>

      <div className=" px-10 pt-10">
        <div>
          <div className="pb-8 text-lg">
            <span className="text-green-700 font-medium">Slim and Smile</span>{" "}
            Ayu Care offers unparalleled value in Ayurvedic weight loss
            treatment:
          </div>
        </div>
        <div className="flex flex-col gap-12">
          <div className="flex flex-col gap-1">
            <div className="font-semibold text-xl">
              <span className="text-xl pr-1">&#11037;</span>20 Years of
              Experience
            </div>
            <div className="pl-3 leading-relaxed">
              Achieving two decades of exceptional success in Ayurvedic weight
              loss is a rarity, but{" "}
              <span className="text-green-700 font-medium">Slim and Smile</span>{" "}
              Ayu Care has demonstrated consistent proficiency and expertise in
              this specialized field.
            </div>
          </div>
          <div className="flex flex-col gap-1">
            <div className="font-semibold text-xl">
              <span className="text-xl pr-1">&#11037;</span>100% Dedicated
              Weight Loss Plan
            </div>
            <div className="pl-3 leading-relaxed">
              Our weight loss plans are entirely focused on helping you achieve
              your goal of becoming a slimmer version of yourself. While many
              offer grand promises, we ensure tangible results without
              compromise.
            </div>
          </div>
          <div className="flex flex-col gap-1">
            {" "}
            <div className="font-semibold text-xl">
              <span className="text-xl pr-1">&#11037;</span>100% Ayurvedic
            </div>
            <div className="pl-3 leading-relaxed">
              Ayurvedic principles are the cornerstone of our approach at Slim
              and Smile Ayu Care. There are no deviations from this commitment;
              Ayurveda remains the fundamental aspect of our treatment
              philosophy.
            </div>
            <div className="pl-3 pt-3 leading-relaxed">
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
