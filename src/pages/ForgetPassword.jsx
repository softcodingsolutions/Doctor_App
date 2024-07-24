import axios from "axios";
import Swal from "sweetalert2";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { schema } from "../schemas/LoginSchema";
import icons_slime from "../assets/images/icons_slime.png";
import {
  Card,
  CardBody,
  Input,
  Button,
  Typography,
} from "@material-tailwind/react";

function ForgetPassword() {
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
      title: `Please check your email!`,
    });
    reset();
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
