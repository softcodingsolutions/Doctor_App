import { motion, useTransform } from "framer-motion";
import img1 from "../../assets/images/hair-care.jpg";

function HairAndBeauty2({ scrollYProgress }) {
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1]);

  return (
    <motion.div
      style={{ scale }}
      className="sticky top-0 h-[100vh] w-full bg-deep-purple-50 flex items-center"
    >
      <div className="w-full flex px-5">
        <div className="flex flex-col w-1/2  pl-11">
          <div className="font-semibold pt-7 text-lg">
            According to Ayurveda, dull, patchy skin or rough hair can result
            from the following factors:
          </div>
          <div className="flex justify-start w-full pt-4">
            <ul className="space-y-2.5 leading-loose text-lg text-pretty">
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
          <div className="pt-10 text-lg leading-relaxed">
            At{" "}
            <span className="text-green-600 font-medium">Slim and Smile</span>{" "}
            Ayu Care, we offer solutions to enhance the quality of your hair and
            skin. Our products are gentle and effective, and we provide
            treatments (medicines) to address and alleviate the side effects
            caused by the factors listed above.
          </div>
        </div>
        <div className="flex justify-center w-2/3">
          <img src={img1} alt="image" />
        </div>
      </div>
    </motion.div>
  );
}

export default HairAndBeauty2;
