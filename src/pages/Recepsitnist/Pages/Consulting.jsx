import React, { useState, useEffect } from "react";
import axios from "axios";
export default function Consulting(props) {
  const [consultingTime, setConsultingTime] = useState(new Date());
  const [data, setData] = useState([]);
  const [slot, setSlot] = useState("");

  const handleSlot = (e) => {
    setSlot(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formdata = new FormData();
    formdata.append("appointment[case_number]", props.case);
    formdata.append("appointment[date]", consultingTime);
    formdata.append("appointment[doctor_id]", props.doctor);
    formdata.append("appointment[time]", slot);
    axios
      .post(`/api/v1/appointments`, formdata)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleData = () => {
    axios
      .get(`/api/v1/consulting_times/user/${props.doctor}`)
      .then((res) => {
        console.log(res.data.consulting_times, "ConsultingTime");
        setData(res.data.consulting_times);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleConsulting = (e) => {
    setConsultingTime(e.target.value);
  };

  function formatTime(time) {
    try {
      const date = new Date(time);
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

  useEffect(() => {
    handleData();
  }, [props.doctor]);

  return (
    <div>
      <form>
        <div>
          <h2 className="text-lg font-semibold text-center mt-5">
            Consulting Time Slot
          </h2>
        </div>
        <div className="flex gap-5 m-2">
          <label className="text-lg text-end w-1/3 mr-2">
            Select the Date:{" "}
          </label>
          <input
            type="date"
            placeholder="select date"
            className="py-1 px-2 rounded-md border border-black w-[40vh]"
            onChange={handleConsulting}
          />
        </div>
        <div className="flex gap-5 m-2">
          <label className="text-lg text-end w-1/3 mr-2">
            Select the Slot:{" "}
          </label>
          <select
            className="py-1 px-2 rounded-md border border-black w-[40vh]"
            onChange={handleSlot}
            value={slot}
          >
            <option value="" disabled>
              Select
            </option>
            {data.map((timeSlot) => (
              <option key={timeSlot.id} value={timeSlot.time}>
                {formatTime(timeSlot.time)}
              </option>
            ))}
          </select>
        </div>
        <div className="flex w-full justify-center mt-10">
          <button
            type="submit"
            className="w-[20rem]  text-white rounded-md border border-gray-500 font-medium text-lg hover:scale-105"
            name="Save & Continue"
            style={{ backgroundColor: "black" }}
            onClick={handleSubmit}
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}