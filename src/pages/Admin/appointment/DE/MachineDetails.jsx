import { useEffect, useState } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { MdOutlineEdit } from "react-icons/md";
import axios from "axios";
import InsideLoader from "../../../InsideLoader";
import Swal from "sweetalert2";

export default function MachineDetails() {
  const [inputMachineName, setInputMachineName] = useState("");
  const [machines, setMachines] = useState([]);
  const [editedMachineName, setEditedMachineName] = useState("");
  const [editedSlot, setEditedSlot] = useState("");
  const [editedDoctorId, setEditedDoctorId] = useState("");
  const [editIndex, setEditIndex] = useState(null);
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
      });
  };

  function handleGiveDoctorId(e) {
    console.log(e.target.value);
    setDoctorId(e.target.value);
  }

  function handleMachineNameChange(e) {
    setInputMachineName(e.target.value);
  }

  function handleAddMachine() {
    if (inputMachineName && doctorId) {
      const newMachine = {
        machineName: inputMachineName,
      };
      setMachines([...machines, newMachine]);
      setInputMachineName("");

      setSlot("");
    }

    axios
      .get(`/api/v1/users/app_creds`)
      .then((res) => {
        const formdata = new FormData();
        formdata.append("machine_detail[name]", inputMachineName);
        formdata.append("machine_detail[quantity]", 1);
        formdata.append("machine_detail[user_id]", doctorId);
        formdata.append("client_id", res.data?.client_id);
        formdata.append("machine_detail[slot_number]", slot);
        axios.post(`/api/v1/machine_details`, formdata).then((res) => {
          console.log(res);
          Swal.fire({
            position: "top-end",
            showConfirmButton: false,
            timer: 1500,
            icon: "success",
            title: "Added!",
            text: "A new machine has been added.",
          });
          handleShow();
        });
      })
      .catch((err) => {
        console.log(err);
        alert(err.response?.data?.message + "!");
      });
  }

  const handleRemoveMachine = (id) => {
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
        axios
          .delete(`/api/v1/machine_details/${id}`)
          .then((res) => {
            console.log(res, "DELETE");
            handleShow();
            Swal.fire({
              title: "Deleted!",
              text: "Your machine has been deleted.",
              icon: "success",
            });
          })
          .catch((err) => {
            console.log(err);
            alert(err.response?.data?.message + "!");
          });
      }
    });
  };

  const handleSlot = (e) => {
    setSlot(e.target.value);
  };

  const handleEditMachine = (
    index,
    machineName,

    slot,
    doctorId
  ) => {
    setEditIndex(index);
    setEditedMachineName(machineName);

    setEditedSlot(slot);
    setEditedDoctorId(doctorId);
  };

  const handleUpdateMachine = () => {
    const machine = machines[editIndex];
    const updatedMachine = {
      name: editedMachineName,

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

        setEditedSlot("");
        setEditedDoctorId("");
      })
      .catch((err) => {
        console.log(err);
        alert(err.response?.data?.message + "!");
      });
  };

  useEffect(() => {
    handleShow();
  }, []);

  if (loading) {
    return <InsideLoader />;
  }

  return (
    <div className="w-full h-full">
      <div className="rounded-lg bg-card  bg-white">
        <div className="flex flex-col px-4 py-3 h-full space-y-4">
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
              className="max-h-10 flex items-center justify-center border cursor-pointer bg-[#1F2937] text-white hover:scale-105 p-3 rounded-md"
              onClick={handleAddMachine}
            >
              ADD Machine Detail
            </button>
          </div>

          <div className="animate-fade-left animate-delay-75  border rounded-md border-gray-100 animate-once animate-ease-out h-[25rem] overflow-y-auto mt-4 ">
            <table className="w-full  rounded-md border-gray-300 text-sm text-left ">
              <thead className="uppercase sticky top-0 z-10 text-[#71717A] font-medium border-b-2 bg-white">
                <tr>
                  <th className="border-b-1 p-3">Doctor Name</th>

                  <th className="border-b-1 p-3">Machine Name</th>

                  <th className="border-b-1 p-3">Slot</th>

                  <th className="border-b-1 p-3">Action</th>
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
                    <tr key={index} className="map  hover:bg-gray-200">
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
                              value={editedSlot}
                              onChange={(e) => setEditedSlot(e.target.value)}
                              placeholder="Slot Number"
                              className="border-2 rounded-md p-2"
                              min="0"
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
                          <td className="border-b-1 p-3">
                            <span className="text-black text-base font-medium">
                              {machine?.user?.first_name}{" "}
                              {machine?.user?.last_name}
                            </span>
                          </td>
                          <td className="border-b-1 p-3">
                            <span className="text-black text-base font-medium">
                              {machine.name}
                            </span>
                          </td>

                          <td className="border-b-1 p-3">
                            <span className="text-black text-base font-medium">
                              {machine.slot_number}
                            </span>
                          </td>

                          <td className="border-b-1 p-3 flex items-center gap-2">
                            <button
                              onClick={() =>
                                handleEditMachine(
                                  index,
                                  machine.name,
                                  // machine.quantity,
                                  // machine.brief,
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
