import { useState } from "react";
import clsx from "https://cdn.skypack.dev/clsx@1.1.1";
import { WiTime2 } from "react-icons/wi";
import { FaUserDoctor } from "react-icons/fa6";
import { GrVirtualMachine } from "react-icons/gr";
import { LuCalendarClock } from "react-icons/lu";
import DoctorList from "./DE/DoctorList";
import ConsultingTime from "./DE/ConsultingTime";
import MachineDetails from "./DE/MachineDetails";
import MachineTimeslot from "./DE/MachineTimeslot";

export default function DataEntry() {
  const [selectedId, setSelectedId] = useState("1");
  const [doctorlist, setDoctorList] = useState(true);
  const [timeslot, setTimeslot] = useState(false);
  const [machines, setMachines] = useState(false);
  const [machinestime, setMachinestime] = useState(false);

  const handleDoctor = () => {
    setDoctorList(true);
    setTimeslot(false);
    setMachines(false);
    setMachinestime(false);
    setSelectedId("1");
  };

  const handleTimeslot = () => {
    setDoctorList(false);
    setTimeslot(true);
    setMachines(false);
    setMachinestime(false);
    setSelectedId("2");
  };

  const handleMachines = () => {
    setDoctorList(false);
    setTimeslot(false);
    setMachines(true);
    setMachinestime(false);
    setSelectedId("3");
  };

  const handleMachinestime = () => {
    setDoctorList(false);
    setTimeslot(false);
    setMachines(false);
    setMachinestime(true);
    setSelectedId("4");
  };

  const buttons = [
    {
      id: "1",
      name: "Doctor List",
      icons: <FaUserDoctor className="mt-1" />,
      function: handleDoctor,
    },
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
    {
      id: "4",
      name: "Machine Timeslot",
      function: handleMachinestime,
      icons: <LuCalendarClock className="mt-1" />,
    },
  ];

  return (
    <div className="w-full ">
      <div className="flex transition-transform gap-3 p-1 min-w-fit items-center">
        {buttons.map((res) => (
          <button
            key={res.id}
            onClick={res.function}
            className={clsx(
              "min-w-fit flex items-center justify-center col-span-2 shadow-md cursor-pointer hover:bg-[#1F2937] hover:text-white p-2 rounded-md",
              selectedId === res.id ? "bg-[#1F2937] text-white" : "bg-white"
            )}
          >
            <div className="flex gap-2">
              {res.icons} {res.name}
            </div>
          </button>
        ))}
      </div>
      <div>
        {doctorlist && <DoctorList />}
        {timeslot && <ConsultingTime />}
        {machines && <MachineDetails />}
        {machinestime && <MachineTimeslot />}
      </div>
    </div>
  );
}
