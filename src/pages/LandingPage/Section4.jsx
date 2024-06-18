import { motion, useTransform } from "framer-motion";

function Section4({ scrollYProgress }) {
    const scale = useTransform(scrollYProgress, [0, 1], [1, 1]);
    const rotate = useTransform(scrollYProgress, [0, 1], [0, 0]);
  return (
    <motion.div  className="sticky top-0 h-screen">
      <img
        src={
          "https://images.unsplash.com/photo-1718125188885-7ce699512931?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        }
        alt="img"
        placeholder="blur"
      />
    </motion.div>
  );
}

export default Section4;
