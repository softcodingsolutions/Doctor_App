import { useTransform, motion } from "framer-motion";

function WeightLoss4({ scrollYProgress }) {
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1]);

  return (
    <motion.div
      style={{ scale }}
      className="sticky top-0 h-[100vh] w-full bg-teal-100 flex flex-col items-center text-pretty"
    >
      <div className="w-full pt-14 flex flex-col justify-center px-16 gap-10">
        <div className="leading-relaxed text-lg">
          From an Ayurvedic standpoint, undue weight gain among a large populace
          is often attributed to insufficient Med-Dhatvagni. However, body fat
          can be controlled effectively when hormones and Basal Metabolic Rate
          (BMR) are properly managed.
        </div>
        <div className="leading-relaxed text-lg">
          There are six hormones in everyone’s body that promote fat burning and
          three different hormones that help store fat. An imbalance in any of
          these hormones can disrupt the fat burning or storing process,
          potentially leading to overweight conditions.
        </div>
      </div>
      <div className="w-full h-full flex justify-center px-5 text-pretty">
        <div className="flex flex-col w-1/2 py-5 pl-9 items-center">
          <div className="font-semibold pt-7 leading-relaxed text-xl">
            Hormones, for instance, play a role in burning fat. Examples
            include:
          </div>
          <div className="flex justify-start w-full pt-4 pl-4">
            <ul className="space-y-2.5 leading-loose text-lg">
              <li>
                <span className="text-xl ">&#11037;</span> Growth Hormone
              </li>
              <li>
                <span className="text-xl">&#11037;</span> Insulin-like Growth
                Hormone
              </li>
              <li>
                <span className="text-xl">&#11037;</span> Glucagon
              </li>
              <li>
                <span className="text-xl">&#11037;</span> Adrenaline
              </li>
              <li>
                <span className="text-xl">&#11037;</span> Thyroid Hormones T3
                and T4
              </li>
              <li>
                <span className="text-xl">&#11037;</span> Testosterone
              </li>
            </ul>
          </div>
        </div>
        <div className="flex flex-col w-1/2 py-5 pl-9 items-center">
          <div className="font-semibold pt-7 leading-relaxed text-xl">
            As a corollary, there are hormones that work toward storing fat as
            well. These include:
          </div>
          <div className="flex justify-start w-full pt-4 pl-4">
            <ul className="space-y-2.5 leading-loose text-lg">
              <li>
                <span className="text-xl">&#11037;</span> Insulin
              </li>
              <li>
                <span className="text-xl">&#11037;</span> Estrogen
              </li>
              <li>
                <span className="text-xl">&#11037;</span> Cortisol
              </li>
            </ul>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default WeightLoss4;
