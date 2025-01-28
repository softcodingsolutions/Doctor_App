import { useEffect, useState } from "react";
import {
  Navbar,
  Typography,
  Button,
  IconButton,
  Collapse,
} from "@material-tailwind/react";
import icons_slime from "../../assets/images/icons_slime.png";
import { Link, useNavigate, useLocation } from "react-router-dom";

export function StickyNavbar() {
  const [openNav, setOpenNav] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

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
      {[
        { path: "/", label: "Home" },
        { path: "/about-us", label: "About Us" },
        { path: "/weight-loss", label: "Weight Loss Treatment" },
        { path: "/hair-and-beauty", label: "Hair & Beauty Treatment" },
        { path: "/contact-us", label: "Contact Us" },
      ].map(({ path, label }) => (
        <Typography
          as="li"
          variant="small"
          color="blue-gray"
          className="p-1 font-normal"
          key={path}
        >
          <Link
            to={path}
            className={`flex font-sans font-medium p-1 items-center text-base ${
              location.pathname === path
                ? "border-b-2 border-gray-900"
                : "hover:border-b-2 border-transparent hover:text-green-500 hover:border-gray-700"
            }`}
          >
            {label}
          </Link>
        </Typography>
      ))}
    </ul>
  );

  return (
    <nav className="fixed top-0 z-10 h-max w-full rounded-none px-4 py-2 lg:px-8 lg:py-3 bg-white shadow-md">
      <div className="flex items-center justify-between w-full">
        <img src={icons_slime} alt="Logo" className="h-[60px]" />
        <div className="flex items-center gap-4">
          <div className="hidden lg:block">{navList}</div>
          <Button
            onClick={() => {
              navigate("/login");
            }}
            variant="gradient"
            size="sm"
            className="hidden lg:inline-block"
          >
            <span className="text-sm">Sign in</span>
          </Button>
          <IconButton
            variant="text"
            className="ml-auto h-10 w-10 lg:hidden"
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
        {openNav && (
          <div className="flex flex-col mt-2">
            <div className=" text-gray-600">
              <Typography variant="body2" color="blue-gray" className="mb-2">
                📞 Phone: +919925490091
              </Typography>
              <Typography variant="body2" color="blue-gray" className="mb-2">
                ✉️ Email: inquiry@slimandsmile.com
              </Typography>
            </div>
          </div>
        )}
        <div className="flex items-center gap-x-1">
          <Button
            fullWidth
            variant="gradient"
            size="md"
            onClick={() => {
              navigate("/login");
            }}
          >
            <span className="text-md">Sign in</span>
          </Button>
        </div>
      </Collapse>
    </nav>
  );
}
