import { useTransform, motion } from "framer-motion";

function ContactUs1({ scrollYProgress }) {
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.45]);

  return (
    <motion.div
      style={{ scale }}
      className="sticky top-0 h-[100vh] flex flex-col items-center py-5"
    >
      <div className="h-2/3 flex justify-center items-center w-full bg-[url('https://images.unsplash.com/photo-1499159058454-75067059248a?h=1000&w=1571&auto=format&fit=cover&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')] ">
        {/* Breadcrumb Navigation */}
        <div className=" w-fit">
          <div className="text-xl flex items-center gap-1.5 font-poppins font-semibold text-green-500">
            <a href="/" className=" hover:underline">
              Home
            </a>{" "}
            &gt; <span className="text-teal-600 text-2xl">Contact Us</span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 bg-gray-100 h-1/2 flex flex-col items-center justify-center">
        <div className=" text-black font-poppins text-balance tracking-wider leading-relaxed text-xl text-center px-11 rounded-lg">
          In today’s world, where attractive looks and charming personalities
          are showcased everywhere—from magazines and social media to TV and the
          internet—it's evident that healthy hair and skin play a vital role in
          your overall appearance. For personalized solutions and effective
          treatments for your hair and skin, contact us at{" "}
          <span className="text-green-600 font-medium">Slim and Smile</span> Ayu
          Care. Book an appointment to enhance your natural beauty and achieve
          glowing, healthy skin and hair.
        </div>
      </div>
    </motion.div>
  );
}

export default ContactUs1;