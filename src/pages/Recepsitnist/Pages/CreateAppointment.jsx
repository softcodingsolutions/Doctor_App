import { useState, useEffect } from "react";
import Oldcase from "./Oldcase";
import Newcase from "./Newcase";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import InsideLoader from "../../InsideLoader";
import { time } from "framer-motion";

export default function CreateAppointment() {
  const navigate = useNavigate();
  const [selectedOption, setSelectedOption] = useState("first-time");
  const [doctorList, setDoctorList] = useState("");
  const [doctorName, setDoctorName] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [email, setEmail] = useState("");
  const [userId, setUserId] = useState("");
  const [times, setTime] = useState([]);
  const [machineList, setMachineList] = useState([]);
  const [machineConsultingTime, setMachineConsultingTime] = useState([]);
  const [loading, setLoading] = useState(false);
  const [newCase, setNewCase] = useState(false);
  const [oldCase, setOldCase] = useState(false);
  const [getParticularCustomer, setGetParticularCustomer] = useState([]);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("Create Consulting Appointment");
  const [bookedAppointments, setBookedAppointments] = useState([]);
  const [visitorData, setVisitorData] = useState({
    name: "",
    phone: "",
    date: "",
    time: "",
    doctor_id: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setVisitorData((prev) => {
      const updatedData = { ...prev, [name]: value };

      if (name === "doctor_id" || name === "date") {
        fetchAppointmentsAndSelectSlot();
      }

      return updatedData;
    });
  };

  const handleSearchTerm = (value) => {
    setNewCase(false);
    setDoctorName("");
    setOldCase(false);
    setSearchTerm(value);
    setError("");

    if (value) {
      setLoading(true);
      axios
        .get(`/api/v2/users/search?search_query=${value}`)
        .then((res) => {
          setLoading(false);
          setGetParticularCustomer(res.data.user);
          setMessage("");
          setError("");
        })
        .catch((err) => {
          setLoading(false);
          setError("Error fetching users.");
        });
    } else {
      setGetParticularCustomer([]);
      setNewCase(false);
      setOldCase(false);
      setName("");
      setLastName("");
      setMobileNumber("");
      setEmail("");
      setUserId("");
      setDoctorName("");
      setDoctorList("");
      setMachineList([]);
      setMachineConsultingTime([]);
    }
  };

  const handleUserSelect = (user) => {
    setSearchTerm("");
    if (user.follow_up === true) {
      setOldCase(true);
      setNewCase(false);
    } else {
      setOldCase(false);
      setNewCase(true);
    }
    setName(user?.first_name);
    setLastName(user?.last_name);
    setMobileNumber(user?.phone_number);
    setEmail(user?.email);
    setUserId(user?.personal_detail?.user_id);
    if (user?.creator === "franchise") {
      setDoctorName(user?.doctor?.doctor);
      setDoctorList(user?.doctor?.doctor?.id);
    } else {
      setDoctorName(user?.doctor);
      setDoctorList(user?.doctor?.id);
    }
    setGetParticularCustomer([]);
  };

  const handleVisitorSubmit = (event) => {
    event.preventDefault();
    const time = formatTime(visitorData.time);
    const formdata = new FormData();
    formdata.append("appointment[name]", visitorData.name);
    formdata.append("appointment[phone]", visitorData.phone);
    formdata.append("appointment[doctor_id]", visitorData.doctor_id);
    formdata.append("appointment[date]", visitorData.date);
    formdata.append("appointment[time]", time);
    axios
      .post(`/api/v1/visitorappointments`, formdata)
      .then((res) => {
        console.log(res, "CD");
        navigate(`/receptionist/appointment/home`);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    const timerId = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 500);
    return () => clearTimeout(timerId);
  }, [searchTerm]);

  const doctorNameList = () => {
    axios
      .get(`api/v1/users`)
      .then((res) => {
        console.log(res.data?.users);
        setDoctorList(res.data?.users);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleTime = (doctorId) => {
    if (doctorId) {
      axios
        .get(`/api/v1/consulting_times/user/${doctorId}`)
        .then((res) => {
          console.log(res.data.consulting_times, "ConsultingTime");
          setTime(res.data.consulting_times);
        })
        .catch((err) => {
          console.error(err);
          alert(err.response?.data?.message + "!");
        });
    }
  };

  function formatTime(time) {
    try {
      const date = new Date(time);

      // Define formatting options
      const options = {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
        timeZone: "Asia/Kolkata", // Use the time zone from the original input (Asia/Kolkata for +05:30)
      };

      // Format the date to UTC, or you can change the time zone as needed
      const formattedTime = new Intl.DateTimeFormat("en-US", options).format(
        date
      );

      return formattedTime;
    } catch (error) {
      console.error("Error formatting time:", error);
      return "Invalid time";
    }
  }

  const fetchAppointmentsAndSelectSlot = async () => {
    if (!visitorData.date || !visitorData.doctor_id) return;

    try {
      const response = await axios.get(
        `/api/v1/appointments/show_all_appointments?date=${visitorData.date}&doctor_id=${visitorData.doctor_id}`
      );
      console.log(response, "Appointmnets");
      const bookedTimes = response.data.visitor_list.map(
        (appointment) => appointment.time
      );

      setBookedAppointments(bookedTimes);

      console.log(bookedTimes, "Booked Slots");
    } catch (err) {
      console.error("Error fetching booked appointments:", err);
    }
  };

  function formatTimeSlot(isoTime) {
    const date = new Date(isoTime);
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  }

  useEffect(() => {
    if (visitorData.doctor_id && visitorData.date) {
      fetchAppointmentsAndSelectSlot();
    }
  }, [visitorData.doctor_id, visitorData.date]);

  useEffect(() => {
    doctorNameList();
  }, []);

  useEffect(() => {
    doctorNameList();
  }, []);

  useEffect(() => {
    if (doctorList.length > 0) {
      const firstDoctor = doctorList.find((doctor) => doctor.role === "doctor");
      if (firstDoctor) {
        setVisitorData((prev) => ({
          ...prev,
          doctor_id: firstDoctor.id,
        }));
        handleTime(firstDoctor.id); // Load times for default doctor
      }
    }
  }, [doctorList]);

  useEffect(() => {
    handleTime();
  }, [visitorData.doctor_id]);

  return (
    <div className="w-full ">
      <div className="rounded-lg bg-card h-[95vh] bg-white overflow-scroll">
        <div className="flex flex-col p-3 h-full space-y-4">
          <div className="flex flex-col p-2">
            <div className="text-lg font-semibold justify-center flex">
              Create Consulting Appointment
            </div>
            <h2 className="text-lg font-bold mt-2 mb-2 text-gray-800 relative flex items-center gap-2">
              <span className="">Select Patient Type</span>
              <span className="text-[#1F2937]">👨‍⚕️</span>
            </h2>

            <div className="flex gap-2">
              <button
                className={`px-4 py-2 text-sm font-medium rounded-lg transition-all duration-300 ease-in-out transform ${
                  selectedOption === "first-time"
                    ? "bg-[#1F2937] text-white scale-105 shadow-lg"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
                onClick={() => setSelectedOption("first-time")}
              >
                First-Time Visitor
              </button>
              <button
                className={`px-4 py-2 text-sm font-medium rounded-lg transition-all duration-300 ease-in-out transform ${
                  selectedOption === "old-case"
                    ? "bg-[#1F2937] text-white scale-105 shadow-lg"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
                onClick={() => setSelectedOption("old-case")}
              >
                Old Case
              </button>
            </div>
          </div>
          <hr className="border-2-black" />
          {selectedOption === "first-time" && (
            <div className="px-5 ">
              <form onSubmit={handleVisitorSubmit} className="space-y-5">
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-gray-700 text-sm font-semibold mb-2">
                      Full Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={visitorData.name}
                      onChange={handleChange}
                      placeholder="Full Name"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-gray-700 text-sm font-semibold mb-2">
                      Phone Number (WhatsApp)
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={visitorData.phone}
                      onChange={handleChange}
                      placeholder="+91 000 000 0000"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-gray-700 text-sm font-semibold mb-2">
                      Select Doctor:
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {Object.values(doctorList)
                        .filter((doctor) => doctor.role === "doctor")
                        .map((doctor, index) => (
                          <div
                            key={doctor.id}
                            className="flex items-center space-x-2 cursor-pointer hover:text-blue-600 transition"
                          >
                            <input
                              type="radio"
                              name="doctor_id"
                              value={doctor.id}
                              checked={
                                String(visitorData.doctor_id) ===
                                  String(doctor.id) ||
                                (index === 0 && !visitorData.doctor_id)
                              }
                              onChange={(e) => {
                                handleChange(e);
                                handleTime(e.target.value);
                              }}
                              className="text-blue-500 focus:ring-blue-500"
                            />
                            <span
                              className="text-gray-800 font-medium"
                              onChange={(e) => {
                                handleChange(e);
                                handleTime(e.target.value);
                              }}
                            >
                              {doctor.first_name} {doctor.last_name}
                            </span>
                          </div>
                        ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-gray-700 text-sm font-semibold mb-2">
                      Date
                    </label>
                    <input
                      type="date"
                      name="date"
                      value={visitorData.date}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-gray-700 text-sm font-semibold mb-3">
                    Select Time Slot
                  </label>

                  <div className="space-y-4">
                    {/* Morning Slot */}
                    <div>
                      <h3 className=" text-sm font-semibold text-blue-600 mb-1">
                        Morning
                      </h3>
                      <div className="grid grid-cols-10  gap-3">
                        {times
                          .filter((timeSlot) => timeSlot.slot === "morning")
                          .sort(
                            (a, b) =>
                              new Date(`1970-01-01T${a.time}`) -
                              new Date(`1970-01-01T${b.time}`)
                          ) // Sorting time slots in ascending order
                          .map((timeSlot) => {
                            const formattedSlotTime = formatTimeSlot(
                              timeSlot.time
                            );
                            const isBooked =
                              bookedAppointments.includes(formattedSlotTime);

                            return (
                              <label
                                key={timeSlot.id}
                                className={`flex items-center justify-center border rounded-lg py-2 px-4 text-sm font-medium cursor-pointer transition 
                                ${
                                  isBooked
                                    ? "bg-gray-400 text-gray-700 cursor-not-allowed" // Style booked slots differently
                                    : visitorData.time === timeSlot.time
                                    ? "bg-blue-500 text-white border-blue-600 shadow-md"
                                    : "bg-white text-gray-800 border-gray-300 hover:bg-blue-100 hover:border-blue-500"
                                }`} // Style the slot based on selection
                              >
                                <input
                                  type="radio"
                                  name="time"
                                  value={timeSlot.time}
                                  checked={visitorData.time === timeSlot.time}
                                  onChange={handleChange}
                                  className="hidden"
                                  disabled={isBooked}
                                />
                                {formatTime(timeSlot.time)}
                              </label>
                            );
                          })}
                      </div>
                    </div>

                    {/* Afternoon Slot */}
                    <div>
                      <h3 className=" text-sm font-semibold text-orange-600 mb-1">
                        Afternoon
                      </h3>
                      <div className="grid grid-cols-10  gap-3">
                        {times
                          .filter((timeSlot) => timeSlot.slot === "afternoon")
                          .sort(
                            (a, b) =>
                              new Date(`1970-01-01T${a.time}`) -
                              new Date(`1970-01-01T${b.time}`)
                          ) // Sorting time slots in ascending order
                          .map((timeSlot) => {
                            const formattedSlotTime = formatTimeSlot(
                              timeSlot.time
                            );
                            const isBooked =
                              bookedAppointments.includes(formattedSlotTime);

                            return (
                              <label
                                key={timeSlot.id}
                                className={`flex items-center justify-center border rounded-lg py-2 px-4 text-sm font-medium cursor-pointer transition 
                                ${
                                  isBooked
                                    ? "bg-gray-400 text-gray-700 cursor-not-allowed" // Style booked slots differently
                                    : visitorData.time === timeSlot.time
                                    ? "bg-orange-500 text-white border-orange-600 shadow-md"
                                    : "bg-white text-gray-800 border-gray-300 hover:bg-orange-100 hover:border-orange-500"
                                }`} // Style the slot based on selection
                              >
                                <input
                                  type="radio"
                                  name="time"
                                  value={timeSlot.time}
                                  checked={visitorData.time === timeSlot.time}
                                  onChange={handleChange}
                                  className="hidden"
                                  disabled={isBooked} // Disable the slot if it's booked
                                />
                                {formatTime(timeSlot.time)}
                              </label>
                            );
                          })}
                      </div>
                    </div>

                    {/* Evening Slot */}
                    <div>
                      <h3 className=" text-sm font-semibold text-purple-600 mb-1">
                        Evening
                      </h3>
                      <div className="grid grid-cols-10  gap-3">
                        {times
                          .filter((timeSlot) => timeSlot.slot === "evening")
                          .sort(
                            (a, b) =>
                              new Date(`1970-01-01T${a.time}`) -
                              new Date(`1970-01-01T${b.time}`)
                          ) // Sorting time slots in ascending order
                          .map((timeSlot) => {
                            const formattedSlotTime = formatTimeSlot(
                              timeSlot.time
                            );
                            const isBooked =
                              bookedAppointments.includes(formattedSlotTime);

                            return (
                              <label
                                key={timeSlot.id}
                                className={`flex items-center justify-center border rounded-lg py-2 px-4 text-sm font-medium cursor-pointer transition 
                              ${
                                isBooked
                                  ? "bg-gray-400 text-gray-700 cursor-not-allowed" // Style booked slots differently
                                  : visitorData.time === timeSlot.time
                                  ? "bg-purple-500 text-white border-purple-600 shadow-md"
                                  : "bg-white text-gray-800 border-gray-300 hover:bg-purple-100 hover:border-purple-500"
                              }`} // Style the slot based on selection
                              >
                                <input
                                  type="radio"
                                  name="time"
                                  value={timeSlot.time}
                                  checked={visitorData.time === timeSlot.time}
                                  onChange={handleChange}
                                  className="hidden"
                                  disabled={isBooked} // Disable the slot if it's booked
                                />
                                {formatTime(timeSlot.time)}
                              </label>
                            );
                          })}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-6">
                  <button
                    type="submit"
                    className="w-full bg-green-600 text-white py-2 px-2 rounded-lg font-semibold shadow-md hover:bg-green-700 transition"
                  >
                    Book Appointment
                  </button>
                </div>
              </form>
            </div>
          )}

          {selectedOption === "old-case" && (
            <>
              <div className="flex gap-1 ">
                <label className="font-medium text-md">Search:</label>
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => handleSearchTerm(e.target.value)}
                  placeholder="Search User by First Name, Last Name, or Phone Number"
                  className="py-1 px-2 rounded-md border border-black w-full"
                />
              </div>
              {loading && <InsideLoader />}
              {error && <div className="text-red-500">{error}</div>}
              {getParticularCustomer?.length > 0 && (
                <div className="space-y-1 ">
                  {getParticularCustomer.map((user) => (
                    <div
                      key={user.id}
                      className="p-3 text-lg rounded-md cursor-pointer hover:bg-gray-100 flex  items-center"
                      onClick={() => handleUserSelect(user)}
                    >
                      <div>
                        <div className="font-semibold">
                          {user.first_name} {user.last_name}
                        </div>
                        <div className="text-gray-500">
                          Phone: {user.phone_number}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
              {!loading && (
                <form className="w-full space-y-8 p-6 ">
                  <div className="flex flex-col sm:flex-row w-full gap-6">
                    {/* Patient & Case Section */}
                    <div className="w-full  p-2 rounded-lg ">
                      <div className="grid grid-cols-1 gap-4">
                        {/* Patient Details */}
                        {doctorList && userId && (
                          <>
                            <div className="space-y-2">
                              <div className="grid grid-cols-2">
                                <div className="flex flex-col sm:flex-row items-center gap-1">
                                  <label className="text-sm font-medium text-gray-700 sm:w-28">
                                    Patient Name:
                                  </label>
                                  <input
                                    type="text"
                                    className="px-4 py-2 bg-gray-100 border rounded-md w-full sm:w-2/3 text-gray-600"
                                    value={`${name} ${lastName}`}
                                    readOnly
                                  />
                                </div>

                                <div className="flex flex-col sm:flex-row items-center gap-1">
                                  <label className="text-sm font-medium text-gray-700 sm:w-28">
                                    Mobile Number:
                                  </label>
                                  <input
                                    type="text"
                                    className="px-4 py-2 bg-gray-100 border rounded-md w-full sm:w-2/3 text-gray-600"
                                    value={mobileNumber}
                                    readOnly
                                  />
                                </div>
                              </div>
                              <div className="grid grid-cols-2">
                                <div className="flex flex-col sm:flex-row items-center gap-1">
                                  <label className="text-sm font-medium text-gray-700  sm:w-28 ">
                                    Doctor Name:
                                  </label>
                                  {doctorName && (
                                    <div className="px-4 py-2 bg-gray-100 border rounded-md w-full sm:w-2/3 text-gray-600">
                                      {doctorName.first_name}{" "}
                                      {doctorName.last_name}
                                    </div>
                                  )}
                                </div>
                                <div className="flex flex-col sm:flex-row items-center gap-1">
                                  <label className="text-sm font-medium text-gray-700 sm:w-28">
                                    Email:
                                  </label>
                                  <input
                                    type="text"
                                    className="px-4 py-2 bg-gray-100 border rounded-md w-full sm:w-2/3 text-gray-600"
                                    value={email}
                                    readOnly
                                  />
                                </div>
                              </div>
                            </div>
                            <div>
                              {oldCase && userId && (
                                <Oldcase
                                  doctor={doctorList}
                                  user={userId}
                                  machine={machineList}
                                  machineTime={machineConsultingTime}
                                />
                              )}
                              {newCase && userId && (
                                <Newcase
                                  doctor={doctorList}
                                  name={name}
                                  user={userId}
                                />
                              )}
                            </div>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </form>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
