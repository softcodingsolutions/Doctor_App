import { useTransform, motion } from "framer-motion";

function WeightLoss3({ scrollYProgress }) {
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1]);

  return (
    <motion.div
      style={{ scale }}
      className="sticky top-0 h-[100vh] w-full bg-orange-100 flex flex-col items-center"
    >
      <div className="w-full pt-14 flex flex-col justify-center px-6 md:px-16 gap-10">
        <div className="leading-relaxed text-base md:text-lg">
          It is also important to consider the role of the adrenal glands in
          ensuring optimal bodily function, particularly in relation to
          abdominal fat.
        </div>
        <div className="leading-relaxed text-base md:text-lg">
          At <span className="text-green-600 font-medium">Slim and Smile</span>{" "}
          Ayu Care, we are dedicated to addressing all these factors and more
          when developing our weight loss treatments. This holistic approach,
          rooted in Ayurvedic principles, is why our weight loss initiatives are
          so successful. Our treatments consider a comprehensive view of
          multiple aspects to achieve effective results.
        </div>
      </div>

      {/* List Section */}
      <div className="w-full flex flex-col md:flex-row justify-center px-4 md:px-7 gap-8">
        {/* Left Column */}
        <div className="flex flex-col w-full md:w-1/2 py-5 items-start">
          <div className="font-semibold pt-7 leading-relaxed text-lg md:text-xl">
            When discussing body fat, it's important to recognize that viewing
            it solely as a negative or harmful element is incorrect. Body fat is
            essentially stored energy and serves several important functions,
            including:
          </div>
          <div className="flex justify-start w-full pt-4">
            <ul className="space-y-2.5 leading-loose text-base md:text-lg">
              <li>
                <span className="text-xl">&#11037;</span> Absorbing essential
                nutrients
              </li>
              <li>
                <span className="text-xl">&#11037;</span> Boosting the immune
                system
              </li>
              <li>
                <span className="text-xl">&#11037;</span> Supporting fetal
                development
              </li>
              <li>
                <span className="text-xl">&#11037;</span> Maintaining joint
                flexibility
              </li>
            </ul>
          </div>
        </div>

        {/* Right Column */}
        <div className="flex flex-col w-full md:w-1/2 py-5 items-start">
          <div className="font-semibold pt-7 leading-relaxed text-lg md:text-xl">
            However, some individuals end up with more body fat than others.
            Several factors can contribute to this:
          </div>
          <div className="flex justify-start w-full pt-4">
            <ul className="space-y-2.5 leading-loose text-base md:text-lg">
              <li>
                <span className="text-xl">&#11037;</span> Excessive stress
              </li>
              <li>
                <span className="text-xl">&#11037;</span> Consumption of junk
                food
              </li>
              <li>
                <span className="text-xl">&#11037;</span> Poor lifestyle choices
              </li>
              <li>
                <span className="text-xl">&#11037;</span> Low metabolism
              </li>
              <li>
                <span className="text-xl">&#11037;</span> Hormonal imbalances
              </li>
              <li>
                <span className="text-xl">&#11037;</span> Certain allopathic
                medications
              </li>
              <li>
                <span className="text-xl">&#11037;</span> Ineffective weight
                loss efforts
              </li>
              <li>
                <span className="text-xl">&#11037;</span> Sedentary lifestyle
              </li>
            </ul>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default WeightLoss3;
