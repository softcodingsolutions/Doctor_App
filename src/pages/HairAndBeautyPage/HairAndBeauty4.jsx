import { useTransform, motion } from "framer-motion";

function HairAndBeauty4({ scrollYProgress }) {
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1]);

  return (
    <motion.div
      style={{ scale }}
      className="sticky top-0 h-screen bg-orange-50 flex flex-col items-center py-2"
    >
      <div className="flex flex-col items-center">
        <div className="text-4xl font-teachers font-medium mt-8">Skin Care</div>
        <div className="border-[2.5px] rounded-md border-orange-200 w-20 mt-3" />
      </div>
      <div className="w-full pt-12 flex flex-col justify-center px-16 gap-10">
        <div className="leading-relaxed text-lg">
          As discussed earlier, an individual's skin health is influenced by
          their lifestyle, genetics, and the weather conditions of their
          location. Consequently, each person has unique skin concerns.
          Regardless of skin color, healthy skin is always glowing, clear, and
          smooth. Achieving this level of health cannot be accomplished simply
          through expensive salon treatments without understanding the root
          cause.
        </div>
        <div className="leading-relaxed text-lg">
          We recognize that no two skin problems are identical, which is why we
          assess each person's skin type, genetics, and personal history through
          a specially designed questionnaire. This comprehensive evaluation
          helps us determine the most appropriate skin treatment tailored
          specifically for you.
        </div>
        <div className="leading-relaxed text-lg">
          We have successfully treated a 19-year chronic skin disease
          (Psoriasis) within just 3-4 months. Psoriasis is known for being a
          stubborn condition, and achieving such results demonstrates our
          commitment to effective treatment.
        </div>
        <div className="leading-relaxed text-lg">
          In addition, at{" "}
          <span className="text-green-600 font-medium">Slim and Smile</span> Ayu
          Care, we have resolved severe cases of eczema and dermatitis,
          providing significant relief and improvement to many patients who
          struggled with these challenging skin conditions.
        </div>
        <div className="leading-relaxed text-lg">
          Moreover, we have helped numerous individuals with persistent acne
          issues achieve clear and healthy skin through our customized Ayurvedic
          treatments, highlighting our expertise in tackling various skin
          problems effectively.
        </div>
      </div>
    </motion.div>
  );
}

export default HairAndBeauty4;
