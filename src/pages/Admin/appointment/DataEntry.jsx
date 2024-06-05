import React, { useState } from 'react';
import clsx from 'https://cdn.skypack.dev/clsx@1.1.1';
import { CiViewList } from 'react-icons/ci';
import { FaRegQuestionCircle } from 'react-icons/fa';
import { AiOutlineMedicineBox } from 'react-icons/ai';
import { MdFoodBank } from 'react-icons/md';
import DoctorList from './DE/DoctorList';
import ConsultingTime from './DE/ConsultingTime';

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

  const buttons = () => [
    {
      id: "1",
      name: "Doctor List",
      function: handleDoctor,
    },
    {
      id: "2",
      name: "Consulting Timeslot",
      function: handleTimeslot,
    },
    {
      id: "3",
      name: "Machine List",
      function: handleMachines,
    },
    {
      id: "4",
      name: "Machine Timeslot",
      function: handleMachinestime,
    },
  ];

  return (
    <div className="w-full ">
      <div
              className="grid grid-cols-4  transition-transform lg:grid-cols-10 md:grid-cols-8 sm:grid-cols-6 gap-10 p-1 min-w-fit xl:flex">
        {buttons().map((res) => (
          <button
            key={res.id}
            onClick={res.function}
            className={clsx(
              "min-w-fit flex items-center justify-center col-span-2 border shadow-md cursor-pointer hover:bg-[#1F2937] hover:text-white p-2 rounded-md",
              selectedId === res.id
                ? "bg-[#1F2937] text-white"
                : "bg-white"
            )}
          >
            {res.icons}
            {res.name}
          </button>
        ))}
      </div>
      <div>
        {doctorlist && <DoctorList />}
        {timeslot && <ConsultingTime />}
        {machines && <div>Machine List Content</div>}
        {machinestime && <div>Machine Timeslot Content</div>}
      </div>
    </div>
  );
}
