import Inputs from "../components/Inputs";
import LinkTo from "../components/LinkTo";
import SubmitButton from "../components/SubmitButton";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { schema } from "../schemas/LoginSchema";
import axios from "axios";
import Swal from "sweetalert2";
import icons_slime from "../assets/images/icons_slime.png";

function LoginPage() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const submittedData = (d) => {
    console.log(d);

    axios
      .get("/api/v1/users/app_creds")
      .then((res) => {
        const formData = new FormData();
        formData.append("email", d.email);
        formData.append("password", d.password);
        formData.append("client_id", res.data?.client_id);
        axios.post("/api/v1/users/login", formData).then((res) => {
          console.log(res);
          localStorage.setItem("access_token", res.data?.user?.access_token);
          localStorage.setItem("role", res.data?.user?.role);
          localStorage.setItem("main_id", res.data?.user?.not_a_number);
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
          Toast.fire({
            icon: "success",
            title: `Welcome ${res.data?.user?.email}!`,
          });
          if (res.data?.user?.role === "super_admin") {
            navigate("/admin/dashboard");
          } else if (res.data?.user?.role === "franchise") {
            navigate("/franchise/dashboard");
          } else {
            navigate("/user/dashboard");
          }
          reset();
        });
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  return (
    <div className="flex flex-col items-center bg-slate-200 h-screen">
      <div className="my-10 flex items-center justify-center  w-[35vh] h-[15vh] shadow-sm bg-white rounded-md">
        <img className="w-50 h-24" src={icons_slime} alt="" />
      </div>

      <div className="border bg-white px-10 py-5 rounded-sm shadow-sm">
        <form
          onSubmit={handleSubmit(submittedData)}
          className="w-full flex flex-col justify-center items-center"
          method="post"
        >
          <Inputs
            title="Email"
            name="email"
            type="email"
            placeholder="name@email.com"
            hook={register("email")}
          />
          {errors.email && (
            <span className="text-s text-red-500  -mt-2.5">
              {errors.email?.message}
            </span>
          )}
          <Inputs
            title="Password"
            name="password"
            type="password"
            placeholder="password"
            hook={register("password")}
          />
          {errors.password && (
            <span className="text-s text-red-500  -mt-3.5">
              {errors.password?.message}
            </span>
          )}
          <div className="flex justify-end w-[20rem] mt-1">
            <LinkTo to="/forget-password" name="Forget Password" />
          </div>
          <SubmitButton name="Login" />
          <div className="-mt-2">
            Don't have an account?{" "}
            <Link to="/signup" className="text-[#198f9f]">
              Create Account
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
