import { useState, useEffect } from "react";
import axios from "axios";
import { TiTick } from "react-icons/ti";
import { GiCancel } from "react-icons/gi";
import { Dialog } from "@headlessui/react"; // Import the Dialog component from Headless UI

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

const UserTable = ({ userName, machines, timeSlots, handleButtonClick }) => (
  <div className="m-2">
    <div className="text-lg font-medium text-center mt-5">
      {userName} (Weight Loss)
    </div>
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
              .map((machine) => (
                <td
                  key={machine.id}
                  className="px-6 py-3 text-left text-xs font-medium text-gray-900"
                >
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleButtonClick(machine.id, "1", time)}
                      className="rounded"
                    >
                      <TiTick size={20} color="green" />
                    </button>
                    {/* Uncomment if needed */}
                    {/* <button
                      onClick={() => handleButtonClick(machine.id, "2", time)}
                      className="rounded"
                    >
                      <GiCancel size={20} color="red" />
                    </button> */}
                  </div>
                </td>
              ))}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default function Indooractivity() {
  const [machines, setMachines] = useState([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [dialogData, setDialogData] = useState({
    name: "",
    number: "",
    machineName: "",
    time: "",
  });
  const timeSlots = generateTimeSlots();

  useEffect(() => {
    axios
      .get(`/api/v1/machine_details`)
      .then((res) => {
        setMachines(res.data.machine_details);
      })
      .catch((err) => {
        console.error(err);
        alert(err.response?.data?.message || "An error occurred!");
      });
  }, []);

  const handleButtonClick = (machineId, buttonType, time) => {
    const machine = machines.find((m) => m.id === machineId);
    if (machine) {
      setDialogData({
        name: "",
        number: "",
        machineName: machine.name,
        time: time,
      });
      setIsDialogOpen(true);
    }
    console.log(
      `Button ${buttonType} clicked for machine ID ${machineId} at time ${time}`
    );
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDialogData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    e.preventDefault();
    setErrorMessage("");
    const formattedDate = formatDate(consultingTime);
    const formdata = new FormData();
    formdata.append("appointment[user_id]", props.user);
    formdata.append("appointment[date]", formattedDate);
    formdata.append("appointment[doctor_id]", props.doctor);
    formdata.append("appointment[time]", time);
    formdata.append("appointment[machine_detail_id]", machine);
    axios
      .post(`/api/v1/appointments`, formdata)
      .then((res) => {
        console.log(res);
        alert("Successfully create your Machine Consulting Appointment!");
      })
      .catch((err) => {
        console.log(err.response.data.message);
        setErrorMessage(err.response.data.message);
      });
  };

  const closeDialog = () => setIsDialogOpen(false);

  return (
    <div>
      <h2 className="text-lg font-semibold text-center mt-5">
        Indoor Activity Time Slot
      </h2>
      <div className="flex justify-center">
        {["Bhavesh", "Rupali", "Nidhi"].map((userName) => (
          <UserTable
            key={userName}
            userName={userName}
            machines={machines}
            timeSlots={timeSlots}
            handleButtonClick={handleButtonClick}
          />
        ))}
      </div>

      {/* Dialog Component */}
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
                Number
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
