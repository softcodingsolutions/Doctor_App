import { useState, useEffect } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import axios from "axios";
import InsideLoader from "../../../InsideLoader";
import Swal from "sweetalert2";

export default function ConsultingTime() {
  const [inputTime, setInputTime] = useState("");
  const [inputSlot, setInputSlot] = useState("select");
  const [inputDoctor, setInputDoctor] = useState("select");
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [inputVisible, setInputVisible] = useState(false);
  const [data, setData] = useState([]);
  const [doctorName, setDoctorNames] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 5;

  const handleShow = () => {
    axios
      .get(`api/v1/users`)
      .then((res) => {
        console.log(res.data?.users);
        setDoctorNames(res.data?.users);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        alert(err.response?.data?.message + "!");
      });
  };

  const handleData = () => {
    axios
      .get(`/api/v1/consulting_times`)
      .then((res) => {
        console.log(res);
        setData(res.data.consulting_times);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        alert(err.response?.data?.message + "!");
      });
  };

  const paginateCustomers = () => {
    const indexOfLastRow = currentPage * rowsPerPage;
    const indexOfFirstRow = indexOfLastRow - rowsPerPage;
    return data.slice(indexOfFirstRow, indexOfLastRow);
  };

  const totalPages = Math.ceil(data.length / rowsPerPage);

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

  function handleTimeChange(e) {
    setInputTime(e.target.value);
    console.log(e.target.value,"R");
  }

  function handleSlotChange(e) {
    setInputSlot(e.target.value);
  }

  function handleDoctorChange(e) {
    setInputDoctor(e.target.value);
  }

  function formatTime(dateTimeString) {
    const date = new Date(dateTimeString);
    return date.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  }

  function handleAddDoctor() {
    if (inputTime && inputSlot !== "select" && inputDoctor !== "select") {
      const newDoctor = {
        slot: inputSlot,
        name: inputDoctor,
      };
      setDoctors([...doctors, newDoctor]);
      setInputTime("");
      setInputSlot("select");

      const formdata = new FormData();
      formdata.append("consulting_time[slot]", inputSlot);
      formdata.append("consulting_time[time]", inputTime);

      axios
        .post(`/api/v1/consulting_times?id=${inputDoctor}`, formdata)
        .then((res) => {
          console.log(res, "ADD");
          Swal.fire({
            position: "top-end",
            showConfirmButton: false,
            timer: 1500,
            icon: "success",
            title: "Added!",
            text: "A new consulting time has been added.",
          });
          handleData();
        })
        .catch((err) => {
          console.log(err);
          alert(err.response?.data?.message + "!");
        });
    }
  }

  const handleRemoveDoctor = (id) => {
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
          .delete(`/api/v1/consulting_times/${id}`)
          .then((res) => {
            console.log(res, "DELETE");
            handleData();
            Swal.fire({
              title: "Deleted!",
              text: "Your consulting time has been deleted.",
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

  const handleShowInput = () => {
    setInputVisible(!inputVisible);
  };

  useEffect(() => {
    handleShow();
    handleData();
  }, []);

  if (loading) {
    return <InsideLoader />;
  }

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
              <div className="grid grid-cols-4 transition-transform lg:grid-cols-5 md:grid-cols-5 sm:grid-cols-6 gap-3 p-1 min-w-fit xl:flex">
                <select
                  name="doctor"
                  value={inputDoctor}
                  onChange={handleDoctorChange}
                  className="py-1 px-2 rounded-md border border-black "
                >
                  <option value="select" disabled>
                    Select Doctor
                  </option>
                  {Object.values(doctorName)
                    .filter((doctor) => doctor.role === "doctor")
                    .map((name) => (
                      <option key={name.id} value={name.id}>
                        {name.first_name} {name.last_name}
                      </option>
                    ))}
                </select>
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
                  className="max-h-10 flex items-center justify-center border cursor-pointer bg-[#1F2937] text-white hover:scale-105 p-3 rounded-md"
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
                    Doctor
                  </th>
                  <th className="text-sm uppercase tracking-wide font-medium py-3 px-4 text-left">
                    Slot
                  </th>
                  <th className="text-sm uppercase tracking-wide font-medium py-3 px-4 text-left">
                    Time
                  </th>
                  <th className="text-sm uppercase tracking-wide font-medium py-3 px-4 text-left">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {" "}
                {paginateCustomers().length === 0 ? (
                  <tr>
                    <th
                      className="uppercase tracking-wide font-medium pt-[15rem] text-xl"
                      colSpan={8}
                    >
                      No Consulting Timeslots Found!
                    </th>
                  </tr>
                ) : (
                  paginateCustomers().map((doctor, index) => (
                    <tr key={index} className="map hover:bg-gray-200">
                      <td className="py-3 px-4 border-b border-b-gray-50">
                        <span className="text-black text-base font-medium ml-1">
                          {doctor.user_name}
                        </span>
                      </td>
                      <td className="py-3 px-4 border-b border-b-gray-50">
                        <span className="text-black text-base font-medium ml-1">
                          {doctor.slot[0]?.toUpperCase() +
                            doctor.slot?.slice(1)}
                        </span>
                      </td>
                      <td className="py-3 px-4 border-b border-b-gray-50">
                        <span className="text-black text-base font-medium ml-1">
                          {formatTime(doctor.time)}
                        </span>
                      </td>
                      <td className="py-3 px-4 border-b border-b-gray-50">
                        <button
                          onClick={() => handleRemoveDoctor(doctor.id)}
                          className="min-w-fit border text-base cursor-pointer hover:bg-[#1F2937] hover:text-white p-2 m-2 rounded-md"
                        >
                          <AiOutlineDelete />
                        </button>
                      </td>
                    </tr>
                  ))
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
