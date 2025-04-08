import { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { Dialog } from "@headlessui/react";
import DatePicker from "react-datepicker";
import { useNavigate } from "react-router-dom";
import {
  Calendar,
  Clock,
  X,
  Search,
  Plus,
  Trash2,
  FileText,
  User,
  Phone,
  Hash,
  Laptop,
  UserCheck,
} from "lucide-react";

// const Loader = () => (
//   <div className="fixed inset-0 flex items-center justify-center bg-white/80 z-50">
//     <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
//   </div>
// );

const generateTimeSlots = () => {
  const slots = [];
  const currentTime = new Date();
  currentTime.setHours(8, 0, 0, 0);

  while (currentTime.getHours() < 21) {
    const timeString = currentTime.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
    slots.push(timeString);
    currentTime.setMinutes(currentTime.getMinutes() + 30);
  }

  return slots;
};

// Check if a time slot is booked for a specific machine
const getCheckedCount = (appointments, machineId, time, machines) => {
  const appointment = appointments.find((appointment) => {
    if (appointment.machine_detail_id !== machineId) return false;

    const appointmentTime = appointment.time;
    const slotDuration =
      machines.find((machine) => machine.id === machineId)?.slot_number || 1;

    const appointmentSlots = [];
    const currentTime = new Date(`1970-01-01T${appointmentTime}:00`);
    for (let i = 0; i < slotDuration; i++) {
      appointmentSlots.push(
        currentTime.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        })
      );
      currentTime.setMinutes(currentTime.getMinutes() + 30);
    }

    return appointmentSlots.includes(time);
  });

  return appointment ? appointment.id : null;
};

