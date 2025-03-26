import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import InsideLoader from "../../InsideLoader";

export default function Newcase(props) {
  console.log(props.doctor);
  const [consultingTime, setConsultingTime] = useState(0);
  const [data, setData] = useState([]);
  const [slot, setSlot] = useState(0);
  const [loader, setLoader] = useState(false);
  const navigate = useNavigate();

  const handleConsulting = (e) => {
    setConsultingTime(e.target.value);
  };
  const handleSlot = (e) => {
    setSlot(e.target.value);
    console.log(e.target.value, "Time");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoader(true);
    const formdata = new FormData();
    formdata.append("appointment[date]", consultingTime);
    formdata.append("appointment[doctor_id]", props.doctor);
    formdata.append("appointment[time]", formatTime(slot));
    formdata.append("appointment[user_id]", props.user);
    {
      if (consultingTime && slot) {
        axios
          .post(`/api/v1/appointments`, formdata)
          .then((res) => {
            console.log(res);
            setLoader(false);
            alert("Successfully created Your Consulting Appointment!");
            setConsultingTime();
            setSlot("");
            navigate(`/receptionist/appointment/home`)
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
    <div className="space-y-2">
      <form className="text-lg flex flex-col gap-4">
        <div className="flex flex-col sm:flex-row items-center gap-1">
          <label className="text-sm font-semibold text-gray-700 sm:w-28">
            Select Date:
          </label>
          <input
            type="date"
            placeholder="select date"
            className="py-1 px-2 rounded-md border border-black w-1/2 "
            onChange={handleConsulting}
          />
        </div>
        <div>
          <label className="block text-gray-700 text-sm font-semibold mb-3">
            Select Time Slot
          </label>

          <div className="space-y-4">
            {/* Morning Slot */}
            <div>
              <h3 className="text-sm font-semibold text-blue-600 mb-1">
                Morning
              </h3>
              <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10 gap-2">
                {data
                  .filter((timeSlot) => timeSlot.slot === "morning")
                  .map((timeSlot) => (
                    <label
                      key={timeSlot.id}
                      className={`flex items-center justify-center border rounded-lg py-2 px-4 text-sm font-medium cursor-pointer transition 
              ${
                slot === timeSlot.time
                  ? "bg-blue-500 text-white border-blue-600 shadow-md"
                  : "bg-white text-gray-800 border-gray-300 hover:bg-blue-100 hover:border-blue-500"
              }`}
                    >
                      <input
                        type="radio"
                        name="time"
                        value={timeSlot.time}
                        checked={slot === timeSlot.time}
                        onChange={handleSlot}
                        className="hidden"
                      />
                      {formatTime(timeSlot.time)}
                    </label>
                  ))}
              </div>
            </div>

            {/* Afternoon Slot */}
            <div>
              <h3 className="text-sm font-semibold text-orange-600 mb-1">
                Afternoon
              </h3>
              <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10 gap-2">
                {data
                  .filter((timeSlot) => timeSlot.slot === "afternoon")
                  .map((timeSlot) => (
                    <label
                      key={timeSlot.id}
                      className={`flex items-center justify-center border rounded-lg py-2 px-4 text-sm font-medium cursor-pointer transition 
              ${
                slot === timeSlot.time
                  ? "bg-orange-500 text-white border-orange-600 shadow-md"
                  : "bg-white text-gray-800 border-gray-300 hover:bg-orange-100 hover:border-orange-500"
              }`}
                    >
                      <input
                        type="radio"
                        name="time"
                        value={timeSlot.time}
                        checked={slot === timeSlot.time}
                        onChange={handleSlot}
                        className="hidden"
                      />
                      {formatTime(timeSlot.time)}
                    </label>
                  ))}
              </div>
            </div>

            {/* Evening Slot */}
            <div>
              <h3 className="text-sm font-semibold text-purple-600 mb-1">
                Evening
              </h3>
              <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10 gap-2">
                {data
                  .filter((timeSlot) => timeSlot.slot === "evening")
                  .map((timeSlot) => (
                    <label
                      key={timeSlot.id}
                      className={`flex items-center justify-center border rounded-lg py-2 px-4 text-sm font-medium cursor-pointer transition 
              ${
                slot === timeSlot.time
                  ? "bg-purple-500 text-white border-purple-600 shadow-md"
                  : "bg-white text-gray-800 border-gray-300 hover:bg-purple-100 hover:border-purple-500"
              }`}
                    >
                      <input
                        type="radio"
                        name="time"
                        value={timeSlot.time}
                        checked={slot === timeSlot.time}
                        onChange={handleSlot}
                        className="hidden"
                      />
                      {formatTime(timeSlot.time)}
                    </label>
                  ))}
              </div>
            </div>
          </div>
        </div>
        <div className="flex w-full  mt-10">
          <button
            type="submit"
            className="w-full bg-green-600 text-white py-2 px-2 rounded-lg font-semibold shadow-md hover:bg-green-700 transition"
            onClick={handleSubmit}
          >
            Book Appointment
          </button>
        </div>
      </form>
    </div>
  );
}
