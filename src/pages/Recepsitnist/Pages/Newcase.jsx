import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import InsideLoader from "../../InsideLoader";

export default function Newcase(props) {
  const [consultingTime, setConsultingTime] = useState("");
  const [data, setData] = useState([]);
  const [bookedSlots, setBookedSlots] = useState([]);
  const [loader, setLoader] = useState(false);
  const [slot, setSlot] = useState("");
  const navigate = useNavigate();

  const handleSlot = (e) => {
    setSlot(e.target.value);
    console.log(e.target.value, "Selected Time");
  };

  const handleConsulting = (e) => {
    setConsultingTime(e.target.value);
  };

  const fetchTimeSlots = () => {
    if (props.doctor) {
      axios
        .get(`/api/v1/consulting_times/user/${props.doctor}`)
        .then((res) => {
          setData(res.data.consulting_times);
        })
        .catch((err) => {
          console.error(err);
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

  const fetchBookedSlots = async () => {
    if (!consultingTime || !props.doctor) return;

    try {
      const response = await axios.get(
        `/api/v1/appointments/show_all_appointments?date=${consultingTime}&doctor_id=${props.doctor}`
      );
      const bookedTimes = response.data.visitor_list.map(
        (appointment) => appointment.time
      );

      setBookedSlots(bookedTimes);
    } catch (err) {
      console.error("Error fetching booked slots:", err);
    }
  };

  useEffect(() => {
    fetchBookedSlots();
  }, [consultingTime, props.doctor]);

  useEffect(() => {
    fetchTimeSlots();
  }, [props.doctor]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoader(true);

    if (!consultingTime || !slot) {
      setLoader(false);
      alert("Select Date and Time");
      return;
    }

    const formdata = new FormData();
    formdata.append("appointment[user_id]", props.user);
    formdata.append("appointment[date]", consultingTime);
    formdata.append("appointment[doctor_id]", props.doctor);
    formdata.append("appointment[time]", formatTime(slot));

    axios
      .post(`/api/v1/appointments`, formdata)
      .then(() => {
        setLoader(false);
        alert("Successfully created your Consulting Appointment!");
        navigate(`/receptionist/appointment/home`);
      })
      .catch((err) => {
        setLoader(false);
        alert(err.response?.data?.message + "!");
      });
  };

  if (loader) {
    return <InsideLoader />;
  }
  return (
    <div className="space-y-2">
      <form className="flex flex-col gap-4">
        <div className="flex flex-col sm:flex-row items-center gap-1">
          <label className="text-sm font-semibold text-gray-700 sm:w-28">
            Select Date:
          </label>
          <input
            type="date"
            className="py-1 px-2 rounded-md border border-black w-1/2"
            onChange={handleConsulting}
          />
        </div>

        <div>
          <label className="block text-gray-700 text-sm font-semibold mb-3">
            Select Time Slot
          </label>

          <div className="space-y-4">
            {["morning", "afternoon", "evening"].map((slotType) => (
              <div key={slotType}>
                <h3
                  className={`text-sm font-semibold ${
                    slotType === "morning"
                      ? "text-blue-600"
                      : slotType === "afternoon"
                      ? "text-orange-600"
                      : "text-purple-600"
                  } mb-1`}
                >
                  {slotType.charAt(0).toUpperCase() + slotType.slice(1)}
                </h3>
                <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10 gap-2">
                  {data
                    .filter((timeSlot) => timeSlot.slot === slotType)
                    .sort(
                      (a, b) =>
                        new Date(`1970-01-01T${a.time}`) -
                        new Date(`1970-01-01T${b.time}`)
                    ) // Sorting time slots in ascending order
                    .map((timeSlot) => {
                      const formattedTime = formatTime(timeSlot.time);
                      const isBooked = bookedSlots.includes(formattedTime);

                      return (
                        <label
                          key={timeSlot.id}
                          className={`flex items-center justify-center border rounded-lg py-2 px-4 text-sm font-medium cursor-pointer transition 
                  ${
                    isBooked
                      ? "bg-gray-400 text-gray-700 cursor-not-allowed"
                      : slot === timeSlot.time
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
                            disabled={isBooked}
                          />
                          {formattedTime}
                        </label>
                      );
                    })}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex w-full mt-10">
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
