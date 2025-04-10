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
  const [data, setData] = useState([]);
  const [doctorName, setDoctorNames] = useState({});
  const [currentPage, setCurrentPage] = useState(1);

  const handleShow = () => {
    axios
      .get(`api/v1/users`)
      .then((res) => {
        // console.log(res.data?.users);
        setDoctorNames(res.data?.users);
        setLoading(false);
      })
      .catch((err) => {
        // console.log(err);
        setLoading(false);
        // alert(err.response?.data?.message + "!");
      });
  };

  const handleData = () => {
    axios
      .get(`/api/v1/consulting_times`)
      .then((res) => {
        // console.log(res);
        setData(res.data.consulting_times);
        setLoading(false);
      })
      .catch((err) => {
        // console.log(err);
        setLoading(false);
        // alert(err.response?.data?.message + "!");
      });
  };

  function handleTimeChange(e) {
    setInputTime(e.target.value);
    // console.log(e.target.value, "");
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
          // console.log(res, "ADD");
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
          // console.log(err);
          // alert(err.response?.data?.message + "!");
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
            // console.log(res, "DELETE");
            handleData();
            Swal.fire({
              title: "Deleted!",
              text: "Your consulting time has been deleted.",
              icon: "success",
            });
          })
          .catch((err) => {
            // console.log(err);
            // alert(err.response?.data?.message + "!");
          });
      }
    });
  };

  useEffect(() => {
    handleShow();
    handleData();
  }, []);

  if (loading) {
    return <InsideLoader />;
  }

  return (
    <div className="w-full  h-full">
      <div className=" flex flex-col rounded-lg bg-card  bg-white">
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
            ADD Consulting Time
          </button>
        </div>

        <div className="animate-fade-left animate-delay-75  border rounded-md border-gray-100 animate-once animate-ease-out h-[25rem] overflow-y-auto mt-4">
          <table className="w-full  rounded-md border-gray-300 text-sm text-left">
            <thead className="sticky top-0 z-10 text-[#71717A] font-medium border-b-2 bg-white">
              <tr>
                <th className="border-b-2 p-3">Doctor</th>
                <th className="border-b-2 p-3">Slot</th>
                <th className="border-b-2 p-3">Time</th>
                <th className="border-b-2 p-3">Action</th>
              </tr>
            </thead>

            <tbody>
              {" "}
              {data.length === 0 ? (
                <tr>
                  <th
                    className="uppercase tracking-wide font-medium pt-[15rem] text-xl"
                    colSpan={8}
                  >
                    No Consulting Timeslots Found!
                  </th>
                </tr>
              ) : (
                data.map((doctor, index) => (
                  <tr key={index} className="map hover:bg-gray-200">
                    <td className="border-b-1 p-3">
                      <span className="text-black text-base font-medium">
                        {doctor.user_name}
                      </span>
                    </td>
                    <td className="border-b-1 p-3">
                      <span className="text-black text-base font-medium">
                        {doctor.slot[0]?.toUpperCase() + doctor.slot?.slice(1)}
                      </span>
                    </td>
                    <td className="border-b-1 p-3">
                      <span className="text-black text-base font-medium">
                        {formatTime(doctor.time)}
                      </span>
                    </td>
                    <td className="border-b-1 p-3">
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
      </div>
    </div>
  );
}
