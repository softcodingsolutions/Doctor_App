import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Box from '@mui/joy/Box';

export default function Indooractivity(props) {
  const [consultingTime, setConsultingTime] = useState(new Date());
  const [slot, setSlot] = useState('');
  const [machine, setMachine] = useState('');
  const [machineDetails, setMachineDetails] = useState([]);
  const [filteredTimeSlots, setFilteredTimeSlots] = useState([]);
  const [machineQuantity, setMachineQuantity] = useState(0);
  const [allocatedMachines, setAllocatedMachines] = useState([]);
  const [slotTime, setSlotTime] = useState('');
  const [bookedSlot, setBookedSlot] = useState(null); 
  const [available, setAvailable] = useState(null);  

  useEffect(() => {
    handleMachineShow();
    handleAppointmentCount();
  }, [props.doctor]);

  const handleConsulting = (e) => {
    setConsultingTime(e.target.value);
  };

  const handleAppointmentCount = () => {
    axios.get(`/api/v1/appointments`).then((res) => {
      console.log(res, "AppointmentCount");
      const allocatedMachines = res.data.appointments.map((data) => data.machine_consulting_time_id);
      setAllocatedMachines(allocatedMachines);
    }).catch((err) => {
      console.log(err);
    });
  };

  const handleSlot = (e) => {
    setSlot(e.target.value);
    const formattedDate = formatDate(consultingTime);
    axios.get(`/api/v1/appointments/machine_consulting_available?date=${formattedDate}&time=${slotTime}&machine_consulting_time_id=${e.target.value}`).then((res) => {
      console.log(res, "CHECKBOX BUTTONS DATA");
      setAvailable(res.data.availab_slot);
      setBookedSlot(res.data.booked_slot);
    }).catch((err) => {
      console.log(err);
    })
  };

  const handleMachine = (e) => {
    const selectedMachineId = e.target.value;
    setMachine(selectedMachineId);
    filterTimeSlots(selectedMachineId);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formattedDate = formatDate(consultingTime);
    const formdata = new FormData();
    formdata.append("appointment[user_id]", props.user);
    formdata.append("appointment[date]", formattedDate);
    formdata.append("appointment[doctor_id]", props.doctor);
    formdata.append("appointment[time]", slotTime);
    formdata.append("appointment[machine_consulting_time_id]", slot);
    axios
      .post(`/api/v1/appointments`, formdata)
      .then((res) => {
        console.log(res);
        alert("Successfully created Appointment!");
        setMachine('');
        setConsultingTime(new Date());
        setSlot('');
        setSlotTime('');
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleMachineShow = () => {
    axios
      .get(`/api/v1/machine_consulting_times/consulting_times_for_doctor/${props.doctor}`)
      .then((res) => {
        console.log(res);
        const machineDetails = res.data.consulting_times.map(item => item.machine_detail);
        setMachineDetails(machineDetails);
        console.log(res, "Machine details");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const filterTimeSlots = (machineId) => {
    axios
      .get(`/api/v1/machine_consulting_times/consulting_times_for_doctor/${props.doctor}`)
      .then((res) => {
        console.log(res, "Filter Time Slots");
        const filteredSlots = res.data.consulting_times.filter(slot => slot.machine_detail.id === parseInt(machineId));
        const slotTimes = filteredSlots.map((data) => data.time);
        setFilteredTimeSlots(filteredSlots);
        setSlotTime(slotTimes.length > 0 ? slotTimes[0] : '');
        const machine = filteredSlots.map(slot => slot.machine_detail.quantity);
        setMachineQuantity(machine.length > 0 ? machine[0] : 0);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const formatDate = (date) => {
    const d = new Date(date);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
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

  const renderBoxes = (count, isChecked) => {
    const boxes = [];
    for (let i = 0; i < count; i++) {
      boxes.push(
        <Box
          key={i}
          component="input"
          type="checkbox"
          checked={isChecked}
          sx={{
            width: 30,
            height: 30,
            borderRadius: '20%',
            margin: '5px'
          }}
          readOnly
        />
      );
    }
    return boxes;
  };

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
                {detail.time}
              </option>
            ))}
          </select>
        </div>
        {slot && (
          <div className="flex w-full justify-center mt-10">
            <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
              {renderBoxes(bookedSlot, true)}
              {renderBoxes(available, false)}
            </Box>
          </div>
        )}
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
