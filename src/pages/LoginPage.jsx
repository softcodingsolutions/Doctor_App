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

function LoginPage() {
  const navigate = useNavigate();
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
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
    console.log(d);
    const trimmedEmail = d.email.trim();
    const trimmedPassword = d.password.trim();

    setLoading(true);

    axios
      .get("/api/v1/users/app_creds")
      .then((res) => {
        const formData = new FormData();
        formData.append("email", trimmedEmail);
        formData.append("password", trimmedPassword);
        formData.append("client_id", res.data?.client_id);
        axios
          .post("/api/v1/users/login", formData)
          .then((res) => {
            console.log(res);
            localStorage.setItem("access_token", res.data?.user?.access_token);
            localStorage.setItem("role", res.data?.user?.role);
            localStorage.setItem("main_id", res.data?.user?.not_a_number);
            setLoading(false);
            const Toast = Swal.mixin({
              toast: true,
              position: "top-end",
              showConfirmButton: false,
              timer: 3000,
              timerProgressBar: true,
              didOpen: (toast) => {
                toast.onmouseenter = Swal.stopTimer;
                toast.onmouseleave = Swal.resumeTimer;
              },
            });

            if (res.data?.user?.role === "doctor") {
              navigate("/admin/dashboard");
              Toast.fire({
                icon: "success",
                title: `Welcome ${res.data?.user?.email}!`,
              });
            } else if (res.data?.user?.role === "super_admin") {
              navigate("/admin/create-role/role-assign");
              Toast.fire({
                icon: "success",
                title: `Welcome ${res.data?.user?.email}!`,
              });
            } else if (res.data?.user?.role === "franchise") {
              navigate("/franchise/patients/all-users");
              Toast.fire({
                icon: "success",
                title: `Welcome ${res.data?.user?.email}!`,
              });
            } else if (res.data?.user?.role === "receptionist") {
              navigate("/receptionist/appointment/home");
              Toast.fire({
                icon: "success",
                title: `Welcome ${res.data?.user?.email}!`,
              });
            } else {
              navigate("/user/user-diagnosis/progress-complains");
              localStorage.setItem(
                "doctor_fname",
                res.data?.doctor?.first_name
              );
              localStorage.setItem("doctor_lname", res.data?.doctor?.last_name);
              localStorage.setItem("doctor_id", res.data?.doctor?.id);
              Toast.fire({
                icon: "success",
                title: `Welcome ${res.data?.user?.email}!`,
              });
            }
            reset();
          })
          .catch((err) => {
            console.log(err);
            setLoading(false);
            if (err.response?.data?.success === false) {
              setWrongCreds(true);
            }
          });
      })
      .catch((err) => {
        setLoading(false);
        console.log(err.message);
        alert(err.response?.data?.message + "!");
      });
  };

  useEffect(() => {
    const role = localStorage.getItem("role");
    if (role === "super_admin") {
      navigate("/admin/dashboard");
    } else if (role === "franchise") {
      navigate("/franchise/patients/all-users");
    } else if (role === "receptionist") {
      navigate("/receptionist/appointment/home");
    } else if (role === "patient") {
      navigate("/user/user-diagnosis/progress-complains");
    }
  }, []);

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
    className={`flex items-center justify-start min-h-screen bg-cover bg-center px-6`}
    style={{ backgroundImage: `url(${loginpage})` }}
  >
    <img src={icons_slime} alt="Company Logo" className={`absolute top-4 left-4 ${isMobile ? 'h-12' :  'h-16'} `}/>
    <div className={`flex flex-col justify-start  rounded-lg w-full max-w-lg ${isMobile ? 'ml-0':'ml-[200px] p-8'}`}>
      <h2 className="text-2xl font-bold text-[#1F2937] text-center font-poppins tracking-widest">Sign In</h2>
      <p className="text-md font-medium mt-1 text-[#1F2937] text-center tracking-wider">Your Journey to a Healthier You Starts Here!</p>
      {wrongCreds && (
        <p className="text-red-500 text-sm text-center mt-2">Incorrect Email or Password!</p>
      )}
      <form onSubmit={handleSubmit(submittedData)} className="mt-4">
        <div className="mb-4">
          <label className="block text-[#1F2937]">Email</label>
          <input
            type="email"
            {...register("email")}
            className="w-full mt-1 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
        </div>
        <div className="mb-4 relative">
          <label className="block text-[#1F2937]">Password</label>
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
          <Link to="/forget-password" className="text-green-600 hover:underline">Forgot Password?</Link>
        </div>
        <button
          type="submit"
          className="w-full mt-4 bg-green-600 text-white p-3 rounded-md hover:bg-green-700"
          onClick={handleSubmit}
        >
          Sign In
        </button>
      </form>
      <p className="text-left mt-4 text-gray-600">
        Don’t have an account? <Link to="/signup" className="text-[#1F2937] font-bold hover:underline">Sign Up</Link>
      </p>
    </div>
  </div>
  
  );
}

export default LoginPage;
