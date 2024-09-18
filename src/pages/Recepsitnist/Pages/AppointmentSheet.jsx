import { useState, useEffect } from "react";
import axios from "axios";
import InsideLoader from "../../InsideLoader";

export default function AppointmentSheet() {
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
    <div className="w-full p-2 bg-gray-50 h-[92vh]">
      <div className="grid grid-cols-1 gap-4 mb-6 md:grid-cols-2">
        <div className="grid grid-col-1 lg:grid-cols-2 justify-center mt-5 w-full gap-5">
          <div>
            <input
              type="date"
              placeholder="select date"
              className="py-1 px-2 rounded-md border-2 lg:w-[35vh]"
              onChange={handleConsulting}
            />
          </div>
          <div className="w-full">
            <div className="text-md font-semibold w-full">
              Date : {formatDate(consultingTime)}
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-center gap-1 w-full">
        {Object.keys(transformedData).map((doctor, doctorIndex) => {
          const machines = Object.keys(transformedData[doctor]);

          return (
            <div key={doctorIndex} className=" rounded-md overflow-auto mb-6 ">
              <h3 className="text-md font-semibold mb-2">Dr. {doctor}</h3>
              <div className="flex gap-1">
                {machines.map((machine, machineIndex) => {
                  const timeSlots = Object.keys(
                    transformedData[doctor][machine]
                  );

                  return (
                    <div
                      key={machineIndex}
                      className="rounded-md "
                    >
                      {timeSlots.length > 0 ? (
                        <table className="bg-white w-full">
                          <thead>
                            <tr className="bg-gray-200">
                              <th className="px-4 py-3 text-left text-sm font-medium text-black">
                                Time
                              </th>
                              <th className="px-4 py-3 text-left text-sm font-medium text-black">
                                {machine}
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            {timeSlots.map((time, timeIndex) => (
                              <tr key={timeIndex}>
                                <td className="px-4 py-4 text-sm text-gray-900">
                                  {time}
                                </td>
                                <td className="px-4 py-4 text-sm text-gray-900">
                                  {transformedData[doctor][machine][time]?.map(
                                    (patient, patientIndex) => (
                                      <div key={patientIndex}>{patient}</div>
                                    )
                                  ) || "No Appointments"}
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
    </div>
  );
}
