import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useOutletContext } from "react-router-dom";

function AdminListFollowUp() {
  const navigate = useNavigate();
  const context = useOutletContext();
  const [searchTerm, setSearchTerm] = useState("");
  const [open, setOpen] = useState(false);
  const [data, setData] = useState({});
  const [openconsulting, setOpenConsulting] = useState(false);
  const [consultingData, setConsultingData] = useState([]);
  const [machineConsultingData, setMachineConsultingData] = useState([]);
  const [userDetails, setUserDetails] = useState({});
  const [packageDetail, setPackageDetail] = useState({});
  const [getParticularCustomer, setGetParticularCustomer] = useState([]);
  const [message, setMessage] = useState("Search User's List Follow Up");

  function convertToAmPm(time24) {
    // Split the input time into hours and minutes (e.g., "14:35" -> ["14", "35"])
    let [hour, minute] = time24.split(":");
    hour = parseInt(hour); // Convert the hour to an integer

    let period = hour >= 12 ? "PM" : "AM"; // Determine AM or PM

    // Convert 24-hour format to 12-hour format
    hour = hour % 12 || 12; // If hour is 0, set to 12 (for midnight), else convert

    // Return the formatted time in 12-hour format with AM/PM
    return `${hour}:${minute} ${period}`;
  }

  const handleSearchTerm = (value) => {
    setSearchTerm(value);
    if (value) {
      axios
        .get(
          `/api/v1/appointments/fetch_users_appointments?search_query=${value}`
        )
        .then((res) => {
          console.log(res, "List Follow Up");
          setGetParticularCustomer(res.data.appointments);
          setOpen(false);
          setOpenConsulting(false);
          setMessage("");
          console.log(res.data.appointments.user);
        })
        .catch((err) => {
          console.log(err);
          alert("USER NOT FOUND");
        });
    } else {
      setGetParticularCustomer([]);
      setSearchTerm("");
    }
  };

  const handleUserSelect = (user) => {
    setSearchTerm("");
    console.log(user, "SELECTED USER");
    setData(user);
    setOpenConsulting(true);
    setGetParticularCustomer([]);
    setConsultingData(user?.consulting_appointments);
    setMachineConsultingData(user?.machine_appointments);
    setUserDetails(user?.user);
    setPackageDetail(user?.user?.user_packages);
  };

  const handleMachineData = () => {
    setOpen(true);
    setOpenConsulting(false);
  };

  const handleConsultingData = () => {
    setOpen(false);
    setOpenConsulting(true);
  };

  const formatDate = (date) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(date).toLocaleDateString(undefined, options);
  };

  function formatTime(dateTimeString) {
    const date = new Date(dateTimeString);
    return date.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  }

  const handleButtonClick = () => {
    if (userDetails.first_name) {
      handleMachineData();
    } else {
      setMessage("Please search the User");
    }
  };

  const handleInventory = (val, caseNumber) => {
    localStorage.setItem("userId", val);
    localStorage.setItem("caseNumber", caseNumber);
    navigate(`/admin/patients/customer-details/progress-questions`);
  };

  return (
    <div className="flex w-full">
      <div className="w-full hidden sm:block sm:w-20 xl:w-60 flex-shrink-0">
        .
      </div>
      <div className="w-fit p-1">
        <button
          onClick={context[0]}
          type="button"
          className="absolute end-5 top-8 sm:hidden hover:scale-110 w-fit"
        >
          <img
            src={`https://assets.codepen.io/3685267/res-react-dash-sidebar-open.svg`}
            alt=""
          />
        </button>
      </div>
      <div className="h-screen flex-grow overflow-auto flex flex-wrap content-start p-2">
        <div className="w-full p-2">
          <div className="rounded-lg bg-card h-[95vh] bg-white">
            <div className="flex p-4 h-full flex-col space-y-4">
              <div className="flex gap-5 p-2 w-full">
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => handleSearchTerm(e.target.value)}
                  placeholder="Search User through Case Number/Phone Number"
                  className="py-2 px-4 rounded-md border border-gray-800 w-full focus:outline-none focus:ring-1 focus:ring-black"
                />

                {open === false ? (
                  <button
                    type="button"
                    className="w-[10rem] text-white bg-[#1F2937] rounded-md border border-gray-500 font-medium text-lg hover:scale-105"
                    onClick={handleButtonClick}
                  >
                    Machine Details
                  </button>
                ) : (
                  <button
                    type="button"
                    className="w-[10rem] text-white rounded-md bg-[#1F2937] border border-gray-500 font-medium text-lg hover:scale-105"
                    onClick={handleConsultingData}
                  >
                    Consulting Details
                  </button>
                )}
              </div>

              {getParticularCustomer?.length > 0 ? (
                <div className="space-y-1">
                  {getParticularCustomer.map((appointment) => (
                    <div
                      key={appointment.user.id}
                      className="border p-4 text-lg rounded-md cursor-pointer hover:bg-gray-100 flex flex-col sm:flex-row justify-between items-start sm:items-center"
                      onClick={() => handleUserSelect(appointment)}
                    >
                      <div>
                        <div className="font-semibold">
                          {appointment.user.first_name}{" "}
                          {appointment.user.last_name}
                        </div>
                        <div className="text-gray-500">
                          Phone: {appointment.user.phone_number}
                        </div>
                      </div>
                      <div className="text-gray-600 text-sm mt-2 sm:mt-0">
                        {appointment.follow_up ? "Follow Up" : "New Case"}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex flex-col">
                  {userDetails?.first_name && (
                    <div className="flex flex-col gap-4 sm:flex-row sm:justify-between sm:items-center mb-4">
                      <div className="text-md font-bold">
                        <div>
                          Patient Name:{" "}
                          <span className="font-medium">
                            {userDetails?.first_name} {userDetails?.last_name}
                          </span>
                        </div>
                        <div>
                          Case Number:{" "}
                          <span className="font-medium">
                            {userDetails?.case_number}
                          </span>
                        </div>
                      </div>
                      <div className="text-md font-bold">
                        <div>
                          Package Name:{" "}
                          <span className="font-medium">
                            {packageDetail?.package_name ??
                              "No Package Assigned"}
                          </span>
                        </div>
                        <div>
                          Package Duration:{" "}
                          <span className="font-medium">
                            {packageDetail?.no_of_days} Days
                          </span>
                        </div>
                      </div>
                      <div className="mt-4 sm:mt-0">
                        <button
                          className="w-full sm:w-[9rem] p-2 text-white bg-green-600 rounded-md border border-gray-500 font-medium text-lg hover:scale-105"
                          onClick={() =>
                            handleInventory(
                              userDetails.id,
                              userDetails?.case_number
                            )
                          }
                        >
                          View Patient
                        </button>
                      </div>
                    </div>
                  )}
                  {openconsulting && (
                    <div className="w-full flex flex-col items-center">
                      <div className="text-lg font-semibold tracking-wide mb-4">
                        Consulting Details
                      </div>
                      <div className="w-full bg-white shadow-gray-400 shadow-inner border rounded-md border-gray-400 overflow-auto h-[50vh]">
                        <table className="w-full min-w-[460px]">
                          <thead className="bg-[#1F2937] text-white uppercase">
                            <tr>
                              <th className="text-sm font-medium py-3 px-4 text-left">
                                Doctor Name
                              </th>
                              <th className="text-sm font-medium py-3 px-4 text-left">
                                Date
                              </th>
                              <th className="text-sm font-medium py-3 px-4 text-left">
                                Time
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            {consultingData.length > 0 ? (
                              consultingData.map((data, index) => (
                                <tr key={index}>
                                  <td className="py-3 px-4 border-b border-b-gray-50">
                                    <span className="text-black text-base font-medium">
                                      {data?.doctor?.first_name}{" "}
                                      {data?.doctor?.last_name}
                                    </span>
                                  </td>
                                  <td className="py-3 px-4 border-b border-b-gray-50">
                                    <span className="text-black text-base font-medium">
                                      {formatDate(data.date)}
                                    </span>
                                  </td>
                                  <td className="py-3 px-4 border-b border-b-gray-50">
                                    <span className="text-black text-base font-medium">
                                      {data.time}
                                    </span>
                                  </td>
                                </tr>
                              ))
                            ) : (
                              <tr>
                                <td
                                  colSpan="3"
                                  className="py-3 px-4 text-center"
                                >
                                  No Data
                                </td>
                              </tr>
                            )}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  )}
                  {open && (
                    <div className="w-full flex flex-col items-center p-4 h-full">
                      <div className="text-lg font-semibold tracking-wide mb-4">
                        Machine Time Details
                      </div>
                      <div className="bg-white w-full shadow-gray-400 shadow-inner border rounded-md border-gray-400 overflow-auto h-[50vh]">
                        <table className="w-full min-w-[460px]">
                          <thead className="bg-[#1F2937] text-white uppercase">
                            <tr>
                              <th className="text-sm font-medium py-3 px-4 text-left">
                                Doctor Name
                              </th>
                              <th className="text-sm font-medium py-3 px-4 text-left">
                                Machine Name
                              </th>
                              <th className="text-sm font-medium py-3 px-4 text-left">
                                Date
                              </th>
                              <th className="text-sm font-medium py-3 px-4 text-left">
                                Time
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            {machineConsultingData.length > 0 ? (
                              machineConsultingData.map((data, index) => (
                                <tr key={index}>
                                  <td className="py-3 px-4 border-b border-b-gray-50">
                                    <span className="text-black text-base font-medium">
                                      {data?.doctor?.first_name}{" "}
                                      {data?.doctor?.last_name}
                                    </span>
                                  </td>
                                  <td className="py-3 px-4 border-b border-b-gray-50">
                                    <span className="text-black text-base font-medium">
                                      {data?.machine_detail?.name}
                                    </span>
                                  </td>
                                  <td className="py-3 px-4 border-b border-b-gray-50">
                                    <span className="text-black text-base font-medium">
                                      {formatDate(data.date)}
                                    </span>
                                  </td>
                                  <td className="py-3 px-4 border-b border-b-gray-50">
                                    <span className="text-black text-base font-medium">
                                      {convertToAmPm(data?.time)}
                                    </span>
                                  </td>
                                </tr>
                              ))
                            ) : (
                              <tr>
                                <td
                                  colSpan="4"
                                  className="py-3 px-4 text-center"
                                >
                                  No Appointments Created
                                </td>
                              </tr>
                            )}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {message && (
                <div className="flex justify-center">
                  <label className="text-xl bg-white rounded-md p-2 font-semibold text-center">
                    {message}
                  </label>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminListFollowUp;
