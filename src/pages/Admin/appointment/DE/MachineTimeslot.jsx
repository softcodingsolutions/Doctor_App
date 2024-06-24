import React, { useState, useEffect } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import axios from "axios";

export default function MachineTimeslot() {
  const [inputTime, setInputTime] = useState("");
  const [inputSlot, setInputSlot] = useState("select");
  const [inputMachine, setInputMachine] = useState("select");
  const [inputDoctor, setInputDoctor] = useState("select");
  const [doctors, setDoctors] = useState([]);
  const [inputVisible, setInputVisible] = useState(false);
  const [doctorName, setDoctorNames] = useState({});
  const [machineName, setMachineNames] = useState({});
  const [data, setData] = useState([]);

  useEffect(() => {
    handleShow();
    handleMachineShow();
    handleData();
  }, []);

  const handleShow = () => {
    axios
      .get(`api/v1/users`)
      .then((res) => {
        console.log(res);
        setDoctorNames(res.data.users);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleData = () => {
    axios
      .get(`/api/v1/machine_consulting_times`)
      .then((res) => {
        console.log(res, "Dataa");
        setData(res.data.machine_consulting_times);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleMachineShow = () => {
    axios
      .get(`/api/v1/machine_details`)
      .then((res) => {
        console.log(res.data.machine_details);
        setMachineNames(res.data.machine_details);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  function handleTimeChange(e) {
    setInputTime(e.target.value);
  }

  function handleSlotChange(e) {
    setInputSlot(e.target.value);
  }

  function handleMachineChange(e) {
    setInputMachine(e.target.value);
  }

  function handleDoctorChange(e) {
    setInputDoctor(e.target.value);
  }

  function formatTime(time) {
    try {
      const date = new Date(time);
      const options = {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
        timeZone: "UTC",
      };
      const formattedTime = new Intl.DateTimeFormat("en-US", options).format(
        date
      );
      return formattedTime;
    } catch (error) {
      console.error("Error formatting time:", error);
      return "Invalid time";
    }
  }

  function handleAddDoctor() {
    if (
      inputTime &&
      inputSlot !== "select" &&
      inputMachine !== "select" &&
      inputDoctor !== "select"
    ) {
      const newDoctor = {
        time: formatTime(inputTime),
        slot: inputSlot,
        machine: inputMachine,
        doctor: inputDoctor,
      };
      setDoctors([...doctors, newDoctor]);
      setInputTime("");
      setInputSlot("select");
      setInputMachine("select");
      setInputDoctor("select");
    }
    const formdata = new FormData();
    formdata.append("machine_consulting_time[slot]", inputSlot);
    formdata.append("machine_consulting_time[time]", inputTime);
    formdata.append("machine_consulting_time[machine_detail_id]", inputMachine);
    formdata.append("machine_consulting_time[doctor_id]", inputDoctor);
    axios
      .post(`/api/v1/machine_consulting_times?id=${inputDoctor}`, formdata)
      .then((res) => {
        console.log(res);
        handleData();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  const handleRemoveDoctor = (index) => {
    const updatedDoctors = doctors.filter((_, i) => i !== index);
    setDoctors(updatedDoctors);
    axios
      .delete(`/api/v1/machine_consulting_times/${index}`)
      .then((res) => {
        console.log(res, "DELETE");
        handleData();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleShowInput = () => {
    setInputVisible(!inputVisible);
  };

  return (
    <div className="w-full p-2">
      <div className="rounded-lg bg-card h-[85vh] bg-white">
        <div className="flex px-4 py-3 h-full flex-col space-y-4">
          <div className="wooo">
            <button
              onClick={handleShowInput}
              className="min-w-fit flex items-center justify-center border cursor-pointer bg-[#1F2937] text-white p-2 rounded-md"
            >
              Add Machine Time
            </button>
            {inputVisible && (
              <div className="flex gap-5 m-2">
                <select
                  name="machine"
                  value={inputMachine}
                  onChange={handleMachineChange}
                  className="py-1 px-2 rounded-md border border-black"
                >
                  <option value="select" disabled>
                    Select Machine
                  </option>
                  {Object.values(machineName).map((name) => (
                    <option key={name.id} value={name.id}>
                      {name.name}
                    </option>
                  ))}
                </select>

                <select
                  name="doctor"
                  value={inputDoctor}
                  onChange={handleDoctorChange}
                  className="py-1 px-2 rounded-md border border-black"
                >
                  <option value="select" disabled>
                    Select Doctor
                  </option>
                  {Object.values(doctorName)
                    .filter((doctor) => doctor.role === "doctor")
                    .map((name) => (
                      <option key={name.id} value={name.id}>
                        {name.first_name}
                        {name.last_name}
                      </option>
                    ))}
                </select>

                <select
                  name="slot"
                  value={inputSlot}
                  onChange={handleSlotChange}
                  className="py-1 px-2 rounded-md border border-black"
                >
                  <option value="select" disabled>
                    Select Slot
                  </option>
                  <option value="morning">Morning</option>
                  <option value="afternoon">Afternoon</option>
                  <option value="evening">Evening</option>
                </select>

                <input
                  className="border-2 rounded-md p-2"
                  type="time"
                  onChange={handleTimeChange}
                  value={inputTime}
                  placeholder="Time"
                />
                <button
                  className="min-w-fit flex items-center justify-center border cursor-pointer hover:bg-[#1F2937] hover:text-white p-2 rounded-md"
                  onClick={handleAddDoctor}
                >
                  ADD
                </button>
              </div>
            )}
          </div>

          <div className="animate-fade-left animate-delay-75 shadow-gray-400 shadow-inner border rounded-md border-gray-100 animate-once animate-ease-out overflow-auto h-[93%]">
            <table className="w-full min-w-[460px] z-0">
              <thead className="uppercase">
                <tr className="bg-[#1F2937] text-white rounded-md">
                  <th className="text-[12px] uppercase tracking-wide font-medium py-3 px-4 text-left">
                    Machine
                  </th>
                  <th className="text-[12px] uppercase tracking-wide font-medium py-3 px-4 text-left">
                    Doctor
                  </th>
                  <th className="text-[12px] uppercase tracking-wide font-medium py-3 px-4 text-left">
                    Slot
                  </th>
                  <th className="text-[12px] uppercase tracking-wide font-medium py-3 px-4 text-left">
                    Time
                  </th>
                  <th className="text-[12px] uppercase tracking-wide font-medium py-3 px-4 text-left">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {data.map((doctor, index) => (
                  <tr key={index} className="map">
                    <td className="py-3 px-4 border-b border-b-gray-50">
                      <span className="text-black text-sm font-medium ml-1">
                        {doctor.machine_detail.name}
                      </span>
                    </td>
                    <td className="py-3 px-4 border-b border-b-gray-50">
                      <span className="text-black text-sm font-medium ml-1">
                        {doctor.doctor.first_name} {doctor.doctor.last_name}
                      </span>
                    </td>
                    <td className="py-3 px-4 border-b border-b-gray-50">
                      <span className="text-black text-sm font-medium ml-1">
                        {doctor.slot}
                      </span>
                    </td>
                    <td className="py-3 px-4 border-b border-b-gray-50">
                      <span className="text-black text-sm font-medium ml-1">
                        {doctor.time}
                      </span>
                    </td>
                    <td className="py-3 px-4 border-b border-b-gray-50">
                      <button
                        onClick={() => handleRemoveDoctor(doctor.id)}
                        className="min-w-fit border cursor-pointer hover:bg-[#1F2937] hover:text-white p-2 m-2 rounded-md"
                      >
                        <AiOutlineDelete />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
