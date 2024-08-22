import { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { Dialog } from "@headlessui/react";
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
        <div className="text-lg font-medium text-center mt-5">{userName}</div>
        <table className="min-w-80 divide-y divide-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-5 sm:px-5 py-3 text-left text-xs sm:text-sm font-semibold text-gray-900 uppercase tracking-wider">
                Time
              </th>
              {machines
                .filter((machine) => machine?.user?.first_name === userName)
                .map((machine) => (
                  <th
                    key={machine.id}
                    className="px-5 sm:px-2 py-3 text-left text-xs sm:text-sm font-semibold text-gray-900 uppercase tracking-wider"
                  >
                    {machine.name}
                  </th>
                ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
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
                      className="px-5 sm:px-2 py-3 text-left text-xs sm:text-sm font-medium text-gray-900"
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
  const [machines, setMachines] = useState([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [assignedData, setAssignedData] = useState(false);
  const [dialogData, setDialogData] = useState({
    name: "",
    number: "",
    machineName: "",
    doctorId: "",
    doctorName: "",
    time: "",
    caseNumber: "",
    appointmentId: "",
  });
  const [consultingTime, setConsultingTime] = useState(
    new Date().toISOString().split("T")[0]
  );
  const timeSlots = generateTimeSlots();
  const [appointments, setAppointments] = useState([]);

  const handleDisplay = (date) => {
    const queryParam = date ? `?date=${date}` : "";
    axios
      .get(`/api/v1/appointments${queryParam}`)
      .then((res) => {
        console.log(res.data?.appointments, "Appointments Data");
        setAppointments(res.data?.appointments || []);
      })
      .catch((err) => {
        console.error(err);
        alert(err.response?.data?.message + "!");
      });
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
  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDialogData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const resetDialog = () => {
    setDialogData({
      name: "",
      number: "",
      machineName: "",
      doctorId: "",
      doctorName: "",
      time: "",
      caseNumber: "",
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
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
        resetDialog();
        handleDisplay(consultingTime);
      })
      .catch((err) => {
        console.error(err.response?.data?.message || "An error occurred!");
        if (err.response?.data?.message === "No Machines are available") {
        }
        alert(err.response?.data?.message || "An error occurred!");
        setIsDialogOpen(false);
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
              });
              handleDisplay(consultingTime);
              isDialogOpen(false);
            })
            .catch((err) => {
              console.error("Error cancelling appointment:", err);
              alert("Failed to cancel appointment.");
            });
        }
      }
    });
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

  return (
    <div className="w-full p-2">
      <div className="rounded-lg bg-card  bg-white">
        <div className="flex flex-col px-4 py-3 h-full space-y-4 ">
          <div className="flex justify-center">
            <h2 className="text-xl font-semibold m-5">
              Indoor Activity Time Slot
            </h2>
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
              <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
              <div className="fixed inset-0 flex items-center justify-center p-4">
                <div className="bg-white rounded p-6 max-w-sm w-full">
                  <h3 className="text-lg font-semibold">Patient Details</h3>
                  <div className="mt-4">
                    <label className="block text-md font-medium ">
                      Name : {dialogData.name}
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
                      Doctor : {dialogData.doctorName}
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
                      Cancel the Appointment
                    </button>

                    <button
                      type="button"
                      onClick={closeDialog}
                      className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-500 shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                      Close
                    </button>
                  </div>
                </div>
              </div>
            </Dialog>
          ) : (
            <Dialog open={isDialogOpen} onClose={closeDialog}>
              <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
              <div className="fixed inset-0 flex items-center justify-center p-4">
                <div className="bg-white rounded p-6 max-w-sm w-full">
                  <h3 className="text-lg font-semibold">Patient Details</h3>
                  <div className="mt-4">
                    <label className="block text-sm font-medium text-gray-700">
                      Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={dialogData.name}
                      onChange={handleChange}
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    />
                  </div>
                  <div className="mt-4">
                    <label className="block text-sm font-medium text-gray-700">
                      Mobile Number
                    </label>
                    <input
                      type="text"
                      name="number"
                      value={dialogData.number}
                      onChange={handleChange}
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    />
                  </div>
                  <div className="mt-4">
                    <label className="block text-sm font-medium text-gray-700">
                      Case Number
                    </label>
                    <input
                      type="text"
                      name="caseNumber"
                      value={dialogData.caseNumber}
                      onChange={handleChange}
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    />
                  </div>
                  <div className="mt-4">
                    <label className="block text-sm font-medium text-gray-700">
                      Machine Name
                    </label>
                    <input
                      type="text"
                      value={dialogData.machineName}
                      readOnly
                    />
                  </div>
                  <div className="mt-4">
                    <label className="block text-sm font-medium text-gray-700">
                      Doctor
                    </label>
                    <input type="text" value={dialogData.doctorName} readOnly />
                  </div>
                  <div className="mt-4">
                    <label className="block text-sm font-medium text-gray-700">
                      Time
                    </label>
                    <input type="text" value={dialogData.time} readOnly />
                  </div>
                  <div className="mt-4 flex justify-end space-x-2">
                    <button
                      type="button"
                      onClick={handleSubmit}
                      className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-500 shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                      Submit
                    </button>
                    <button
                      type="button"
                      onClick={closeDialog}
                      className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-500 shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                      Close
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
