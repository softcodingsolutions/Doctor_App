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
              <div className="w-full grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
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
              </div>

              <div className=" mt-2 w-full h-[76vh] flex flex-col gap-3 bg-white rounded-lg px-4 py-3">
                <div>
                  {isToday && (
                    <label className="flex justify-start text-lg font-bold  tracking-wide">
                      Today's Appointments
                    </label>
                  )}
                </div>
                <div className="w-full flex justify-end ">
                  <input
                    type="date"
                    placeholder="select date"
                    className="py-1 px-1  rounded-md border  border-black w-[40vh]"
                    value={consultingTime} // This ensures today's date is set by default
                    onChange={handleConsulting}
                  />
                </div>

                <div className="bg-white h-[60vh] overflow-y-auto flex flex-col rounded-lg ">
                  {paginateCustomers().length === 0 ? (
                    <div className="flex w-full h-full items-center justify-center text-2xl">
                      No Appointments Today!
                    </div>
                  ) : (
                    paginateCustomers().map((res) => (
                      <div
                        key={res.id}
                        className="flex text-md hover:bg-gray-200 items-center gap-1 border border-gray-200 min-h-16 shadow-inner rounded-md p-2"
                      >
                        <img
                          src={
                            res.user?.personal_detail?.gender === "male"
                              ? male
                              : female
                          }
                          alt="img"
                          className="size-16 mr-2"
                        />

                        <div className=" w-[16rem]">
                          <div className="flex w-80">
                            <div className=" text-right break-words font-medium text-sm">
                              Case Number:
                            </div>
                            <div className=" pl-2 text-sm">
                              {res.user?.case_number}
                            </div>
                          </div>
                          <div className="flex">
                            <div className=" text-right break-words font-medium text-sm">
                              Patient Name:
                            </div>
                            <div className="pl-2 text-sm">
                              {res.user?.first_name?.[0]?.toUpperCase() +
                                res.user?.first_name?.slice(1) +
                                " " +
                                res.user?.last_name?.[0]?.toUpperCase() +
                                res.user?.last_name?.slice(1)}
                            </div>
                          </div>
                        </div>

                        <div className=" w-[12rem]">
                          <div className="flex items-center ">
                            <div className=" text-right break-words font-medium text-sm">
                              Age:
                            </div>
                            <div className=" pl-2 text-sm">
                              {res.user?.personal_detail?.age}
                            </div>
                          </div>
                          <div className="flex items-center">
                            <div className=" text-right break-words font-medium text-sm">
                              Weight:
                            </div>
                            <div className="pl-2 text-sm">
                              {res.user?.personal_detail?.weight} kg
                            </div>
                          </div>
                        </div>

                        <div className=" w-[15rem]">
                          <div className="flex items-center ">
                            <div className=" text-right break-words font-medium text-sm">
                              <BsFillTelephoneFill />
                            </div>
                            <div className=" pl-2 text-sm">
                              {res.user?.phone_number}
                            </div>
                          </div>
                          <div className="flex items-center">
                            <div className=" text-right break-words font-medium text-sm">
                              Type:
                            </div>
                            <div className="pl-2 text-sm">
                              {res.user?.follow_up ? "Follow Up" : "New Case"}
                            </div>
                          </div>
                        </div>

                        <div className=" w-[14rem]">
                          <div className="flex items-center">
                            <div className=" text-right break-words font-medium text-sm">
                              Time:
                            </div>
                            <div className="pl-2 text-sm">
                              {res.machine_detail?.name
                                ? convertToAmPm(res.time)
                                : res.time}
                            </div>
                          </div>
                          {res.machine_detail?.name && (
                            <div className="flex items-center">
                              <div className=" text-right break-words font-medium text-sm">
                                Machine Name:
                              </div>
                              <div className=" pl-2 text-sm">
                                {res.machine_detail?.name}
                              </div>
                            </div>
                          )}
                        </div>

                        <button
                          onClick={() => handleDiagnosis(res.user?.id)}
                          className="font-medium text-sm text-green-600 border border-gray-300 p-1 rounded-md hover:bg-green-600 hover:text-white"
                        >
                          Diagnosis
                        </button>
                      </div>
                    ))
                  )}
                </div>

                {/* Pagination Controls */}
                {totalPages !== 0 && (
                  <div className="flex flex-wrap justify-center items-center gap-2 py-1">
                    <button
                      onClick={handlePreviousPage}
                      disabled={currentPage === 1}
                      className="flex items-center gap-2 px-6 py-3 font-sans text-xs font-bold text-center text-gray-900 uppercase align-middle transition-all rounded-full select-none hover:bg-gray-900/10 active:bg-gray-900/20 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="2"
                        stroke="currentColor"
                        aria-hidden="true"
                        className="w-4 h-4"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
                        ></path>
                      </svg>
                      Previous
                    </button>
                    <div className="flex gap-2">
                      {Array.from({ length: totalPages }, (_, i) => (
                        <button
                          key={i + 1}
                          onClick={() => setCurrentPage(i + 1)}
                          className={`relative h-10 max-h-[40px] w-10 max-w-[40px] select-none rounded-full text-center align-middle font-sans text-xs font-medium uppercase text-gray-900 transition-all hover:bg-gray-900/10 active:bg-gray-900/20 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none ${
                            currentPage === i + 1
                              ? "bg-gray-900 text-white"
                              : "bg-gray-200 text-black"
                          }`}
                        >
                          {i + 1}
                        </button>
                      ))}
                    </div>
                    <button
                      onClick={handleNextPage}
                      disabled={currentPage === totalPages}
                      className="flex items-center gap-2 px-6 py-3 font-sans text-xs font-bold text-center text-gray-900 uppercase align-middle transition-all rounded-full select-none hover:bg-gray-900/10 active:bg-gray-900/20 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                    >
                      Next
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="2"
                        stroke="currentColor"
                        aria-hidden="true"
                        className="w-4 h-4"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                        ></path>
                      </svg>
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
