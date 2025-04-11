import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import InsideLoader from "../../InsideLoader";
import { HiClipboardDocumentList } from "react-icons/hi2";
import { IoIosRemoveCircleOutline } from "react-icons/io";
import { FaCirclePlus } from "react-icons/fa6";
import { CiCalendar } from "react-icons/ci";
import DatePicker from "react-datepicker";
import { RiBillLine } from "react-icons/ri";
import Tooltip from "@mui/material/Tooltip";

export default function Home() {
  const navigate = useNavigate();
  const [filteredDoctors, setFilteredDoctors] = useState([]);
  const [doctorList, setDoctorList] = useState("");
  const [consultingTime, setConsultingTime] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [consultingTimes, setConsultingTimes] = useState([]);
  const [machineConsultingTimes, setMachineConsultingTimes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [machineOpen, setMachineOpen] = useState(false);
  const [isToday, setIsToday] = useState(true);
  const [visitorData, setVisitorData] = useState([]);

  const handleConsulting = (e) => {
    const selectedDate = e.toISOString().split("T")[0];
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
        // console.log(res);
        // console.log(res.data?.cosulting_times, "Consulting Time");
        // console.log(res.data.machine_details, "Machine Time");
        setConsultingTimes(res.data?.cosulting_times);
        setMachineConsultingTimes(res.data?.machine_details);
        setLoading(false);
      })
      .catch((err) => {
        // console.log(err);
        setLoading(false);
        // alert(err.response?.data?.message + "!");
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

  const allAppointments = () => {
    axios
      .get(`/api/v1/appointments/show_all_appointments?date=${consultingTime}`)
      .then((res) => {
        // console.log(res, "All Appointments");
        setVisitorData(res.data.visitor_list);
        setConsultingTimes(res.data?.cosulting_times);
      })
      .catch((err) => {
        // console.log(err);
      });
  };

  useEffect(() => {
    axios
      .get("api/v1/users")
      .then((res) => {
        // console.log("all the users: ", res);
        setFilteredDoctors(res.data.users);
      })
      .catch((err) => {
        // console.log(err);
        // alert(err.response?.data?.message + "!");
      });
  }, []);

  const handleBill = (id) => {
    navigate(`/receptionist/generatebill`, {
      state: {
        user_id: id,
      },
    });
  };
  useEffect(() => {
    allAppointments();
  }, [consultingTime]);

  const transformDataForDoctors = (data) => {
    const transformed = {};

    data.forEach((item) => {
      const doctor =
        item?.doctor?.first_name && item?.doctor?.last_name
          ? `${item.doctor.first_name} ${item.doctor.last_name}`
          : "Unknown Doctor";

      const time = item.time ? item.time : "Unknown Time";

      let patient = "Unknown Patient";

      // If it's a regular appointment
      if (item?.user) {
        const firstName = item?.user?.first_name || "Unknown";
        const lastName = item?.user?.last_name || "";
        const phone = item?.user?.phone_number || "No Phone";
        patient = `${firstName} ${lastName} (${phone})`;
      }

      // If it's from visitor data
      if (item?.name && item?.phone) {
        patient = `${item.name} (${item.phone})`;
      }

      if (!transformed[doctor]) {
        transformed[doctor] = {};
      }

      if (!transformed[doctor][time]) {
        transformed[doctor][time] = [];
      }

      transformed[doctor][time].push(patient);
    });

    return transformed;
  };

  const handleDelete = (patient, time, doctor) => {
    const visitorRecord = visitorData.find(
      (v) => `${v.name} (${v.phone})` === patient
    );

    let apiUrl = "";
    let appointmentId = null;

    if (visitorRecord) {
      appointmentId = visitorRecord.id;
      apiUrl = `/api/v1/visitorappointments/${appointmentId}`;
    } else {
      const appointmentRecord = consultingTimes.find(
        (a) =>
          a.time === time &&
          `${a.user.first_name} ${a.user.last_name} (${a.user.phone_number})` ===
            patient
      );

      if (appointmentRecord) {
        appointmentId = appointmentRecord.id;
        apiUrl = `/api/v1/appointments/${appointmentId}`;
      }
    }

    if (!appointmentId) {
      // alert("Appointment not found.");
      return;
    }

    axios
      .delete(apiUrl)
      .then((res) => {
        // alert("Appointment deleted successfully!");
        allAppointments();
      })
      .catch((err) => {
        // console.log(err);
        // alert("Error deleting appointment.");
      });
  };

  const combinedData = [...consultingTimes, ...visitorData];
  // console.log(combinedData, "DAta");
  const transformedDoctorData = transformDataForDoctors(combinedData);

  const handleRedirect = () => {
    navigate(`/receptionist/appointment/create-appointment`);
  };

  useEffect(() => {
    handleAppointment();
  }, [consultingTime, doctorList]);

  if (loading) {
    return <InsideLoader />;
  }

  return (
    <div className="flex flex-col w-full bg-white h-full">
      <div className="flex justify-between  rounded-t-lg w-full">
        <div className="flex gap-1">
          <div className="mt-2">
            <HiClipboardDocumentList size={35} className="text-green-600" />{" "}
          </div>
          <div className="flex  flex-col">
            <label className="flex justify-start text-xl font-bold ">
              Consulting Appointment
            </label>
            <span className="text-md text-gray-600 ">
              View all scheduled appointments
            </span>
          </div>
        </div>
        <div className=" flex justify-end gap-2">
          {/* <div className="flex flex-col gap-2">
            <div className="">
              <input
                type="date"
                placeholder="Select date"
                className="py-1 px-2 rounded-md border border-black w-full "
                onChange={handleConsulting}
              />
            </div>
            <label className="flex  justify-start text-md font-semibold tracking-wide">
              {formatDate(consultingTime)}
            </label>
          </div> */}
          <div className="relative flex items-center w-[20vh] h-10">
            <CiCalendar className="absolute left-3 text-black z-10" />
            <DatePicker
              selected={new Date(consultingTime)}
              onChange={(date) => handleConsulting(date)}
              dateFormat="dd-MM-yyyy"
              placeholderText="Select date"
              className="w-full  text-sm p-2.5 pl-10 pr-3 border rounded-md focus:outline-none bg-white"
            />
          </div>

          <div className="flex flex-col">
            <div className="flex gap-1">
              <button
                className="bg-green-600 text-white p-2 rounded-lg flex items-center gap-2 hover:bg-green-700"
                onClick={() =>
                  navigate(`/receptionist/appointment/create-appointment`)
                }
              >
                <FaCirclePlus /> Create Appointment
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  w-full">
            {Object.keys(transformedDoctorData).map((doctor, doctorIndex) => (
              <div
                key={doctorIndex}
                className="p-2  rounded-lg  border-gray-200"
              >
                <h3
                  className={`text-md text-center font-semibold border-b pb-2  bg-green-500 p-2 rounded-md`}
                >
                  {doctor}
                </h3>

                <div className="overflow-x-auto">
                  <table className="w-full mt-2 rounded-lg">
                    <thead className="bg-[#F8FAFC] text-sm ">
                      <tr>
                        <th className="px-4 py-2 border-b text-left ">Time</th>
                        <th className="px-4 py-2 border-b text-left">
                          Patient
                        </th>
                        <th className="px-4 py-2 border-b text-left">Phone</th>
                        <th className="px-4 py-2 border-b text-left "></th>
                      </tr>
                    </thead>
                    <tbody>
                      {Object.keys(transformedDoctorData[doctor])
                        .sort(
                          (a, b) =>
                            new Date(`1970-01-01T${a}`) -
                            new Date(`1970-01-01T${b}`)
                        ) // Sorting time in ascending order
                        .map((time, timeIndex) =>
                          transformedDoctorData[doctor][time]
                            .sort((p1, p2) => {
                              const nameA = p1.toLowerCase();
                              const nameB = p2.toLowerCase();
                              return nameA.localeCompare(nameB); // Sorting by name within each time slot
                            })
                            .map((patient, patientIndex) => {
                              const visitorRecord = visitorData.find(
                                (v) => `${v.name} (${v.phone})` === patient
                              );

                              // Extract name and phone separately
                              const [name, phone] = patient.split(" (");
                              const formattedPhone = phone
                                ? phone.replace(")", "")
                                : "";

                              return (
                                <tr
                                  key={`${timeIndex}-${patientIndex}`}
                                  className={`border-b transition duration-200 ${
                                    visitorRecord ? "bg-[#F1F1E8]" : ""
                                  }`}
                                >
                                  <td className="px-2 py-2 text-sm text-gray-800">
                                    {time}
                                  </td>
                                  <td className="px-2 py-2 text-sm text-gray-700">
                                    {name}
                                  </td>
                                  <td className="px-2 py-2 text-sm text-gray-700">
                                    {formattedPhone}
                                  </td>
                                  <td>
                                    <button
                                      tooltip="Cancel Appointment"
                                      className="inline-flex items-center px-2 py-1 border border-transparent text-sm font-medium rounded-md text-white bg-red-700 hover:bg-red-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                      onClick={() =>
                                        handleDelete(patient, time, doctor)
                                      }
                                    >
                                      <IoIosRemoveCircleOutline />
                                    </button>
                                  </td>
                                </tr>
                              );
                            })
                        )}
                    </tbody>
                  </table>
                </div>
              </div>
            ))}
          </div> */}
      <div className="animate-fade-left animate-delay-75  border rounded-md border-gray-100 animate-once animate-ease-out h-[30rem] overflow-y-auto mt-4">
        <table className="w-full  rounded-md border-gray-300 text-sm text-left">
          <thead className="sticky top-0 z-10 text-[#71717A] font-medium border-b-2 bg-white">
            <tr>
              <th className="border-b-2 p-3">Patient Name</th>
              <th className="border-b-2 p-3">Phone</th>
              <th className="border-b-2 p-3">Time</th>
              <th className="border-b-2 p-3">Doctor</th>
              <th className="border-b-2 p-3 ">Type</th>
              <th className="border-b-2 p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {combinedData.length > 0 ? (
              combinedData.map((appointment, index) => (
                <tr key={index} className="map hover:bg-gray-200">
                  <td className="border-b-1 p-3">
                    {appointment.name
                      ? appointment.name
                      : `${appointment.user?.first_name || "Unknown"} ${
                          appointment.user?.last_name || ""
                        }`}
                  </td>

                  <td className="border-b-1 p-3">
                    {appointment.phone
                      ? appointment.phone
                      : `${appointment.user?.phone_number || "-"} `}
                  </td>
                  <td className="border-b-1 p-3">{appointment.time}</td>
                  <td className="border-b-1 p-3">
                    {appointment.doctor?.first_name}{" "}
                    {appointment.doctor?.last_name}
                  </td>
                  {/* <td className=" px-4 py-2">
                    {appointment.user?.follow_up ? (
                      <div className="bg-[#EFF6FF]  text-[#2563EB] border-b flex justify-center w-40 text-sm  h-full rounded-md p-2">
                        Register Patient
                      </div>
                    ) : (
                      <div className="bg-[#FAF5FF]  text-[#7E22CE] border-b flex justify-center w-40 text-sm  h-full rounded-md p-2">
                        Visitor
                      </div>
                    )}
                  </td> */}
                  <td className="px-4 py-2">
                    {appointment.user && "follow_up" in appointment.user ? (
                      <div className="bg-[#EFF6FF] text-[#2563EB] border-b flex justify-center w-40 text-sm h-full rounded-md p-2">
                        Register Patient
                      </div>
                    ) : (
                      <div className="bg-[#FAF5FF] text-[#7E22CE] border-b flex justify-center w-40 text-sm h-full rounded-md p-2">
                        Visitor
                      </div>
                    )}
                  </td>

                  {/* <td className="border-b-1 p-3">
                
                    {appointment.status === "completed" && (
                      <button
                        onClick={() => handleBill(appointment.user?.id)}
                        className="relative inline-block text-[#DD2590] bg-[#F79FC6] text-sm ml-1 p-1 font-medium after:absolute after:left-0 after:bottom-0 after:h-[1px] after:w-0 after:bg-[#DD2590] after:transition-all after:duration-300 hover:after:w-full"
                      >
                        <RiBillLine size={20} />
                      </button>
                    )}
                    <button
                      className="text-red-600 hover:text-red-800"
                      onClick={() =>
                        handleDelete(
                          appointment.name
                            ? `${appointment.name} (${appointment.phone})`
                            : `${appointment.user?.first_name || "Unknown"} ${
                                appointment.user?.last_name || ""
                              } (${appointment.user?.phone_number || "-"})`,
                          appointment.time,
                          `${appointment.doctor?.first_name || "Unknown"} ${
                            appointment.doctor?.last_name || ""
                          }`
                        )
                      }
                    >
                      <IoIosRemoveCircleOutline size={20} />
                    </button>
                  </td> */}
                  <td className="border-b-1 p-3 flex gap-2">
                    <Tooltip title="Generate Bill">
                      {appointment.status === "completed" && (
                        <button
                          onClick={() =>
                            handleBill(appointment.user?.case_number)
                          }
                          className="relative inline-flex items-center justify-center text-[#06AED4]  bg-[#9FD7EA] text-sm p-1.5 rounded-full group transition-all duration-300 hover:shadow-md"
                        >
                          <RiBillLine
                            size={17}
                            className="transition-transform duration-500 group-hover:rotate-12"
                          />
                        </button>
                      )}
                    </Tooltip>
                    <Tooltip title="Cancel Appointment">
                      <button
                        className="relative  inline-flex  p-1.5 rounded-full bg-red-100 text-red-600 group transition-all duration-300 hover:shadow-md"
                        onClick={() =>
                          handleDelete(
                            appointment.name
                              ? `${appointment.name} (${appointment.phone})`
                              : `${appointment.user?.first_name || "Unknown"} ${
                                  appointment.user?.last_name || ""
                                } (${appointment.user?.phone_number || "-"})`,
                            appointment.time,
                            `${appointment.doctor?.first_name || "Unknown"} ${
                              appointment.doctor?.last_name || ""
                            }`
                          )
                        }
                      >
                        <span className="transition-transform duration-500 group-hover:rotate-12">
                          <IoIosRemoveCircleOutline size={17} />
                        </span>
                      </button>
                    </Tooltip>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="text-center py-4 text-gray-600">
                  No appointments found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
