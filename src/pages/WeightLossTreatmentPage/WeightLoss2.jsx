import { motion, useTransform } from "framer-motion";
import img1 from "../../assets/images/treatments-chart.png";

function WeightLoss2({ scrollYProgress }) {
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1]);

  return (
    <motion.div
      style={{ scale }}
      className="sticky top-0 h-[100vh] w-full bg-gray-200 flex items-center"
    >
      <div className="w-full flex px-5">
        <div className="flex flex-col w-1/2  pl-11 items-center">
          <div className="leading-relaxed text-lg">
            Here at{" "}
            <span className="text-green-600 font-medium">Slim and Smile</span>{" "}
            Ayu Care, we firmly believe that simply addressing excess weight is
            not enough; it is essential to get to the root cause of being
            overweight. Based on this understanding, we provide appropriate
            medications and prepare a customized diet plan for you. This
            approach minimizes the chances of regaining lost weight in the
            future.
          </div>
          <div className="font-semibold pt-7">
            In this context, the steps we follow for treating weight loss are
            distinctly different and are outlined below:
          </div>
          <div className="flex justify-start w-full pt-4">
            <ul className="space-y-2.5 leading-loose text-lg">
              <li>
                <span className="text-xl">&#11037;</span> Insulin Resistance
              </li>
              <li>
                <span className="text-xl">&#11037;</span> Carbohydrate Addiction
              </li>
              <li>
                <span className="text-xl">&#11037;</span> Food Allergies
              </li>
              <li>
                <span className="text-xl">&#11037;</span> Polycystic Ovary
                Syndrome (PCOS)
              </li>
              <li>
                <span className="text-xl">&#11037;</span> Underactive Thyroid
                (Hypothyroidism)
              </li>
              <li>
                <span className="text-xl">&#11037;</span> Estrogen Dominance
              </li>
            </ul>
          </div>
        </div>
        <div className="flex justify-center w-2/3">
          <img src={img1} alt="image" />
        </div>
      </div>
    </motion.div>
  );
}

export default WeightLoss2;