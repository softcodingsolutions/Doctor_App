import { useState, useEffect } from "react";
import axios from "axios";
import { TiTick } from "react-icons/ti";
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
const getCheckedCount = (appointments, machineId, time, slotNumber) => {
  const startTime = new Date(`1970-01-01T${time}`);
  const endTime = new Date(startTime.getTime() + slotNumber * 30 * 60000); // Add slot number * 30 minutes

  return appointments.some((appointment) => {
    const appointmentTime = new Date(`1970-01-01T${appointment.time}`);
    const appointmentEndTime = new Date(
      appointmentTime.getTime() + slotNumber * 30 * 60000
    );

    return (
      appointment.machine_id === machineId &&
      appointmentTime <= startTime &&
      appointmentEndTime > startTime
    );
  });
};

const UserTable = ({
  userName,
  machines,
  timeSlots,
  handleButtonClick,
  appointments,
}) => {
  return (
    <div className="m-2">
      <div className="text-lg font-medium text-center mt-5">{userName}</div>
      <table className="divide-y divide-gray-200 overflow-auto">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-900 uppercase tracking-wider">
              Time
            </th>
            {machines
              .filter((machine) => machine?.user?.first_name === userName)
              .map((machine) => (
                <th
                  key={machine.id}
                  className="px-6 py-3 text-left text-xs font-semibold text-gray-900 uppercase tracking-wider"
                >
                  {machine.name}
                </th>
              ))}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {timeSlots.map((time, index) => (
            <tr key={index}>
              <td className="px-6 py-3 text-left text-xs font-medium text-gray-900">
                {time}
              </td>
              {machines
                .filter((machine) => machine?.user?.first_name === userName)
                .map((machine) => {
                  const checked = getCheckedCount(
                    appointments,
                    machine.id,
                    time,
                    machine.slot_number
                  );

                  return (
                    <td
                      key={machine.id}
                      className="px-6 py-3 text-left text-xs font-medium text-gray-900"
                    >
                      <input
                        type="checkbox"
                        checked={checked}
                        onChange={() =>
                          handleButtonClick(machine.id, machine.doctor_id, time)
                        }
                        className="rounded"
                      />
                    </td>
                  );
                })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default function Indooractivity() {
  const [machines, setMachines] = useState([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [dialogData, setDialogData] = useState({
    name: "",
    number: "",
    machineName: "",
    doctorId: "",
    doctorName: "",
    time: "",
    caseNumber: "",
  });
  const [consultingTime, setConsultingTime] = useState(
    new Date().toISOString().split("T")[0]
  );
  const timeSlots = generateTimeSlots();
  const [appointments, setAppointments] = useState([]);

  const handleMachineAllocation = () => {
    setLoading(true);
    axios
      .get(`api/v1/appointments?date=${consultingTime}&doctor_id=${doctorList}`)
      .then((res) => {
        setAppointments(res.data.machine_details || []);
      })
      .catch((err) => {
        console.error(err);
        alert(err.response?.data?.message || "An error occurred!");
      });
  };
  const handleButtonClick = (machineId, doctorId, time) => {
    const machine = machines.find((m) => m.id === machineId);

    const doctorName = machine?.user?.first_name || "Doctor not assigned";
    const actualDoctorId = machine?.user?.id || "ID not assigned";
    if (machine) {
      setDialogData({
        ...dialogData,
        machineId,
        machineName: machine.name,
        doctorId: actualDoctorId,
        doctorName,
        time,
      });
      setIsDialogOpen(true);
    }

    console.log(
      `Button clicked for machine ID ${machineId}, doctor ID ${doctorId} at time ${time}`
    );
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

  const formatDate = (date) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(date).toLocaleDateString(undefined, options);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formattedDate = formatDate(consultingTime);
    const formdata = new FormData();
    formdata.append("appointment[date]", formattedDate);
    formdata.append("appointment[time]", dialogData.time);
    formdata.append("appointment[machine_detail_id]", dialogData.machineId);
    formdata.append("appointment[doctor_id]", dialogData.doctorId);

    axios
      .post(
        `/api/v1/appointments?case_number=${dialogData.caseNumber}`,
        formdata
      )
      .then((res) => {
        console.log(res);
        alert("Successfully created your Machine Consulting Appointment!");
        setIsDialogOpen(false);
        resetDialog();
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
  };

  const closeDialog = () => {
    setIsDialogOpen(false);
    resetDialog();
  };

  useEffect(() => {
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
  }, []);

  return (
    <div className="flex w-full flex-col justify-center text-center">
      <div className="flex justify-center">
        <h2 className="text-xl font-semibold ">Indoor Activity Time Slot</h2>
      </div>
      <div className="flex justify-center mt-5">
        <input
          type="date"
          placeholder="select date"
          className="py-1 px-2 rounded-md border border-black w-[40vh]"
          onChange={handleConsulting}
        />
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
          />
        ))}
      </div>

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
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>
            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700">
                Doctor
              </label>
              <input
                type="text"
                value={dialogData.doctorName}
                readOnly
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
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
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
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
    </div>
  );
}
