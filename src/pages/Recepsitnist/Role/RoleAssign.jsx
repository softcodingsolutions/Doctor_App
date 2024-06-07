import React, { useState } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { MdOutlineEdit } from "react-icons/md";

export default function RoleAssign() {
  const [inputName, setInputName] = useState("");
  const [inputMobile, setInputMobile] = useState("");
  const [inputEmail, setInputEmail] = useState("");
  const [inputRole, setInputRole] = useState("");
  const [doctors, setDoctors] = useState([]);
  const [editedName, setEditedName] = useState("");
  const [editedMobile, setEditedMobile] = useState("");
  const [editedEmail, setEditedEmail] = useState("");
  const [editedRole, setEditedRole] = useState("");
  const [editIndex, setEditIndex] = useState(null);

  function handleNameChange(e) {
    setInputName(e.target.value);
  }

  function handleMobileChange(e) {
    setInputMobile(e.target.value);
  }

  function handleEmailChange(e) {
    setInputEmail(e.target.value);
  }

  function handleRoleChange(e) {
    setInputRole(e.target.value);
  }

  function handleAddDoctor() {
    if (inputName && inputMobile && inputEmail && inputRole) {
      const newDoctor = {
        name: inputName,
        mobile: inputMobile,
        email: inputEmail,
        role: inputRole,
      };
      setDoctors([...doctors, newDoctor]);
      setInputName("");
      setInputMobile("");
      setInputEmail("");
      setInputRole("");
    }
  }

  const handleRemoveDoctor = (index) => {
    const updatedDoctors = doctors.filter((_, i) => i !== index);
    setDoctors(updatedDoctors);
  };

  const handleEditDoctor = (index, name, mobile, email, role) => {
    setEditIndex(index);
    setEditedName(name);
    setEditedMobile(mobile);
    setEditedEmail(email);
    setEditedRole(role);
  };

  const handleUpdateDoctor = () => {
    const updatedDoctors = [...doctors];
    updatedDoctors[editIndex] = {
      name: editedName,
      mobile: editedMobile,
      email: editedEmail,
      role: editedRole,
    };
    setDoctors(updatedDoctors);
    setEditIndex(null);
    setEditedName("");
    setEditedMobile("");
    setEditedEmail("");
    setEditedRole("");
  };


  return (
    <div className="w-full p-5">
      <div className="rounded-lg bg-card h-[85vh] bg-white">
        <div className="flex flex-col px-4 py-3 h-full space-y-4">
          <div className="">
            <div>
                <h2 className="flex gap-5 m-2 text-xl font-semibold">Create Role</h2>
            </div>
              <div className="flex gap-5 m-2">
                <input
                  type="text"
                  className="border-2 rounded-md p-2"
                  onChange={handleNameChange}
                  value={inputName}
                  placeholder="Name"
                />
                <input
                  className="border-2 rounded-md p-2"
                  type="text"
                  onChange={handleMobileChange}
                  value={inputMobile}
                  placeholder="Mobile Number"
                />
                <input
                  className="border-2 rounded-md p-2"
                  type="text"
                  onChange={handleEmailChange}
                  value={inputEmail}
                  placeholder="Email"
                />
                <select
                  className="border-2 rounded-md p-2"
                  onChange={handleRoleChange}
                  value={inputRole}
                >
                  <option value="" disabled>
                    Select Role
                  </option>
                  <option value="Doctor">Doctor</option>
                  <option value="Nurse">Nurse</option>
                  <option value="Technician">Technician</option>
                  <option value="Administrator">Administrator</option>
                </select>
                <button
                  className="min-w-fit flex items-center justify-center border cursor-pointer hover:bg-[#1F2937] hover:text-white p-2 rounded-md"
                  onClick={handleAddDoctor}
                >
                  ADD
                </button>
              </div>
            
          </div>

          <div className="animate-fade-left animate-delay-75 shadow-gray-400 shadow-inner border rounded-md border-gray-100 animate-once animate-ease-out overflow-auto h-[93%]">
            <table className="w-full min-w-[460px] z-0">
              <thead className="uppercase">
                <tr className="bg-[#1F2937] text-white rounded-md">
                  <th className="text-[12px] uppercase tracking-wide font-medium py-3 px-4 text-left">
                    Name
                  </th>
                  <th className="text-[12px] uppercase tracking-wide font-medium py-3 px-4 text-left">
                    Mobile Number
                  </th>
                  <th className="text-[12px] uppercase tracking-wide font-medium py-3 px-4 text-left">
                    Email
                  </th>
                  <th className="text-[12px] uppercase tracking-wide font-medium py-3 px-4 text-left">
                    Role
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
                          <input
                            type="text"
                            value={editedName}
                            onChange={(e) => setEditedName(e.target.value)}
                            placeholder="Name"
                            className="border-2 rounded-md p-2"
                          />
                        </td>
                        <td className="text-[12px] uppercase tracking-wide font-medium py-3 px-4 text-left">
                          <input
                            type="text"
                            value={editedMobile}
                            onChange={(e) =>
                              setEditedMobile(e.target.value)
                            }
                            placeholder="Mobile Number"
                            className="border-2 rounded-md p-2"
                          />
                        </td>
                        <td className="text-[12px] uppercase tracking-wide font-medium py-3 px-4 text-left">
                          <input
                            type="text"
                            value={editedEmail}
                            onChange={(e) => setEditedEmail(e.target.value)}
                            placeholder="Email"
                            className="border-2 rounded-md p-2"
                          />
                        </td>
                        <td className="text-[12px] uppercase tracking-wide font-medium py-3 px-4 text-left">
                          <select
                            className="border-2 rounded-md p-2"
                            value={editedRole}
                            onChange={(e) => setEditedRole(e.target.value)}
                          >
                            <option value="Doctor">Doctor</option>
                            <option value="Nurse">Nurse</option>
                            <option value="Technician">Technician</option>
                            <option value="Administrator">Administrator</option>
                          </select>
                        </td>
                        <td className="text-[12px] uppercase tracking-wide font-medium py-3 px-4 text-left">
                          <button onClick={handleUpdateDoctor} className="min-w-fit border cursor-pointer hover:bg-[#1F2937] hover:text-white p-2 m-2 rounded-md">Update</button>
                          <button onClick={() => setEditIndex(null)} className="min-w-fit border cursor-pointer hover:bg-[#1F2937] hover:text-white p-2 m-2 rounded-md">Cancel</button>
                        </td>
                      </>
                    ) : (
                      <>
                        <td className="py-3 px-4 border-b border-b-gray-50">
                          <span className="text-black text-sm font-medium ml-1">
                            {doctor.name}
                          </span>
                        </td>
                        <td className="py-3 px-4 border-b border-b-gray-50">
                          <span className="text-black text-sm font-medium ml-1">
                            {doctor.mobile}
                          </span>
                        </td>
                        <td className="py-3 px-4 border-b border-b-gray-50">
                          <span className="text-black text-sm font-medium ml-1">
                            {doctor.email}
                          </span>
                        </td>
                        <td className="py-3 px-4 border-b border-b-gray-50">
                          <span className="text-black text-sm font-medium ml-1">
                            {doctor.role}
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
                            onClick={() =>
                              handleEditDoctor(
                                index,
                                doctor.name,
                                doctor.mobile,
                                doctor.email,
                                doctor.role
                              )
                            }
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
