import { useEffect, useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import axios from "axios";
import InsideLoader from "../InsideLoader";
import male from "../../assets/images/male_converted.webp";
import female from "../../assets/images/female_converted.webp";
import { IoSearchOutline } from "react-icons/io5";
import { HiClipboardDocumentList } from "react-icons/hi2";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { GiCaduceus } from "react-icons/gi";
import { CiCalendar } from "react-icons/ci";

const Appointments = () => {
  const context = useOutletContext();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [getAppointments, setGetAppointments] = useState([]);
  const [getParticularCustomer, setGetParticularCustomer] = useState([]);

  const main_id = localStorage.getItem("main_id");
  const [searchTerm, setSearchTerm] = useState("");
  const [consultingTime, setConsultingTime] = useState(
    new Date().toISOString().split("T")[0]
  );

  const handleConsulting = (date) => {
    const selectedDate = date.toISOString().split("T")[0];
    setConsultingTime(selectedDate);
    handleGetAppointment(selectedDate);

    const today = new Date().toISOString().split("T")[0];
    if (selectedDate !== today) {
      setIsToday(false);
    } else {
      setIsToday(true);
    }
  };

  const handleGetAppointment = (date) => {
    axios
      .get(`api/v1/appointments?date=${date}&doctor_id=${main_id}`)
      .then((res) => {
        console.log("Todays Appointment: ", res.data?.appointments);
        setGetAppointments(res.data?.appointments);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  };

  function convertToAmPm(time24) {
    // Split the input time into hours and minutes (e.g., "14:35" -> ["14", "35"])
    let [hour, minute] = time24.split(":");
    hour = parseInt(hour); // Convert the hour to an integer

    let period = hour >= 12 ? "PM" : "AM"; // Determine AM or PM

    // Convert 24-hour format to 12-hour format
    hour = hour % 12 || 12; // If hour is 0, set to 12 (for midnight), else convert

    return `${hour}:${minute} ${period}`;
  }

  const handleDiagnosis = (id, caseNumber, appointment_id) => {
    localStorage.setItem("userId", id);
    localStorage.setItem("caseNumber", caseNumber);
    const formdata = new FormData();
    formdata.append("appointment[status]", "started");
    axios
      .put(`/api/v1/appointments/${appointment_id}`, formdata)
      .then((res) => {
        console.log(res);
        navigate(`../patients/user-diagnosis/treatment/medicine`);
        localStorage.setItem("appointment_id", appointment_id);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleCompleteAppointment = (id) => {
    const formdata = new FormData();
    formdata.append("appointment[status]", "completed");

    axios
      .put(`/api/v1/appointments/${id}`, formdata)
      .then((res) => {
        console.log(res);
        navigate(`../patients/user-diagnosis/treatment/medicine`);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleType = (e) => {
    const selectedType = e.target.value;

    axios
      .get(`api/v1/appointments?date=${consultingTime}&doctor_id=${main_id}`)
      .then((res) => {
        if (selectedType === "select") {
          // Reset the appointments to the full list if "select" is chosen
          setGetAppointments(res.data?.appointments);
        } else {
          // Convert the selectedType to boolean for filtering follow-up status
          const isFollowUp = selectedType === "true";

          // Filter the appointments based on follow-up status
          const filteredAppointments = res?.data?.appointments?.filter(
            (appointment) => {
              return appointment.user.follow_up === isFollowUp;
            }
          );

          setGetAppointments(filteredAppointments);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    if (searchTerm) {
      const filteredAppointments = getAppointments.filter((appointment) => {
        const user = appointment.user;
        return (
          user?.case_number?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          user?.phone_number
            ?.toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          user?.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          user?.first_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          user?.last_name?.toLowerCase().includes(searchTerm.toLowerCase())
        );
      });

      setGetParticularCustomer(filteredAppointments);
    } else {
      setGetParticularCustomer(getAppointments);
    }
  }, [searchTerm, getAppointments]);

  const handleSearchTerm = (value) => {
    setSearchTerm(value);
  };

  useEffect(() => {
    const today = new Date().toISOString().split("T")[0];
    handleGetAppointment(today);
  }, []);

  if (loading) {
    return <InsideLoader />;
  }

  return (
    <div className="flex flex-col w-full bg-white rounded-lg ">
      <div className="flex justify-between  rounded-t-lg w-full">
        <div className="flex gap-1">
          <div className="mt-2">
            <HiClipboardDocumentList size={35} className="text-green-600" />{" "}
          </div>
          <div className="flex  flex-col">
            <label className="flex justify-start text-xl font-bold ">
              Appointment List
            </label>
            <span className="text-md text-gray-600 ">
              View all scheduled appointments
            </span>
          </div>
        </div>
        <div className=" flex justify-end h-10 gap-2">
          {/* <input
              type="date"
              placeholder="select date"
              className="text-sm  p-0.5 rounded-md border  w-[20vh]"
              value={consultingTime}
              onChange={handleConsulting}
            /> */}
          <div className="relative flex items-center w-[20vh] h-10">
            <CiCalendar className="absolute left-3 text-black z-10" />
            <DatePicker
              selected={new Date(consultingTime)}
              onChange={handleConsulting}
              dateFormat="dd-MM-yyyy"
              placeholderText="Select date"
              className="w-full text-sm p-2 pl-10 pr-3 border rounded-md focus:outline-none bg-white"
            />
          </div>

          <select
            defaultValue="select"
            onChange={handleType}
            className="py-2 text-sm px-3 rounded-md border "
          >
            <option value="select">All Patients </option>
            <option value="false">New Case</option>
            <option value="true">Follow Up</option>
          </select>
          {/* <label className="flex  justify-start text-md mt-2 font-semibold">
              {formatDate(consultingTime)}
            </label> */}
        </div>
      </div>
      <div className="flex justify-end rounded-t-lg w-full mt-3">
        <div className="relative flex items-center">
          <IoSearchOutline className="absolute left-2 text-gray-500" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => handleSearchTerm(e.target.value)}
            placeholder="Search patient..."
            className="w-full border border-gray-300 rounded-md pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
          />
        </div>
      </div>
      {/* <div className="bg-white h-[80vh] overflow-y-auto flex flex-col rounded-lg ">
          {getAppointments.length === 0 ? (
            <div className="flex w-full h-full items-center justify-center text-2xl">
              No Appointments Today!
            </div>
          ) : (
            getAppointments.map((res) => (
              <div
                key={res.id}
                className="flex text-md hover:bg-gray-200 items-center gap-1 border border-gray-200 min-h-16 shadow-inner rounded-md p-2"
              >
                <img
                  src={
                    res.user?.personal_detail?.gender === "male" ? male : female
                  }
                  alt="img"
                  className="size-16 mr-2"
                />

                <div className=" w-[16rem]">
                  <div className="flex w-80">
                    <div className=" text-right break-words font-medium text-sm">
                      Case Number:
                    </div>
                    <div className=" pl-2 text-sm">{res.user?.case_number}</div>
                  </div>
                  <div className="flex">
                    <div className=" text-right break-words font-medium text-sm">
                      Patient Name:
                    </div>
                    <div className="pl-2 text-sm">
                      {res.user?.first_name?.[0]?.toUpperCase() +
                        res.user?.first_name?.slice(1) +
                        " " +
                        res.user?.last_name?.[0]?.toUpperCase() +
                        res.user?.last_name?.slice(1)}
                    </div>
                  </div>
                </div>

                <div className=" w-[12rem]">
                  <div className="flex items-center ">
                    <div className=" text-right break-words font-medium text-sm">
                      Age:
                    </div>
                    <div className=" pl-2 text-sm">
                      {res.user?.personal_detail?.age}
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div className=" text-right break-words font-medium text-sm">
                      Weight:
                    </div>
                    <div className="pl-2 text-sm">
                      {res.user?.personal_detail?.weight} kg
                    </div>
                  </div>
                </div>

                <div className=" w-[15rem]">
                  <div className="flex items-center ">
                    <div className=" text-right break-words font-medium text-sm">
                      <BsFillTelephoneFill />
                    </div>
                    <div className=" pl-2 text-sm">
                      {res.user?.phone_number}
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div className=" text-right break-words font-medium text-sm">
                      Type:
                    </div>
                    <div className="pl-2 text-sm">
                      {res.user?.follow_up ? "Follow Up" : "New Case"}
                    </div>
                  </div>
                </div>

                <div className=" w-[14rem]">
                  <div className="flex items-center">
                    <div className=" text-right break-words font-medium text-sm">
                      Time:
                    </div>
                    <div className="pl-2 text-sm">
                      {res.machine_detail?.name
                        ? convertToAmPm(res.time)
                        : res.time}
                    </div>
                  </div>
                  {res.machine_detail?.name && (
                    <div className="flex items-center">
                      <div className=" text-right break-words font-medium text-sm">
                        Machine Name:
                      </div>
                      <div className=" pl-2 text-sm">
                        {res.machine_detail?.name}
                      </div>
                    </div>
                  )}
                </div>

                <button
                  onClick={() =>
                    handleDiagnosis(res.user?.id, res.user?.case_number)
                  }
                  className="font-medium text-sm text-green-600 border border-gray-300 p-1 rounded-md hover:bg-green-600 hover:text-white"
                >
                  Diagnosis
                </button>
              </div>
            ))
          )}
        </div> */}
      <div className="bg-white h-[75vh] overflow-y-auto rounded-lg  mt-5 w-full">
        {getAppointments.length === 0 ? (
          <div className="flex w-full h-full items-center justify-center text-2xl">
            No Appointments Today!
          </div>
        ) : (
          <div className="overflow-x-auto border rounded-md">
            <table className="w-full  rounded-md border-gray-300 text-sm text-left ">
              <thead className=" text-[#71717A] font-medium  border-b-2">
                <tr>
                  <th className="border-b-2 p-3">Image</th>
                  <th className="border-b-2 p-3">Case Number</th>
                  <th className="border-b-2 p-3">Patient Name</th>
                  <th className="border-b-2 p-3">Age</th>
                  <th className="border-b-2 p-3">Weight</th>
                  <th className="border-b-2 p-3">Phone</th>
                  <th className="border-b-2 p-3">Type</th>
                  <th className="border-b-2 p-3">Time</th>
                  <th className="border-b-2 p-3 text-center">Machine Name</th>
                  <th className="border-b-2 p-3 ">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-300">
                {/* {getAppointments.map((res) => (
                    <tr key={res.id} className="hover:bg-gray-100">
                      <td className="border-b-1 p-3">
                        <img
                          src={
                            res.user?.personal_detail?.gender === "male"
                              ? male
                              : female
                          }
                          alt="Patient"
                          className="w-10 h-10 rounded-full"
                        />
                      </td>
                      <td className="border-b-1 p-3">
                        {res.user?.case_number}
                      </td>
                      <td className="border-b-1 p-3">
                        {res.user?.first_name?.[0]?.toUpperCase() +
                          res.user?.first_name?.slice(1) +
                          " " +
                          res.user?.last_name?.[0]?.toUpperCase() +
                          res.user?.last_name?.slice(1)}
                      </td>
                      <td className="border-b-1 p-3">
                        {res.user?.personal_detail?.age}
                      </td>
                      <td className="border-b-1 p-3">
                        {res.user?.personal_detail?.weight} kg
                      </td>
                      <td className="border-b-1 p-3  items-center">
                        {res.user?.phone_number}
                      </td>
                      <td className="border-b-1 p-3">
                        {res.user?.follow_up ? "Follow Up" : "New Case"}
                      </td>
                      <td className="border-b-1 p-3">
                        {res.machine_detail?.name
                          ? convertToAmPm(res.time)
                          : res.time}
                      </td>
                      <td className="border-b-1 p-3 text-center">
                        {res.machine_detail?.name || "-"}
                      </td>
                      <td className="border-b-1 p-3">
                        <button
                          onClick={() =>
                            handleDiagnosis(res.user?.id, res.user?.case_number)
                          }
                          className="text-gray-900 border-b-1 border-gray-300 px-3 py-1 rounded-md bg-gray-400  hover:bg-green-600 hover:text-white"
                        >
                          Diagnosis
                        </button>
                      </td>
                    </tr>
                  ))} */}

                {[...getParticularCustomer]
                  .sort((a, b) => {
                    const priority = (status) => {
                      if (status === "started") return 0;
                      if (status === null) return 1;
                      if (status === "completed") return 2;
                      return 3;
                    };
                    return priority(a.status) - priority(b.status);
                  })
                  .map((res) => (
                    <tr key={res.id} className="hover:bg-gray-100">
                      <td className="border-b-1 p-3">
                        <img
                          src={
                            res.user?.personal_detail?.gender === "male"
                              ? male
                              : female
                          }
                          alt="Patient"
                          className="w-10 h-10 rounded-full"
                        />
                      </td>
                      <td className="border-b-1 p-3">
                        {res.user?.case_number}
                      </td>
                      <td className="border-b-1 p-3">
                        {res.user?.first_name?.[0]?.toUpperCase() +
                          res.user?.first_name?.slice(1) +
                          " " +
                          res.user?.last_name?.[0]?.toUpperCase() +
                          res.user?.last_name?.slice(1)}
                      </td>
                      <td className="border-b-1 p-3">
                        {res.user?.personal_detail?.age}
                      </td>
                      <td className="border-b-1 p-3">
                        {res.user?.personal_detail?.weight} kg
                      </td>
                      <td className="border-b-1 p-3">
                        {res.user?.phone_number}
                      </td>
                      <td className="border-b-1 p-3">
                        {res.user?.follow_up ? "Follow Up" : "New Case"}
                      </td>
                      <td className="border-b-1 p-3">
                        {res.machine_detail?.name
                          ? convertToAmPm(res.time)
                          : res.time}
                      </td>
                      <td className="border-b-1 p-3 text-center">
                        {res.machine_detail?.name || "-"}
                      </td>
                      {!res.machine_detail?.name ? (
                        <td className="grid lg:grid-cols-2 sm:grid-cols-1 w-40 gap-2 border-b-1 p-4">
                          {/* <button
                          onClick={() =>
                            handleDiagnosis(res.user?.id, res.user?.case_number)
                          }
                          className="font-medium p-1 w-fit  text-green-600 bg-white border text-sm ml-1 border-gray-300 rounded-md hover:bg-green-600 hover:text-white"
                        >
                          <GiCaduceus size={20} />
                        </button> */}
                          <div>
                            {res.status === null && (
                              <button
                                onClick={() =>
                                  handleDiagnosis(
                                    res.user?.id,
                                    res.user?.case_number,
                                    res.id
                                  )
                                }
                                className="relative inline-block text-green-600 text-sm ml-1 p-1 font-medium after:absolute after:left-0 after:bottom-0 after:h-[1px] after:w-0 after:bg-green-600 after:transition-all after:duration-300 hover:after:w-full"
                              >
                                Start
                              </button>
                            )}
                            {res.status === "started" && (
                              <button
                                onClick={() =>
                                  handleDiagnosis(
                                    res.user?.id,
                                    res.user?.case_number,
                                    res.id
                                  )
                                }
                                className="relative inline-block text-[#F5A03A] text-sm ml-1 p-1 font-medium after:absolute after:left-0 after:bottom-0 after:h-[1px] after:w-0 after:bg-[#F5A03A] after:transition-all after:duration-300 hover:after:w-full"
                              >
                                Continue
                              </button>
                            )}
                            {res.status === "completed" && (
                              <h2 className="relative inline-block text-gray-500 text-sm ml-1 p-1 font-medium after:absolute after:left-0 after:bottom-0 after:h-[1px] after:w-0 after:transition-all after:duration-300 hover:after:w-full">
                                Completed
                              </h2>
                            )}
                          </div>
                          <div>
                            {res.status === null && (
                              <button
                                onClick={() =>
                                  handleCompleteAppointment(res.id)
                                }
                                className="relative inline-block text-red-600 text-sm ml-1 p-1 font-medium after:absolute after:left-0 after:bottom-0 after:h-[1px] after:w-0 after:bg-red-600 after:transition-all after:duration-300 hover:after:w-full"
                              >
                                Complete
                              </button>
                            )}
                            {res.status === "started" && (
                              <button
                                onClick={() =>
                                  handleCompleteAppointment(res.id)
                                }
                                className="relative inline-block text-red-600 text-sm ml-1 p-1 font-medium after:absolute after:left-0 after:bottom-0 after:h-[1px] after:w-0 after:bg-red-600 after:transition-all after:duration-300 hover:after:w-full"
                              >
                                Complete
                              </button>
                            )}
                          </div>
                        </td>
                      ) : (
                        <td className="flex gap-2 border-b-1 p-4">
                          <h2 className="bg-[#EFF6FF]  text-[#2563EB] border-b flex justify-center w-40 text-sm  h-full rounded-md p-2">
                            Indoor Activity
                          </h2>
                        </td>
                      )}
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default Appointments;
