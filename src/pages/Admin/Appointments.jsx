import { useEffect, useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import axios from "axios";
import InsideLoader from "../InsideLoader";
import male from "../../assets/images/male_converted.webp";
import female from "../../assets/images/female_converted.webp";
import { BsFillTelephoneFill } from "react-icons/bs";
import { HiClipboardDocumentList } from "react-icons/hi2";

const Appointments = () => {
  const context = useOutletContext();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [getAppointments, setGetAppointments] = useState([]);
  const main_id = localStorage.getItem("main_id");
  const today = new Date();
  const [isToday, setIsToday] = useState(true);
  const [consultingTime, setConsultingTime] = useState(
    new Date().toISOString().split("T")[0]
  );

  const handleConsulting = (e) => {
    const selectedDate = e.target.value;
    setConsultingTime(selectedDate);
    handleGetAppointment(selectedDate);
    const today = new Date().toISOString().split("T")[0];

    if (selectedDate !== today) {
      setIsToday(false);
      setLoading(false);
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

  //   const handleGetPatients = () => {
  //     axios
  //       .get(`/api/v1/users`)
  //       .then((res) => {
  //         console.log(res);
  //         const patients = res.data?.users?.filter(
  //           (user) => user.role === "patient" && user.created_by_id == main_id
  //         );
  //         const newPatients = res.data?.users?.filter(
  //           (user) =>
  //             user.role === "patient" &&
  //             user.follow_up === false &&
  //             user.created_by_id == main_id
  //         );
  //         setGetNewPatients(newPatients?.length);
  //         setGetTotalPatients(patients?.length);
  //       })
  //       .catch((err) => {
  //         console.log(err);
  //         setLoading(false);
  //       });
  //   };

  function convertToAmPm(time24) {
    // Split the input time into hours and minutes (e.g., "14:35" -> ["14", "35"])
    let [hour, minute] = time24.split(":");
    hour = parseInt(hour); // Convert the hour to an integer

    let period = hour >= 12 ? "PM" : "AM"; // Determine AM or PM

    // Convert 24-hour format to 12-hour format
    hour = hour % 12 || 12; // If hour is 0, set to 12 (for midnight), else convert

    return `${hour}:${minute} ${period}`;
  }

  const formatDate = (date) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(date).toLocaleDateString(undefined, options);
  };

  const handleDiagnosis = (id, caseNumber) => {
    localStorage.setItem("userId", id);
    localStorage.setItem("caseNumber", caseNumber);
    navigate(`../patients/user-diagnosis/treatment/medicine`);
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
    const today = new Date().toISOString().split("T")[0];
    handleGetAppointment(today);
  }, []);

  if (loading) {
    return <InsideLoader />;
  }

  return (
    <div className="flex w-full font-sans">
      <div className="w-full h-screen hidden sm:block sm:w-20 xl:w-60 flex-shrink-0">
        .
      </div>
      <div className="h-screen flex-grow overflow-auto flex flex-wrap content-start p-1">
        <div className="w-full h-full p-2 flex flex-col gap-1">
          <div className="flex justify-end">
            <button
              onClick={context[0]}
              type="button"
              className="block sm:hidden"
            >
              <img
                src={`https://assets.codepen.io/3685267/res-react-dash-sidebar-open.svg`}
                alt=""
                className="w-full h-full"
              />
            </button>
          </div>
          <div className="  w-full h-full flex flex-col gap-3 bg-white rounded-lg px-4 py-3 ">
            <div className="grid gap-2 ">
              <div className="flex">
                <div>
                  <HiClipboardDocumentList size={40} />
                </div>
                {isToday ? (
                  <label className="flex justify-start text-lg font-bold  tracking-wide">
                    Today's Appointments
                  </label>
                ) : (
                  <label className="flex justify-start text-lg font-bold  tracking-wide">
                    Appointments
                  </label>
                )}
              </div>
              <label className="flex  justify-start text-md mt-2 Plfont-semibold tracking-wide">
                {formatDate(consultingTime)}
              </label>
            </div>

            <div className="w-full flex justify-end  gap-2">
              <select
                name="overweight"
                defaultValue="select"
                onChange={handleType}
                className="py-2 text-sm px-3 rounded-md border border-black"
              >
                <option value="select">Select Type</option>
                <option value="false">New Case</option>
                <option value="true">Follow Up</option>
              </select>

              <input
                type="date"
                placeholder="select date"
                className="py-1 px-1  rounded-md border  border-black w-[40vh]"
                value={consultingTime}
                onChange={handleConsulting}
              />
            </div>

            <div className="bg-white h-[80vh] overflow-y-auto flex flex-col rounded-lg ">
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
                        res.user?.personal_detail?.gender === "male"
                          ? male
                          : female
                      }
                      alt="img"
                      className="size-16 mr-2"
                    />

                    <div className=" w-[16rem]">
                      <div className="flex w-80">
                        <div className=" text-right break-words font-medium text-sm">
                          Case Number:
                        </div>
                        <div className=" pl-2 text-sm">
                          {res.user?.case_number}
                        </div>
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Appointments;
