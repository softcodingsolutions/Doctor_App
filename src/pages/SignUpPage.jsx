import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { schema } from "../schemas/SignUpSchema";
import SubmitButton from "../components/SubmitButton";
import SignupInputs from "../components/SignupInputs";
import axios from "axios";
import Swal from "sweetalert2";

function SignUpPage() {
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
        formData.append("user[first_name]", d.firstname);
        formData.append("user[last_name]", d.lastname);
        formData.append("user[password]", d.password);
        formData.append("user[email]", d.email);
        formData.append("user[phone_number]", d.mobile);
        formData.append("user[address]", d.address);
        formData.append("client_id", res.data?.client_id);
        axios
          .post(`/api/v1/users`, formData)
          .then((res) => {
            console.log("Login", res);
            localStorage.setItem("access_token", res.data?.user?.access_token);
            localStorage.setItem("role", res.data?.user?.role);
            
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
              title: "Signed up successfully",
            });
            navigate("/");
            reset();
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="flex flex-col items-center bg-slate-200 h-screen">
      <div className="my-10 flex items-center justify-center  w-[35vh] h-[15vh] shadow-sm bg-white rounded-md">
        <img
          className="w-50 h-24"
          src="https://slimandsmile.com/assets/admin/global/img/logo.jpg"
          alt=""
        />
      </div>
      <div className="border bg-white px-10 py-5 rounded-sm shadow-sm">
        <form
          onSubmit={handleSubmit(submittedData)}
          className="w-full h-fit flex flex-col justify-center items-center"
          method="post"
        >
          <SignupInputs
            name="firstname"
            type="text"
            placeholder="firstname"
            hook={register("firstname")}
          />
          {errors.firstname && (
            <span className="text-s text-red-500  -mt-2.5">
              {errors.firstname?.message}
            </span>
          )}
          <SignupInputs
            name="lastname"
            type="text"
            placeholder="lastname"
            hook={register("lastname")}
          />
          {errors.lastname && (
            <span className="text-s text-red-500  -mt-2.5">
              {errors.lastname?.message}
            </span>
          )}
          <SignupInputs
            name="email"
            type="email"
            placeholder="name@email.com"
            hook={register("email")}
          />
          {errors.email && (
            <span className="text-sm text-red-500  -mt-2.5">
              {errors.email?.message}
            </span>
          )}
          <SignupInputs
            name="mobile"
            type="text"
            placeholder="mobile number"
            hook={register("mobile")}
          />
          {errors.mobile && (
            <span className="text-sm  text-red-500 -mt-2.5">
              {errors.mobile?.message}
            </span>
          )}
          <SignupInputs
            name="address"
            type="text"
            placeholder="address"
            hook={register("address")}
          />
          <SignupInputs
            name="password"
            type="password"
            placeholder="password"
            hook={register("password")}
          />
          {errors.password && (
            <span className="text-sm text-red-500 -mt-2.5">
              {errors.password?.message}
            </span>
          )}
          <SignupInputs
            name="confirmpassword"
            type="password"
            placeholder="confirm password"
            hook={register("confirmpassword")}
          />
          {errors.confirmpassword && (
            <span className="text-sm text-red-500 -mt-2.5">
              {errors.confirmpassword?.message}
            </span>
          )}
          <SubmitButton name="Create Account" />
          <div className="-mt-2">
            Already have an account?
            <Link to="/" className="text-[#198f9f] pl-1">
              Login
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SignUpPage;
