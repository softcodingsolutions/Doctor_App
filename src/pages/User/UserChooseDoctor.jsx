import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import Loader from "../Loader";
import Weightlosscover from "./../../assets/converted images/converted-files/weightlosscover.jpg";
import icons_slime from "../../assets/images/icons_slime_converted.webp";
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
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
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
        setGetDoctors(res.data?.users?.filter((user) => user.role === "doctor"));
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        alert(err.response?.data?.message + "!");
      });
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
  
    window.addEventListener("resize", handleResize);
  
    return () => {
      window.removeEventListener("resize", handleResize);
    };
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
    <div className="min-h-screen flex flex-col">
        {/* Back Button - Always Visible on Mobile */}
          <button
            className="absolute top-5 left-5 z-20 text-white hover:opacity-80 md:hidden"
            onClick={() => navigate('/login')}
          >
            <IoArrowBackCircle size={45} />
          </button>
          <img
            src={icons_slime}
            alt="Company Logo"
            className={`absolute  bg-white z-20 p-2 rounded-md top-4 right-4 ${isMobile ? 'h-12 ' : 'h-16 '}`}
          />
  
      {/* Doctor Sections */}
      <div className={`flex ${isMobile ? "flex-col" : "flex-row"} w-full h-auto md:h-screen`}>
        {getDoctors.slice(0, 3).map((doctor, index) => (
          <section
            key={doctor.id}
            className={`relative ${isMobile ? "w-full min-h-[50vh]" : "w-1/3 h-full"} flex flex-col items-center justify-end text-white border-b last:border-b-0 md:border-r md:last:border-r-0 bg-cover bg-center`}
            style={{
              backgroundImage: `url(${staticDoctors[index]?.img || "https://via.placeholder.com/300"})`,
            }}
          >
            {/* Overlay for better text readability */}
            <div className="absolute inset-0 bg-black bg-opacity-40"></div>

            {/* Show Back Button on First Section for Desktop */}
            {!isMobile && index === 0 && (
              <button
                className="absolute top-5 left-5 z-20 text-white hover:opacity-80"
                onClick={() => navigate("/login")}
              >
                <IoArrowBackCircle size={45} />
              </button>
            )}

            {/* Doctor Details with Glass Effect */}
            <div className="relative z-10 w-full backdrop-blur-md bg-white/30 border border-white/50 p-6 flex flex-col items-center md:flex-row md:justify-between">
              <div className="text-center md:text-left">
                <h2 className="text-xl font-bold text-white">
                  {doctor.first_name[0]?.toUpperCase() +
                    doctor.first_name?.slice(1) +
                    " " +
                    doctor.last_name[0]?.toUpperCase() +
                    doctor.last_name?.slice(1)}
                </h2>
                <p className="text-lg">{staticDoctors[index]?.specialist || "General Practitioner"}</p>
              </div>
              <button
                onClick={() => handleGetDoctorId(doctor.id, doctor.first_name)}
                className="mt-4 md:mt-0 px-4 py-2 border-2 border-white hover:bg-white hover:text-[#1F2937] text-white font-semibold rounded-lg transition duration-300"
              >
                Select
              </button>
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}

export default UserChooseDoctor;
