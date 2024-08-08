import { useTransform, motion } from "framer-motion";
import img1 from "../../assets/images/fat-img-1.png";
import img2 from "../../assets/images/fat-img-2.png";
import img3 from "../../assets/images/fat-img-3.png";
import img4 from "../../assets/images/fat-img-4.png";

function WeightLoss5({ scrollYProgress }) {
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1]);

  return (
    <motion.div
      style={{ scale }}
      className="sticky top-0 h-screen bg-teal-50 flex flex-col items-center py-7"
    >
      <div className="w-full pt-14 flex flex-col justify-center px-16 gap-10">
        <div className="text-xl font-semibold">
          Certain parts of the body are more prone to excess fat accumulation
          compared to others. Common areas include:
        </div>
      </div>
      <div className="w-full flex gap-8 justify-center px-5 text-pretty pt-12">
        <div className="flex flex-col items-center gap-1.5">
          <img src={img1} alt="" />
          <div className="text-lg">Abdominal Fat</div>
        </div>
        <div className="flex flex-col items-center gap-1.5">
          <img src={img2} alt="" />
          <div className="text-lg">Love Handle Fat</div>
        </div>
        <div className="flex flex-col items-center gap-1.5">
          <img src={img3} alt="" />
          <div className="text-lg">Hip/Thigh Fat</div>
        </div>
        <div className="flex flex-col items-center gap-1.5">
          <img src={img4} alt="" />
          <div className="text-lg">Full Body Fat</div>
        </div>
      </div>
      <div className="px-16 pt-11 text-lg leading-relaxed">
        The reason for fat gain in different areas is often related to
        imbalances in various hormones. Consequently, the treatment for fat loss
        in each body part may need to be tailored differently to address these
        specific hormonal imbalances.
      </div>
    </motion.div>
  );
}

export default WeightLoss5;
