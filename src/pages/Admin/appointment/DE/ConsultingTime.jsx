import React, { useState } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { MdOutlineEdit } from "react-icons/md";

export default function ConsultingTime() {
  const [inputTime, setInputTime] = useState("");
  const [inputSlot, setInputSlot] = useState("select");
  const [doctors, setDoctors] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const [editedTime, setEditedTime] = useState("");
  const [editedSlot, setEditedSlot] = useState("");
  const [inputVisible, setInputVisible] = useState(false);

  function handleTimeChange(e) {
    setInputTime(e.target.value);
  }

  function handleSlotChange(e) {
    setInputSlot(e.target.value);
  }

  function formatTime(time) {
    const [hours, minutes] = time.split(":");
    const date = new Date(0, 0, 0, hours, minutes);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  }

  function handleAddDoctor() {
    if (inputTime && inputSlot !== "select") {
      const newDoctor = {
        time: formatTime(inputTime),
        slot: inputSlot,
      };
      setDoctors([...doctors, newDoctor]);
      setInputTime("");
      setInputSlot("select");
    }
  }

  const handleRemoveDoctor = (index) => {
    const updatedDoctors = doctors.filter((_, i) => i !== index);
    setDoctors(updatedDoctors);
  };

  const handleEditDoctor = (index, doctor) => {
    setEditIndex(index);
    setEditedTime(doctor.time);
    setEditedSlot(doctor.slot);
  };

  const handleUpdateDoctor = () => {
    const updatedDoctors = [...doctors];
    updatedDoctors[editIndex] = {
      time: formatTime(editedTime),
      slot: editedSlot,
    };
    setDoctors(updatedDoctors);
    setEditIndex(null);
    setEditedTime("");
    setEditedSlot("");
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
              Add Consulting Time
            </button>
            {inputVisible && (
              <div className="flex gap-5 m-2">
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
                {doctors.map((doctor, index) => (
                  <tr key={index} className="map">
                    {editIndex === index ? (
                      <>
                        <td className="text-[12px] uppercase tracking-wide font-medium py-3 px-4 text-left">
                          <select
                            name="slot"
                            value={editedSlot}
                            onChange={(e) => setEditedSlot(e.target.value)}
                            className="py-1 px-2 rounded-md border border-black "
                          >
                            <option value="select" disabled>
                              Select Slot
                            </option>
                            <option value="morning">Morning</option>
                            <option value="afternoon">Afternoon</option>
                            <option value="evening">Evening</option>
                          </select>
                        </td>
                        <td className="text-[12px] uppercase tracking-wide font-medium py-3 px-4 text-left">
                          <input
                            type="time"
                            value={editedTime}
                            onChange={(e) => setEditedTime(e.target.value)}
                            placeholder="Time"
                            className="border-2 rounded-md p-2"
                          />
                        </td>
                        <td className="text-[12px] uppercase tracking-wide font-medium py-3 px-4 text-left">
                          <button
                            onClick={handleUpdateDoctor}
                            className="min-w-fit border cursor-pointer hover:bg-[#1F2937] hover:text-white p-2 m-2 rounded-md"
                          >
                            Update
                          </button>
                          <button
                            onClick={() => setEditIndex(null)}
                            className="min-w-fit border cursor-pointer hover:bg-[#1F2937] hover:text-white p-2 m-2 rounded-md"
                          >
                            Cancel
                          </button>
                        </td>
                      </>
                    ) : (
                      <>
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
                            onClick={() => handleRemoveDoctor(index)}
                            className="min-w-fit border cursor-pointer hover:bg-[#1F2937] hover:text-white p-2 m-2 rounded-md"
                          >
                            <AiOutlineDelete />
                          </button>
                          <button
                            onClick={() => handleEditDoctor(index, doctor)}
                            className="min-w-fit border cursor-pointer hover:bg-[#1F2937] hover:text-white p-2 m-2 rounded-md"
                          >
                            <MdOutlineEdit />
                          </button>
                        </td>
                      </>
                    )}
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
