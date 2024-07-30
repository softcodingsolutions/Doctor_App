import { useState, useEffect } from "react";
import axios from "axios";

export default function Home() {
  const [filteredDoctors, setFilteredDoctors] = useState([]);
  const [doctorList, setDoctorList] = useState("");
  const [consultingTime, setConsultingTime] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [consultingTimes, setConsultingTimes] = useState([]);
  const [machineConsultingTimes, setMachineConsultingTimes] = useState([]);

  const handleDoctorList = (e) => {
    setDoctorList(e.target.value);
  };

  const handleConsulting = (e) => {
    setConsultingTime(e.target.value);
  };

  const handleAppointment = () => {
    axios
      .get(`api/v1/appointments?date=${consultingTime}&doctor_id=${doctorList}`)
      .then((res) => {
        console.log(res);
        console.log(res.data?.cosulting_times, "Consulting Time");
        console.log(res.data.machine_details, "Machine Time");
        setConsultingTimes(res.data?.cosulting_times);
        setMachineConsultingTimes(res.data?.machine_details);
      })
      .catch((err) => {
        console.log(err);
        alert(err.message);
      });
  };

  function formatTime(dateTimeString) {
    const date = new Date(dateTimeString);
    return date.toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
  }

  const formatDate = (date) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(date).toLocaleDateString(undefined, options);
  };

  useEffect(() => {
    axios
      .get("api/v1/users")
      .then((res) => {
        console.log("all the users: ", res);
        setFilteredDoctors(res.data.users);
      })
      .catch((err) => {
        console.log(err);
        alert(err.message);
      });
  }, []);

  useEffect(() => {
    handleAppointment();
  }, [consultingTime, doctorList]);

  return (
    <div className="w-full p-5">
      <div className="rounded-lg bg-card h-[90vh] bg-white">
        <div className="flex flex-col px-4 py-3 h-full space-y-4 ">
          <div className="flex gap-5 items-center p-2 w-full">
            <select
              onChange={handleDoctorList}
              defaultValue="select1"
              value={doctorList}
              className="p-2 rounded-md border border-black  w-[40vh]"
            >
              <option value="select1" selected>
                Select Doctor
              </option>
              {filteredDoctors
                .filter((doctor) => doctor.role === "doctor")
                .map((name) => (
                  <option key={name.id} value={name.id}>
                    {name.first_name} {name.last_name}
                  </option>
                ))}
            </select>
            <input
              type="date"
              placeholder="select date"
              className="py-1 px-2 rounded-md border border-black w-[40vh]"
              onChange={handleConsulting}
            />
          </div>
          <div className="w-full flex flex-wrap xl:flex-nowrap justify-center p-4 shadow-gray-400 shadow-inner border rounded-md border-gray-100 animate-once animate-ease-out overflow-auto h-[93%]">
            <div className="flex w-full h-full items-center justify-center gap-1">
              {/* consulting time table */}
              <div className="flex w-full flex-col items-center p-1 h-full">
                <div className="text-2xl font-semibold tracking-wide">
                  Consulting Time Slot
                </div>
                <div className="animate-fade-left animate-delay-75 w-full bg-white shadow-gray-400 shadow-inner border rounded-md border-gray-400 animate-once animate-ease-out overflow-auto h-[93%]">
                  <table className="w-full min-w-[460px] z-0">
                    <thead className="uppercase">
                      <tr className="bg-[#1F2937] text-white rounded-md">
                        <th className="text-sm uppercase tracking-wide font-medium py-3 px-4 text-left">
                          Doctor Name
                        </th>
                        <th className="text-sm uppercase tracking-wide font-medium py-3 px-4 text-left">
                          Patient Name
                        </th>
                        <th className="text-sm uppercase tracking-wide font-medium py-3 px-4 text-left">
                          Date
                        </th>
                        <th className="text-sm uppercase tracking-wide font-medium py-3 px-4 text-left">
                          Time
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {consultingTimes.length > 0 ? 
                        (consultingTimes.map((data, index) => {
                          return (
                            <tr key={index} className="map">
                              <td className="py-3 px-4 border-b border-b-gray-50">
                                <span className="text-black text-base font-medium ml-1">
                                  {data.doctor.first_name} {data.doctor.last_name}
                                </span>
                              </td>
                              <td className="py-3 px-4 border-b border-b-gray-50">
                                <span className="text-black text-base font-medium ml-1">
                                  {data.user.first_name} {data.user.last_name}
                                </span>
                              </td>
                              <td className="py-3 px-4 border-b border-b-gray-50">
                                <span className="text-black text-base font-medium ml-1">
                                  {formatDate(data.date)}
                                </span>
                              </td>
                              <td className="py-3 px-4 border-b border-b-gray-50">
                                <span className="text-black text-base font-medium ml-1">
                                  {formatTime(data.time)}
                                </span>
                              </td>
                            </tr>
                          );
                        })) : 
                        (
                          <tr>
                            <td colSpan="4" className="py-3 px-4 text-center justify-center">
                              No Appointment is created for Consulting Time
                            </td>
                          </tr>
                        )
                      }
                    </tbody>
                  </table>
                </div>
              </div>

              {/* machine time table */}
              <div className="flex w-full flex-col items-center p-1 h-full">
                <div className="text-2xl font-semibold tracking-wide">
                  Machine Time Slot
                </div>
                <div className="animate-fade-left animate-delay-75 bg-white w-full shadow-gray-400 shadow-inner border rounded-md border-gray-400 animate-once animate-ease-out overflow-auto h-[93%]">
                  <table className="w-full min-w-[460px] z-0">
                    <thead className="uppercase">
                      <tr className="bg-[#1F2937] text-white rounded-md">
                        <th className="text-sm uppercase tracking-wide font-medium py-3 px-4 text-left">
                          Doctor Name
                        </th>
                        <th className="text-sm uppercase tracking-wide font-medium py-3 px-4 text-left">
                          Patient Name
                        </th>
                        <th className="text-sm uppercase tracking-wide font-medium py-3 px-4 text-left">
                          Machine Name
                        </th>
                        <th className="text-sm uppercase tracking-wide font-medium py-3 px-4 text-left">
                          Date
                        </th>
                        <th className="text-sm uppercase tracking-wide font-medium py-3 px-4 text-left">
                          Time
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {machineConsultingTimes.length > 0 ?
                        (machineConsultingTimes.map((data, index) => {
                          return (
                            <tr key={index} className="map">
                              <td className="py-3 px-4 border-b border-b-gray-50">
                                <span className="text-black text-base font-medium ml-1">
                                  {data.doctor.first_name} {data.doctor.last_name}
                                </span>
                              </td>
                              <td className="py-3 px-4 border-b border-b-gray-50">
                                <span className="text-black text-base font-medium ml-1">
                                  {data.user.first_name} {data.user.last_name}
                                </span>
                              </td>
                              <td className="py-3 px-4 border-b border-b-gray-50">
                                <span className="text-black text-base font-medium ml-1">
                                  {data.machine_detail.name}
                                </span>
                              </td>
                              <td className="py-3 px-4 border-b border-b-gray-50">
                                <span className="text-black text-base font-medium ml-1">
                                  {formatDate(data.date)}
                                </span>
                              </td>
                              <td className="py-3 px-4 border-b border-b-gray-50">
                                <span className="text-black text-base font-medium ml-1">
                                  {formatTime(data.time)}
                                </span>
                              </td>
                            </tr>
                          );
                        }))
                        :
                        (
                          <tr>
                            <td colSpan="5" className="py-3 px-4 text-center">
                              No Appointment is created for Machine Consulting Time
                            </td>
                          </tr>
                        )
                      }
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
