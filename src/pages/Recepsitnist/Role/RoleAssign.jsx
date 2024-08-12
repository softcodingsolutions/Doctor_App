import axios from "axios";
import { useEffect, useState } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import Swal from "sweetalert2";
import InsideLoader from "../../InsideLoader";

export default function RoleAssign() {
  const [inputFirstName, setInputFirstName] = useState("");
  const [inputLastName, setInputLastName] = useState("");
  const [inputMobile, setInputMobile] = useState("");
  const [inputEmail, setInputEmail] = useState("");
  const [inputRole, setInputRole] = useState("");
  const [doctors, setDoctors] = useState([]);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(true);

  const handleShow = () => {
    axios
      .get(`api/v1/users`)
      .then((res) => {
        console.log(res);
        setDoctors(res.data.users);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        alert(err.response?.data?.message + "!");
        setLoading(false);
      });
  };

  const handleNameChange1 = (e) => {
    setInputLastName(e.target.value);
  };

  const handleNameChange = (e) => {
    setInputFirstName(e.target.value);
  };

  const handleMobileChange = (e) => {
    setInputMobile(e.target.value);
  };

  const handleEmailChange = (e) => {
    setInputEmail(e.target.value);
  };

  const handleRoleChange = (e) => {
    setInputRole(e.target.value);
  };

  const validateForm = () => {
    const newErrors = {};
    if (!inputFirstName.trim())
      newErrors.inputFirstName = "First Name is required";
    if (!inputLastName.trim())
      newErrors.inputLastName = "Last Name is required";
    if (!inputMobile.trim())
      newErrors.inputMobile = "Mobile Number is required";
    if (!inputEmail.trim() || !/\S+@\S+\.\S+/.test(inputEmail))
      newErrors.inputEmail = "Valid Email is required";
    if (!inputRole.trim()) newErrors.inputRole = "Role is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleAddDoctor = () => {
    if (validateForm()) {
      const newDoctor = {
        first_name: inputFirstName,
        last_name: inputLastName,
        mobile: inputMobile,
        email: inputEmail,
        role: inputRole,
      };
      setDoctors([...doctors, newDoctor]);
      setInputFirstName("");
      setInputLastName("");
      setInputMobile("");
      setInputEmail("");
      setInputRole("");

      axios
        .get(`/api/v1/users/app_creds`)
        .then((res) => {
          console.log(res);
          const formdata = new FormData();
          formdata.append("user[first_name]", inputFirstName);
          formdata.append("user[last_name]", inputLastName);
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
              alert(err.response?.data?.message + "!");
            });
        })
        .catch((err) => {
          console.log(err);
          alert(err.response?.data?.message + "!");
        });
    }
  };

  const handleRemoveDoctor = (index) => {
    const updatedDoctors = doctors.filter((_, i) => i !== index);
    setDoctors(updatedDoctors);
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
          .delete(`/api/v1/users/${index}`)
          .then((res) => {
            console.log(res, "Successfully delete the data");
            handleShow();
          })
          .catch((err) => {
            console.log(err);
            alert(err.response?.data?.message + "!");
          });
      }
    });
  };

  useEffect(() => {
    handleShow();
  }, []);

  if (loading) {
    return <InsideLoader />;
  }

  return (
    <div className="w-full p-2">
      <div className="rounded-lg bg-card h-[87vh] bg-white">
        <div className="flex flex-col px-4 py-3 h-full space-y-4">
          <div>
            <div>
              <h2 className="flex gap-5 m-2 text-xl font-semibold">
                Create Role
              </h2>
            </div>
            <div className="grid grid-cols-4 transition-transform lg:grid-cols-5 md:grid-cols-5 sm:grid-cols-6 gap-3 p-1 min-w-fit xl:flex">
              <div className="grid grid-cols-1">
                <input
                  type="text"
                  className="border-2 rounded-md p-2"
                  onChange={handleNameChange}
                  value={inputFirstName}
                  placeholder="First Name"
                />
                {errors.inputFirstName && (
                  <span className="text-red-500 text-sm">
                    {errors.inputFirstName}
                  </span>
                )}
              </div>
              <div className="grid grid-cols-1">
                <input
                  type="text"
                  className="border-2 rounded-md p-2"
                  onChange={handleNameChange1}
                  value={inputLastName}
                  placeholder="Last Name"
                />
                {errors.inputFirstName && (
                  <span className="text-red-500 text-sm">
                    {errors.inputLastName}
                  </span>
                )}
              </div>
              <div className="grid grid-cols-1">
                <input
                  className="border-2 rounded-md p-2"
                  type="text"
                  onChange={handleMobileChange}
                  value={inputMobile}
                  placeholder="Mobile Number"
                />
                {errors.inputMobile && (
                  <span className="text-red-500 text-sm">
                    {errors.inputMobile}
                  </span>
                )}
              </div>
              <div className="grid grid-cols-1">
                <input
                  className="border-2 rounded-md p-2"
                  type="text"
                  onChange={handleEmailChange}
                  value={inputEmail}
                  placeholder="Email"
                />
                {errors.inputEmail && (
                  <span className="text-red-500 text-sm">
                    {errors.inputEmail}
                  </span>
                )}
              </div>
              <div className="grid grid-cols-1">
                <select
                  className="border-2 rounded-md p-2"
                  onChange={handleRoleChange}
                  value={inputRole}
                >
                  <option value="" disabled>
                    Select Role
                  </option>
                  <option value="receptionist">Receptionist</option>
                </select>
                {errors.inputRole && (
                  <span className="text-red-500 text-sm">
                    {errors.inputRole}
                  </span>
                )}
              </div>
              <button
                className="max-h-10 flex items-center justify-center border cursor-pointer bg-[#1F2937] text-white hover:scale-105 p-3 rounded-md"
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
                  <th className="text-sm uppercase tracking-wide font-medium py-3 px-4 text-left">
                    Name
                  </th>
                  <th className="text-sm uppercase tracking-wide font-medium py-3 px-4 text-left">
                    Mobile Number
                  </th>
                  <th className="text-sm uppercase tracking-wide font-medium py-3 px-4 text-left">
                    Email
                  </th>
                  <th className="text-sm uppercase tracking-wide font-medium py-3 px-4 text-left">
                    Role
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
                  .filter(
                    (doctor) =>
                      doctor.role !== "patient" && doctor.role !== "super_admin"
                  )
                  .map((doctor) => (
                    <tr key={doctor.id}>
                      <td className="py-3 px-4 border-b border-b-gray-50">
                        <span className="text-black text-base font-medium ml-1">
                          {doctor.first_name[0]?.toUpperCase() +
                            doctor.first_name?.slice(1) +
                            " " +
                            doctor.last_name[0]?.toUpperCase() +
                            doctor.last_name?.slice(1)}
                        </span>
                      </td>
                      <td className="py-3 px-4 border-b border-b-gray-50">
                        <span className="text-black text-base font-medium ml-1">
                          {doctor.phone_number}
                        </span>
                      </td>
                      <td className="py-3 px-4 border-b border-b-gray-50">
                        <span className="text-black text-base font-medium ml-1">
                          {doctor.email}
                        </span>
                      </td>
                      <td className="py-3 px-4 border-b border-b-gray-50">
                        <span className="text-black text-base font-medium ml-1">
                          {doctor?.role[0]?.toUpperCase() +
                            doctor?.role?.slice(1)}
                        </span>
                      </td>
                      <td className="py-3 px-4 border-b border-b-gray-50">
                        <span className="text-black text-base font-medium ml-1">
                          {doctor?.show_password}
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
