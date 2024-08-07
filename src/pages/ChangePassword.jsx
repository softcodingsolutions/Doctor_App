import axios from "axios";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import icons_slime from "../assets/images/icons_slime.png";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardBody,
  Input,
  Button,
  Typography,
} from "@material-tailwind/react";
import { schema1 } from "../schemas/SignUpSchema";

function ChangePassword() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema1),
  });

  const submittedData = (d) => {
    const getResetToken = () => {
      const currentUrl = window.location.href;
      const url = new URL(currentUrl);
      return url.searchParams.get("reset_token");
    };
    const resetToken = getResetToken();

    console.log(d);
    const formdata = new FormData();
    formdata.append("password", d.password);
    axios
      .put(
        `/api/v2/reset_password_tokens/forgot_password?reset_token=${resetToken}`,
        formdata
      )
      .then((res) => {
        console.log(res);
        alert("Successfully Reset Your Password \nNow you can Sign in with your new password!");
        navigate("/login");
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
              Change Password
            </Typography>
            <Input
              label="Password"
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
              size="lg"
              name="confirmpassword"
              {...register("confirmpassword")}
            />
            {errors.confirmpassword && (
              <span className="text-s text-red-500 -mt-4">
                {errors.confirmpassword?.message}
              </span>
            )}
            <p>This Link will only be available for 15min</p>
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

export default ChangePassword;
