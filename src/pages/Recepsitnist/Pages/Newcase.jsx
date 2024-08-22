import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Newcase(props) {
  console.log(props.doctor);
  const [consultingTime, setConsultingTime] = useState(new Date());
  const [data, setData] = useState([]);
  const [slot, setSlot] = useState("");
  const navigate = useNavigate();

  const handleConsulting = (e) => {
    setConsultingTime(e.target.value);
  };

  const handleSlot = (e) => {
    setSlot(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formdata = new FormData();
    formdata.append("appointment[date]", consultingTime);
    formdata.append("appointment[doctor_id]", props.doctor);
    formdata.append("appointment[time]", slot);
    formdata.append("appointment[user_id]", props.user);
    axios
      .post(`/api/v1/appointments`, formdata)
      .then((res) => {
        console.log(res);
        alert("Successfully created Your Consulting Appointment!");
        setConsultingTime();
        setSlot("");
        navigate("/receptionist/appointment/home");
      })
      .catch((err) => {
        console.log(err);
        alert(err.response?.data?.message + "!");
      });
  };

  const handleData = () => {
    if (props.doctor != 0) {
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
      <form className="text-lg">
        {props.name && (
          <div>
            <div className="flex gap-5 m-2">
              <lebal className="text-lg text-end w-1/3 mr-2">Name :</lebal>
              <input
                type="text"
                className="py-1 px-2  border-black w-[40vh]"
                value={props.name}
              />
            </div>
            <div className="flex gap-5 m-2">
              <lebal className="text-lg text-end w-1/3 mr-2">
                Mobile Number :
              </lebal>
              <input
                type="text"
                className="py-1 px-2  border-black w-[40vh]"
                value={props.number}
              />
            </div>
            <div className="flex gap-5 m-2">
              <lebal className="text-lg text-end w-1/3 mr-2">Email id :</lebal>
              <input
                type="email"
                className="py-1 px-2  border-black w-[40vh]"
                value={props.email}
              />
            </div>
          </div>
        )}
        <div className="flex gap-5 m-2">
          <lebal className="text-lg text-end w-1/3 mr-2">
            Select the Date{" "}
          </lebal>
          <input
            type="date"
            placeholder="select date"
            className="py-1 px-2 rounded-md border border-black w-[40vh]"
            onChange={handleConsulting}
          />
        </div>
        <div className="flex gap-5 m-2">
          <lebal className="text-lg text-end w-1/3 mr-2">
            Select the Slot{" "}
          </lebal>
          <select
            className="py-1 px-2 rounded-md border border-black w-[40vh]"
            onChange={handleSlot}
            value={slot}
            defaultValue={"select"}
          >
            <option value="select" selected>
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
            className="w-[20rem] text-white py-1 rounded-md border border-gray-500 font-medium text-lg hover:scale-105"
            name="Save & Continue"
            style={{ backgroundColor: "black" }}
            onClick={handleSubmit}
          >
            Create Appointment
          </button>
        </div>
      </form>
    </div>
  );
}
