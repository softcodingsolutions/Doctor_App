import axios from "axios";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { Input, Button, Typography } from "@material-tailwind/react";
import { useState, useEffect } from "react";
import InsideLoader from "./InsideLoader";
import pattiya from "../assets/converted images/converted-files/pattiya.jpg";
import icons_slime from "../assets/images/icons_slime_converted.webp";

function ForgetPassword() {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [loading, setLoading] = useState(false);

  const submittedData = (d) => {
    console.log(d);
    setLoading(true);
    const formdata = new FormData();
    formdata.append("email", d.email);
    axios
      .post(`/api/v2/reset_password_tokens`, formdata)
      .then((res) => {
        setLoading(false);
        console.log(res);
        alert("The reset password link has been sent to your email!");
        navigate("/");
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  };

  if (loading) {
    return <InsideLoader />;
  }

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div
      className="relative w-full h-screen bg-cover bg-center"
      style={{ backgroundImage: `url(${pattiya})` }}
    >
      {/* Slime Icon Positioned in Top-Left */}
      <img
        className="absolute top-4 right-4  h-16"
        src={icons_slime}
        alt="Slime Icon"
      />

      {/* Form Positioned on the Right */}
      <div
        className={`absolute top-1/2 ${
          isMobile ? "right-10 bg-blue-gray-50 rounded-lg " : "right-60"
        } transform -translate-y-1/2 w-96`}
      >
        <form
          onSubmit={handleSubmit(submittedData)}
          method="post"
          className="p-6  rounded-lg "
        >
          <Typography
            variant="lg"
            color="#1F2937"
            className="text-center text-xl font-poppins font-medium"
          >
            Forget Password
          </Typography>
          <p className="text-[#1F2937] font-medium  text-center">
            Lost Access? Let’s Get You Back In.
          </p>
          <div className="mt-5">
            <Input
              label="Email"
              size="lg"
              name="email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                  message: "Invalid email address",
                },
              })}
              className=" bg-white bg-opacity-50"
            />
          </div>
          {errors.email && (
            <span className="text-sm text-red-500">
              {errors.email?.message}
            </span>
          )}
          <Button
            type="submit"
            variant="gradient"
            fullWidth
            className="mt-6 font-sans "
          >
            Send
          </Button>
          <p className="text-center mt-4 text-gray-600">
            Don’t have an account?{" "}
            <Link
              to="/signup"
              className="text-[#1F2937] font-bold hover:underline"
            >
              Sign Up
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default ForgetPassword;
