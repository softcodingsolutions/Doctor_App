import React, { useState, useEffect } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { MdOutlineEdit } from "react-icons/md";

export default function DoctorList() {
  const [inputName, setInputName] = useState("");
  const [inputSpecification, setInputSpecification] = useState("");
  const [inputEmail, setInputEmail] = useState("");
  const [doctors, setDoctors] = useState([]);
  const [editedName, setEditedName] = useState("");
  const [editedSpecification, setEditedSpecification] = useState("");
  const [editedEmail, setEditedEmail] = useState("");
  const [editIndex, setEditIndex] = useState(null);
  const [inputVisible, setInputVisible] = useState(false);

  function handleNameChange(e) {
    setInputName(e.target.value);
  }

  function handleSpecificationChange(e) {
    setInputSpecification(e.target.value);
  }

  function handleEmailChange(e) {
    setInputEmail(e.target.value);
  }

  function handleAddDoctor() {
    if (inputName && inputSpecification && inputEmail) {
      const newDoctor = {
        name: inputName,
        specification: inputSpecification,
        email: inputEmail,
      };
      setDoctors([...doctors, newDoctor]);
      setInputName("");
      setInputSpecification("");
      setInputEmail("");
    }
  }

  const handleRemoveDoctor = (index) => {
    const updatedDoctors = doctors.filter((_, i) => i !== index);
    setDoctors(updatedDoctors);
  };

  const handleEditDoctor = (index, name, specification, email) => {
    setEditIndex(index);
    setEditedName(name);
    setEditedSpecification(specification);
    setEditedEmail(email);
  };

  const handleUpdateDoctor = () => {
    const updatedDoctors = [...doctors];
    updatedDoctors[editIndex] = {
      name: editedName,
      specification: editedSpecification,
      email: editedEmail,
    };
    setDoctors(updatedDoctors);
    setEditIndex(null);
    setEditedName("");
    setEditedSpecification("");
    setEditedEmail("");
  };

  const handleShowInput = () => {
    setInputVisible(!inputVisible);
  };

  return (
    <div className="w-full p-2">
      <div className="rounded-lg bg-card h-[85vh] bg-white">
        <div className="flex flex-col  px-4 py-3 h-full space-y-4">
          <div className="">
            <button
              onClick={handleShowInput}
              className="min-w-fit  border cursor-pointer bg-[#1F2937] text-white p-2 rounded-md"
            >
              Add Doctor
            </button>
            {inputVisible && (
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
                  onChange={handleSpecificationChange}
                  value={inputSpecification}
                  placeholder="Specification"
                />
                <input
                  className="border-2 rounded-md p-2"
                  type="text"
                  onChange={handleEmailChange}
                  value={inputEmail}
                  placeholder="Email"
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
                    Name
                  </th>
                  <th className="text-[12px] uppercase tracking-wide font-medium py-3 px-4 text-left">
                    Specification
                  </th>
                  <th className="text-[12px] uppercase tracking-wide font-medium py-3 px-4 text-left">
                    Email
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
                            value={editedSpecification}
                            onChange={(e) =>
                              setEditedSpecification(e.target.value)
                            }
                            placeholder="Specification"
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
                            {doctor.specification}
                          </span>
                        </td>
                        <td className="py-3 px-4 border-b border-b-gray-50">
                          <span className="text-black text-sm font-medium ml-1">
                            {doctor.email}
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
                                doctor.specification,
                                doctor.email
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
