import axios from "axios";
import React, { useEffect, useState } from "react";
import { AiOutlineDelete } from "react-icons/ai";

export default function RoleAssign() {
  const [inputName, setInputName] = useState("");
  const [inputMobile, setInputMobile] = useState("");
  const [inputEmail, setInputEmail] = useState("");
  const [inputRole, setInputRole] = useState("");
  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    handleShow();
  }, []);

  const handleShow = () => {
    axios
      .get(`api/v1/users`)
      .then((res) => {
        console.log(res);
        setDoctors(res.data.users);
      })
      .catch((err) => {
        console.log(err);
      });
  };
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

      axios
        .get(`/api/v1/users/app_creds`)
        .then((res) => {
          console.log(res);
          const formdata = new FormData();
          formdata.append("user[first_name]", inputName);
          formdata.append("user[last_name]", inputName);
          formdata.append("user[phone_number]", inputMobile);
          formdata.append("user[email]", inputEmail);
          formdata.append("user[role]", inputRole);
          formdata.append("client_id", res.data?.client_id);
          axios
            .post(`/api/v1/users`, formdata)
            .then((res) => {
              console.log(res);
              handleShow();
            })
            .catch((err) => {
              console.log(err);
            });
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }

  const handleRemoveDoctor = (index) => {
    const updatedDoctors = doctors.filter((_, i) => i !== index);
    setDoctors(updatedDoctors);
    axios.delete(`/api/v1/users/${index}`).then((res)=>{
      console.log(res,"Successfully delete the data");
      handleShow();
    }).catch((err)=>{
      console.log(err)
    })
  };

  return (
    <div className="w-full p-5">
      <div className="rounded-lg bg-card h-[85vh] bg-white">
        <div className="flex flex-col px-4 py-3 h-full space-y-4">
          <div className="">
            <div>
              <h2 className="flex gap-5 m-2 text-xl font-semibold">
                Create Role
              </h2>
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
                {doctors
                  .filter(
                    (doctor) =>
                      doctor.role !== "patient" && doctor.role !== "super_admin"
                  )
                  .map((doctor, index) => (
                    <tr key={index} className="map">
                      <td className="py-3 px-4 border-b border-b-gray-50">
                        <span className="text-black text-sm font-medium ml-1">
                          {doctor.first_name}
                        </span>
                      </td>
                      <td className="py-3 px-4 border-b border-b-gray-50">
                        <span className="text-black text-sm font-medium ml-1">
                          {doctor.phone_number}
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
