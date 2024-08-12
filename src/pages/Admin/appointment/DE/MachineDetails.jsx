import { useEffect, useState } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { MdOutlineEdit } from "react-icons/md";
import axios from "axios";
import InsideLoader from "../../../InsideLoader";

export default function MachineDetails() {
  const [inputMachineName, setInputMachineName] = useState("");
  const [inputQuantity, setInputQuantity] = useState("");
  const [inputBrief, setInputBrief] = useState("");
  const [machines, setMachines] = useState([]);
  const [editedMachineName, setEditedMachineName] = useState("");
  const [editedQuantity, setEditedQuantity] = useState("");
  const [editedBrief, setEditedBrief] = useState("");
  const [editedSlot, setEditedSlot] = useState("");
  const [editedDoctorId, setEditedDoctorId] = useState("");
  const [editIndex, setEditIndex] = useState(null);
  const [inputVisible, setInputVisible] = useState(false);
  const [doctor, setDoctor] = useState([]);
  const [doctorId, setDoctorId] = useState(0);
  const [loading, setLoading] = useState(true);
  const [slot, setSlot] = useState("");

  const handleShow = () => {
    axios
      .get(`/api/v1/machine_details`)
      .then((res) => {
        console.log(res.data, "Show ");
        setMachines(res.data?.machine_details);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        alert(err.response?.data?.message + "!");
        setLoading(false);
      });

    axios
      .get(`api/v1/users`)
      .then((res) => {
        console.log(
          res.data.users.filter((user) => user.role === "doctor"),
          "Doctor"
        );
        setDoctor(res.data.users.filter((user) => user.role === "doctor"));
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        alert(err.response?.data?.message + "!");
      });
  };

  function handleGiveDoctorId(e) {
    console.log(e.target.value);
    setDoctorId(e.target.value);
  }

  function handleMachineNameChange(e) {
    setInputMachineName(e.target.value);
  }

  function handleQuantityChange(e) {
    const value = e.target.value;
    if (value >= 0) {
      setInputQuantity(value);
    }
  }

  function handleBriefChange(e) {
    setInputBrief(e.target.value);
  }

  function handleAddMachine() {
    if (inputMachineName && inputQuantity && inputBrief && doctorId) {
      const newMachine = {
        machineName: inputMachineName,
        quantity: inputQuantity,
        brief: inputBrief,
      };
      setMachines([...machines, newMachine]);
      setInputMachineName("");
      setInputQuantity("");
      setInputBrief("");
      setSlot("");
    }

    axios
      .get(`/api/v1/users/app_creds`)
      .then((res) => {
        const formdata = new FormData();
        formdata.append("machine_detail[name]", inputMachineName);
        formdata.append("machine_detail[quantity]", inputQuantity);
        formdata.append("machine_detail[brief]", inputBrief);
        formdata.append("machine_detail[user_id]", doctorId);
        formdata.append("client_id", res.data?.client_id);
        formdata.append("machine_detail[slot_number]", slot);
        axios.post(`/api/v1/machine_details`, formdata).then((res) => {
          console.log(res);
          handleShow();
        });
      })
      .catch((err) => {
        console.log(err);
        alert(err.response?.data?.message + "!");
      });
  }

  const handleRemoveMachine = (id) => {
    axios
      .delete(`/api/v1/machine_details/${id}`)
      .then((res) => {
        console.log(res);
        handleShow();
      })
      .catch((err) => {
        console.log(err);
        alert(err.response?.data?.message + "!");
      });
  };

  const handleSlot = (e) => {
    setSlot(e.target.value);
  };

  const handleEditMachine = (
    index,
    machineName,
    quantity,
    brief,
    slot,
    doctorId
  ) => {
    setEditIndex(index);
    setEditedMachineName(machineName);
    setEditedQuantity(quantity);
    setEditedBrief(brief);
    setEditedSlot(slot);
    setEditedDoctorId(doctorId);
  };

  const handleUpdateMachine = () => {
    const machine = machines[editIndex];
    const updatedMachine = {
      name: editedMachineName,
      quantity: editedQuantity,
      brief: editedBrief,
      slot_number: editedSlot,
      user_id: editedDoctorId,
    };

    axios
      .put(`/api/v1/machine_details/${machine.id}`, updatedMachine)
      .then((res) => {
        console.log(res);
        handleShow();
        setEditIndex(null);
        setEditedMachineName("");
        setEditedQuantity("");
        setEditedBrief("");
        setEditedSlot("");
        setEditedDoctorId("");
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
  }, []);

  if (loading) {
    return <InsideLoader />;
  }

  return (
    <div className="w-full p-2">
      <div className="rounded-lg bg-card h-[85vh] bg-white">
        <div className="flex flex-col px-4 py-3 h-full space-y-4">
          <div className="">
            <button
              onClick={handleShowInput}
              className="min-w-fit border cursor-pointer bg-[#1F2937] text-white p-2 rounded-md"
            >
              Add Machine Details
            </button>
            {inputVisible && (
              <div className="grid grid-cols-4 transition-transform lg:grid-cols-5 md:grid-cols-5 sm:grid-cols-6 gap-3 p-1 min-w-fit xl:flex">
                <select
                  defaultValue="Select"
                  onChange={handleGiveDoctorId}
                  className="border-2 rounded-md p-2"
                >
                  <option disabled value="Select">
                    Select Doctor
                  </option>
                  {doctor.map((res) => {
                    return (
                      <option key={res.id} value={res.id}>
                        {res.first_name + " " + res.last_name}
                      </option>
                    );
                  })}
                </select>
                <input
                  type="text"
                  className="border-2 rounded-md p-2"
                  onChange={handleMachineNameChange}
                  value={inputMachineName}
                  placeholder="Machine Name"
                />
                <input
                  className="border-2 rounded-md p-2"
                  type="number"
                  onChange={handleQuantityChange}
                  value={inputQuantity}
                  placeholder="Quantity"
                  min="0"
                />
                <input
                  className="border-2 rounded-md p-2"
                  type="text"
                  onChange={handleBriefChange}
                  value={inputBrief}
                  placeholder="Brief"
                />
                <div className="flex flex-col">
                  <input
                    className="border-2 rounded-md p-2"
                    type="number"
                    onChange={handleSlot}
                    value={slot}
                    placeholder="Number of Slot"
                    min="0"
                  />
                  <p className="text-gray-600 text-sm mt-1">1 Slot = 30min</p>
                </div>

                <button
                  className="max-h-10 flex items-center justify-center border cursor-pointer bg-[#1F2937] text-white hover:bg-white hover:text-black p-3 rounded-md"
                  onClick={handleAddMachine}
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
                    Doctor Name
                  </th>
                  <th className="text-sm uppercase tracking-wide font-medium py-3 px-4 text-left">
                    Machine Name
                  </th>
                  <th className="text-sm uppercase tracking-wide font-medium py-3 px-4 text-left">
                    Quantity
                  </th>
                  <th className="text-sm uppercase tracking-wide font-medium py-3 px-4 text-left">
                    Slot
                  </th>
                  <th className="text-sm uppercase tracking-wide font-medium py-3 px-4 text-left">
                    Brief
                  </th>
                  <th className="text-sm uppercase tracking-wide font-medium py-3 px-4 text-left">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {machines.length === 0 ? (
                  <tr>
                    <th
                      className="uppercase tracking-wide font-medium pt-[15rem] text-xl"
                      colSpan={8}
                    >
                      No Machine List Found!
                    </th>
                  </tr>
                ) : (
                  machines.map((machine, index) => (
                    <tr key={index} className="map">
                      {editIndex === index ? (
                        <>
                          <td className="text-sm uppercase tracking-wide font-medium py-3 px-4 text-left">
                            <select
                              value={editedDoctorId}
                              onChange={(e) =>
                                setEditedDoctorId(e.target.value)
                              }
                              className="border-2 rounded-md p-2"
                            >
                              <option disabled value="">
                                Select Doctor
                              </option>
                              {doctor.map((res) => (
                                <option key={res.id} value={res.id}>
                                  {res.first_name + " " + res.last_name}
                                </option>
                              ))}
                            </select>
                          </td>
                          <td className="text-sm uppercase tracking-wide font-medium py-3 px-4 text-left">
                            <input
                              type="text"
                              value={editedMachineName}
                              onChange={(e) =>
                                setEditedMachineName(e.target.value)
                              }
                              placeholder="Machine Name"
                              className="border-2 rounded-md p-2"
                            />
                          </td>
                          <td className="text-sm uppercase tracking-wide font-medium py-3 px-4 text-left">
                            <input
                              type="number"
                              value={editedQuantity}
                              onChange={(e) =>
                                setEditedQuantity(e.target.value)
                              }
                              placeholder="Quantity"
                              className="border-2 rounded-md p-2"
                              min="0"
                            />
                          </td>
                          <td className="text-sm uppercase tracking-wide font-medium py-3 px-4 text-left">
                            <input
                              type="number"
                              value={editedSlot}
                              onChange={(e) => setEditedSlot(e.target.value)}
                              placeholder="Slot Number"
                              className="border-2 rounded-md p-2"
                              min="0"
                            />
                          </td>
                          <td className="text-sm uppercase tracking-wide font-medium py-3 px-4 text-left">
                            <input
                              type="text"
                              value={editedBrief}
                              onChange={(e) => setEditedBrief(e.target.value)}
                              placeholder="Brief"
                              className="border-2 rounded-md p-2"
                            />
                          </td>
                          <td className="text-sm uppercase tracking-wide font-medium py-3 px-4 text-left">
                            <button
                              onClick={handleUpdateMachine}
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
                            <span className="text-black text-base font-medium ml-1">
                              {machine?.user?.first_name}{" "}
                              {machine?.user?.last_name}
                            </span>
                          </td>
                          <td className="py-3 px-4 border-b border-b-gray-50">
                            <span className="text-black text-base font-medium ml-1">
                              {machine.name}
                            </span>
                          </td>
                          <td className="py-3 px-4 border-b border-b-gray-50">
                            <span className="text-black text-base font-medium ml-1">
                              {machine.quantity}
                            </span>
                          </td>
                          <td className="py-3 px-4 border-b border-b-gray-50">
                            <span className="text-black text-base font-medium ml-1">
                              {machine.slot_number}
                            </span>
                          </td>
                          <td className="py-3 px-4 border-b border-b-gray-50">
                            <span className="text-black text-base font-medium ml-1">
                              {machine.brief}
                            </span>
                          </td>
                          <td className="py-3 px-4 border-b border-b-gray-50 flex items-center gap-2">
                            <button
                              onClick={() =>
                                handleEditMachine(
                                  index,
                                  machine.name,
                                  machine.quantity,
                                  machine.brief,
                                  machine.slot_number,
                                  machine.user_id
                                )
                              }
                              className="min-w-fit  border cursor-pointer hover:bg-[#1F2937] hover:text-white p-2 m-2 rounded-md"
                            >
                              <MdOutlineEdit size={17} />
                            </button>
                            <button
                              onClick={() => handleRemoveMachine(machine.id)}
                              className="min-w-fit border cursor-pointer hover:bg-[#1F2937] hover:text-white p-2 m-2 rounded-md"
                            >
                              <AiOutlineDelete size={17} />
                            </button>
                          </td>
                        </>
                      )}
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
