import { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import ThComponent from "../../components/ThComponent";
import TdComponent from "../../components/TdComponent";
import axios from "axios";

function AdminDashboard() {
  const [getConsultingTime, setGetConsultingTime] = useState([]);
  const [getMachineTime, setGetMachineTime] = useState([]);
  const context = useOutletContext();

  const handleGetConsultingTime = () => {
    axios
      .get(`/api/v1/consulting_times`)
      .then((res) => {
        console.log("Consulting Time: ", res.data?.consulting_times);
        setGetConsultingTime(res.data?.consulting_times);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleGetMachineTime = () => {
    axios
      .get(`/api/v1/machine_consulting_times`)
      .then((res) => {
        console.log(
          "Machine Consulting Time: ",
          res.data?.machine_consulting_times
        );
        setGetMachineTime(res.data?.machine_consulting_times);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const formatTime = (isoString) => {
    const date = new Date(isoString);
    let hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? "PM" : "AM";

    hours = hours % 12;
    hours = hours ? hours : 12; // The hour '0' should be '12'
    const strMinutes = minutes < 10 ? "0" + minutes : minutes;

    return `${hours}:${strMinutes} ${ampm}`;
  };

  useEffect(() => {
    handleGetConsultingTime();
    handleGetMachineTime();
  }, []);

  return (
    <div className="flex w-full">
      <div className="w-full h-screen hidden sm:block sm:w-20 xl:w-60 flex-shrink-0">
        .
      </div>
      <div className="h-screen flex-grow overflow-auto flex flex-wrap content-start p-1">
        <div className="w-full h-full p-2 flex flex-col gap-1">
          <div className="sm:flex-grow flex justify-between overflow-x-hidden gap-1">
            <div> </div>
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
          <div className="flex w-full h-full items-center justify-center gap-1">
            {/* consulting time table */}
            <div className="flex w-full flex-col items-center p-1 h-full">
              <div className="text-2xl font-semibold tracking-wide">
                Consulting Time Slot
              </div>
              <div className="animate-fade-left animate-delay-75 w-full shadow-gray-400 shadow-inner border rounded-md border-gray-400 animate-once animate-ease-out overflow-auto h-[93%]">
                <table className="w-full min-w-[460px] z-0">
                  <thead className="uppercase">
                    <tr className="bg-[#1F2937] text-white rounded-md">
                      <ThComponent
                        moreClasses={"rounded-tl-md rounded-bl-md"}
                        name="No."
                      />
                      <ThComponent name="Doctor Name" />
                      <ThComponent name="Slot" />
                      <ThComponent
                        name="Time"
                        moreClasses={"rounded-tr-md rounded-br-md"}
                      />
                    </tr>
                  </thead>
                  <tbody>
                    {getConsultingTime.length === 0 ? (
                      <tr>
                        <th
                          className="uppercase tracking-wide font-medium pt-[8rem] text-lg"
                          colSpan={5}
                        >
                          No Consulting Slots Found!
                        </th>
                      </tr>
                    ) : (
                      getConsultingTime.map((val, index) => {
                        return (
                          <tr key={val.id}>
                            <td className="py-2 px-4 border-b border-b-gray-50">
                              <div className="flex items-center">
                                {index + 1}
                              </div>
                            </td>
                            <td className="py-3 px-4 border-b border-b-gray-50">
                              <TdComponent things={val.user_name} />
                            </td>
                            <td className="py-3 px-4 border-b border-b-gray-50">
                              <TdComponent things={val.slot} />
                            </td>
                            <td className="py-3 px-4 border-b border-b-gray-50">
                              <TdComponent things={formatTime(val.time)} />
                            </td>
                          </tr>
                        );
                      })
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            {/* machine time table */}
            <div className="flex w-full flex-col items-center p-1 h-full">
              <div className="text-2xl font-semibold tracking-wide">
                Machine Time Slot
              </div>
              <div className="animate-fade-left animate-delay-75 w-full shadow-gray-400 shadow-inner border rounded-md border-gray-400 animate-once animate-ease-out overflow-auto h-[93%]">
                <table className="w-full min-w-[460px] z-0">
                  <thead className="uppercas ">
                    <tr className="bg-[#1F2937] text-white rounded-md">
                      <ThComponent
                        moreClasses={"rounded-tl-md rounded-bl-md"}
                        name="No."
                      />
                      <ThComponent name="Doctor Name" />
                      <ThComponent name="Machine Name" />
                      <ThComponent name="Slot" />
                      <ThComponent
                        name="Time"
                        moreClasses={"rounded-tr-md rounded-br-md"}
                      />
                    </tr>
                  </thead>
                  <tbody>
                    {getMachineTime.length === 0 ? (
                      <tr>
                        <th
                          className="uppercase tracking-wide font-medium pt-[8rem] text-lg"
                          colSpan={8}
                        >
                          No Machine Slots Found!
                        </th>
                      </tr>
                    ) : (
                      getMachineTime.map((val, index) => {
                        return (
                          <tr key={val.id}>
                            <td className="py-2 px-4 border-b border-b-gray-50">
                              <div className="flex items-center">
                                {index + 1}
                              </div>
                            </td>
                            <td className="py-3 px-4 border-b border-b-gray-50">
                              <TdComponent things={val.doctor?.first_name} />
                            </td>
                            <td className="py-3 px-4 border-b border-b-gray-50">
                              <TdComponent things={val.machine_detail?.name} />
                            </td>
                            <td className="py-3 px-4 border-b border-b-gray-50">
                              <TdComponent things={val.slot} />
                            </td>
                            <td className="py-3 px-4 border-b border-b-gray-50">
                              <TdComponent things={formatTime(val.time)} />
                            </td>
                          </tr>
                        );
                      })
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
