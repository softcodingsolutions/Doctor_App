import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import InsideLoader from "../../InsideLoader";
import { HiClipboardDocumentList } from "react-icons/hi2";
import { IoIosRemoveCircleOutline } from "react-icons/io";
import { FaCirclePlus } from "react-icons/fa6";

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

  const allAppointments = () => {
    axios
      .get(`/api/v1/appointments/show_all_appointments?date=${consultingTime}`)
      .then((res) => {
        console.log(res, "All Appointments");
        setVisitorData(res.data.visitor_list);
        setConsultingTimes(res.data?.cosulting_times);
      })
      .catch((err) => {
        console.log(err);
      });
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
      alert("Appointment not found.");
      return;
    }

    axios
      .delete(apiUrl)
      .then((res) => {
        alert("Appointment deleted successfully!");
        allAppointments();
      })
      .catch((err) => {
        console.log(err);
        alert("Error deleting appointment.");
      });
  };

  const combinedData = [...consultingTimes, ...visitorData];
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
    <div className="w-full bg-white h-full">
      <div className="flex flex-col px-2 py-1 h-full">
        <div className="flex flex-col gap-2 p-2 w-full">
          <div className="flex w-full justify-center items-center mb-5">
            <div>
              <HiClipboardDocumentList size={40} />
            </div>
            <label className="flex justify-center text-lg font-bold  tracking-wide">
              Consulting Appointment Lists
            </label>
          </div>
          <div className="flex justify-between ">
            <div className="flex flex-col gap-2">
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
            </div>
            <div className="flex flex-col">
              <div className="flex gap-1">
                <button
                  className="bg-green-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-green-700"
                  onClick={() =>
                    navigate(`/receptionist/appointment/create-appointment`)
                  }
                >
                  <FaCirclePlus size={20} /> Create Appointment
                </button>
              </div>
              <div className="flex gap-1 mt-2">
                <div className="w-4 h-4 bg-[#F1F1E8] border mt-1 border-gray-800"></div>
                <div className="font-medium">- Visitor Patient</div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex w-full h-full mt-5">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  w-full">
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
                      {Object.keys(transformedDoctorData[doctor]).map(
                        (time, timeIndex) =>
                          transformedDoctorData[doctor][time].map(
                            (patient, patientIndex) => {
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
                                  className={`border-b  transition duration-200   ${
                                    visitorRecord ? "bg-[#F1F1E8]" : ""
                                  }`}
                                >
                                  <td className="px-2 py-2 text-sm text-gray-800 ">
                                    {time}
                                  </td>
                                  <td className="px-2 py-2 text-sm text-gray-700 ">
                                    {name}
                                  </td>
                                  <td className="px-2 py-2 text-sm text-gray-700 ">
                                    {formattedPhone}
                                  </td>
                                  <td>
                                    <button
                                      tooltip="Cancel Appointment"
                                      className="inline-flex items-center px-2 py-1 border border-transparent text-sm font-medium rounded-md text-white bg-red-700  hover:bg-red-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                      onClick={() =>
                                        handleDelete(patient, time, doctor)
                                      }
                                    >
                                      <IoIosRemoveCircleOutline />
                                    </button>
                                  </td>
                                </tr>
                              );
                            }
                          )
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
