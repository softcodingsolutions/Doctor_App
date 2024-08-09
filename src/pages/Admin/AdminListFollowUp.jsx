import { useEffect, useState } from "react";
import axios from "axios";

function AdminListFollowUp() {
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
  const [open, setOpen] = useState(false);
  const [data, setData] = useState({});
  const [openconsulting, setOpenConsulting] = useState(true);
  const [consultingData, setConsultingData] = useState([]);
  const [machineConsultingData, setMachineConsultingData] = useState([]);
  const [userDetails, setUserDetails] = useState({});
  const [packageDetail, setPackageDetail] = useState({});

  const handleSearchTerm = (value) => {
    setSearchTerm(value);
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      setDebouncedSearchTerm(searchTerm);
    }
  };

  useEffect(() => {
    if (debouncedSearchTerm) {
      axios
        .get(
          `/api/v1/appointments/fetch_users_appointments?case_number=${debouncedSearchTerm}&phone_number=${debouncedSearchTerm}&email=${debouncedSearchTerm}`
        )
        .then((res) => {
          console.log(res, "List Follow Up");
          setData(res.data);
          setConsultingData(res.data?.consulting_appointments);
          setMachineConsultingData(res.data?.machine_appointments);
          setUserDetails(res.data?.user);
          setPackageDetail(res.data?.user?.user_packages?.[0]);
        })
        .catch((err) => {
          console.log(err);
          alert("USER NOT FOUND");
        });
    }
  }, [debouncedSearchTerm]);

  const handleMachineData = () => {
    setOpen(true);
    setOpenConsulting(false);
  };

  const handleConsultingData = () => {
    setOpen(false);
    setOpenConsulting(true);
  };

  const formatDate = (date) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(date).toLocaleDateString(undefined, options);
  };

  function formatTime(dateTimeString) {
    const date = new Date(dateTimeString);
    return date.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  }

  return (
    <div className="flex w-full">
      <div className="w-full h-screen hidden sm:block sm:w-20 xl:w-60 flex-shrink-0">
        .
      </div>
      <div className="h-screen flex-grow overflow-auto flex flex-wrap content-start p-2">
        <div className="w-full p-2 ">
          <div className="rounded-lg bg-card h-[95vh] bg-white">
            <div className="flex p-4 h-full flex-col space-y-4">
              <div className="flex gap-5 p-2 w-full">
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => handleSearchTerm(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Search User through Case Number/Phone Number"
                  className="py-2 px-4 rounded-md border border-gray-800 w-full focus:outline-none focus:ring-1 focus:ring-black"
                />
                {open === false ? (
                  <button
                    type="button"
                    className="w-[10rem] text-white bg-[#1F2937] rounded-md border border-gray-500 font-medium text-lg hover:scale-105"
                    onClick={handleMachineData}
                  >
                    Machine Data
                  </button>
                ) : (
                  <button
                    type="button"
                    className="w-[10rem] text-white rounded-md bg-[#1F2937] border border-gray-500 font-medium text-lg hover:scale-105"
                    onClick={handleConsultingData}
                  >
                    Consulting Data
                  </button>
                )}
              </div>
              {data.message === "users_appointments" ? (
                <div className="flex flex-col ">
                  <div className="flex gap-48">
                    <div className="text-lg font-bold mb-4">
                      <div>
                        Patient Name:{" "}
                        <span className="font-medium">
                          {userDetails?.first_name} {userDetails?.last_name}
                        </span>
                      </div>
                      <div>
                        Case Number:{" "}
                        <span className="font-medium">
                          {userDetails?.case_number}
                        </span>
                      </div>
                    </div>
                    <div className="text-lg font-bold mb-4">
                      <div>
                        Package Name:{" "}
                        <span className="font-medium">
                          {packageDetail?.package_name ?? "No Package Assigned"}
                        </span>
                      </div>
                      <div>
                        Package Duration:{" "}
                        <span className="font-medium">
                          {packageDetail?.no_of_days} Days
                        </span>
                      </div>
                    </div>
                  </div>
                  {openconsulting && (
                    <div className="animate-fade-left animate-delay-75 shadow-gray-400 shadow-inner border rounded-md border-gray-100 animate-once animate-ease-out overflow-auto h-[99%]">
                      <div className="flex w-full flex-col items-center p-4 h-full">
                        <div className="text-2xl font-semibold tracking-wide">
                          Consulting Time Slot
                        </div>
                        <div className="animate-fade-left animate-delay-75 w-full bg-white shadow-gray-400 shadow-inner border rounded-md border-gray-400 animate-once animate-ease-out overflow-auto h-[93%]">
                          <table className="w-full min-w-[460px] z-0 ">
                            <thead className="uppercase">
                              <tr className="bg-[#1F2937] text-white rounded-md">
                                <th className="text-sm uppercase tracking-wide font-medium py-3 px-4 text-left">
                                  Doctor Name
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
                              {consultingData.length > 0 ? (
                                consultingData.map((data, index) => {
                                  return (
                                    <tr key={index} className="">
                                      <td className="py-3 px-4 border-b border-b-gray-50">
                                        <span className="text-black text-base font-medium ml-1">
                                          {data?.doctor?.first_name}{" "}
                                          {data?.doctor?.last_name}
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
                                })
                              ) : (
                                <tr>
                                  <td
                                    colSpan="4"
                                    className="py-3 px-4 text-center justify-center"
                                  >
                                    No Data
                                  </td>
                                </tr>
                              )}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  )}
                  {open && (
                    <div className="animate-fade-left animate-delay-75 shadow-gray-400 shadow-inner border rounded-md border-gray-100 animate-once animate-ease-out overflow-auto h-[99%]">
                      <div className="flex w-full flex-col items-center p-4 h-full">
                        <div className="text-2xl font-semibold tracking-wide">
                          Machine Time Slot
                        </div>
                        <div className="animate-fade-left animate-delay-75 bg-white w-full shadow-gray-400 shadow-inner border rounded-md border-gray-400 animate-once animate-ease-out overflow-auto h-[80%]">
                          <table className="w-full min-w-[460px] z-0 ">
                            <thead className="uppercase">
                              <tr className="bg-[#1F2937] text-white rounded-md">
                                <th className="text-sm uppercase tracking-wide font-medium py-3 px-4 text-left">
                                  Doctor Name
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
                              {machineConsultingData.length > 0 ? (
                                machineConsultingData.map((data, index) => {
                                  return (
                                    <tr key={index} className="">
                                      <td className="py-3 px-4 border-b border-b-gray-50">
                                        <span className="text-black text-base font-medium ml-1">
                                          {data.doctor.first_name}{" "}
                                          {data.doctor.last_name}
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
                                })
                              ) : (
                                <tr>
                                  <td
                                    colSpan="5"
                                    className="py-3 px-4 text-center"
                                  >
                                    No Appointment is created for Machine
                                    Consulting Time
                                  </td>
                                </tr>
                              )}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="flex justify-center pt-[15rem] text-xl font-medium text-center">
                  NO DATA HAS BEEN SEARCH!
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminListFollowUp;
