import { useState, useEffect } from "react";
import axios from "axios";
import InsideLoader from "../../InsideLoader";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { IoMdArrowRoundBack } from "react-icons/io";
import { IoIosRemoveCircleOutline } from "react-icons/io";
import { GrVirtualMachine } from "react-icons/gr";
import { CiCalendar } from "react-icons/ci";
import DatePicker from "react-datepicker";

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
    const selectedDate = e.toISOString().split("T")[0];
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
      const appointmentId = item.id;

      if (!transformed[doctor]) {
        transformed[doctor] = {};
      }

      if (!transformed[doctor][machine]) {
        transformed[doctor][machine] = {};
      }

      if (!transformed[doctor][machine][time]) {
        transformed[doctor][machine][time] = [];
      }

      transformed[doctor][machine][time].push({
        id: appointmentId,
        details: (
          <>
            {item.user.first_name} {item.user.last_name} <br />
            {item.user.phone_number}
          </>
        ),
      });
    });

    return transformed;
  };

  const transformedData = transformData(allConsultingTimes);

  const handleCancel = (appointmentId) => {
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
        if (appointmentId) {
          axios
            .delete(`/api/v1/appointments/${appointmentId}`)
            .then((res) => {
              console.log("Appointment cancelled:", res);
              Swal.fire({
                title: "Deleted!",
                text: `Appointment has been deleted.`,
                icon: "success",
              }).then(() => {
                handleAppointment();
              });
            })
            .catch((err) => {
              console.error("Error cancelling appointment:", err);
              Swal.fire({
                title: "Error",
                text:
                  err.response?.data?.message ||
                  "Failed to cancel appointment.",
                icon: "error",
              });
            });
        }
      }
    });
  };

  return (
    <div className="w-full p-2 h-full">
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
          <div className="flex justify-center w-full gap-2">
            <div className="">
              <GrVirtualMachine size={30} />
            </div>
            <h2 className="text-xl font-semibold  ">
              Indoor Activity Time Slot
            </h2>
          </div>
          <div className=" flex flex-col justify-end gap-2  ml-10  ">
            <div className="text-md font-semibold ">
              Date : {formatDate(consultingTime)}
            </div>
            {/* <input
              type="date"
              placeholder="select date"
              className="py-1 px-2 rounded-md border-2 lg:w-[30vh]"
              onChange={handleConsulting}
            /> */}
            <div className="relative flex items-center w-[30vh] h-10">
              <CiCalendar className="absolute left-3 text-black z-10" />
              <DatePicker
                selected={new Date(consultingTime)}
                onChange={(date) => handleConsulting(date)}
                dateFormat="dd-MM-yyyy"
                placeholderText="Select date"
                className="w-full  text-sm p-2.5 pl-10 pr-3 border rounded-md focus:outline-none bg-white"
              />
            </div>
          </div>
        </div>
      </div>
      {allConsultingTimes.length > 0 ? (
        <div className="flex justify-center gap-1 w-full">
          {Object.keys(transformedData).map((doctor, doctorIndex) => {
            const machines = Object.keys(transformedData[doctor]);

            return (
              // <div
              //   key={doctorIndex}
              //   className=" rounded-md overflow-auto mb-6 "
              // >
              //   <h3 className="text-lg font-medium mb-1 p-1 bg-green-500 justify-center flex">
              //     Dr. {doctor}
              //   </h3>
              //   <div className="flex gap-1">
              //     {machines.map((machine, machineIndex) => {
              //       const timeSlots = Object.keys(
              //         transformedData[doctor][machine]
              //       );

              //       return (
              //         <div key={machineIndex} className="rounded-md">
              //           {timeSlots.length > 0 ? (
              //             <table className="bg-white w-full h-full">
              //               <thead>
              //                 <tr className="bg-gray-300">
              //                   <th className="px-4 py-3 text-left text-xs font-bold text-black">
              //                     Time
              //                   </th>
              //                   <th className="px-4 py-3 text-left text-xs font-bold text-black">
              //                     {machine}
              //                   </th>
              //                 </tr>
              //               </thead>
              //               <tbody>
              //                 {timeSlots.map((time, timeIndex) => (
              //                   <tr key={timeIndex} className="border-b-2">
              //                     <td className="px-4 py-7 text-xs font-semibold ">
              //                       {time}
              //                     </td>
              //                     <td className="px-4 py-4 text-xs font-medium ">
              //                       {transformedData[doctor][machine][
              //                         time
              //                       ]?.map((appointment, patientIndex) => (
              //                         <div
              //                           key={patientIndex}
              //                           className="flex gap-5 justify-between items-center"
              //                         >
              //                           <div>
              //                             <span>{appointment.details}</span>
              //                           </div>
              //                           <div>
              //                             <button
              //                               onClick={() =>
              //                                 handleCancel(appointment.id)
              //                               }
              //                               tooltip="Cancel Appointment"
              //                               className="inline-flex items-center px-2 py-1 border border-transparent text-sm font-medium rounded-md text-white bg-red-700  hover:bg-red-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              //                               title="Cancel Appointment"
              //                             >
              //                               <IoIosRemoveCircleOutline
              //                                 size={10}
              //                               />
              //                             </button>
              //                           </div>
              //                         </div>
              //                       )) || "No Appointments"}
              //                     </td>
              //                   </tr>
              //                 ))}
              //               </tbody>
              //             </table>
              //           ) : (
              //             <div>No Appointments</div>
              //           )}
              //         </div>
              //       );
              //     })}
              //   </div>
              // </div>
              <div
                key={doctorIndex}
                className="w-80 min-w-[27rem] rounded-md overflow-hidden border bg-white shadow-md"
              >
                <h3 className="text-lg font-medium p-2 bg-green-500 text-white text-center">
                  Dr. {doctor}
                </h3>
                <div className="overflow-x-auto">
                  {machines.map((machine, machineIndex) => {
                    const timeSlots = Object.keys(
                      transformedData[doctor][machine]
                    );

                    return (
                      <div key={machineIndex} className="p-2">
                        {timeSlots.length > 0 ? (
                          <table className="w-full text-sm">
                            <thead>
                              <tr className="bg-gray-300 text-gray-800">
                                <th className="px-4 py-2 text-left">Time</th>
                                <th className="px-4 py-2 text-left">
                                  {machine}
                                </th>
                              </tr>
                            </thead>
                            <tbody>
                              {timeSlots.map((time, timeIndex) => (
                                <tr key={timeIndex} className="border-b">
                                  <td className="px-4 py-3 font-semibold">
                                    {time}
                                  </td>
                                  <td className="px-4 py-3">
                                    <div className="max-h-32 overflow-y-auto space-y-2">
                                      {transformedData[doctor][machine][
                                        time
                                      ]?.map((appointment, patientIndex) => (
                                        <div
                                          key={patientIndex}
                                          className="flex justify-between items-center border-b pb-2"
                                        >
                                          <span className="text-gray-700 text-sm">
                                            {appointment.details}
                                          </span>
                                          <button
                                            onClick={() =>
                                              handleCancel(appointment.id)
                                            }
                                            className="p-1 text-red-600 hover:text-red-800"
                                            title="Cancel Appointment"
                                          >
                                            <IoIosRemoveCircleOutline
                                              size={18}
                                            />
                                          </button>
                                        </div>
                                      )) || (
                                        <span className="text-gray-500">
                                          No Appointments
                                        </span>
                                      )}
                                    </div>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        ) : (
                          <div className="text-gray-500 text-center py-2">
                            No Appointments
                          </div>
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