// User table component for each doctor
const UserTable = ({
  userName,
  machines,
  timeSlots,
  handleButtonClick,
  appointments,
}) => {
  const doctorMachines = machines.filter(
    (machine) => machine?.user?.first_name === userName
  );

  return (
    <div className="flex-1 w-[25vw] mx-auto overflow-hidden rounded-md justify-center  mt-4 m-3 ">
      <div className="bg-green-600 text-white py-3 px-4 font-semibold text-center rounded-md">
        Dr. {userName}
      </div>
      <div className="overflow-auto max-h-[calc(100vh-260px)]">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50 sticky top-0 z-10">
            <tr>
              <th className="px-3 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                Time
              </th>
              {doctorMachines.map((machine) => (
                <th
                  key={machine.id}
                  className="px-3 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider"
                >
                  {machine.name}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {timeSlots.map((time, index) => {
              let bookedCount = 0;
              const rowItems = doctorMachines.map((machine) => {
                const appointmentId = getCheckedCount(
                  appointments,
                  machine.id,
                  time,
                  machines
                );
                const isBooked = !!appointmentId;

                if (isBooked) {
                  bookedCount++;
                }

                return (
                  <td key={machine.id} className="px-3 py-3 text-center">
                    <div
                      onClick={() =>
                        handleButtonClick(
                          machine.id,
                          machine.doctor_id,
                          time,
                          appointments,
                          machines
                        )
                      }
                      className={`w-4 h-4 mx-auto border-2 ${
                        isBooked
                          ? "bg-green-500 border-green-600"
                          : "bg-white border-gray-400 hover:border-blue-500"
                      } rounded cursor-pointer transition-colors duration-200`}
                    ></div>
                  </td>
                );
              });

              return (
                <tr
                  key={index}
                  className={`${
                    bookedCount >= doctorMachines.length
                      ? "bg-gray-100 opacity-70"
                      : "hover:bg-gray-50"
                  }`}
                >
                  <td className="px-3 py-3 text-xs font-medium text-gray-900">
                    {time}
                  </td>
                  {rowItems}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default function IndoorActivity() {
  const navigate = useNavigate();
  const [machines, setMachines] = useState([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [userId, setUserId] = useState("");
  const [assignedData, setAssignedData] = useState(false);
  const [dialogData, setDialogData] = useState({
    name: "",
    last_name: "",
    number: "",
    machineName: "",
    doctorId: "",
    doctorName: "",
    time: "",
    caseNumber: "",
    appointmentId: "",
    machineId: "",
    userId: "",
  });
  const [loader, setLoader] = useState(true);
  const [consultingTime, setConsultingTime] = useState(
    new Date().toISOString().split("T")[0]
  );
  const timeSlots = generateTimeSlots();
  const [appointments, setAppointments] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [getParticularCustomer, setGetParticularCustomer] = useState([]);
  const [error, setError] = useState("");

  const handleDisplay = (date) => {
    const queryParam = date ? `?date=${date}` : "";
    setLoader(true);
    axios
      .get(`/api/v1/appointments${queryParam}`)
      .then((res) => {
        setAppointments(res.data?.appointments || []);
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        setLoader(false);
      });
  };

  const handleRedirect = () => {
    navigate(`/receptionist/patients/all-users`);
  };

  const handleButtonClick = (
    machineId,
    doctorId,
    timeSlot,
    appointments,
    machines
  ) => {
    const timeString = timeSlot;
    const [time, modifier] = timeString.split(" ");
    let [hours, minutes] = time.split(":");

    if (modifier === "PM" && hours !== "12") {
      hours = Number.parseInt(hours, 10) + 12;
    }
    if (modifier === "AM" && hours === "12") {
      hours = "00";
    }

    const timeIn24HourFormat = `${hours}:${minutes}`;
    const appointmentId = getCheckedCount(
      appointments,
      machineId,
      timeSlot,
      machines
    );
    const isBooked = !!appointmentId;

    if (isBooked) {
      const existingAppointment = appointments.find(
        (appointment) =>
          appointment.machine_detail_id === machineId &&
          appointment.time === timeIn24HourFormat
      );

      if (existingAppointment) {
        setDialogData({
          name: existingAppointment.user?.first_name || "",
          last_name: existingAppointment.user?.last_name || "",
          number: existingAppointment.user?.phone_number || "",
          machineName:
            machines.find((machine) => machine.id === machineId)?.name || "",
          doctorId: existingAppointment.doctor?.id || "",
          doctorName:
            existingAppointment.doctor?.first_name || "Doctor not assigned",
          time: existingAppointment.time || timeSlot,
          caseNumber: existingAppointment?.user?.case_number || "",
          machineId: machineId,
          appointmentId: existingAppointment?.id,
        });
        setAssignedData(true);
        setIsDialogOpen(true);
      }
    } else {
      const machine = machines.find((m) => m.id === machineId);
      const doctorName = machine?.user?.first_name || "Doctor not assigned";
      const actualDoctorId = machine?.user?.id || "ID not assigned";

      if (machine) {
        setDialogData({
          name: "",
          last_name: "",
          number: "",
          machineName: machine.name,
          doctorId: actualDoctorId,
          doctorName,
          time: timeSlot,
          machineId: machineId,
          caseNumber: "",
          appointmentId: "",
          userId: "",
        });
        setAssignedData(false);
        setIsDialogOpen(true);
      }
    }
  };

  const resetDialog = () => {
    setDialogData({
      name: "",
      last_name: "",
      number: "",
      machineName: "",
      doctorId: "",
      doctorName: "",
      time: "",
      caseNumber: "",
      machineId: "",
      appointmentId: "",
      userId: "",
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!dialogData.userId) {
      Swal.fire({
        title: "Error",
        text: "Please select a patient",
        icon: "error",
      });
      return;
    }

    setLoader(true);
    const timeString = dialogData.time;
    const [time, modifier] = timeString.split(" ");
    let [hours, minutes] = time.split(":");

    if (modifier === "PM" && hours !== "12") {
      hours = Number.parseInt(hours, 10) + 12;
    }
    if (modifier === "AM" && hours === "12") {
      hours = "00";
    }

    const timeIn24HourFormat = `${hours}:${minutes}`;

    const formdata = new FormData();
    formdata.append("appointment[user_id]", dialogData.userId);
    formdata.append("appointment[date]", consultingTime);
    formdata.append("appointment[time]", timeIn24HourFormat);
    formdata.append("appointment[machine_detail_id]", dialogData.machineId);
    formdata.append("appointment[doctor_id]", dialogData.doctorId);

    axios
      .post(
        `/api/v1/appointments?case_number=${dialogData.caseNumber}`,
        formdata
      )
      .then((res) => {
        Swal.fire({
          title: "Success",
          text: "Appointment scheduled successfully",
          icon: "success",
        });
        setIsDialogOpen(false);
        resetDialog();
        handleDisplay(consultingTime);
        setSearchTerm("");
        setError("");
      })
      .catch((err) => {
        Swal.fire({
          title: "Error",
          text: err.response?.data?.message || "Failed to schedule appointment",
          icon: "error",
        });
      })
      .finally(() => {
        setLoader(false);
      });
  };

  const handleConsulting = (e) => {
    setConsultingTime(e.toISOString().split("T")[0]);
    handleDisplay(e.toISOString().split("T")[0]);
  };

  const closeDialog = () => {
    setIsDialogOpen(false);
    resetDialog();
    setSearchTerm("");
    setError("");
    setGetParticularCustomer([]);
  };

  const formatDate = (date) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(date).toLocaleDateString(undefined, options);
  };

  const handleCancel = (appointmentId) => {
    Swal.fire({
      title: "Cancel Appointment",
      text: "Are you sure you want to cancel this appointment?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, cancel it!",
    }).then((result) => {
      if (result.isConfirmed) {
        if (appointmentId) {
          setLoader(true);
          axios
            .delete(`/api/v1/appointments/${appointmentId}`)
            .then((res) => {
              Swal.fire({
                title: "Cancelled",
                text: "Appointment has been cancelled successfully",
                icon: "success",
              });
              handleDisplay(consultingTime);
            })
            .catch((err) => {
              Swal.fire({
                title: "Error",
                text:
                  err.response?.data?.message || "Failed to cancel appointment",
                icon: "error",
              });
            })
            .finally(() => {
              setIsDialogOpen(false);
              setLoader(false);
            });
        }
      }
    });
  };

  const handleSheet = () => {
    window.open("/appointment-sheet", "_blank");
  };

  const handleSearchTerm = (value) => {
    setSearchTerm(value);
    if (value) {
      axios
        .get(
          `/api/v1/users?only_indoor_access_users=true&search_query=${value}`
        )
        .then((res) => {
          setGetParticularCustomer(res.data.users);
          if (res.data?.users?.length > 0) {
            setError("");
          } else {
            setError("No patients found matching your search");
          }
        })
        .catch((err) => {
          console.error(err);
          setError("Error searching for patients");
        });
    } else {
      setGetParticularCustomer([]);
      setError("");
    }
  };

  useEffect(() => {
    Promise.all([
      axios.get(`/api/v1/appointments?date=${consultingTime}`),
      axios.get(`/api/v1/machine_details`),
    ])
      .then(([appointmentsRes, machinesRes]) => {
        setAppointments(appointmentsRes.data?.appointments || []);
        setMachines(machinesRes.data.machine_details || []);
      })
      .catch((err) => {
        console.error(err);
        Swal.fire({
          title: "Error",
          text: "Failed to load data. Please try again.",
          icon: "error",
        });
      })
      .finally(() => {
        setLoader(false);
      });
  }, [consultingTime]);

  // if (loader) {
  //   return <Loader />;
  // }

  return (
    <div className="  ">
      <div className="max-w-7xl mx-auto  overflow-hidden">
        {/* Header */}
        <div className="bg-white  ">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-3">
              <Clock className="h-6 w-6 text-green-600" />
              <h1 className="flex justify-start text-xl font-bold ">
                Indoor Activity Time Slot
              </h1>
            </div>
            <button
              onClick={handleSheet}
              className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md transition-colors duration-200"
            >
              <FileText className="h-5 w-5" />
              <span>Appointment Sheet</span>
            </button>
          </div>

          <div className="flex flex-col md:flex-row items-center justify-between mt-6 p-1 gap-4">
            <div className="relative flex items-center gap-3 w-full md:w-auto z-50">
              <Calendar className="absolute left-3 text-black z-10" />
              <DatePicker
                selected={new Date(consultingTime)}
                onChange={(date) => handleConsulting(date)}
                dateFormat="dd-MM-yyyy"
                placeholderText="Select date"
                className="border pl-12 pr-3 w-44 border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                popperClassName="!z-50"
                popperModifiers={[
                  {
                    name: "preventOverflow",
                    options: {
                      boundary: "viewport",
                    },
                  },
                ]}
              />
            </div>

            <div className="text-lg font-medium text-gray-700">
              Date: {formatDate(consultingTime)}
            </div>
          </div>
        </div>

        {/* Doctor Tables */}
        <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
          {["Bhavesh", "Dipalee", "Nidhi"].map((userName) => (
            <UserTable
              key={userName}
              userName={userName}
              machines={machines}
              timeSlots={timeSlots}
              handleButtonClick={handleButtonClick}
              appointments={appointments}
            />
          ))}
        </div>
      </div>

      {/* Patient Details Dialog - Existing Appointment */}
      {isDialogOpen && assignedData && (
        <Dialog open={isDialogOpen} onClose={closeDialog}>
          <div className="fixed inset-0 bg-black/50 z-40" aria-hidden="true" />
          <div className="fixed inset-0 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6 max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-gray-800">
                  Patient Details
                </h2>
                <button
                  onClick={closeDialog}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <User className="h-4 w-4 text-gray-500" />
                      <span className="text-sm font-medium text-gray-500">
                        Name
                      </span>
                    </div>
                    <p className="font-medium">
                      {dialogData.name} {dialogData.last_name}
                    </p>
                  </div>

                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <Phone className="h-4 w-4 text-gray-500" />
                      <span className="text-sm font-medium text-gray-500">
                        Phone
                      </span>
                    </div>
                    <p className="font-medium">{dialogData.number}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <Hash className="h-4 w-4 text-gray-500" />
                      <span className="text-sm font-medium text-gray-500">
                        Case Number
                      </span>
                    </div>
                    <p className="font-medium">{dialogData.caseNumber}</p>
                  </div>

                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <Laptop className="h-4 w-4 text-gray-500" />
                      <span className="text-sm font-medium text-gray-500">
                        Machine
                      </span>
                    </div>
                    <p className="font-medium">{dialogData.machineName}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <UserCheck className="h-4 w-4 text-gray-500" />
                      <span className="text-sm font-medium text-gray-500">
                        Doctor
                      </span>
                    </div>
                    <p className="font-medium">Dr. {dialogData.doctorName}</p>
                  </div>

                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-gray-500" />
                      <span className="text-sm font-medium text-gray-500">
                        Time
                      </span>
                    </div>
                    <p className="font-medium">{dialogData.time}</p>
                  </div>
                </div>

                <div className="pt-4 flex justify-end">
                  <button
                    onClick={() => handleCancel(dialogData.appointmentId)}
                    className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md transition-colors duration-200"
                  >
                    <Trash2 className="h-4 w-4" />
                    <span>Cancel Appointment</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </Dialog>
      )}

      {/* Patient Details Dialog - New Appointment */}
      {isDialogOpen && !assignedData && (
        <Dialog open={isDialogOpen} onClose={closeDialog}>
          <div className="fixed inset-0 bg-black/50 z-40" aria-hidden="true" />
          <div className="fixed inset-0 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6 max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-gray-800">
                  Schedule New Appointment
                </h2>
                <button
                  onClick={closeDialog}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Search Patient
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      value={searchTerm}
                      onChange={(e) => handleSearchTerm(e.target.value)}
                      placeholder="Search by name or phone number"
                      className="w-full border border-gray-300 rounded-md pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    />
                    <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                  </div>
                  {error && <p className="text-sm text-red-600">{error}</p>}
                  {getParticularCustomer.length > 0 && (
                    <ul className="mt-1 border border-gray-200 rounded-md max-h-48 overflow-y-auto divide-y divide-gray-100">
                      {getParticularCustomer.map((user) => (
                        <li
                          key={user.id}
                          className="p-2 hover:bg-gray-50 cursor-pointer transition-colors duration-150"
                          onClick={() => {
                            setDialogData({
                              ...dialogData,
                              name: user?.first_name || "",
                              last_name: user?.last_name || "",
                              number: user?.phone_number || "",
                              caseNumber: user?.case_number || "",
                              userId: user?.id,
                            });
                            setUserId(user?.id);
                            setGetParticularCustomer([]);
                            setSearchTerm(
                              `${user.first_name} ${user.last_name}`
                            );
                          }}
                        >
                          <div className="font-medium">
                            {user.first_name} {user.last_name}
                          </div>
                          <div className="text-sm text-gray-500">
                            {user.phone_number}
                          </div>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>

                {dialogData.name && (
                  <div className="grid grid-cols-2 gap-4 p-3 bg-gray-50 rounded-md">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <User className="h-4 w-4 text-gray-500" />
                        <span className="text-sm font-medium text-gray-500">
                          Patient
                        </span>
                      </div>
                      <p className="font-medium">
                        {dialogData.name} {dialogData.last_name}
                      </p>
                    </div>

                    {dialogData.number && (
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <Phone className="h-4 w-4 text-gray-500" />
                          <span className="text-sm font-medium text-gray-500">
                            Phone
                          </span>
                        </div>
                        <p className="font-medium">{dialogData.number}</p>
                      </div>
                    )}

                    {dialogData.caseNumber && (
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <Hash className="h-4 w-4 text-gray-500" />
                          <span className="text-sm font-medium text-gray-500">
                            Case #
                          </span>
                        </div>
                        <p className="font-medium">{dialogData.caseNumber}</p>
                      </div>
                    )}
                  </div>
                )}

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Machine
                    </label>
                    <input
                      type="text"
                      value={dialogData.machineName}
                      readOnly
                      className="w-full bg-gray-50 border border-gray-300 rounded-md px-3 py-2"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Doctor
                    </label>
                    <input
                      type="text"
                      value={`Dr. ${dialogData.doctorName}`}
                      readOnly
                      className="w-full bg-gray-50 border border-gray-300 rounded-md px-3 py-2"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Appointment Time
                  </label>
                  <input
                    type="text"
                    value={dialogData.time}
                    readOnly
                    className="w-full bg-gray-50 border border-gray-300 rounded-md px-3 py-2"
                  />
                </div>

                <div className="pt-4 flex justify-between">
                  <button
                    type="button"
                    onClick={handleRedirect}
                    className="flex items-center gap-2 bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-md transition-colors duration-200"
                  >
                    <User className="h-4 w-4" />
                    <span>Patient List</span>
                  </button>
                  <button
                    type="submit"
                    className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md transition-colors duration-200"
                    disabled={!dialogData.userId}
                  >
                    <Plus className="h-4 w-4" />
                    <span>Schedule Appointment</span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </Dialog>
      )}
    </div>
  );
}
