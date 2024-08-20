import { motion, useTransform } from "framer-motion";

function AboutSection3({ scrollYProgress }) {
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1]);

  return (
    <motion.div
      style={{ scale }}
      className="sticky top-0 h-[100vh] w-full bg-orange-100 flex flex-col items-center"
    >
      <div className="flex flex-col items-center">
        <div className="text-4xl font-teachers font-medium mt-8">
          Some of the most common weight gaining reasons are:
        </div>
        <div className="border-[2.5px] rounded-md border-orange-300 w-20 mt-3" />
      </div>
      <div className="flex w-full p-14 items-center gap-20 justify-evenly">
        <div>
          <ul className="space-y-2 leading-loose text-lg">
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
        <div>
          <ul className="space-y-2 leading-loose text-lg">
            <li>
              <span className="text-xl">&#11037;</span> Toxic Colon
            </li>
            <li>
              <span className="text-xl">&#11037;</span> Toxic Liver
            </li>
            <li>
              <span className="text-xl">&#11037;</span> Candidiasis
            </li>
            <li>
              <span className="text-xl">&#11037;</span> Nutrients Deficiency
            </li>
            <li>
              <span className="text-xl">&#11037;</span> Food Allergy
            </li>
            <li>
              <span className="text-xl">&#11037;</span> Chronic Stress
            </li>
          </ul>
        </div>
      </div>
      <div className="flex flex-col gap-6 px-14 text- items-center justify-center mt-3">
        <div className="tracking-wide leading-relaxed">
          Our modern lifestyle introduces numerous factors that can contribute
          to weight gain, including a sedentary lifestyle, excessive consumption
          of fast food and aerated drinks, high levels of stress, and the use of
          contemporary medications. At{" "}
          <span className="text-green-600 font-medium">Slim and Smile</span> Ayu
          Care, we address the specific triggers behind your weight gain with
          thorough attention and care, ensuring that you achieve a reasonable
          and effective weight loss tailored to your needs.
        </div>
        <div className="tracking-wide  leading-relaxed">
          Under the expert guidance of Dr. Bhavesh Thakkar and Dr. Manish Patel,
          <span className="text-green-600 font-medium">Slim and Smile</span> Ayu
          Care has been operating with excellence for many years. Throughout its
          journey, the center has continuously evolved and thrived, embodying
          its mission to bring joy to those striving for a slimmer and healthier
          life.
        </div>
        <div className="tracking-wide  leading-relaxed">
          Notably,{" "}
          <span className="text-green-600 font-medium">Slim and Smile</span> Ayu
          Care has garnered significant recognition, including the prestigious
          'Best Ayurveda Weight Loss Treatment' award, presented by the former
          Health Minister of Gujarat, Shri Ashokbhai Bhatt, in 2007.
        </div>
      </div>
    </motion.div>
  );
}

export default AboutSection3;
