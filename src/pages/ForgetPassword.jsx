import axios from "axios";
import { useForm } from "react-hook-form";
import icons_slime from "../assets/images/icons_slime.png";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardBody,
  Input,
  Button,
  Typography,
} from "@material-tailwind/react";
import { useState } from "react";
import InsideLoader from "./InsideLoader";

function ForgetPassword() {
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

  return (
    <div className="flex flex-col items-center justify-center h-screen font-sans">
      <Card className="w-96">
        <form onSubmit={handleSubmit(submittedData)} method="post">
          <CardBody className="flex flex-col gap-4">
            <div className="flex justify-center border shadow-inner bg-green-50 rounded-md p-4">
              <img className="w-50 h-24" src={icons_slime} alt="" />
            </div>
            <Typography
              variant="lg"
              color="blue-gray"
              className="ml-1 text-center text-xl font-sans"
            >
              Forget Password?
            </Typography>
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
            <Button
              type="submit"
              variant="gradient"
              fullWidth
              className="font-sans"
            >
              Send
            </Button>
          </CardBody>
        </form>
      </Card>
    </div>
  );
}

export default ForgetPassword;
