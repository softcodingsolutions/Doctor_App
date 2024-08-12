import { useState, useEffect } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import axios from "axios";
import InsideLoader from "../../../InsideLoader";

export default function ConsultingTime() {
  const [inputTime, setInputTime] = useState("");
  const [inputSlot, setInputSlot] = useState("select");
  const [inputDoctor, setInputDoctor] = useState("select");
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [inputVisible, setInputVisible] = useState(false);
  const [data, setData] = useState([]);
  const [doctorName, setDoctorNames] = useState({});

  const handleShow = () => {
    axios
      .get(`api/v1/users`)
      .then((res) => {
        console.log(res);
        setDoctorNames(res.data.users);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        alert(err.response?.data?.message + "!");
      });
  };

  const handleData = () => {
    axios
      .get(`/api/v1/consulting_times`)
      .then((res) => {
        console.log(res);
        setData(res.data.consulting_times);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        alert(err.response?.data?.message + "!");
      });
  };

  function handleTimeChange(e) {
    setInputTime(e.target.value);
  }

  function handleSlotChange(e) {
    setInputSlot(e.target.value);
  }

  function handleDoctorChange(e) {
    setInputDoctor(e.target.value);
  }

  function formatTime(dateTimeString) {
    const date = new Date(dateTimeString);
    return date.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  }

  function handleAddDoctor() {
    if (inputTime && inputSlot !== "select" && inputDoctor !== "select") {
      const newDoctor = {
        slot: inputSlot,
        name: inputDoctor,
      };
      setDoctors([...doctors, newDoctor]);
      setInputTime("");
      setInputSlot("select");

      const formdata = new FormData();
      formdata.append("consulting_time[slot]", inputSlot);
      formdata.append("consulting_time[time]", inputTime);

      axios
        .post(`/api/v1/consulting_times?id=${inputDoctor}`, formdata)
        .then((res) => {
          console.log(res, "ADD");
          handleData();
        })
        .catch((err) => {
          console.log(err);
          alert(err.response?.data?.message + "!");
        });
    }
  }

  const handleRemoveDoctor = (id) => {
    axios
      .delete(`/api/v1/consulting_times/${id}`)
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

  if (loading) {
    return <InsideLoader />;
  }

  return (
    <div className="w-full p-2">
      <div className="rounded-lg bg-card h-[85vh] bg-white">
        <div className="flex px-4 py-3 h-full flex-col space-y-4">
          <div className="wooo">
            <button
              onClick={handleShowInput}
              className="min-w-fit flex items-center justify-center border cursor-pointer bg-[#1F2937] text-white p-2 rounded-md"
            >
              Add Consulting Time
            </button>
            {inputVisible && (
              <div className="grid grid-cols-4 transition-transform lg:grid-cols-5 md:grid-cols-5 sm:grid-cols-6 gap-3 p-1 min-w-fit xl:flex">
                <select
                  name="doctor"
                  value={inputDoctor}
                  onChange={handleDoctorChange}
                  className="py-1 px-2 rounded-md border border-black "
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
                  name="slot"
                  value={inputSlot}
                  onChange={handleSlotChange}
                  className="py-1 px-2 rounded-md border border-black "
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
                {" "}
                {data.length === 0 ? (
                  <tr>
                    <th
                      className="uppercase tracking-wide font-medium pt-[15rem] text-xl"
                      colSpan={8}
                    >
                      No Consulting Timeslots Found!
                    </th>
                  </tr>
                ) : (
                  data.map((doctor, index) => (
                    <tr key={index} className="map">
                      <td className="py-3 px-4 border-b border-b-gray-50">
                        <span className="text-black text-base font-medium ml-1">
                          {doctor.user_name}
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
                          {formatTime(doctor.time)}
                        </span>
                      </td>
                      <td className="py-3 px-4 border-b border-b-gray-50">
                        <button
                          onClick={() => handleRemoveDoctor(doctor.id)}
                          className="min-w-fit border text-base cursor-pointer hover:bg-[#1F2937] hover:text-white p-2 m-2 rounded-md"
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
