import { motion, useTransform } from "framer-motion";

function Section2({ scrollYProgress }) {
  const scale = useTransform(scrollYProgress, [0, 1], [0.8, 1]);
  const rotate = useTransform(scrollYProgress, [0, 1], [5, 0]);

  return (
      <motion.div style={{ scale, rotate }} className="relative h-screen">
      <img
        src={
          "https://images.unsplash.com/photo-1627551657111-ce68eb7c8c60?q=80&w=1793&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        }
        alt="img"
        placeholder="blur"
      />
    </motion.div>
  );
}

export default Section2;
