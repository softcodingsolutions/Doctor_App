import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { schema } from "../schemas/LoginSchema";
import axios from "axios";
import Swal from "sweetalert2";
import icons_slime from "../assets/images/icons_slime.png";
import {
  Card,
  CardBody,
  CardFooter,
  Typography,
  Input,
  Button,
} from "@material-tailwind/react";
import { useEffect, useState } from "react";
import Loader from "./Loader";

function LoginPage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
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
    setLoading(true);
    axios
      .get("/api/v1/users/app_creds")
      .then((res) => {
        const formData = new FormData();
        formData.append("email", d.email);
        formData.append("password", d.password);
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

            if (
              res.data?.user?.role === "super_admin" ||
              res.data?.user?.role === "doctor"
            ) {
              navigate("/admin/dashboard");
              Toast.fire({
                icon: "success",
                title: `Welcome ${res.data?.user?.email}!`,
              });
            } else if (res.data?.user?.role === "franchise") {
              navigate("/franchise/customers/all-users");
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
              navigate("/user/user-diagnosis/profile");
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
            alert(err.response?.data?.message + "!");
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
      navigate("/franchise/customers/all-users");
    } else if (role === "receptionist") {
      navigate("/receptionist/appointment/home");
    } else if (role === "patient") {
      navigate("/user/user-diagnosis/profile");
    }
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen font-teachers">
      <div className="border px-10 py-5 rounded-sm shadow-sm">
        <Card className="w-96 h-fit py-2">
          <form onSubmit={handleSubmit(submittedData)} method="post">
            <CardBody className="flex flex-col gap-4">
              <div className="flex justify-center border rounded-md p-4 shadow-inner bg-green-100">
                <img className="w-50 h-24" src={icons_slime} alt="" />
              </div>
              <Input
                label="Email"
                size="lg"
                name="email"
                {...register("email")}
              />
              {errors.email && (
                <span className="text-s text-red-500 -mt-4">
                  {errors.email?.message}
                </span>
              )}
              <Input
                label="Password"
                type="password"
                size="lg"
                name="password"
                {...register("password")}
              />
              {errors.password && (
                <span className="text-s text-red-500 -mt-4">
                  {errors.password?.message}
                </span>
              )}
              <div className="-mt-1.5 text-right">
                <Typography variant="small" color="light">
                  <Link
                    to="/forget-password"
                    className="font-teachers text-base hover:underline"
                  >
                    Forget Password
                  </Link>
                </Typography>
              </div>
              <Button
                type="submit"
                className="font-teachers text-sm"
                variant="gradient"
                fullWidth
              >
                Sign In
              </Button>
            </CardBody>
          </form>
          <CardFooter className="pt-0">
            <Typography
              variant="small"
              className="flex justify-center text-base font-teachers"
            >
              Don&apos;t have an account?
              <Typography
                variant="small"
                color="blue-gray"
                className="ml-1 font-bold hover:scale-105"
              >
                <Link to="/signup" className="text-base font-teachers">
                  Sign Up
                </Link>
              </Typography>
            </Typography>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}

export default LoginPage;
