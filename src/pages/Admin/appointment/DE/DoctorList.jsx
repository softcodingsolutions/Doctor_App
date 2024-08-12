import { useState, useEffect } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import axios from "axios";

export default function DoctorList() {
  const [inputName, setInputName] = useState("");
  const [inputSpecification, setInputSpecification] = useState("");
  const [inputLastName, setLastName] = useState("");
  const [inputPhoneNo, setInputPhoneNo] = useState("");
  const [inputEmail, setInputEmail] = useState("");
  const [doctors, setDoctors] = useState([]);
  const [inputVisible, setInputVisible] = useState(false);
  const role = "doctor";

  const handleShow = () => {
    axios
      .get(`api/v1/users`)
      .then((res) => {
        console.log(res);
        setDoctors(res.data.users);
        console.log(res.data.users, "USERs");
      })
      .catch((err) => {
        console.log(err);
        alert(err.response?.data?.message + "!");
      });
  };

  function handleNameChange(e) {
    setInputName(e.target.value);
  }

  function handlePhoneChange(e) {
    setInputPhoneNo(e.target.value);
  }

  function handleLastName(e) {
    setLastName(e.target.value);
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
        first_name: inputName,
        last_name: inputLastName,
        phone_number: inputPhoneNo,
        specification: inputSpecification,
        email: inputEmail,
      };
      setDoctors([...doctors, newDoctor]);
      setInputName("");
      setLastName("");
      setInputSpecification("");
      setInputEmail("");
      setInputPhoneNo("");
    }
    axios
      .get(`/api/v1/users/app_creds`)
      .then((res) => {
        console.log(res);
        const formdata = new FormData();
        formdata.append("user[first_name]", inputName);
        formdata.append("user[last_name]", inputLastName);
        formdata.append("user[phone_number]", inputPhoneNo);
        formdata.append("user[email]", inputEmail);
        formdata.append("user[specification]", inputSpecification);
        formdata.append("user[role]", role);
        formdata.append("client_id", res.data?.client_id);
        axios
          .post(`/api/v1/users`, formdata)
          .then((res) => {
            console.log(res);
            handleShow();
          })
          .catch((err) => {
            console.log(err);
            alert(err.response?.data?.message + "!");
          });
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
      .delete(`/api/v1/users/${index}`)
      .then((res) => {
        console.log(res, "Successfully delete the data");
        handleShow();
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

  return (
    <div className="w-full p-2">
      <div className="rounded-lg bg-card h-[85vh] bg-white">
        <div className="flex flex-col px-4 py-3 h-full space-y-4">
          <div>
            <button
              onClick={handleShowInput}
              className="min-w-fit border cursor-pointer bg-[#1F2937] text-white p-2 rounded-md"
            >
              Add Doctor
            </button>
            {inputVisible && (
              <div className="grid grid-cols-4 transition-transform lg:grid-cols-5 md:grid-cols-5 sm:grid-cols-6 gap-3 p-1 min-w-fit xl:flex">
                <input
                  type="text"
                  className="border-2 rounded-md p-2"
                  onChange={handleNameChange}
                  value={inputName}
                  placeholder="First Name"
                />
                <input
                  type="text"
                  className="border-2 rounded-md p-2"
                  onChange={handleLastName}
                  value={inputLastName}
                  placeholder="Last Name"
                />
                <input
                  type="number"
                  className="border-2 rounded-md p-2"
                  onChange={handlePhoneChange}
                  value={inputPhoneNo}
                  placeholder="Phone Number"
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
                    Name
                  </th>
                  <th className="text-sm uppercase tracking-wide font-medium py-3 px-4 text-left">
                    Specification
                  </th>
                  <th className="text-sm uppercase tracking-wide font-medium py-3 px-4 text-left">
                    Email
                  </th>
                  <th className="text-sm uppercase tracking-wide font-medium py-3 px-4 text-left">
                    Password
                  </th>
                  <th className="text-sm uppercase tracking-wide font-medium py-3 px-4 text-left">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {doctors
                  .filter((doctor) => doctor.role === "doctor")
                  .map((doctor, index) => (
                    <tr key={index} className="map">
                      <td className="py-3 px-4 border-b border-b-gray-50">
                        <span className="text-black text-base font-medium ml-1">
                          {doctor?.first_name[0].toUpperCase() +
                            doctor?.first_name?.slice(1) +
                            " " +
                            doctor?.last_name[0].toUpperCase() +
                            doctor?.last_name?.slice(1)}
                        </span>
                      </td>
                      <td className="py-3 px-4 border-b border-b-gray-50">
                        <span className="text-black text-base font-medium ml-1">
                          {doctor.specification}
                        </span>
                      </td>
                      <td className="py-3 px-4 border-b border-b-gray-50">
                        <span className="text-black text-base font-medium ml-1">
                          {doctor.email}
                        </span>
                      </td>
                      <td className="py-3 px-4 border-b border-b-gray-50">
                        <span className="text-black text-base font-medium ml-1">
                          {doctor.show_password}
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
