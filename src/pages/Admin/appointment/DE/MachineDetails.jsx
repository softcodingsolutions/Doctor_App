import React, { useState } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { MdOutlineEdit } from "react-icons/md";
import Switch from "@mui/joy/Switch";

export default function MachineDetails() {
  const [inputMachineName, setInputMachineName] = useState("");
  const [inputQuantity, setInputQuantity] = useState("");
  const [inputBrief, setInputBrief] = useState("");
  const [machines, setMachines] = useState([]);
  const [editedMachineName, setEditedMachineName] = useState("");
  const [editedQuantity, setEditedQuantity] = useState("");
  const [editedBrief, setEditedBrief] = useState("");
  const [editIndex, setEditIndex] = useState(null);
  const [inputVisible, setInputVisible] = useState(false);

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
    if (inputMachineName && inputQuantity && inputBrief) {
      const newMachine = {
        machineName: inputMachineName,
        quantity: inputQuantity,
        brief: inputBrief,
        enabled: true,
      };
      setMachines([...machines, newMachine]);
      setInputMachineName("");
      setInputQuantity("");
      setInputBrief("");
    }
  }

  const handleRemoveMachine = (index) => {
    const updatedMachines = machines.filter((_, i) => i !== index);
    setMachines(updatedMachines);
  };

  const handleEditMachine = (index, machineName, quantity, brief) => {
    setEditIndex(index);
    setEditedMachineName(machineName);
    setEditedQuantity(quantity);
    setEditedBrief(brief);
  };

  const handleUpdateMachine = () => {
    const updatedMachines = [...machines];
    updatedMachines[editIndex] = {
      ...updatedMachines[editIndex],
      machineName: editedMachineName,
      quantity: editedQuantity,
      brief: editedBrief,
    };
    setMachines(updatedMachines);
    setEditIndex(null);
    setEditedMachineName("");
    setEditedQuantity("");
    setEditedBrief("");
  };

  const handleToggleEnable = (index) => {
    const updatedMachines = [...machines];
    updatedMachines[index].enabled = !updatedMachines[index].enabled;
    setMachines(updatedMachines);
  };

  const handleShowInput = () => {
    setInputVisible(!inputVisible);
  };

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
              <div className="flex gap-5 m-2">
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
                <button
                  className="min-w-fit flex items-center justify-center border cursor-pointer hover:bg-[#1F2937] hover:text-white p-2 rounded-md"
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
                  <th className="text-[12px] uppercase tracking-wide font-medium py-3 px-4 text-left">
                    Machine Name
                  </th>
                  <th className="text-[12px] uppercase tracking-wide font-medium py-3 px-4 text-left">
                    Quantity
                  </th>
                  <th className="text-[12px] uppercase tracking-wide font-medium py-3 px-4 text-left">
                    Brief
                  </th>
                  <th className="text-[12px] uppercase tracking-wide font-medium py-3 px-4 text-left">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {machines.map((machine, index) => (
                  <tr key={index} className="map">
                    {editIndex === index ? (
                      <>
                        <td className="text-[12px] uppercase tracking-wide font-medium py-3 px-4 text-left">
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
                        <td className="text-[12px] uppercase tracking-wide font-medium py-3 px-4 text-left">
                          <input
                            type="number"
                            value={editedQuantity}
                            onChange={(e) => setEditedQuantity(e.target.value)}
                            placeholder="Quantity"
                            className="border-2 rounded-md p-2"
                            min="0"
                          />
                        </td>
                        <td className="text-[12px] uppercase tracking-wide font-medium py-3 px-4 text-left">
                          <input
                            type="text"
                            value={editedBrief}
                            onChange={(e) => setEditedBrief(e.target.value)}
                            placeholder="Brief"
                            className="border-2 rounded-md p-2"
                          />
                        </td>
                        <td className="text-[12px] uppercase tracking-wide font-medium py-3 px-4 text-left">
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
                          <span className="text-black text-sm font-medium ml-1">
                            {machine.machineName}
                          </span>
                        </td>
                        <td className="py-3 px-4 border-b border-b-gray-50">
                          <span className="text-black text-sm font-medium ml-1">
                            {machine.quantity}
                          </span>
                        </td>
                        <td className="py-3 px-4 border-b border-b-gray-50">
                          <span className="text-black text-sm font-medium ml-1">
                            {machine.brief}
                          </span>
                        </td>
                        <td className="py-3 px-4 border-b border-b-gray-50 flex items-center gap-2">
                          <Switch
                            checked={machine.enabled}
                            onChange={() => handleToggleEnable(index)}
                            color={machine.enabled ? "success" : "neutral"}
                            variant={machine.enabled ? "solid" : "solid"}
                            slotProps={{
                              endDecorator: {
                                sx: {
                                  minWidth: 24,
                                },
                              },
                            }}
                          />
                          <button
                            onClick={() =>
                              handleEditMachine(
                                index,
                                machine.machineName,
                                machine.quantity,
                                machine.brief
                              )
                            }
                            className="min-w-fit border cursor-pointer hover:bg-[#1F2937] hover:text-white p-2 m-2 rounded-md"
                          >
                            <MdOutlineEdit />
                          </button>
                          <button
                            onClick={() => handleRemoveMachine(index)}
                            className="min-w-fit border cursor-pointer hover:bg-[#1F2937] hover:text-white p-2 m-2 rounded-md"
                          >
                            <AiOutlineDelete />
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
