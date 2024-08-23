import { useEffect, useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import axios from "axios";
import InsideLoader from "../InsideLoader";
import male from "../../assets/images/male.avif";
import female from "../../assets/images/female.avif";

function AdminDashboard() {
  const context = useOutletContext();
  const navigate = useNavigate();
  const [getTotalPatients, setGetTotalPatients] = useState([]);
  const [getTotalFranchise, setGetTotalFranchise] = useState([]);
  const [loading, setLoading] = useState(true);
  const [getAppointments, setGetAppointments] = useState([]);
  const main_id = localStorage.getItem("main_id");
  const today = new Date();
  const formattedDate = today.toISOString().split("T")[0];

  const handleGetAppointment = () => {
    axios
      .get(`api/v2/users/get_personal_details`)
      .then((res) => {
        console.log("Todays Appointment: ", res.data?.users);
        setGetAppointments(res.data?.users);
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
        const patients = res.data?.users?.filter(
          (user) => user.role === "patient"
        );
        console.log(patients.length);
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

  function formatTime(dateTimeString) {
    const date = new Date(dateTimeString);
    return date.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  }

  const handleDiagnosis = (id) => {
    localStorage.setItem("userId", id);
    navigate(`../patients/user-diagnosis/questions`);
  };

  useEffect(() => {
    handleGetPatients();
    handleGetFranchise();
    handleGetAppointment();
  }, []);

  if (loading) {
    return <InsideLoader />;
  }

  return (
    <div className="flex w-full font-teachers">
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
              <div className="w-full grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                <div className="bg-white shadow rounded-lg p-4 sm:p-6 xl:p-8 ">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <span className="text-2xl sm:text-3xl leading-none font-bold text-gray-900">
                        {getTotalPatients}
                      </span>
                      <h3 className="text-base font-normal text-gray-500">
                        Total Patients
                      </h3>
                    </div>
                  </div>
                </div>
                <div className="bg-white shadow rounded-lg p-4 sm:p-6 xl:p-8 ">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <span className="text-2xl sm:text-3xl leading-none font-bold text-gray-900">
                        {getTotalFranchise}
                      </span>
                      <h3 className="text-base font-normal text-gray-500">
                        Total Franchise
                      </h3>
                    </div>
                  </div>
                </div>
                <div className="bg-white shadow rounded-lg p-4 sm:p-6 xl:p-8 ">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <span className="text-2xl sm:text-3xl leading-none font-bold text-gray-900">
                        {context?.[3]?.length}
                      </span>
                      <h3 className="text-base font-normal text-gray-500">
                        New Patients
                      </h3>
                    </div>
                  </div>
                </div>
              </div>

              <div className=" mt-4 w-full overflow-y-auto h-full grid grid-cols-1 xl:grid-cols-2 2xl:grid-cols-3 gap-3">
                <div className="font-medium text-xl">Todays Appointments: </div>
                <div className="bg-white h-[70vh] overflow-y-auto flex flex-col gap-1 rounded-lg xl:col-span-4 2xl:col-span-4">
                  {getAppointments.map((res) => (
                    <div
                      key={res.id}
                      className="flex items-center gap-3.5 border border-gray-200 h-20 shadow-inner rounded-md p-2"
                    >
                      <img
                        src={res.personal_detail?.gender === "male" ? male : female}
                        alt="img"
                        className="size-16 mr-2"
                      />

                      <div className=" w-[16rem]">
                        <div className="flex">
                          <div className=" text-right break-words font-medium">
                            Case Number:
                          </div>
                          <div className=" pl-2">{res.case_number}</div>
                        </div>
                        <div className="flex">
                          <div className=" text-right break-words font-medium">
                            Patient Name:
                          </div>
                          <div className="pl-2">
                            {res.first_name?.[0]?.toUpperCase() +
                              res.first_name?.slice(1) +
                              " " +
                              res.last_name?.[0]?.toUpperCase() +
                              res.last_name?.slice(1)}
                          </div>
                        </div>
                      </div>

                      <div className=" w-[12rem]">
                        <div className="flex items-center">
                          <div className=" text-right break-words font-medium">
                            Age:
                          </div>
                          <div className=" pl-2">
                            {res.personal_detail?.age}
                          </div>
                        </div>
                        <div className="flex items-center">
                          <div className=" text-right break-words font-medium">
                            Weight:
                          </div>
                          <div className="pl-2">
                            {res.user?.personal_detail?.weight} kg
                          </div>
                        </div>
                      </div>

                      <div className=" w-[15rem]">
                        <div className="flex items-center">
                          <div className=" text-right break-words font-medium">
                            Phone Number:
                          </div>
                          <div className=" pl-2">
                            {res.user?.personal_detail?.age}
                          </div>
                        </div>
                        <div className="flex items-center">
                          <div className=" text-right break-words font-medium">
                            Patient Type:
                          </div>
                          <div className="pl-2">
                            {res.user?.personal_detail?.weight} kg
                          </div>
                        </div>
                      </div>

                      <div className=" w-[14rem]">
                        <div className="flex items-center">
                          <div className=" text-right break-words font-medium">
                            Time:
                          </div>
                          <div className="pl-2"> {res.machine_detail?.name ? res.time : formatTime(res.time) }</div>
                        </div>
                        {res.machine_detail?.name && (
                          <div className="flex items-center">
                            <div className=" text-right break-words font-medium">
                              Machine Name:
                            </div>
                            <div className=" pl-2">
                              {res.machine_detail?.name}
                            </div>
                          </div>
                        )}
                      </div>

                      <button
                        onClick={() => handleDiagnosis(res.id)}
                        className="font-semibold text-green-600 border border-gray-300 p-1 rounded-md hover:bg-green-600 hover:text-white"
                      >
                        Diagnosis
                      </button>
                    </div>
                  ))}
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
