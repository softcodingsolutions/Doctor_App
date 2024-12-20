import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import Loader from "../Loader";
import { IoArrowBackCircle } from "react-icons/io5";

const staticDoctors = [
  {
    specialist: "Weight Loss",
    img: "https://plus.unsplash.com/premium_photo-1677592645419-0702774b0148?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    specialist: "Skin Specialist",
    img: "https://images.unsplash.com/photo-1573461160327-b450ce3d8e7f?q=80&w=1965&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    specialist: "Beauty Care",
    img: "https://images.unsplash.com/photo-1552046122-03184de85e08?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
];

function UserChooseDoctor() {
  const navigate = useNavigate();
  const [getDoctors, setGetDoctors] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleGetDoctors = () => {
    axios
      .get(`/api/v1/users`)
      .then((res) => {
        console.log(
          "Doctors: ",
          res.data?.users?.filter((user) => user.role === "doctor")
        );
        setGetDoctors(
          res.data?.users?.filter((user) => user.role === "doctor")
        );
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        alert(err.response?.data?.message + "!");
      });
  };

  const handleGetDoctorId = (val, first_name) => {
    console.log(val);
    localStorage.setItem("doctor_id", val);
    localStorage.setItem("doctorFirstName", first_name);
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
      title: "Doctor Selected!",
    });
    navigate("/questions/general-details");
  };

  useEffect(() => {
    if (!localStorage.getItem("access_token")) {
      navigate("/signup");
    }
    handleGetDoctors();
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <>
      <button
        className="absolute top-8 left-10"
        onClick={() => {
          navigate("/login");
        }}
      >
        <IoArrowBackCircle size={45} />
      </button>
      <div className="flex items-center justify-center w-full gap-8 h-[100vh] p-4 flex-wrap">
        {getDoctors.map((val, index) => {
          return (
            <Card
              key={val.id}
              className="w-96 hover:scale-105 transition-transform shadow-lg cursor-pointer"
            >
              <CardHeader floated={false} className="h-80">
                <img src={staticDoctors[index].img} alt="profile-picture" />
              </CardHeader>
              <CardBody className="text-center">
                <Typography
                  variant="h4"
                  color="blue-gray"
                  className="mb-2 font-sans"
                >
                  {val.first_name[0]?.toUpperCase() +
                    val.first_name?.slice(1) +
                    " " +
                    val.last_name[0]?.toUpperCase() +
                    val.last_name?.slice(1)}
                </Typography>
                <Typography
                  color="blue-gray"
                  className="font-medium font-sans"
                  textGradient
                >
                  {staticDoctors[index].specialist}
                </Typography>
              </CardBody>
              <CardFooter className="flex items-center w-full justify-center pt-0">
                <Button
                  onClick={() => handleGetDoctorId(val.id, val.first_name)}
                  className="w-full font-sans"
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
    </>
  );
}

export default UserChooseDoctor;
