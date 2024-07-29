import { useEffect, useState } from "react";
import {
  Navbar,
  Typography,
  Button,
  IconButton,
  Collapse,
} from "@material-tailwind/react";
import icons_slime from "../../assets/images/icons_slime.png";
import { Link, useNavigate } from "react-router-dom";

export function StickyNavbar() {
  const [openNav, setOpenNav] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 960) {
        setOpenNav(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const navList = (
    <ul className="mt-2 mb-4 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1 font-normal"
      >
        <Link
          to="#"
          className="flex hover:scale-105 border-black transition-transform font-poppins font-medium border-x-0 border-y-0 p-1 items-center text-base hover:border-b-2"
        >
          Home
        </Link>
      </Typography>
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1 font-normal"
      >
        <Link
          to="#"
          className="flex hover:scale-105 border-black transition-transform font-poppins font-medium border-x-0 border-y-0 p-1 items-center text-base hover:border-b-2"
        >
          About Us
        </Link>
      </Typography>
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1 font-normal"
      >
        <Link
          to="#"
          className="flex hover:scale-105 border-black transition-transform font-poppins font-medium border-x-0 border-y-0 p-1 items-center text-base hover:border-b-2"
        >
          Weight Loss Treatment
        </Link>
      </Typography>
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1 font-normal"
      >
        <Link
          to="/"
          className="flex hover:scale-105 border-black transition-transform font-poppins font-medium border-x-0 border-y-0 p-1 items-center text-base hover:border-b-2"
        >
          Hair & Beauty Treatment
        </Link>
      </Typography>
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1 font-normal"
      >
        <Link
          to="#"
          className="flex hover:scale-105 border-black transition-transform font-poppins font-medium border-x-0 border-y-0 p-1 items-center text-base hover:border-b-2"
        >
          Contact Us
        </Link>
      </Typography>
      <div
        className="relative"
        onMouseEnter={() => setOpenDropdown(true)}
        onMouseLeave={() => setOpenDropdown(false)}
      >
        <Typography
          as="li"
          variant="small"
          color="blue-gray"
          className="p-1 font-normal"
        >
          <div className="flex hover:scale-105 border-black transition-transform font-poppins font-medium border-x-0 border-y-0 p-1 items-center text-base hover:border-b-2 cursor-pointer">
            Survey & Report
          </div>
        </Typography>
        {openDropdown && (
          <div
            className="absolute left-0 w-48 rounded-md shadow-lg bg-white bg-opacity-95 ring-1 ring-black ring-opacity-5 z-10"
            style={{ top: "100%" }}
          >
            <ul className="py-1" onMouseEnter={() => setOpenDropdown(true)} onMouseLeave={() => setOpenDropdown(false)}>
              <li>
                <Link
                  to="/survey"
                  className="block px-4 py-2 text-base text-gray-800 hover:bg-green-200 "
                >
                  Survey
                </Link>
              </li>
              <li>
                <Link
                  to="/survey-report"
                  className="block px-4 py-2 text-base text-gray-800 hover:bg-green-200"
                >
                  Survey Report
                </Link>
              </li>
            </ul>
          </div>
        )}
      </div>
    </ul>
  );

  return (
    <Navbar className="absolute top-0 z-10 h-max max-w-full rounded-none px-2 py-1.5 lg:px-8 lg:py-2.5">
      <div className="flex items-center justify-between  text-blue-gray-900">
        <img src={icons_slime} />
        <div className="flex items-center gap-4">
          <div className="mr-4 hidden lg:block">{navList}</div>
          <div className="flex items-center gap-x-1 font-poppins">
            <Button
              onClick={() => {
                navigate("/login");
              }}
              variant="gradient"
              size="sm"
              className="hidden lg:inline-block hover:scale-105"
            >
              <span className="text-sm">Sign in</span>
            </Button>
          </div>
          <IconButton
            variant="text"
            className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
            ripple={false}
            onClick={() => setOpenNav(!openNav)}
          >
            {openNav ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                className="h-6 w-6"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            )}
          </IconButton>
        </div>
      </div>
      <Collapse open={openNav}>
        {navList}
        <div className="flex items-center gap-x-1">
          <Button
            fullWidth
            variant="gradient"
            size="sm"
            onClick={() => {
              navigate("/login");
            }}
          >
            <span className="text-sm">Sign in</span>
          </Button>
        </div>
      </Collapse>
    </Navbar>
  );
}
