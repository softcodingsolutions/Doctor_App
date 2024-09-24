import { useEffect, useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import axios from "axios";
import InsideLoader from "../InsideLoader";
import male from "../../assets/images/male.avif";
import female from "../../assets/images/female.avif";
import { BsFillTelephoneFill } from "react-icons/bs";

function AdminDashboard() {
  const context = useOutletContext();
  const navigate = useNavigate();
  const [getTotalPatients, setGetTotalPatients] = useState(0);
  const [getNewPatients, setGetNewPatients] = useState(0);
  const [getTotalFranchise, setGetTotalFranchise] = useState([]);
  const [loading, setLoading] = useState(true);
  const [getAppointments, setGetAppointments] = useState([]);
  const main_id = localStorage.getItem("main_id");
  const today = new Date();
  const [isToday, setIsToday] = useState(true);
  const [consultingTime, setConsultingTime] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 4;

  const handleConsulting = (e) => {
    const selectedDate = e.target.value;
    setConsultingTime(selectedDate);
    handleGetAppointment(selectedDate);
    const today = new Date().toISOString().split("T")[0];

    if (selectedDate !== today) {
      setIsToday(false);
      setLoading(false);
    } else {
      setIsToday(true);
    }
  };

  const handleGetAppointment = (date) => {
    axios
      .get(`api/v1/appointments?date=${date}&doctor_id=${main_id}`)
      .then((res) => {
        console.log("Todays Appointment: ", res.data?.appointments);
        setGetAppointments(res.data?.appointments);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  };

  const handleGetPatients = () => {
    axios
      .get(`/api/v1/users`)
      .then((res) => {
        console.log(res);
        const patients = res.data?.users?.filter(
          (user) => user.role === "patient" && user.created_by_id == main_id
        );
        const newPatients = res.data?.users?.filter(
          (user) =>
            user.role === "patient" &&
            user.follow_up === false &&
            user.created_by_id == main_id
        );
        setGetNewPatients(newPatients?.length);
        setGetTotalPatients(patients?.length);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };

  const handleGetFranchise = () => {
    axios
      .get("/api/v1/users/franchise_index")
      .then((res) => {
        const franchise = res.data?.users.filter(
          (user) => user.created_by_id == main_id
        );
        console.log(franchise.length);
        setGetTotalFranchise(franchise.length);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        alert(err.response?.data?.message + "!");
        setLoading(false);
      });
  };

  const paginateCustomers = () => {
    const indexOfLastRow = currentPage * rowsPerPage;
    const indexOfFirstRow = indexOfLastRow - rowsPerPage;
    return getAppointments.slice(indexOfFirstRow, indexOfLastRow);
  };

  const totalPages = Math.ceil(getAppointments.length / rowsPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  function convertToAmPm(time24) {
    // Split the input time into hours and minutes (e.g., "14:35" -> ["14", "35"])
    let [hour, minute] = time24.split(":");
    hour = parseInt(hour); // Convert the hour to an integer

    let period = hour >= 12 ? "PM" : "AM"; // Determine AM or PM

    // Convert 24-hour format to 12-hour format
    hour = hour % 12 || 12; // If hour is 0, set to 12 (for midnight), else convert

    return `${hour}:${minute} ${period}`;
  }

  const handleDiagnosis = (id) => {
    localStorage.setItem("userId", id);
    navigate(`../patients/user-diagnosis/questions`);
  };

  useEffect(() => {
    const today = new Date().toISOString().split("T")[0];
    handleGetPatients();
    handleGetFranchise();
    handleGetAppointment(today);
  }, []);

  if (loading) {
    return <InsideLoader />;
  }

  return (
    <div className="flex w-full font-sans">
      <div className="w-full h-screen hidden sm:block sm:w-20 xl:w-60 flex-shrink-0">
        .
      </div>
      <div className="h-screen flex-grow overflow-auto flex flex-wrap content-start p-1">
        <div className="w-full h-full p-2 flex flex-col gap-1">
          <div className="flex justify-end">
            <button
              onClick={context[0]}
              type="button"
              className="block sm:hidden"
            >
              <img
                src={`https://assets.codepen.io/3685267/res-react-dash-sidebar-open.svg`}
                alt=""
                className="w-full h-full"
              />
            </button>
          </div>

          <div className="relative overflow-y-auto">
            <div className="px-4">
              <div className="w-full grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-3">
                <div className="bg-white shadow rounded-lg p-4 sm:p-5 xl:p-8 ">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <span className="text-lg sm:text-xl leading-none font-bold text-gray-900">
                        {getTotalPatients}
                      </span>
                      <h3 className="text-base font-normal text-gray-500">
                        Total Patients
                      </h3>
                    </div>
                  </div>
                </div>
                <div className="bg-white shadow rounded-lg p-4 sm:p-5 xl:p-8 ">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <span className="text-lg sm:text-xl leading-none font-bold text-gray-900">
                        {getTotalFranchise}
                      </span>
                      <h3 className="text-base font-normal text-gray-500">
                        Total Franchise
                      </h3>
                    </div>
                  </div>
                </div>
                <div className="bg-white shadow rounded-lg p-4 sm:p-5 xl:p-8 ">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <span className="text-lg sm:text-xl leading-none font-bold text-gray-900">
                        {getNewPatients}
                      </span>
                      <h3 className="text-base font-normal text-gray-500">
                        New Patients
                      </h3>
                    </div>
                  </div>
                </div>
                <div className="bg-white shadow rounded-lg p-4 sm:p-5 xl:p-8 ">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <span className="text-lg sm:text-xl leading-none font-bold text-gray-900">
                        {getNewPatients}
                      </span>
                      <h3 className="text-base font-normal text-gray-500">
                        New Patients
                      </h3>
                    </div>
                  </div>
                </div>
              </div>

              <div className=" mt-2 w-full  h-[76vh] flex gap-2  rounded-lg ">
               <div className="bg-white w-[50%] border rounded-md">
               
               </div>
               <div className="bg-white w-[50%] border rounded-md">
          
               </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
