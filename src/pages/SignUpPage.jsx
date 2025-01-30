import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { schema } from "../schemas/SignUpSchema";
import img from "../assets/images/icons_slime_converted.webp";
import axios from "axios";
import {
  Card,
  CardBody,
  CardFooter,
  Typography,
  Input,
  Button,
} from "@material-tailwind/react";

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
        formData.append("client_id", res.data?.client_id);
        axios
          .post(`/api/v1/users`, formData)
          .then((res) => {
            console.log("SignUp", res);
            localStorage.setItem("access_token", res.data?.user?.access_token);
            localStorage.setItem("role", res.data?.user?.role);
            localStorage.setItem("userId", res.data?.user?.user?.id);
            localStorage.setItem("main_id", res.data?.user?.user?.id);
            localStorage.setItem("client_email", res.data?.user?.user?.email);
            navigate("../choose-doctor");
            reset();
          })
          .catch((err) => {
            console.log(err);
            alert(err.response?.data?.message + "!");
          });
      })
      .catch((err) => {
        console.log(err);
        alert(err.response?.data?.message + "!");
      });
  };

  return (
    <div className="flex justify-center items-center bg-slate-200 h-screen font-sans">
      <div className=" rounded-sm shadow-sm">
        <Card className="w-96">
          <form onSubmit={handleSubmit(submittedData)} method="post">
            <CardBody className="flex flex-col gap-3.5">
              <div className="flex justify-center border rounded-md p-4 shadow-inner bg-green-50">
                <img className="w-50 h-24" src={img} alt="" />
              </div>
              <Input
                label="First Name"
                size="lg"
                name="firstname"
                {...register("firstname")}
              />
              {errors.firstname && (
                <span className="text-s text-red-500 -mt-4">
                  {errors.firstname?.message}
                </span>
              )}
              <Input
                label="Last Name"
                size="lg"
                name="lastname"
                {...register("lastname")}
              />
              {errors.lastname && (
                <span className="text-s text-red-500 -mt-4">
                  {errors.lastname?.message}
                </span>
              )}
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
                label="Phone Number"
                type="number"
                size="lg"
                name="mobile"
                {...register("mobile")}
              />
              {errors.mobile && (
                <span className="text-s text-red-500 -mt-4">
                  {errors.mobile?.message}
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
              <Input
                label="Confirm Password"
                type="password"
                size="lg"
                name="confirmpassword"
                {...register("confirmpassword")}
              />
              {errors.confirmpassword && (
                <span className="text-s text-red-500 -mt-4">
                  {errors.confirmpassword?.message}
                </span>
              )}

              <Button
                type="submit"
                variant="gradient"
                fullWidth
                className="font-sans"
              >
                Sign Up
              </Button>
            </CardBody>
          </form>
          <CardFooter className="-mt-6">
            <Typography
              variant="small"
              className="flex justify-center text-base font-sans"
            >
              Already have an account?
              <Typography
                variant="small"
                color="blue-gray"
                className="ml-1 font-bold hover:scale-105"
              >
                <Link to="/login" className="text-base font-sans">
                  Sign In
                </Link>
              </Typography>
            </Typography>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}

export default SignUpPage;
