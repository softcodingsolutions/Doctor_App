import axios from "axios";
import Swal from "sweetalert2";
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

function ForgetPassword() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const submittedData = (d) => {
    console.log(d);
    const formdata = new FormData();
    formdata.append("email", d.email);
    axios
      .post(`/api/v2/reset_password_tokens`, formdata)
      .then((res) => {
        console.log(res);
        alert("The reset password link has been sent to your email!");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen font-teachers">
      <Card className="w-96">
        <form onSubmit={handleSubmit(submittedData)} method="post">
          <CardBody className="flex flex-col gap-4">
            <div className="flex justify-center border shadow-inner bg-green-50 rounded-md p-4">
              <img className="w-50 h-24" src={icons_slime} alt="" />
            </div>
            <Typography
              variant="lg"
              color="blue-gray"
              className="ml-1 text-center text-xl font-teachers"
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
              className="font-teachers"
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
