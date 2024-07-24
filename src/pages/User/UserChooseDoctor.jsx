import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

function UserChooseDoctor() {
  const navigate = useNavigate();
  const [getDoctor, setGetDoctor] = useState([
    {
      id: 1,
      name: "Bhavesh Thakar",
      specialist: "Weight Loss",
      img: "https://plus.unsplash.com/premium_photo-1677592645419-0702774b0148?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      id: 2,
      name: "Deepali Pathak",
      specialist: "Skin Specialist",
      img: "https://images.unsplash.com/photo-1573461160327-b450ce3d8e7f?q=80&w=1965&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      id: 3,
      name: "Hemali Shah",
      specialist: "Beauty Care",
      img: "https://images.unsplash.com/photo-1552046122-03184de85e08?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
  ]);

  const handleGetDoctorId = (val) => {
    console.log(val);
    localStorage.setItem("doctorId", val);
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
    navigate("/questions/general-details");
  };

  useEffect(() => {
    if (!localStorage.getItem("access_token")) {
      navigate("/signup");
    }
  }, []);

  return (
    <div className="flex items-center justify-center w-full gap-8 h-[100vh] p-4 flex-wrap">
      {getDoctor.map((val) => {
        return (
          <Card
            key={val.id}
            className="w-96 hover:scale-105 transition-transform shadow-lg cursor-pointer"
          >
            <CardHeader floated={false} className="h-80">
              <img src={val.img} alt="profile-picture" />
            </CardHeader>
            <CardBody className="text-center">
              <Typography variant="h4" color="blue-gray" className="mb-2 font-teachers">
                {val.name}
              </Typography>
              <Typography
                color="blue-gray"
                className="font-medium font-teachers"
                textGradient
              >
                {val.specialist}
              </Typography>
            </CardBody>
            <CardFooter className="flex items-center w-full justify-center pt-0">
              <Button
                onClick={() => handleGetDoctorId(val.id)}
                className="w-full font-teachers"
                variant="soft"
                size="sm"
              >
                Select
              </Button>
            </CardFooter>
          </Card>
        );
      })}
    </div>
  );
}

export default UserChooseDoctor;
