import { motion, useTransform } from "framer-motion";

function AboutSection4({ scrollYProgress }) {
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1]);

  return (
    <motion.div
      style={{ scale }}
      className="sticky top-0 h-[100vh] w-full bg-teal-100 flex flex-col items-center"
    >
      <div className="flex flex-col items-center">
        <div className="text-4xl font-poppins font-medium mt-8">
          Why Choose Slim and Smile Ayu Care?
        </div>
        <div className="border-[2.5px] rounded-md border-teal-300 w-20 mt-3" />
      </div>
      <div>
        <div>
          Slim and Smile Ayu Care offers unparalleled value in Ayurvedic weight
          loss treatment:
        </div>
        <div>20 Years of Experience</div>
        <div>
          Achieving two decades of exceptional success in Ayurvedic weight loss
          is a rarity, but Slim and Smile Ayu Care has demonstrated consistent
          proficiency and expertise in this specialized field.
        </div>
        <div>100% Dedicated Weight Loss Plan</div>
        <div>
          Our weight loss plans are entirely focused on helping you achieve your
          goal of becoming a slimmer version of yourself. While many offer grand
          promises, we ensure tangible results without compromise.
        </div>
        <div>100% Ayurvedic</div>
        <div>
          Ayurvedic principles are the cornerstone of our approach at Slim and
          Smile Ayu Care. There are no deviations from this commitment; Ayurveda
          remains the fundamental aspect of our treatment philosophy.
        </div>
      </div>
    </motion.div>
  );
}

export default AboutSection4;
