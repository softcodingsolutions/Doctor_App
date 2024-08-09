import { motion, useTransform } from "framer-motion";
import { Typography } from "@material-tailwind/react";
import icons_slime from "../../assets/images/icons_slime.png";
import { Link, useNavigate } from "react-router-dom";

// Custom Link component to handle scroll-to-top behavior
const ScrollToTopLink = ({ to, children, ...props }) => {
  const navigate = useNavigate();

  const handleClick = (event) => {
    event.preventDefault();
    navigate(to);
    window.scrollTo(0, 0); // Scroll to the top of the page
  };

  return (
    <Link to={to} onClick={handleClick} {...props}>
      {children}
    </Link>
  );
};

function Section6({ scrollYProgress }) {
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1]);
  const currentYear = new Date().getFullYear();
  const LINKS = [
    {
      title: "Quick Links",
      items: [
        { text: "About us", link: "about-us" },
        { text: "Weight Loss Treatment", link: "weight-loss" },
        { text: "Hair & Beauty Treatment", link: "hair-and-beauty" },
        { text: "Contact Us", link: "contact-us" },
      ],
    },
    {
      title: "Our Speciality",
      items: [
        { text: "Obesity and PCOD", link: "#" },
        { text: "Obesity and Hypothyroidism", link: "#" },
        { text: "Obesity and Hypertension", link: "#" },
        { text: "Obesity and Diabetes Mellitus", link: "#" },
        { text: "Obesity and Menopause", link: "#" },
        { text: "Obesity and Stress", link: "#" },
      ],
    },
    {
      title: "Get In Touch",
      items: [
        {
          text: "634/ Solaris Business Hub, Opp Parshwnath Jain Temple, Bhuyangdev Cross Road, Bhuyangdev, Ahmedabad-380052",
          link: "https://www.google.com/maps/place/Solaris+Business+Hub/@23.0584752,72.5365274,17z/data=!3m1!4b1!4m6!3m5!1s0x395e855d754079cd:0x56eb1329773be8e8!8m2!3d23.0584752!4d72.5391023!16s%2Fg%2F11h7k78qh9?entry=ttu",
        },
        {
          text: "+91 9925490091",
          link: "tel:+919925490091",
        },
        {
          text: "inquiry@slimandsmile.com",
          link: "mailto:inquiry@slimandsmile.com",
        },
      ],
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
            <ScrollToTopLink to="/">
              <img src={icons_slime} className="w-72" />
            </ScrollToTopLink>
            <div className="font-poppins text-lg text-balance tracking-wide font-light w-1/2">
              <span className="text-green-600 font-medium">Slim and Smile</span>{" "}
              Ayu Care offers unique weight loss solutions which are in turn
              backed 100% by age old, tried and tested Ayurvedic principles.
            </div>
          </Typography>
          <div className="flex justify-evenly gap-10 w-full">
            {LINKS.map(({ title, items }) =>
              title === "Our Speciality" ? (
                <ul key={title} className="flex-1">
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="mb-3 font-semibold opacity-80 font-poppins text-lg"
                  >
                    {title}
                  </Typography>
                  {items.map((item, index) => (
                    <li key={index} className="break-words">
                      <Typography
                        as="a"
                        color="gray"
                        className="py-1.5 font-poppins transition-colors hover:text-black cursor-default"
                      >
                        {item.text}
                      </Typography>
                    </li>
                  ))}
                </ul>
              ) : (
                <ul key={title} className="flex-1">
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="mb-3 font-semibold opacity-80 font-poppins text-lg"
                  >
                    {title}
                  </Typography>
                  {items.map((item, index) => (
                    <ScrollToTopLink
                      to={"/" + item.link}
                      key={index}
                      className="break-words"
                    >
                      <Typography
                        as="a"
                        color="gray"
                        className="py-1.5 font-poppins transition-colors hover:text-black"
                      >
                        {item.text}
                      </Typography>
                    </ScrollToTopLink>
                  ))}
                </ul>
              )
            )}
          </div>
          <div className="mt-12 flex w-full text-center items-center justify-center border-t border-blue-gray-50 py-4 md:flex-row md:justify-between">
            <Typography
              variant="small"
              className="mb-4 text-center w-full font-normal font-poppins text-base text-blue-gray-900 md:mb-0 "
            >
              &copy; {currentYear}{" "}
              <ScrollToTopLink to="/" className="font-semibold">
                Slim & Smile
              </ScrollToTopLink>
              . All Rights Reserved.
            </Typography>
          </div>
        </div>
      </footer>
    </motion.div>
  );
}

export default Section6;
