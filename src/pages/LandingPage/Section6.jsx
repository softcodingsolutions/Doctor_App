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

function Section6() {
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
          link: "https://www.google.com/maps/place/Solaris+Business+Hub",
        },
        { text: "+91 9925490091", link: "tel:+919925490091" },
        {
          text: "inquiry@slimandsmile.com",
          link: "mailto:inquiry@slimandsmile.com",
        },
      ],
    },
  ];

  return (
    <div className=" bg-gray-900 flex flex-col items-center text-white">
      <footer className="relative w-full h-full">
        <div className="mx-auto w-full h-full max-w-7xl px-4 sm:px-8 flex flex-col items-center justify-between">
          <Typography
            variant="h5"
            className="flex w-full items-center  sm:gap-24 mt-10 flex-col sm:flex-row"
          >
            <ScrollToTopLink to="/">
              <img
                src={icons_slime}
                className="w-48 sm:w-72 bg-white rounded-lg p-4"
                alt="Slim and Smile Logo"

              />
            </ScrollToTopLink>
            <div className="font-sans lg:text-lg text-sm tracking-wide font-light text-center sm:text-left w-full sm:w-1/2">
              <span className="text-green-600 font-medium">Slim and Smile</span>{" "}
              Ayu Care offers unique weight loss solutions backed by age-old,
              tried, and tested Ayurvedic principles.
            </div>
          </Typography>
          <div className="flex flex-col sm:flex-row justify-evenly gap-10 w-full lg:mt-6 mt-2 text-white">
            {LINKS.map(({ title, items }) => (
              <ul key={title} className="flex-1" >
                <Typography
                  variant="small"
                  className="lg:mb-3 font-semibold opacity-80 font-sans lg:text-lg text-sm text-green-600 "
                >
                  {title}
                </Typography>
                {items.map((item, index) =>
                  title === "Our Speciality" ? (
                    <li key={index} className="break-words">
                      <Typography
                        as="a"
                        color="white"
                        className="py-1.5 font-sans transition-colors  cursor-default"
                      >
                        {item.text}
                      </Typography>
                    </li>
                  ) : (
                    <ScrollToTopLink
                      to={"/" + item.link}
                      key={index}
                      className="break-words"
                    >
                      <Typography
                        as="a"
                        color="white"
                        className="py-1.5 font-sans transition-colors "
                      >
                        {item.text}
                      </Typography>
                    </ScrollToTopLink>
                  )
                )}
              </ul>
            ))}
          </div>
          <div className="mt-12 flex w-full text-center items-center justify-center border-t border-blue-gray-50 py-4 md:flex-row md:justify-between">
            <Typography
              variant="small"
              className="mb-4 text-center w-full font-normal font-sans text-base  md:mb-0"
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
    </div>
  );
}

export default Section6;
