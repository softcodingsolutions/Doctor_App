import { useState, useEffect } from "react";
import axios from "axios";
import InsideLoader from "../../InsideLoader";
import { useNavigate } from "react-router-dom";
import { IoMdArrowRoundBack } from "react-icons/io";

export default function AppointmentSheet() {
  const navigate = useNavigate();
  const [allConsultingTimes, setAllConsultingTimes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [consultingTime, setConsultingTime] = useState(
    new Date().toISOString().split("T")[0]
  );

  function convertToAmPm(time24) {
    let [hour, minute] = time24.split(":");
    hour = parseInt(hour);
    let period = hour >= 12 ? "PM" : "AM";
    hour = hour % 12 || 12;
    return `${hour}:${minute} ${period}`;
  }

  const handleConsulting = (e) => {
    const selectedDate = e.target.value;
    setConsultingTime(selectedDate);
    const today = new Date().toISOString().split("T")[0];

    if (selectedDate !== today) {
      setAllConsultingTimes([]);
      setLoading(false);
    } else {
      handleAppointment();
    }
  };

  const handleRedirect = () => {
    navigate("/receptionist/appointment/create-machine-appointment");
  };
  const formatDate = (date) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(date).toLocaleDateString(undefined, options);
  };

  const handleAppointment = () => {
    axios
      .get(`api/v1/appointments?date=${consultingTime}`)
      .then((res) => {
        setAllConsultingTimes(res.data?.machine_details);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        alert(err.response?.data?.message + "!");
      });
  };

  useEffect(() => {
    handleAppointment();
  }, [consultingTime]);

  if (loading) {
    return <InsideLoader />;
  }

  const transformData = (data) => {
    const transformed = {};

    data.forEach((item) => {
      const doctor = item.doctor.first_name;
      const time = convertToAmPm(item.time);
      const machine = item.machine_detail.name;

      if (!transformed[doctor]) {
        transformed[doctor] = {};
      }

      if (!transformed[doctor][machine]) {
        transformed[doctor][machine] = {};
      }

      if (!transformed[doctor][machine][time]) {
        transformed[doctor][machine][time] = [];
      }

      transformed[doctor][machine][time].push(
        <>
          {item.user.first_name} {item.user.last_name} <br />{" "}
          {item.user.phone_number}
        </>
      );
    });

    return transformed;
  };

  const transformedData = transformData(allConsultingTimes);

  return (
    <div className="w-full p-2 bg-gray-50 h-[100vh]">
      <div className="grid grid-cols-3 gap-4 mb-6 md:grid-cols-2">
        <div className="grid grid-col-2 lg:grid-cols-3 justify-center mt-5 lg:w-[210vh] w-fit h-fit gap-20">
          <div className="">
            <button
              className="font-medium p-2  text-white bg-green-600 border border-gray-300  text-sm rounded-md hover:text-green-600 hover:bg-white"
              onClick={handleRedirect}
            >
              <IoMdArrowRoundBack size={20} />
            </button>
          </div>
          <div className=" flex justify-start w-[110vh] ">
            <input
              type="date"
              placeholder="select date"
              className="py-1 px-2 rounded-md border-2 lg:w-[30vh]"
              onChange={handleConsulting}
            />
            <div className="text-md font-semibold ml-10 ">
              Date : {formatDate(consultingTime)}
            </div>
          </div>
        </div>
      </div>
      {allConsultingTimes.length > 0 ? (
        <div className="flex justify-center gap-1 w-full">
          {Object.keys(transformedData).map((doctor, doctorIndex) => {
            const machines = Object.keys(transformedData[doctor]);

            return (
              <div
                key={doctorIndex}
                className=" rounded-md overflow-auto mb-6 "
              >
                <h3 className="text-lg font-medium mb-1 p-1 bg-green-500 justify-center flex">Dr. {doctor}</h3>
                <div className="flex gap-1">
                  {machines.map((machine, machineIndex) => {
                    const timeSlots = Object.keys(
                      transformedData[doctor][machine]
                    );

                    return (
                      <div key={machineIndex} className="rounded-md">
                        {timeSlots.length > 0 ? (
                          <table className="bg-white w-full ">
                            <thead>
                              <tr className="bg-gray-200">
                                <th className="px-4 py-3 text-left text-xs font-bold text-black">
                                  Time
                                </th>
                                <th className="px-4 py-3 text-left text-xs font-bold text-black">
                                  {machine}
                                </th>
                              </tr>
                            </thead>
                            <tbody>
                              {timeSlots.map((time, timeIndex) => (
                                <tr key={timeIndex} className="border-b-2" >
                                  <td className="px-4 py-7 text-xs font-semibold ">
                                    {time}
                                  </td>
                                  <td className="px-4 py-4 text-xs font-medium ">
                                    {transformedData[doctor][machine][
                                      time
                                    ]?.map((patient, patientIndex) => (
                                      <div key={patientIndex}>{patient}</div>
                                    )) || "No Appointments"}
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        ) : (
                          <div>No Appointments</div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="flex w-full justify-center">No Appointments</div>
      )}
    </div>
  );
}
