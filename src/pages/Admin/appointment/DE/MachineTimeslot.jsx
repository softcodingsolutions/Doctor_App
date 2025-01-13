import { useState, useEffect } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import axios from "axios";

export default function MachineTimeslot() {
  const [inputTime, setInputTime] = useState("select");
  const [inputSlot, setInputSlot] = useState("select");
  const [inputMachine, setInputMachine] = useState("select");
  const [inputDoctor, setInputDoctor] = useState("select");
  const [doctors, setDoctors] = useState([]);
  const [inputVisible, setInputVisible] = useState(false);
  const [doctorName, setDoctorNames] = useState({});
  const [machineName, setMachineNames] = useState([]);
  const [data, setData] = useState([]);
  const times = generateSlotTimes(inputSlot);

  const handleShow = () => {
    axios
      .get(`api/v1/users`)
      .then((res) => {
        console.log(res);
        setDoctorNames(res.data.users);
      })
      .catch((err) => {
        console.log(err);
        alert(err.response?.data?.message + "!");
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
        alert(err.response?.data?.message + "!");
      });
  };

  function handleSlotChange(e) {
    setInputSlot(e.target.value);
  }

  function handleMachineChange(e) {
    setInputMachine(e.target.value);
  }

  function handleDoctorChange(e) {
    setInputDoctor(e.target.value);
    axios
      .get(
        `/api/v1/machine_details?doctor_id=${e.target.value}`
      )
      .then((res) => {
        console.log(res.data);
        setMachineNames(res.data.machine_details);
      })
      .catch((err) => {
        console.log(err);
        alert(err.response?.data?.message + "!");
      });
  }

  function formatTime(time) {
    try {
      const date = new Date(`1970-01-01T${time}Z`);
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

  function showTime(time) {
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

  function generateTimes() {
    const times = [];
    let current = new Date("1970-01-01T00:00:00Z");
    const end = new Date("1970-01-01T23:59:59Z");
    while (current <= end) {
      const timeString = current.toISOString().substr(11, 5);
      times.push(timeString);
      current = new Date(current.getTime() + 30 * 60000);
    }
    return times;
  }

  function generateSlotTimes(slot) {
    const times = generateTimes();
    if (slot === "morning") {
      return times.filter((time) => time >= "06:00" && time < "12:00");
    } else if (slot === "afternoon") {
      return times.filter((time) => time >= "12:00" && time < "18:00");
    } else if (slot === "evening") {
      return times.filter((time) => time >= "18:00" && time < "23:59");
    }
    return [];
  }

  function handleAddDoctor() {
    if (
      inputTime !== "select" &&
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
      setInputSlot("select");
      setInputMachine("select");
      setInputDoctor("select");
      setInputTime("select");
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
        alert(err.response?.data?.message + "!");
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
        alert(err.response?.data?.message + "!");
      });
  };

  const handleShowInput = () => {
    setInputVisible(!inputVisible);
  };

  useEffect(() => {
    handleShow();
    handleData();
  }, []);

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
              <div className="grid grid-cols-4 transition-transform lg:grid-cols-5 md:grid-cols-5 sm:grid-cols-6 gap-3 p-1 min-w-fit xl:flex">
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
                        {name.first_name} {name.last_name}
                      </option>
                    ))}
                </select>
                <select
                  name="machine"
                  value={inputMachine}
                  onChange={handleMachineChange}
                  className="py-1 px-2 rounded-md border border-black"
                >
                  <option value="select" disabled>
                    Select Machine
                  </option>
                  {machineName.map((name) => (
                    <option key={name.id} value={name.id}>
                      {name.name}
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

                <select
                  name="time"
                  value={inputTime}
                  onChange={(e) => setInputTime(e.target.value)}
                  className="py-1 px-2 rounded-md border border-black"
                >
                  <option value="select" disabled>
                    Select Time
                  </option>
                  {times.map((time, index) => (
                    <option key={index} value={time}>
                      {formatTime(time)}
                    </option>
                  ))}
                </select>

                <button
                  className="max-h-10 flex items-center justify-center border cursor-pointer bg-[#1F2937] text-white hover:bg-white hover:text-black p-3 rounded-md"
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
                  <th className="text-sm uppercase tracking-wide font-medium py-3 px-4 text-left">
                    Machine
                  </th>
                  <th className="text-sm uppercase tracking-wide font-medium py-3 px-4 text-left">
                    Doctor
                  </th>
                  <th className="text-sm uppercase tracking-wide font-medium py-3 px-4 text-left">
                    Slot
                  </th>
                  <th className="text-sm uppercase tracking-wide font-medium py-3 px-4 text-left">
                    Time
                  </th>
                  <th className="text-sm uppercase tracking-wide font-medium py-3 px-4 text-left">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {data.length === 0 ? (
                  <tr>
                    <th
                      className="uppercase tracking-wide font-medium pt-[15rem] text-xl"
                      colSpan={8}
                    >
                      No Machine List Found!
                    </th>
                  </tr>
                ) : (
                  data.map((doctor, index) => (
                    <tr key={index} className="map">
                      <td className="py-3 px-4 border-b border-b-gray-50">
                        <span className="text-black text-base font-medium ml-1">
                          {doctor.machine_detail.name}
                        </span>
                      </td>
                      <td className="py-3 px-4 border-b border-b-gray-50">
                        <span className="text-black text-base font-medium ml-1">
                          {doctor.doctor.first_name} {doctor.doctor.last_name}
                        </span>
                      </td>
                      <td className="py-3 px-4 border-b border-b-gray-50">
                        <span className="text-black text-base font-medium ml-1">
                          {doctor.slot[0]?.toUpperCase() +
                            doctor.slot?.slice(1)}
                        </span>
                      </td>
                      <td className="py-3 px-4 border-b border-b-gray-50">
                        <span className="text-black text-base font-medium ml-1">
                          {showTime(doctor.time)}
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
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
