import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import InsideLoader from "../../InsideLoader";

export default function Consulting(props) {
  const [consultingTime, setConsultingTime] = useState(0);
  const [data, setData] = useState([]);
  const [loader, setLoader] = useState(false);
  const [slot, setSlot] = useState(0);
  const navigate = useNavigate();
  const handleSlot = (e) => {
    setSlot(e.target.value);
    console.log(e.target.value, "Time");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoader(true);
    const formdata = new FormData();
    formdata.append("appointment[user_id]", props.user);
    formdata.append("appointment[date]", consultingTime);
    formdata.append("appointment[doctor_id]", props.doctor);
    formdata.append("appointment[time]", formatTime(slot));
    {
      if (consultingTime && slot) {
        axios
          .post(`/api/v1/appointments`, formdata)
          .then((res) => {
            console.log(res);
            setLoader(false);
            alert("Successfully create your Consulting Appointment!");
          })
          .catch((err) => {
            console.log(err);
            setLoader(false);
            alert(err.response?.data?.message + "!");
          });
      } else {
        setLoader(false);
        alert("Select Date and Time");
      }
    }
  };

  const handleData = () => {
    if (props.doctor) {
      axios
        .get(`/api/v1/consulting_times/user/${props.doctor}`)
        .then((res) => {
          console.log(res.data.consulting_times, "ConsultingTime");
          setData(res.data.consulting_times);
        })
        .catch((err) => {
          console.log(err);
          alert(err.response?.data?.message + "!");
        });
    }
  };

  const handleConsulting = (e) => {
    setConsultingTime(e.target.value);
  };

  function formatTime(time) {
    try {
      const date = new Date(time);

      // Define formatting options
      const options = {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
        timeZone: "Asia/Kolkata", // Use the time zone from the original input (Asia/Kolkata for +05:30)
      };

      // Format the date to UTC, or you can change the time zone as needed
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

  if (loader) {
    return <InsideLoader />;
  }

  return (
    <div className="p-16 w-[100%] ml-16 ">
      <form className="flex flex-col gap-1">
        <div className="flex flex-col sm:flex-row gap-5 m-2">
          <label className="text-lg text-end w-full sm:w-1/3 mr-2">
            Select Date:
          </label>
          <input
            type="date"
            placeholder="select date"
            className="py-1 px-2 rounded-md border border-black w-full sm:w-[40vh]"
            onChange={handleConsulting}
          />
        </div>
        <div className="flex flex-col sm:flex-row gap-5 m-2">
          <label className="text-lg text-end w-full sm:w-1/3 mr-2">
            Select Slot:
          </label>
          <select
            className="py-1 px-2 rounded-md border border-black w-full sm:w-[40vh]"
            onChange={handleSlot}
            value={slot}
          >
            <option value="" selected>
              Select Consulting Time
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
            className="w-[440px]  text-white py-1 rounded-md border border-gray-500 font-medium text-lg hover:scale-105"
            style={{ backgroundColor: "#1F2937" }}
            onClick={handleSubmit}
          >
            Create Appointment
          </button>
        </div>
      </form>
    </div>
  );
}
