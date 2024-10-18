import { useTransform, motion } from "framer-motion";

function HairAndBeauty1({ scrollYProgress }) {
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.45]);

  return (
    <motion.div
      style={{ scale }}
      className="sticky top-0 h-[100vh] flex flex-col items-center py-5"
    >
      <div className="h-2/3 flex justify-center items-center w-full bg-[url('https://images.unsplash.com/photo-1631390179406-0bfe17e9f89d?h=550&w=1530&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')] bg-cover bg-center">
        {/* Breadcrumb Navigation */}
        <div className="w-fit">
          <div className="text-xl flex items-center gap-1.5 font-sans font-semibold text-green-500">
            <a href="/" className="hover:underline">
              Home
            </a>{" "}
            &gt;{" "}
            <span className="text-teal-600 text-2xl">
              Hair & Beauty Treatment
            </span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 bg-gray-100 h-1/2 flex flex-col items-center justify-center p-4">
        <div className="text-black font-sans tracking-wider leading-relaxed text-lg sm:text-xl text-center px-4 sm:px-11 rounded-lg">
          Every day, we encounter images of people with attractive looks and
          charming personalities in magazines, social media, television, or the
          internet. Many modern mobile phones come with camera filters that add
          smooth skin and a glowing effect to photos. Given this, it's clear
          that the health of your hair and skin is crucial to your overall
          appearance and adds character to your visible personality.
        </div>
      </div>
    </motion.div>
  );
}

export default HairAndBeauty1;
