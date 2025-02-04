import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import Loader from "../Loader";
import Weightlosscover from "./../../assets/converted images/converted-files/weightlosscover.jpg";
import { IoArrowBackCircle } from "react-icons/io5";

const staticDoctors = [
  {
    specialist: "Weight Loss",
    img: Weightlosscover,
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

  useEffect(() => {
    if (!localStorage.getItem("access_token")) {
      navigate("/signup");
    }
    axios
      .get(`/api/v1/users`)
      .then((res) => {
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
  }, []);

  const handleGetDoctorId = (val, first_name) => {
    localStorage.setItem("doctor_id", val);
    localStorage.setItem("doctorFirstName", first_name);
    Swal.fire({
      icon: "success",
      title: "Doctor Selected!",
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
    });
    navigate("/questions/general-details");
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="min-h-screen">
      <button
        className="absolute top-5 lg:left-10 md:left-2 sm:left-2"
        onClick={() => navigate("/login")}
      >
        <IoArrowBackCircle size={45} className="text-[#1F2937]" />
      </button>

      {/* Header Section */}
      <div className="text-center p-6  text-[#1F2937] rounded-lg mx-4 mt-4">
        <h1 className="text-3xl font-bold font-architects">Welcome to Our Slime and Smile Portal! </h1>
        <p className="mt-2 text-lg ">
          Choose a doctor that best fits your needs. 
        </p>
      </div>

      {/* Doctors List */}
      <div className="grid grid-cols-3  p-4">
        {getDoctors.map((doctor, index) => (
          <section
            key={doctor.id}
            className="flex flex-col items-center justify-center bg-[#1F2937] border gap-1 p-5  rounded-lg "
          >
            <img
              src={
                staticDoctors[index]?.img || "https://via.placeholder.com/300"
              }
              alt="doctor"
              className="w-64 h-64 rounded-full object-cover mb-4"
            />
            <h2 className="text-2xl font-bold text-[#C8E6C9]">
              {doctor.first_name[0]?.toUpperCase() +
                doctor.first_name?.slice(1) +
                " " +
                doctor.last_name[0]?.toUpperCase() +
                doctor.last_name?.slice(1)}
            </h2>
            <p className="text-lg text-gray-600 mb-4">
              {staticDoctors[index]?.specialist || "General Practitioner"}
            </p>
            <button
              onClick={() => handleGetDoctorId(doctor.id, doctor.first_name)}
              className="px-6 py-2 bg-[#C8E6C9] font-semibold rounded-lg "
            >
              Select
            </button>
          </section>
        ))}
      </div>
    </div>
  );
}

export default UserChooseDoctor;
