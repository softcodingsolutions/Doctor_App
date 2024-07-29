import { useState, useEffect } from "react";
import axios from "axios";
import Box from "@mui/joy/Box";
import { useNavigate } from "react-router-dom";

export default function Indooractivity(props) {
  const navigate = useNavigate();
  const [consultingTime, setConsultingTime] = useState("");
  const [machine, setMachine] = useState("");
  const [filteredTimeSlots, setFilteredTimeSlots] = useState([]);
  const [allocatedMachines, setAllocatedMachines] = useState([]);
  const [bookedSlot, setBookedSlot] = useState([]);
  const [available, setAvailable] = useState([]);
  const [inputSlot, setInputSlot] = useState("select");
  const [inputTime, setInputTime] = useState("select");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    handleAppointmentCount();
  }, [props.doctor]);

  function generateSlotTimes(slot) {
    function generateTimes() {
      const times = [];
      let current = new Date("1970-01-01T00:00:00Z");
      const end = new Date("1970-01-01T23:59:59Z");
      while (current <= end) {
        const timeString = current.toISOString().substr(11, 5);
        times.push(timeString);
        current = new Date(current.getTime() + 30 * 60000);
      }
      return times;
    }
    const times = generateTimes();
    if (slot === "morning") {
      return times.filter((time) => time >= "06:00" && time < "12:00");
    } else if (slot === "afternoon") {
      return times.filter((time) => time >= "12:00" && time < "18:00");
    } else if (slot === "evening") {
      return times.filter((time) => time >= "18:00" && time < "23:59");
    }
    return [];
  }

  const times = generateSlotTimes(inputSlot);

  function handleSlotChange(e) {
    setInputSlot(e.target.value);
  }

  const handleConsulting = (time) => {
    const value = consultingTime;
    axios
      .get(
        `/api/v1/appointments/fetch_machine_details?date=${formatDate(
          value
        )}&time=${time}&machine_detail_id=${machine}`
      )
      .then((res) => {
        console.log(res, "CHECKBOX BUTTONS DATA");
        setAvailable(res.data.availab_slot);
        setBookedSlot(res.data.booked_slot);
        console.log("Available Slots: ", res.data.availab_slot);
        console.log("Booked Slots: ", res.data.booked_slot);
      })
      .catch((err) => {
        console.log(err);
        alert(err.message);
      });
  };

  const handleAppointmentCount = () => {
    axios
      .get(`/api/v1/appointments`)
      .then((res) => {
        console.log(res, "AppointmentCount");
        const allocatedMachines = res.data.appointments.map(
          (data) => data.machine_consulting_time_id
        );
        setAllocatedMachines(allocatedMachines);
      })
      .catch((err) => {
        console.log(err);
        alert(err.message);
      });
  };

  function formatTime(time) {
    try {
      const date = new Date(`1970-01-01T${time}Z`);
      const options = {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
        timeZone: "UTC",
      };
      const formattedTime = new Intl.DateTimeFormat("en-US", options).format(
        date
      );
      return formattedTime;
    } catch (error) {
      console.error("Error formatting time:", error);
      return "Invalid time";
    }
  }

 

  const handleMachine = (e) => {
    const selectedMachineId = e.target.value;
    setMachine(selectedMachineId);
    filterTimeSlots(selectedMachineId);
  };

  const filterTimeSlots = (machineId) => {
    const selectedMachine = props.machine.find(
      (machine) => machine.id === parseInt(machineId)
    );
    const consultingTimes = selectedMachine
      ? selectedMachine.machine_consulting_times
      : [];
    setFilteredTimeSlots(consultingTimes);
  };

  const handleTimeChange = (e) => {
    const selectedTime = e.target.value;
    setInputTime(selectedTime);
    handleConsulting(selectedTime);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMessage(""); 
    const formattedDate = formatDate(consultingTime);
    const formdata = new FormData();
    formdata.append("appointment[user_id]", props.user);
    formdata.append("appointment[date]", formattedDate);
    formdata.append("appointment[doctor_id]", props.doctor);
    formdata.append("appointment[time]", inputTime);
    formdata.append("appointment[machine_detail_id]", machine);
    axios
      .post(`/api/v1/appointments`, formdata)
      .then((res) => {
        console.log(res);
        setMachine("");
        setConsultingTime("");
        setInputTime("");
        setMachine("");
        alert("Successfully create your Machine Consulting Appointment!");
        navigate("/receptionist/appointment/home");
        document.querySelector('input[type="date"]').value = "";
        handleConsulting(""); 
      })
      .catch((err) => {
        console.log(err.response.data.message);
        setErrorMessage(err.response.data.message);
      });
  };

  const formatDate = (date) => {
    const d = new Date(date);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

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
            borderRadius: "20%",
            margin: "5px",
          }}
          readOnly
        />
      );
    }
    return boxes;
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="text-lg">
        <div>
          <h2 className="text-lg font-semibold text-center mt-5">
            Indoor Activity Time Slot
          </h2>
        </div>
        <div className="flex gap-5 m-2">
          <label className="text-lg text-end w-1/3 mr-2">
            Select Machine:{" "}
          </label>
          <select
            className="py-1 px-2 rounded-md border border-black w-[40vh]"
            onChange={handleMachine}
            value={machine}
          >
            <option value="">Select</option>
            {props.machine.map((detail) => (
              <option key={detail.id} value={detail.id}>
                {detail.name}
              </option>
            ))}
          </select>
        </div>
        <div className="flex gap-5 m-2">
          <label className="text-lg text-end w-1/3 mr-2">
            Select the Date:{" "}
          </label>
          <input
            type="date"
            placeholder="select date"
            className="py-1 px-2 rounded-md border border-black w-[40vh]"
            onChange={(e) => setConsultingTime(e.target.value)}
          />
        </div>
        <div className="flex gap-5 m-2">
          <label className="text-lg text-end w-1/3 mr-2">
            Select Machine Timeslot:{" "}
          </label>
          <select
            name="slot"
            value={inputSlot}
            onChange={handleSlotChange}
            className="py-1 px-2 rounded-md border border-black"
          >
            <option value="select" disabled>
              Select Slot
            </option>
            <option value="morning">Morning</option>
            <option value="afternoon">Afternoon</option>
            <option value="evening">Evening</option>
          </select>

          <select
            name="time"
            value={inputTime}
            onChange={handleTimeChange}
            className="py-1 px-2 rounded-md border border-black"
          >
            <option value="select" disabled>
              Select Time
            </option>
            {times.map((time, index) => (
              <option key={index} value={time}>
                {formatTime(time)}
              </option>
            ))}
          </select>
        </div>
        {errorMessage && (
          <div className="text-red-500 text-center mt-4">{errorMessage}</div>
        )}
        {machine && (
          <div className="flex w-full justify-center mt-10">
            <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
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
            style={{ backgroundColor: "black" }}
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}
