import { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { Dialog } from "@headlessui/react";
import InsideLoader from "../../InsideLoader";
import { useNavigate } from "react-router-dom";
import { GiCancel } from "react-icons/gi";

const generateTimeSlots = () => {
  const slots = [];
  let currentTime = new Date();
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

const getCheckedCount = (appointments, machineId, time, machines) => {
  const appointment = appointments.find((appointment) => {
    if (appointment.machine_detail_id !== machineId) return false;

    const appointmentTime = appointment.time;
    const slotDuration =
      machines.find((machine) => machine.id === machineId)?.slot_number || 1;

    let appointmentSlots = [];
    let currentTime = new Date(`1970-01-01T${appointmentTime}:00`);
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

const UserTable = ({
  userName,
  machines,
  timeSlots,
  handleButtonClick,
  appointments,
}) => {
  return (
    <div className="m-1 w-full overflow-x-auto">
      <div className="flex flex-col h-full space-y-4">
        <div className="text-md  font-semibold text-center mt-5">
          Dr. {userName}
        </div>
        <table className="min-w-80 divide-y divide-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-5 sm:px-5 py-3 text-left text-xs sm:text-xs font-semibold text-gray-900 uppercase tracking-wider">
                Time
              </th>
              {machines
                .filter((machine) => machine?.user?.first_name === userName)
                .map((machine) => (
                  <th
                    key={machine.id}
                    className="px-5 sm:px-2 py-3 text-left text-xs sm:text-xs font-semibold text-gray-900 uppercase tracking-wider"
                  >
                    {machine.name}
                  </th>
                ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y text-xs divide-gray-200">
            {timeSlots.map((time, index) => {
              let bookedCount = 0;
              const rowItems = machines
                .filter((machine) => machine?.user?.first_name === userName)
                .map((machine) => {
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
                    <td
                      key={machine.id}
                      className="px-5 sm:px-2 py-3 text-left text-xs sm:text-xs font-medium text-gray-900"
                    >
                      <div className="flex items-center justify-center sm:justify-start">
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
                          className={`w-4 h-4 border ${
                            isBooked ? "bg-green-500" : "bg-white"
                          } border-gray-400 rounded cursor-pointer flex items-center justify-center`}
                        ></div>
                      </div>
                    </td>
                  );
                });

              return (
                <tr
                  key={index}
                  className={`${
                    bookedCount >= 7 ? "pointer-events-none opacity-50" : ""
                  }`}
                >
                  <td className="px-2 sm:px-6 py-3 text-left text-xs sm:text-sm font-medium text-gray-900">
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

export default function Indooractivity() {
  const navigate = useNavigate();
  const [machines, setMachines] = useState([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
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
  });
  const [loader, setLoader] = useState(true);
  const [consultingTime, setConsultingTime] = useState(
    new Date().toISOString().split("T")[0]
  );
  const timeSlots = generateTimeSlots();
  const [appointments, setAppointments] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [getParticularCustomer, setGetParticularCustomer] = useState([]);
  const [error, setError] = useState("");

  const handleDisplay = (date) => {
    const queryParam = date ? `?date=${date}` : "";
    axios
      .get(`/api/v1/appointments${queryParam}`)
      .then((res) => {
        console.log(res.data?.appointments, "Appointments Data");
        setLoader(false);
        setAppointments(res.data?.appointments || []);
      })
      .catch((err) => {
        console.error(err);
        setLoader(false);
        alert(err.response?.data?.message + "!");
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
      hours = parseInt(hours, 10) + 12;
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
    console.log(appointmentId);

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
          number: "",
          machineName: machine.name,
          doctorId: actualDoctorId,
          doctorName,
          time: timeSlot,
          caseNumber: "",
          machineId: machineId,
        });
        setAssignedData(false);
        setIsDialogOpen(true);
      }
    }
  };

  const resetDialog = () => {
    setDialogData({
      name: "",
      number: "",
      last_name: " ",
      machineName: "",
      doctorId: "",
      doctorName: "",
      time: "",
      caseNumber: "",
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoader(true);
    const timeString = dialogData.time;
    const [time, modifier] = timeString.split(" ");
    let [hours, minutes] = time.split(":");

    if (modifier === "PM" && hours !== "12") {
      hours = parseInt(hours, 10) + 12;
    }
    if (modifier === "AM" && hours === "12") {
      hours = "00";
    }

    const timeIn24HourFormat = `${hours}:${minutes}`;

    const formdata = new FormData();
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
        console.log(res);
        setIsDialogOpen(false);
        alert("Successfully created your Machine Consulting Appointment!");
        setLoader(false);
        resetDialog();
        handleDisplay(consultingTime);
        setSearchTerm("");
        setError("");
      })
      .catch((err) => {
        console.error(err.response?.data?.message || "An error occurred!");
        alert(err.response?.data?.message || "An error occurred!");
        setIsDialogOpen(false);
        setLoader(false);
      });
  };

  const handleConsulting = (e) => {
    setConsultingTime(e.target.value);
    console.log(e.target.value);
    handleDisplay(e.target.value);
  };

  const closeDialog = () => {
    setIsDialogOpen(false);
    resetDialog();
    setDialogData([]);
    setSearchTerm("");
    setError("");
  };

  const formatDate = (date) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(date).toLocaleDateString(undefined, options);
  };

  const handleCancel = (appointmentId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        if (appointmentId) {
          axios
            .delete(`/api/v1/appointments/${appointmentId}`)
            .then((res) => {
              console.log("Appointment cancelled:", res);
              Swal.fire({
                title: "Deleted!",
                text: `Appointment has been deleted.`,
                icon: "success",
              }).then(() => {
                handleDisplay(consultingTime);
              });
            })
            .catch((err) => {
              console.error("Error cancelling appointment:", err);
              Swal.fire({
                title: "Error",
                text:
                  err.response?.data?.message ||
                  "Failed to cancel appointment.",
                icon: "error",
              });
            })
            .finally(() => {
              setIsDialogOpen(false);
            });
        }
      }
    });
  };

  const handleSheet = () => {
    navigate("/appointment-sheet");
  };

  const handleSearchTerm = (value) => {
    setSearchTerm(value);
    if (value) {
      axios
        .get(
          `/api/v1/users?only_indoor_access_users=true&search_query=${value}`
        )
        .then((res) => {
          setLoading(false);
          setGetParticularCustomer(res.data.users);
          if (res.data?.users?.length > 0) {
            setError("");
          } else {
            setError("Not found in Indoor Activity List");
          }
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
        });
    } else {
      setGetParticularCustomer([]);
    }
  };

  useEffect(() => {
    handleDisplay(consultingTime);
    axios
      .get(`/api/v1/machine_details`)
      .then((res) => {
        setMachines(res.data.machine_details);
        console.log(res);
      })
      .catch((err) => {
        console.error(err);
        alert(err.response?.data?.message || "An error occurred!");
      });
  }, [consultingTime]);

  if (loader) {
    return <InsideLoader />;
  }

  return (
    <div className="w-full  ">
      <div className="rounded-lg bg-card h-full bg-white">
        <div className="flex flex-col px-2 py-1 h-full space-y-2 ">
          <div className="flex w-full justify-center">
            <div className="text-right justify-end flex w-full ">
              <h2 className="text-xl font-semibold  p-3">
                Indoor Activity Time Slot
              </h2>
            </div>
            <div className="text-right justify-end w-[65%] p-4">
              <button
                type="submit"
                className=" text-black p-1 bg-green-600 rounded-md border border-gray-500 font-medium text-lg hover:scale-105"
                onClick={handleSheet}
              >
                Appointments
              </button>
            </div>
          </div>
          <div className="flex justify-center mt-5 gap-5">
            <div>
              <input
                type="date"
                placeholder="select date"
                className="py-1 px-2 rounded-md border border-black w-[40vh]"
                onChange={handleConsulting}
              />
            </div>
            <div>
              <div className="text-md font-semibold ">
                Date : {formatDate(consultingTime)}
              </div>
            </div>
          </div>
          <div className="flex justify-center">
            {["Bhavesh", "Rupali", "Nidhi"].map((userName) => (
              <UserTable
                key={userName}
                userName={userName}
                machines={machines}
                timeSlots={timeSlots}
                handleButtonClick={handleButtonClick}
                appointments={appointments}
                handleCancel={handleCancel}
              />
            ))}
          </div>
          {assignedData ? (
            <Dialog open={isDialogOpen} onClose={closeDialog}>
              <div
                className="fixed inset-0 w-full bg-black/30"
                aria-hidden="true"
              />
              <div className="fixed inset-0 flex items-center justify-center p-4">
                <div className="bg-white rounded p-6 max-w-sm w-full">
                  <h3 className="text-lg font-bold">Patient Details</h3>
                  <div className="mt-4">
                    <label className="block text-md font-medium ">
                      Name : {` ${dialogData.name} ${dialogData.last_name} `}
                    </label>
                  </div>
                  <div className="mt-4">
                    <label className="block text-md font-medium">
                      Mobile Number : {dialogData.number}
                    </label>
                  </div>
                  <div className="mt-4">
                    <label className="block text-md font-medium">
                      Case Number : {dialogData.caseNumber}
                    </label>
                  </div>
                  <div className="mt-4">
                    <label className="block text-md font-medium ">
                      Machine Name : {dialogData.machineName}
                    </label>
                  </div>
                  <div className="mt-4">
                    <label className="block text-md font-medium ">
                      Doctor : Dr. {dialogData.doctorName}
                    </label>
                  </div>
                  <div className="mt-4">
                    <label className="block text-md font-medium ">
                      Time : {dialogData.time}
                    </label>
                  </div>
                  <div className="mt-4 flex justify-end space-x-2">
                    <button
                      onClick={() => handleCancel(dialogData.appointmentId)}
                      className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-red-700 shadow-sm hover:bg-red-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                      title="Cancel Appointment"
                    >
                      Cancel Appointment
                    </button>

                    <button
                      type="button"
                      onClick={closeDialog}
                      className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-500 shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                      <GiCancel size={20} />
                    </button>
                  </div>
                </div>
              </div>
            </Dialog>
          ) : (
            <Dialog open={isDialogOpen} onClose={closeDialog}>
              <div className="fixed inset-0 bg-black/30 " aria-hidden="true" />
              <div className="fixed inset-0 flex items-center justify-center p-4">
                <div className="bg-white rounded p-6 max-w-sm w-full">
                  <div className="grid grid-cols-2 gap-22">
                    <div>
                      <h3 className="text-lg font-semibold">Patient Details</h3>
                    </div>
                    <div className="flex w-full justify-end">
                      <button
                        type="button"
                        onClick={closeDialog}
                        className="inline-flex items-center px-4  py-2 border border-transparent text-sm font-medium rounded-md   shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                      >
                        <GiCancel size={20} />
                      </button>
                    </div>
                  </div>
                  <div className="mt-4">
                    <div className="flex gap-3 p-2 items-center">
                      <input
                        type="text"
                        value={searchTerm}
                        onChange={(e) => handleSearchTerm(e.target.value)}
                        placeholder="Search User through First Name/Last Name/Phone Number"
                        className="py-1 px-2 rounded-md border border-black w-full"
                      />
                    </div>
                    {getParticularCustomer.length > 0 ? (
                      <ul className="mt-2 border border-gray-200 rounded-md max-h-48 overflow-y-auto">
                        {getParticularCustomer.map((user) => (
                          <li
                            key={user.id}
                            className="p-2 hover:bg-gray-100 cursor-pointer"
                            onClick={() => {
                              setDialogData({
                                ...dialogData,
                                name: user.first_name,
                                last_name: user.last_name,
                                number: user.phone_number,
                                caseNumber: user.case_number,
                              });
                              setGetParticularCustomer([]);
                              setSearchTerm(user.first_name);
                            }}
                          >
                            Name: {user.first_name} {user.last_name} <br />
                            Phone Number: {user.phone_number}
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="block text-sm font-small text-red-700">
                        {error}
                      </p>
                    )}
                  </div>
                  <div className="flex">
                    {dialogData.name && dialogData.last_name && (
                      <div className="mt-4">
                        <label className="block text-sm font-medium text-gray-700">
                          Name
                        </label>
                        <input
                          type="text"
                          value={`${dialogData.name} ${dialogData.last_name}`}
                          readOnly
                          className="py-1 px-2 w-full"
                        />
                      </div>
                    )}
                    {dialogData.number && (
                      <div className="mt-4">
                        <label className="block text-sm font-medium text-gray-700">
                          Phone Number
                        </label>
                        <input
                          type="text"
                          value={dialogData.number}
                          readOnly
                          className="py-1 px-2 w-full"
                        />
                      </div>
                    )}
                  </div>
                  <div className="flex">
                    {dialogData.caseNumber && (
                      <div className="mt-4">
                        <label className="block text-sm font-medium text-gray-700">
                          Case Number
                        </label>
                        <input
                          type="text"
                          value={dialogData.caseNumber}
                          readOnly
                          className="py-1 px-2 w-full"
                        />
                      </div>
                    )}
                    <div className="mt-4">
                      <label className="block text-sm font-medium text-gray-700">
                        Machine Name
                      </label>
                      <input
                        type="text"
                        value={dialogData.machineName}
                        readOnly
                        className="py-1 px-2 w-full"
                      />
                    </div>
                  </div>
                  <div className="flex">
                    <div className="mt-4">
                      <label className="block text-sm font-medium text-gray-700">
                        Doctor
                      </label>
                      <input
                        type="text"
                        value={`Dr. ${dialogData.doctorName}`}
                        readOnly
                        className="py-1 px-2 w-full"
                      />
                    </div>

                    <div className="mt-4">
                      <label className="block text-sm font-medium text-gray-700">
                        Time
                      </label>
                      <input
                        type="text"
                        value={dialogData.time}
                        readOnly
                        className="py-1 px-2 rounded-md  w-full"
                      />
                    </div>
                  </div>
                  <div className="mt-4 flex justify-end space-x-2">
                    <button
                      type="button"
                      onClick={handleRedirect}
                      className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-500 shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                      Patient List
                    </button>
                    <button
                      type="button"
                      onClick={handleSubmit}
                      className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-500 shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                      Submit
                    </button>
                  </div>
                </div>
              </div>
            </Dialog>
          )}
        </div>
      </div>
    </div>
  );
}
