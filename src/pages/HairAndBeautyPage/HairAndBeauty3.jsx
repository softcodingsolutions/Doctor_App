import { useTransform, motion } from "framer-motion";

function HairAndBeauty3({ scrollYProgress }) {
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1]);

  return (
    <motion.div
      style={{ scale }}
      className="sticky top-0 h-screen bg-teal-50 flex flex-col items-center py-2"
    >
      <div className="flex flex-col items-center">
        <div className="text-4xl font-poppins font-medium mt-8">Hair Care</div>
        <div className="border-[2.5px] rounded-md border-teal-200 w-20 mt-3" />
      </div>
      <div className="w-full pt-12 flex flex-col justify-center px-16 gap-10">
        <div className="leading-relaxed text-lg">
          Here’s a refined version of your message: Every day, we come across
          new tips, tricks, and product names promising the best results for
          hair health. However, it's important to remember that shampoo,
          conditioner, hair oil, and spa treatments alone do not necessarily
          improve hair health.
        </div>
        <div className="leading-relaxed text-lg">
          These products primarily cleanse and somewhat nourish your hair, but
          they do not address the underlying issues causing hair problems. At
          Slim and Smile Ayu Care, we offer hair treatment packages that involve
          a thorough and detailed analysis of your hair and scalp. This analysis
          helps us identify the root cause of your hair issues, allowing us to
          select the most effective treatments and products for optimal results.
        </div>
      </div>
      <div className="w-full h-full flex justify-start px-5 text-pretty">
        <div className="flex flex-col pt-8 pl-9 ">
          <div className="font-semibold pt-7 pl-2 leading-relaxed text-xl">
            Treatments We Provide:
          </div>
          <div className="flex justify-start w-full pt-4 pl-4">
            <ul className="space-y-2.5 leading-loose text-lg">
              <li>
                <span className="text-xl">&#11037;</span> Treatments for Hair
                Fall, Split Ends, Hair Greying or White Hair, Rough Hair,
                Itchiness, and Dandruff using 100% chemical-free Ayurvedic
                herbal products and medicines.
              </li>
              <li>
                <span className="text-xl">&#11037;</span> Special 3-Month Hair
                Re-Growth Treatment (All our patients treated with this special
                treatment have achieved desired results).
              </li>
              <li>
                <span className="text-xl">&#11037;</span> 10-Day Special
                Shirodhara Treatment Package.
              </li>
              <li>
                <span className="text-xl">&#11037;</span> Customized Scalp Detox
                Treatment to remove toxins and improve overall scalp health.
              </li>
            </ul>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default HairAndBeauty3;
