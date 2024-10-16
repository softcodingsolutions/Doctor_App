import { motion, useTransform } from "framer-motion";
import img1 from "../../assets/images/hair-care.jpg";

function HairAndBeauty2({ scrollYProgress }) {
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1]);

  return (
    <motion.div
      style={{ scale }}
      className="sticky top-0 h-[100vh] w-full bg-deep-purple-50 flex items-center"
    >
      <div className="w-full flex flex-col md:flex-row px-5">
        <div className="flex flex-col w-full md:w-1/2 pl-0 md:pl-11">
          <div className="font-semibold pt-7 text-sm md:text-lg lg:text-xl mt-12 lg:mt-0">
            According to Ayurveda, dull, patchy skin or rough hair can result
            from the following factors:
          </div>
          <div className="flex justify-start w-full lg:pt-4 pt-0">
            <ul className="space-y-2.5 leading-loose text-base md:text-lg text-pretty">
              <li>
                <span className="text-xl">&#11037;</span> Genetics and Family
                History
              </li>
              <li>
                <span className="text-xl">&#11037;</span> Imbalances in Nerves,
                Emotions, and the Immune System
              </li>
              <li>
                <span className="text-xl">&#11037;</span> Exposure to Pollution,
                Contaminated Water, and Toxins in Food
              </li>
              <li>
                <span className="text-xl">&#11037;</span> Nutritional
                Deficiencies
              </li>
              <li>
                <span className="text-xl">&#11037;</span> Use of Products
                Containing High Percentages of Harsh Chemicals
              </li>
            </ul>
          </div>
          <div className="lg:pt-10 pt-2 text-sm md:text-lg leading-relaxed">
            At{" "}
            <span className="text-green-600 font-medium">Slim and Smile</span>{" "}
            Ayu Care, we offer solutions to enhance the quality of your hair and
            skin. Our products are gentle and effective, and we provide
            treatments (medicines) to address and alleviate the side effects
            caused by the factors listed above.
          </div>
        </div>
        <div className="flex justify-center w-full md:w-2/3 lg:pt-5 pt-0 md:pt-0">
          <img src={img1} alt="image" className="max-w-full h-auto" />
        </div>
      </div>
    </motion.div>
  );
}

export default HairAndBeauty2;
