import { useEffect, useState } from "react";
import axios from "axios";

function AdminListFollowUp() {
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
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 6;

  const paginateCustomers = () => {
    if (openconsulting) {
      const indexOfLastRow = currentPage * rowsPerPage;
      const indexOfFirstRow = indexOfLastRow - rowsPerPage;
      return consultingData.slice(indexOfFirstRow, indexOfLastRow);
    } else {
      const indexOfLastRow = currentPage * rowsPerPage;
      const indexOfFirstRow = indexOfLastRow - rowsPerPage;
      return machineConsultingData.slice(indexOfFirstRow, indexOfLastRow);
    }
  };

  const totalPages = openconsulting
    ? Math.ceil(consultingData.length / rowsPerPage)
    : Math.ceil(machineConsultingData.length / rowsPerPage);

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
    console.log(user, "SELECTED USER");
    setData(user);
    setOpenConsulting(true);
    setGetParticularCustomer([]);
    setConsultingData(user?.consulting_appointments);
    setMachineConsultingData(user?.machine_appointments);
    setUserDetails(user?.user);
    setPackageDetail(user?.user?.user_packages[0]);
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

  return (
    <div className="flex w-full">
      <div className="w-full hidden sm:block sm:w-20 xl:w-60 flex-shrink-0">
        .
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
                    Machine Data
                  </button>
                ) : (
                  <button
                    type="button"
                    className="w-[10rem] text-white rounded-md bg-[#1F2937] border border-gray-500 font-medium text-lg hover:scale-105"
                    onClick={handleConsultingData}
                  >
                    Consulting Data
                  </button>
                )}
              </div>

              {getParticularCustomer?.length > 0 ? (
                <div className="space-y-1 ">
                  {getParticularCustomer.map((appointment) => (
                    <div
                      key={appointment.user.id}
                      className="border p-4 text-lg rounded-md cursor-pointer hover:bg-gray-100 flex justify-between items-center"
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
                      <div className="text-gray-600 text-sm">
                        {appointment.follow_up ? "Follow Up" : "New Case"}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex flex-col ">
                  {userDetails?.first_name && (
                    <div className="flex gap-48">
                      <div className="text-lg font-bold mb-4">
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
                      <div className="text-lg font-bold mb-4">
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
                    </div>
                  )}
                  {openconsulting && (
                    <div className="">
                      <div className="flex w-full flex-col items-center ">
                        <div className="text-2xl font-semibold tracking-wide">
                          Consulting Time Slot
                        </div>
                        <div className="animate-fade-left animate-delay-75 w-full bg-white shadow-gray-400 shadow-inner border rounded-md border-gray-400 animate-once animate-ease-out overflow-auto h-[50vh]">
                          <table className="w-full min-w-[460px] z-0">
                            <thead className="uppercase">
                              <tr className="bg-[#1F2937] text-white rounded-md">
                                <th className="text-sm uppercase tracking-wide font-medium py-3 px-4 text-left">
                                  Doctor Name
                                </th>
                                <th className="text-sm uppercase tracking-wide font-medium py-3 px-4 text-left">
                                  Date
                                </th>
                                <th className="text-sm uppercase tracking-wide font-medium py-3 px-4 text-left">
                                  Time
                                </th>
                              </tr>
                            </thead>
                            <tbody>
                              {paginateCustomers().length > 0 ? (
                                paginateCustomers().map((data, index) => {
                                  return (
                                    <tr key={index} className="">
                                      <td className="py-3 px-4 border-b border-b-gray-50">
                                        <span className="text-black text-base font-medium ml-1">
                                          {data?.doctor?.first_name}{" "}
                                          {data?.doctor?.last_name}
                                        </span>
                                      </td>

                                      <td className="py-3 px-4 border-b border-b-gray-50">
                                        <span className="text-black text-base font-medium ml-1">
                                          {formatDate(data.date)}
                                        </span>
                                      </td>
                                      <td className="py-3 px-4 border-b border-b-gray-50">
                                        <span className="text-black text-base font-medium ml-1">
                                          {formatTime(data.time)}
                                        </span>
                                      </td>
                                    </tr>
                                  );
                                })
                              ) : (
                                <tr>
                                  <td
                                    colSpan="4"
                                    className="py-3 px-4 text-center justify-center"
                                  >
                                    No Data
                                  </td>
                                </tr>
                              )}
                            </tbody>
                          </table>
                        </div>
                        {/* Pagination Controls */}
                        {totalPages !== 0 && (
                          <div className="flex flex-wrap justify-center items-center gap-2 py-2">
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
                  )}
                  {open && (
                    <div className="">
                      <div className="flex w-full flex-col items-center p-4 h-full">
                        <div className="text-2xl font-semibold tracking-wide">
                          Machine Time Slot
                        </div>
                        <div className="animate-fade-left animate-delay-75 bg-white w-full shadow-gray-400 shadow-inner border rounded-md border-gray-400 animate-once animate-ease-out overflow-auto h-[50vh]">
                          <table className="w-full min-w-[460px] z-0 ">
                            <thead className="uppercase">
                              <tr className="bg-[#1F2937] text-white rounded-md">
                                <th className="text-sm uppercase tracking-wide font-medium py-3 px-4 text-left">
                                  Doctor Name
                                </th>
                                <th className="text-sm uppercase tracking-wide font-medium py-3 px-4 text-left">
                                  Machine Name
                                </th>
                                <th className="text-sm uppercase tracking-wide font-medium py-3 px-4 text-left">
                                  Date
                                </th>
                                <th className="text-sm uppercase tracking-wide font-medium py-3 px-4 text-left">
                                  Time
                                </th>
                              </tr>
                            </thead>
                            <tbody>
                              {paginateCustomers().length > 0 ? (
                                paginateCustomers().map((data, index) => {
                                  return (
                                    <tr key={index} className="">
                                      <td className="py-3 px-4 border-b border-b-gray-50">
                                        <span className="text-black text-base font-medium ml-1">
                                          {data?.doctor?.first_name}{" "}
                                          {data?.doctor?.last_name}
                                        </span>
                                      </td>
                                      <td className="py-3 px-4 border-b border-b-gray-50">
                                        <span className="text-black text-base font-medium ml-1">
                                          {data?.machine_detail?.name}
                                        </span>
                                      </td>
                                      <td className="py-3 px-4 border-b border-b-gray-50">
                                        <span className="text-black text-base font-medium ml-1">
                                          {formatDate(data.date)}
                                        </span>
                                      </td>
                                      <td className="py-3 px-4 border-b border-b-gray-50">
                                        <span className="text-black text-base font-medium ml-1">
                                          {data?.time}
                                        </span>
                                      </td>
                                    </tr>
                                  );
                                })
                              ) : (
                                <tr>
                                  <td
                                    colSpan="5"
                                    className="py-3 px-4 text-center"
                                  >
                                    No Appointment is created for Machine
                                    Consulting Time
                                  </td>
                                </tr>
                              )}
                            </tbody>
                          </table>
                        </div>
                        {/* Pagination Controls */}
                        {totalPages !== 0 && (
                          <div className="flex flex-wrap justify-center items-center gap-2 py-2">
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
