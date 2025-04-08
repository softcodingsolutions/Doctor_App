import { useState } from "react";
import clsx from "https://cdn.skypack.dev/clsx@1.1.1";
import { WiTime2 } from "react-icons/wi";
// import { FaUserDoctor } from "react-icons/fa6";
import { GrVirtualMachine } from "react-icons/gr";
// import { LuCalendarClock } from "react-icons/lu";
// import DoctorList from "./DE/DoctorList";
import ConsultingTime from "./DE/ConsultingTime";
import MachineDetails from "./DE/MachineDetails";
// import MachineTimeslot from "./DE/MachineTimeslot";

export default function DataEntry() {
  const [selectedId, setSelectedId] = useState("2");
  const [timeslot, setTimeslot] = useState(true);
  const [machines, setMachines] = useState(false);
  //   const [machinestime, setMachinestime] = useState(false);

  const handleTimeslot = () => {
    setTimeslot(true);
    setMachines(false);
    // setMachinestime(false);
    setSelectedId("2");
  };

  const handleMachines = () => {
    setTimeslot(false);
    setMachines(true);
    // setMachinestime(false);
    setSelectedId("3");
  };

  // const handleMachinestime = () => {
  //   setTimeslot(false);
  //   setMachines(false);
  //   setMachinestime(true);
  //   setSelectedId("4");
  // };

  const buttons = [
    {
      id: "2",
      name: "Consulting Timeslot",
      icons: <WiTime2 className="mt-1" size={18} />,
      function: handleTimeslot,
    },
    {
      id: "3",
      name: "Machine List",
      function: handleMachines,
      icons: <GrVirtualMachine className="mt-1" />,
    },
    // {
    //   id: "4",
    //   name: "Machine Timeslot",
    //   function: handleMachinestime,
    //   icons: <LuCalendarClock className="mt-1" />,
    // },
  ];

  return (
    <div className="w-full h-full">
      <div className="flex justify-between items-center mb-4">
        <div className="flex  flex-col">
          {/* <label className="flex justify-start text-xl font-bold ">
            Data Entry Section
          </label> */}
        </div>
        <div className="flex rounded-lg bg-gray-100 w-[450px] p-1 justify-between shadow-sm">
          {buttons.map((res) => (
            <button
              key={res.id}
              onClick={res.function}
              className={`w-1/2 px-4 py-2 text-sm font-medium rounded-md transition-all duration-300 ease-in-out ${
                selectedId === res.id
                  ? "bg-green-600 text-white transform scale-105"
                  : "text-gray-600 bg-white hover:bg-gray-200"
              }`}
            >
              <div className="flex gap-2">
                {res.icons} {res.name}
              </div>
            </button>
          ))}
        </div>
      </div> 
      <div>
        {timeslot && <ConsultingTime />}
        {machines && <MachineDetails />}
        {/* {machinestime && <MachineTimeslot />} */}
      </div>
    </div>
  );
}
