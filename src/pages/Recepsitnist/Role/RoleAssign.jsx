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
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 5;
  const handleShow = () => {
    axios
      .get(`api/v1/users`)
      .then((res) => {
        console.log(res.data.users, "USE");
        const doctor = res.data?.users?.filter(
          (user) => user.role !== "super_admin" && user.role !== "patient"
        );
        console.log(doctor,"LIst")
        setDoctors(doctor);
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

  const paginateCustomers = () => {
    const indexOfLastRow = currentPage * rowsPerPage;
    const indexOfFirstRow = indexOfLastRow - rowsPerPage;
    return doctors.slice(indexOfFirstRow, indexOfLastRow);
  };

  const totalPages = Math.ceil(doctors.length / rowsPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
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
    setLoading(true);
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
              setLoading(false);
              handleShow();
            })
            .catch((err) => {
              setLoading(false);
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
    setLoading(true);
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
            setLoading(false);
            handleShow();
          })
          .catch((err) => {
            console.log(err);
            setLoading(false);
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
                {paginateCustomers().length > 0 ? (
                  paginateCustomers().map((doctor) => (
                    <tr key={doctor.id} className="hover:bg-gray-200">
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
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="text-center py-4">
                      No doctors found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          {/* Pagination Controls */}
          {totalPages !== 0 && (
            <div className="flex flex-wrap justify-center items-center gap-2 py-2">
              <button
                onClick={handlePreviousPage}
                disabled={currentPage === 1}
                className="flex items-center gap-2 px-6 py-3 font-sans text-xs font-bold text-center text-gray-900 uppercase align-middle transition-all rounded-full select-none hover:bg-gray-900/10 active:bg-gray-900/20 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                  stroke="currentColor"
                  aria-hidden="true"
                  className="w-4 h-4"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
                  ></path>
                </svg>
                Previous
              </button>
              <div className="flex gap-2">
                {Array.from({ length: totalPages }, (_, i) => (
                  <button
                    key={i + 1}
                    onClick={() => setCurrentPage(i + 1)}
                    className={`relative h-10 max-h-[40px] w-10 max-w-[40px] select-none rounded-full text-center align-middle font-sans text-xs font-medium uppercase text-gray-900 transition-all hover:bg-gray-900/10 active:bg-gray-900/20 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none ${
                      currentPage === i + 1
                        ? "bg-gray-900 text-white"
                        : "bg-gray-200 text-black"
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}
              </div>
              <button
                onClick={handleNextPage}
                disabled={currentPage === totalPages}
                className="flex items-center gap-2 px-6 py-3 font-sans text-xs font-bold text-center text-gray-900 uppercase align-middle transition-all rounded-full select-none hover:bg-gray-900/10 active:bg-gray-900/20 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
              >
                Next
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                  stroke="currentColor"
                  aria-hidden="true"
                  className="w-4 h-4"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                  ></path>
                </svg>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
