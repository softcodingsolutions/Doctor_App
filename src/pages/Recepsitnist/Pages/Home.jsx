import { useState, useEffect } from "react";
import axios from "axios";
import InsideLoader from "../../InsideLoader";

export default function Home() {
  const [filteredDoctors, setFilteredDoctors] = useState([]);
  const [doctorList, setDoctorList] = useState("");
  const [consultingTime, setConsultingTime] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [consultingTimes, setConsultingTimes] = useState([]);
  const [machineConsultingTimes, setMachineConsultingTimes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [machineOpen, setMachineOpen] = useState(false);
  const [consultingOpen, setConsultingOpen] = useState(true);
  const [isToday, setIsToday] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 8;

  const handleDoctorList = (e) => {
    setDoctorList(e.target.value);
  };

  const handleConsulting = (e) => {
    const selectedDate = e.target.value;
    setConsultingTime(selectedDate);

    const today = new Date().toISOString().split("T")[0];

    if (selectedDate !== today) {
      setIsToday(false);
      setConsultingTimes([]);
      setMachineConsultingTimes([]);
      setLoading(false);
    } else {
      setIsToday(true);
      handleAppointment();
    }
  };

  const handleAppointment = () => {
    axios
      .get(`api/v1/appointments?date=${consultingTime}&doctor_id=${doctorList}`)
      .then((res) => {
        console.log(res);
        console.log(res.data?.cosulting_times, "Consulting Time");
        console.log(res.data.machine_details, "Machine Time");
        setConsultingTimes(res.data?.cosulting_times);
        setMachineConsultingTimes(res.data?.machine_details);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        alert(err.response?.data?.message + "!");
      });
  };

  const paginateCustomers = () => {
    if (consultingOpen) {
      const indexOfLastRow = currentPage * rowsPerPage;
      const indexOfFirstRow = indexOfLastRow - rowsPerPage;
      return consultingTimes.slice(indexOfFirstRow, indexOfLastRow);
    } else {
      const indexOfLastRow = currentPage * rowsPerPage;
      const indexOfFirstRow = indexOfLastRow - rowsPerPage;
      return machineConsultingTimes.slice(indexOfFirstRow, indexOfLastRow);
    }
  };

  const totalPages = consultingOpen
    ? Math.ceil(consultingTimes.length / rowsPerPage)
    : Math.ceil(machineConsultingTimes.length / rowsPerPage);

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

    // Return the formatted time in 12-hour format with AM/PM
    return `${hour}:${minute} ${period}`;
  }

  const formatDate = (date) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(date).toLocaleDateString(undefined, options);
  };

  const handleOpen = () => {
    setMachineOpen(true);
    setConsultingOpen(false);
  };

  const handleClose = () => {
    setMachineOpen(false);
    setConsultingOpen(true);
  };

  useEffect(() => {
    axios
      .get("api/v1/users")
      .then((res) => {
        console.log("all the users: ", res);
        setFilteredDoctors(res.data.users);
      })
      .catch((err) => {
        console.log(err);
        alert(err.response?.data?.message + "!");
      });
  }, []);

  useEffect(() => {
    handleAppointment();
  }, [consultingTime, doctorList]);

  if (loading) {
    return <InsideLoader />;
  }

  return (
    <div className="w-full p-5">
      <div className="rounded-lg bg-card h-[90vh] bg-white">
        <div className="flex flex-col px-4 py-3 h-full space-y-2.5 ">
          <div className="flex flex-col gap-2 p-2 w-full">
            <div className="flex items-center">
              <div className="flex w-full items-center justify-between">
                {isToday && (
                  <label className="flex text-xl font-bold p-1 tracking-wide">
                    Today's Appointments
                  </label>
                )}
              </div>
              <div className="flex justify-end text-right w-full">
                <div className="text-lg font-semibold">
                  Date : {formatDate(consultingTime)}
                </div>
              </div>
            </div>

            <div className="flex">
              <select
                onChange={handleDoctorList}
                defaultValue="select1"
                value={doctorList}
                className="p-2 rounded-md border border-black mr-5 w-[40vh]"
              >
                <option value="select1" selected>
                  Select Doctor
                </option>
                {filteredDoctors
                  .filter((doctor) => doctor.role === "doctor")
                  .map((name) => (
                    <option key={name.id} value={name.id}>
                      {name.first_name} {name.last_name}
                    </option>
                  ))}
              </select>
              <input
                type="date"
                placeholder="select date"
                className="py-1 px-2 rounded-md border mr-5 border-black w-[40vh]"
                onChange={handleConsulting}
              />
              {consultingOpen ? (
                <button
                  onClick={handleOpen}
                  className="min-w-fit border cursor-pointer bg-[#1F2937] text-white p-2 rounded-md"
                >
                  Machine Consulting Appointment
                </button>
              ) : (
                <button
                  onClick={handleClose}
                  className="min-w-fit border cursor-pointer bg-[#1F2937] text-white p-2 rounded-md"
                >
                  Consulting Appointment
                </button>
              )}
            </div>
          </div>

          <div className="w-full flex flex-col flex-wrap xl:flex-nowrap justify-center p-4 shadow-gray-400 shadow-inner border rounded-md border-gray-100 animate-once animate-ease-out overflow-auto h-[75vh]">
            <div className="flex w-full h-full items-center justify-center gap-1">
              {/* consulting time table */}
              {consultingOpen && (
                <div className="flex w-full flex-col items-center p-1 h-full">
                  <div className="text-2xl font-semibold tracking-wide">
                    Consulting Time Slot
                  </div>
                  <div className="animate-fade-left animate-delay-75 w-full bg-white shadow-gray-400 shadow-inner border rounded-md border-gray-400 animate-once animate-ease-out overflow-auto h-[93%]">
                    <table className="w-full min-w-[460px] z-0">
                      <thead className="uppercase">
                        <tr className="bg-[#1F2937] text-white rounded-md">
                          <th className="text-sm uppercase tracking-wide font-medium py-3 px-4 text-left">
                            Doctor Name
                          </th>
                          <th className="text-sm uppercase tracking-wide font-medium py-3 px-4 text-left">
                            Patient Name
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
                              <tr key={index} className="map">
                                <td className="py-3 px-4 border-b border-b-gray-50">
                                  <span className="text-black text-base font-medium ml-1">
                                    {data.doctor.first_name}{" "}
                                    {data.doctor.last_name}
                                  </span>
                                </td>
                                <td className="py-3 px-4 border-b border-b-gray-50">
                                  <span className="text-black text-base font-medium ml-1">
                                    {data.user.first_name} {data.user.last_name}
                                  </span>
                                </td>
                                <td className="py-3 px-4 border-b border-b-gray-50">
                                  <span className="text-black text-base font-medium ml-1">
                                    {formatDate(data.date)}
                                  </span>
                                </td>
                                <td className="py-3 px-4 border-b border-b-gray-50">
                                  <span className="text-black text-base font-medium ml-1">
                                    {data.time}
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
                              No Appointment is created for Consulting Time
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
              {/* machine time table */}
              {machineOpen && (
                <div className="flex w-full flex-col items-center p-1 h-full">
                  <div className="text-2xl font-semibold tracking-wide">
                    Machine Time Slot
                  </div>
                  <div className="animate-fade-left animate-delay-75 bg-white w-full shadow-gray-400 shadow-inner border rounded-md border-gray-400 animate-once animate-ease-out overflow-auto h-[93%]">
                    <table className="w-full min-w-[460px] z-0">
                      <thead className="uppercase">
                        <tr className="bg-[#1F2937] text-white rounded-md">
                          <th className="text-sm uppercase tracking-wide font-medium py-3 px-4 text-left">
                            Doctor Name
                          </th>
                          <th className="text-sm uppercase tracking-wide font-medium py-3 px-4 text-left">
                            Patient Name
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
                        {paginateCustomers()?.length > 0 ? (
                          paginateCustomers().map((data, index) => {
                            return (
                              <tr key={index} className="map">
                                <td className="py-3 px-4 border-b border-b-gray-50">
                                  <span className="text-black text-base font-medium ml-1">
                                    {data.doctor.first_name}{" "}
                                    {data.doctor.last_name}
                                  </span>
                                </td>
                                <td className="py-3 px-4 border-b border-b-gray-50">
                                  <span className="text-black text-base font-medium ml-1">
                                    {data.user.first_name} {data.user.last_name}
                                  </span>
                                </td>
                                <td className="py-3 px-4 border-b border-b-gray-50">
                                  <span className="text-black text-base font-medium ml-1">
                                    {data.machine_detail.name}
                                  </span>
                                </td>
                                <td className="py-3 px-4 border-b border-b-gray-50">
                                  <span className="text-black text-base font-medium ml-1">
                                    {formatDate(data.date)}
                                  </span>
                                </td>
                                <td className="py-3 px-4 border-b border-b-gray-50">
                                  <span className="text-black text-base font-medium ml-1">
                                    {convertToAmPm(data.time)}
                                  </span>
                                </td>
                              </tr>
                            );
                          })
                        ) : (
                          <tr>
                            <td colSpan="5" className="py-3 px-4 text-center">
                              No Appointment is created for Machine Consulting
                              Time
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
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
  );
}
