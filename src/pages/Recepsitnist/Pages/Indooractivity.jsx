import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function Indooractivity(props) {
  const [consultingTime, setConsultingTime] = useState(new Date());
  const [slot, setSlot] = useState('');
  const [machine, setMachine] = useState('');
  const [machineDetails, setMachineDetails] = useState([]);
  const [filteredTimeSlots, setFilteredTimeSlots] = useState([]);

  useEffect(() => {
    handleMachineShow();
  }, [props.doctor]);

  const handleConsulting = (e) => {
    setConsultingTime(e.target.value);
  };

  const handleSlot = (e) => {
    setSlot(e.target.value);
  };

  const handleMachine = (e) => {
    const selectedMachineId = e.target.value;
    setMachine(selectedMachineId);
    filterTimeSlots(selectedMachineId);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formdata = new FormData();
    formdata.append("appointment[user_id]",props.user);
    formdata.append("appointment[date]", consultingTime);
    formdata.append("appointment[doctor_id]", props.doctor);
    formdata.append("appointment[time]", slot);
    formdata.append("appointment[machine_id]",machine);
    axios
      .post(`/api/v1/appointments`, formdata)
      .then((res) => {
        console.log(res);
        alert("Successfully created Appointment!");
        setMachine('');
        setConsultingTime(new Date());
        setSlot('');
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleMachineShow = () => {
    axios
      .get(`/api/v1/machine_consulting_times/consulting_times_for_doctor/${props.doctor}`)
      .then((res) => {
        const machineDetails = res.data.consulting_times.map(item => item.machine_detail);
        setMachineDetails(machineDetails);
        console.log(res,"Machine details")
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const filterTimeSlots = (machineId) => {
    axios
      .get(`/api/v1/machine_consulting_times/consulting_times_for_doctor/${props.doctor}`)
      .then((res) => {
        const filteredSlots = res.data.consulting_times.filter(slot => slot.machine_detail.id === parseInt(machineId));
        setFilteredTimeSlots(filteredSlots);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  function formatTime(time) {
    try {
      const date = new Date(time);
      const options = { hour: '2-digit', minute: '2-digit', hour12: true, timeZone: 'UTC' };
      return new Intl.DateTimeFormat('en-US', options).format(date);
    } catch (error) {
      console.error("Error formatting time:", error);
      return "Invalid time";
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <h2 className="text-lg font-semibold text-center mt-5">Indoor Activity Time Slot</h2>
        </div>
        <div className="flex gap-5 m-2">
          <label className="text-lg text-end w-1/3 mr-2">Select Machine: </label>
          <select
            className="py-1 px-2 rounded-md border border-black w-[40vh]"
            onChange={handleMachine}
            value={machine}>
            <option value="" disabled>
              Select
            </option>
            {machineDetails.map((detail) => (
              <option key={detail.id} value={detail.id}>
                {detail.name}
              </option>
            ))}
          </select>
        </div>
        <div className="flex gap-5 m-2">
          <label className="text-lg text-end w-1/3 mr-2">Select the Date: </label>
          <input
            type="date"
            placeholder="select date"
            className="py-1 px-2 rounded-md border border-black w-[40vh]"
            onChange={handleConsulting}
          />
        </div>
        <div className="flex gap-5 m-2">
          <label className="text-lg text-end w-1/3 mr-2">Select Machine Timeslot: </label>
          <select
            className="py-1 px-2 rounded-md border border-black w-[40vh]"
            onChange={handleSlot}
            value={slot}>
            <option value="" disabled>
              Select
            </option>
            {filteredTimeSlots.map((detail) => (
              <option key={detail.id} value={detail.id}>
                {formatTime(detail.time)}
              </option>
            ))}
          </select>
        </div>
        <div className="flex w-full justify-center mt-10">
          <button
            type="submit"
            onClick={handleSubmit}
            className="w-[20rem] text-white rounded-md border border-gray-500 font-medium text-lg hover:scale-105"
            style={{ backgroundColor: "black" }}>
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}
