import { motion, useTransform } from "framer-motion";

function Section1({ scrollYProgress }) {
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.8]);
  const rotate = useTransform(scrollYProgress, [0, 1], [0, -5]);

  return (
    <motion.div
      style={{ scale, rotate }}
      className="sticky top-0 h-screen bg-[#C72626] text-[3.5vw] flex flex-col items-center justify-center text-white pb-[10vh]"
    >
      <p>Scroll Perspective</p>

      <div className="flex gap-4">
        <p>Section</p>

        <div className="relative w-[12.5vw]">
          <img
            src={
              "https://plus.unsplash.com/premium_photo-1680553492268-516537c44d91?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            }
            alt="img"
            placeholder="blur"
          />
        </div>

        <p>Transition</p>
      </div>
    </motion.div>
  );
}

export default Section1;
