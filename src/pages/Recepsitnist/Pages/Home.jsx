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
    <div className="w-full ">
      <div className="rounded-lg bg-card h-[93vh] bg-white">
        <div className="flex flex-col px-2 py-1 h-full space-y-2.5 ">
          <div className="flex flex-col gap-2 p-2 w-full">
            <div className="flex items-center justify-between flex-wrap">
              {isToday && (
                <label className="flex text-xl font-bold p-1 tracking-wide">
                  Today's Appointments
                </label>
              )}
              <div className="flex justify-end text-right w-full sm:w-auto">
                <div className="text-lg font-semibold">
                  Date: {formatDate(consultingTime)}
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center gap-2">
              <select
                onChange={handleDoctorList}
                defaultValue=""
                value={doctorList}
                className="p-2 rounded-md border border-black w-full sm:w-[40vh]"
              >
                <option value="" selected>
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
                placeholder="Select date"
                className="py-1 px-2 rounded-md border border-black w-full sm:w-[40vh]"
                onChange={handleConsulting}
              />

              <button
                onClick={consultingOpen ? handleOpen : handleClose}
                className="min-w-fit border cursor-pointer bg-[#1F2937] text-white p-2 rounded-md"
              >
                {consultingOpen
                  ? "Machine Consulting Appointment"
                  : "Consulting Appointment"}
              </button>
            </div>
          </div>

          <div className="flex w-full h-full items-center justify-center gap-1">
            {/* consulting time table */}
            {consultingOpen && (
              <div className="flex w-full flex-col items-center h-full">
                <div className="text-lg font-semibold tracking-wide">
                  Consulting Time Slot
                </div>
                <div className="animate-fade-left animate-delay-75 w-full bg-white shadow-gray-400 shadow-inner border rounded-md border-gray-400 animate-once animate-ease-out overflow-auto h-[90%]">
                  <table className="w-full min-w-[460px] z-0">
                    <thead className="uppercase">
                      <tr className="bg-[#1F2937] text-white rounded-md">
                        <th className="text-sm uppercase tracking-wide font-medium py-3 px-4 text-left">
                          Type
                        </th>
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
                      {consultingTimes.length > 0 ? (
                        consultingTimes.map((data, index) => {
                          return (
                            <tr key={index} className="map">
                              <td className="py-3 px-4 border-b border-b-gray-50">
                                <span className="text-black text-base font-medium ml-1">
                                  {data.user?.follow_up
                                    ? "Follow Up"
                                    : "New Case"}
                                </span>
                              </td>
                              <td className="py-3 px-4 border-b border-b-gray-50">
                                <span className="text-black text-base font-medium ml-1">
                                  {data.doctor?.first_name}{" "}
                                  {data.doctor?.last_name}
                                </span>
                              </td>
                              <td className="py-3 px-4 border-b border-b-gray-50">
                                <span className="text-black text-base font-medium ml-1">
                                  {data.user?.first_name} {data.user?.last_name}
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
              <div className="flex w-full flex-col items-center  h-full">
                <div className="text-lg font-semibold tracking-wide">
                  Machine Time Slot
                </div>
                <div className="animate-fade-left animate-delay-75 bg-white w-full shadow-gray-400 shadow-inner border rounded-md border-gray-400 animate-once animate-ease-out overflow-auto h-[90%]">
                  <table className="w-full min-w-[460px] z-0">
                    <thead className="uppercase">
                      <tr className="bg-[#1F2937] text-white rounded-md">
                        <th className="text-sm uppercase tracking-wide font-medium py-3 px-4 text-left">
                          Type
                        </th>
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
                      {machineConsultingTimes.length > 0 ? (
                        machineConsultingTimes.map((data, index) => {
                          return (
                            <tr key={index} className="map">
                              <td className="py-3 px-4 border-b border-b-gray-50">
                                <span className="text-black text-base font-medium ml-1">
                                  {data.user?.follow_up
                                    ? "Follow Up"
                                    : "New Case"}
                                </span>
                              </td>
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
        </div>
      </div>
    </div>
  );
}
