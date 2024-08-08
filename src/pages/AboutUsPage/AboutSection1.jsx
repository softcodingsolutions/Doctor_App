import { motion, useTransform } from "framer-motion";

function AboutSection1({ scrollYProgress }) {
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.45]);

  return (
    <motion.div
      style={{ scale }}
      className="sticky top-0 h-[100vh] flex flex-col items-center py-5"
    >
      <div className="h-2/3 flex justify-center items-center  w-full bg-[url('https://images.unsplash.com/photo-1649134296132-56606326c566?h=810&w=2400&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')] object-cover">
        {/* Breadcrumb Navigation */}
        <div className=" w-fit">
          <div className="text-xl flex items-center gap-1.5 font-poppins font-semibold text-green-500">
            <a href="/" className=" hover:underline">
              Home
            </a>{" "}
            &gt; <span className="text-teal-600 text-2xl">About Us</span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 bg-gray-100 h-1/2 flex flex-col items-center justify-center">
        <div className=" text-black font-poppins text-balance tracking-wider text-xl text-center p-8 rounded-lg">
          <span className="text-green-600 font-medium">Slim and Smile</span> Ayu
          Care is a renowned weight loss center based in Gujarat, India, with a
          network of six strategically located clinics throughout the state. Our
          treatments are grounded in Ayurvedic principles, ensuring a holistic
          and comprehensive approach to weight management and overall wellness.
        </div>
      </div>
    </motion.div>
  );
}

export default AboutSection1;
