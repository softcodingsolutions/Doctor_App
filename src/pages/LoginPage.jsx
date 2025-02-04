import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { schema } from "../schemas/LoginSchema";
import axios from "axios";
import Swal from "sweetalert2";
import { useState, useEffect } from "react";
import { FaEyeSlash } from "react-icons/fa";
import { IoEyeSharp } from "react-icons/io5";
import icons_slime from "../assets/images/icons_slime_converted.webp";
import loginpage from "../assets/converted images/converted-files/loginpage.png"
import backgroundlogin_converted from "../assets/images/backgroundlogin_converted.webp";

function LoginPage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [wrongCreds, setWrongCreds] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const submittedData = (d) => {
    const trimmedEmail = d.email.trim();
    const trimmedPassword = d.password.trim();
    setLoading(true);
    
    axios.get("/api/v1/users/app_creds")
      .then((res) => {
        const formData = new FormData();
        formData.append("email", trimmedEmail);
        formData.append("password", trimmedPassword);
        formData.append("client_id", res.data?.client_id);
        axios.post("/api/v1/users/login", formData)
          .then((res) => {
            localStorage.setItem("access_token", res.data?.user?.access_token);
            localStorage.setItem("role", res.data?.user?.role);
            setLoading(false);
            Swal.fire({
              icon: "success",
              title: `Welcome ${res.data?.user?.email}!`,
              timer: 3000,
              toast: true,
              position: "top-end",
              showConfirmButton: false,
            });
            navigate("/dashboard");
            reset();
          })
          .catch(() => {
            setLoading(false);
            setWrongCreds(true);
          });
      })
      .catch(() => setLoading(false));
  };

  return (
    <div
    className="flex items-center justify-start min-h-screen bg-cover bg-center px-6"
    style={{ backgroundImage: `url(${loginpage})` }}
  >
    <img src={icons_slime} alt="Company Logo" className="absolute top-4 left-4 h-16" />
    <div className="flex flex-col justify-start p-8 rounded-lg w-full max-w-md ml-[200px]">
      <h2 className="text-2xl font-bold text-[#1F2937] text-center">Sign In</h2>
      {wrongCreds && (
        <p className="text-red-500 text-sm text-center mt-2">Incorrect Email or Password!</p>
      )}
      <form onSubmit={handleSubmit(submittedData)} className="mt-4">
        <div className="mb-4">
          <label className="block text-gray-700">Email</label>
          <input
            type="email"
            {...register("email")}
            className="w-full mt-1 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
        </div>
        <div className="mb-4 relative">
          <label className="block text-gray-700">Password</label>
          <input
            type={showPassword ? "text" : "password"}
            {...register("password")}
            className="w-full mt-1 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <div className="absolute inset-y-0 right-4 flex items-center cursor-pointer" onClick={() => setShowPassword(!showPassword)}>
            {showPassword ? <IoEyeSharp className="text-gray-500 mt-8" /> : <FaEyeSlash className="text-gray-500 mt-8" />}
          </div>
          {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
        </div>
        <div className="text-right">
          <Link to="/forget-password" className="text-[#1F2937] hover:underline">Forgot Password?</Link>
        </div>
        <button
          type="submit"
          className="w-full mt-4 bg-green-600 text-white p-3 rounded-md hover:bg-green-700"
        >
          Sign In
        </button>
      </form>
      <p className="text-left mt-4 text-gray-600">
        Don’t have an account? <Link to="/signup" className="text-[#1F2937] hover:underline">Sign Up</Link>
      </p>
    </div>
  </div>
  
  );
}

export default LoginPage;
