import { motion, useTransform } from "framer-motion";
import { Typography } from "@material-tailwind/react";
import icons_slime from "../../assets/images/icons_slime.png";

function Section6({ scrollYProgress }) {
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1]);
  const currentYear = new Date().getFullYear();
  const LINKS = [
    {
      title: "Quick Links",
      items: [
        "About us",
        "Weight Loss Treatment",
        "Hair & Beauty Treatment",
        "Contact Us",
        "Terms and Conditions",
      ],
    },
    {
      title: "Our Speciality",
      items: [
        "Obesity and PCOD",
        "Obesity and Hypothyroidism",
        "Obesity and Hypertension",
        "Obesity and Diabetes Mellitus",
        "Obesity and Menopause",
        "Obesity and Stress",
      ],
    },
    {
      title: "Get In Touch",
      items: ["Blog", "+91 9925490091", "inquiry@slimandsmile.com"],
    },
  ];

  return (
    <motion.div
      style={{ scale }}
      className="sticky top-0 h-screen bg-green-100 flex flex-col items-center"
    >
      <footer className="relative w-full h-full">
        <div className="mx-auto w-full h-full max-w-7xl px-8 flex flex-col items-center justify-between">
          <Typography
            variant="h5"
            className="flex w-full items-center justify-evenly gap-24 mt-10"
          >
            <img src={icons_slime} className="w-72"/>
            <div className="font-poppins text-lg text-balance tracking-wide font-light w-1/2">
              Slim and Smile Ayu Care offers unique weight loss solutions which
              are in turn backed 100% by age old, tried and tested Ayurvedic
              principles.
            </div>
          </Typography>
          <div className="flex justify-evenly gap-10 w-full">
            {LINKS.map(({ title, items }) => (
              <ul key={title}>
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="mb-3 font-semibold opacity-70 font-poppins text-lg"
                >
                  {title}
                </Typography>
                {items.map((link) => (
                  <li key={link}>
                    <Typography
                      as="a"
                      href="#"
                      color="gray"
                      className="py-1.5 font-poppins transition-colors hover:text-black"
                    >
                      {link}
                    </Typography>
                  </li>
                ))}
              </ul>
            ))}
          </div>
          <div className="mt-12 flex w-full text-center items-center justify-center border-t border-blue-gray-50 py-4 md:flex-row md:justify-between">
            <Typography
              variant="small"
              className="mb-4 text-center w-full font-normal text-base text-blue-gray-900 md:mb-0 "
            >
              &copy; {currentYear} <a href="/">Slime & Smile</a>. All Rights
              Reserved.
            </Typography>
          </div>
        </div>
      </footer>
    </motion.div>
  );
}

export default Section6;
