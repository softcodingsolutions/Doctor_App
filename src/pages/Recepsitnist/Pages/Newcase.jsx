import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function Newcase(props) {
  console.log(props.doctor);
  const [name, setName] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [email, setEmail] = useState('');
  const [consultingTime, setConsultingTime] = useState(new Date());
  const [data, setData] = useState([]);
  const [slot, setSlot] = useState('');

  useEffect(() => {
    handleData();
  }, [props.doctor]);

  const handleConsulting = (e) => {
    setConsultingTime(e.target.value);
  };

  const handleSlot = (e) => {
    setSlot(e.target.value);
  };

  const handleName = (e) => {
    setName(e.target.value);
  };

  const handleMobile = (e) => {
    setMobileNumber(e.target.value);
  };

  const handleEmail = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formdata = new FormData();
    formdata.append('appointment[patient_name]',name);
    formdata.append('appointment[patient_phone]',mobileNumber);
    formdata.append('appointment[patient_email]',email);
    formdata.append('appointment[date]',consultingTime);
    formdata.append('appointment[doctor_id]',props.doctor);
    formdata.append('appointment[time]',slot);
    axios.post(`/api/v1/appointments`, formdata).then((res)=>{
      console.log(res);
    }).catch((err)=>{
      console.log(err);
    })
  };

  const handleData = () => {
    if(props.doctor != 0){
    axios
      .get(`/api/v1/consulting_times/user/${props.doctor}`)
      .then((res) => {
        console.log(res.data.consulting_times, "ConsultingTime");
        setData(res.data.consulting_times);
      })
      .catch((err) => {
        console.log(err);
      });
    }
  };
  function formatTime(time) {
    try {
      const date = new Date(time);
      const options = { hour: '2-digit', minute: '2-digit', hour12: true, timeZone: 'UTC' };
      const formattedTime = new Intl.DateTimeFormat('en-US', options).format(date);
      return formattedTime;
    } catch (error) {
      console.error("Error formatting time:", error);
      return "Invalid time";
    }
  }
  return (
    <div>
      <form>
        <div className="flex gap-5 m-2">
          <label className="text-lg text-end w-1/3 mr-2">Name </label>
          <input type="text" placeholder="enter name"
            className="py-1 px-2 rounded-md border border-black w-[40vh]"
            onChange={handleName} />
        </div>
        <div className="flex gap-5 m-2">
          <label className="text-lg text-end w-1/3 mr-2">Mobile Number </label>
          <input type="text" placeholder="enter number"
            className="py-1 px-2 rounded-md border border-black w-[40vh]"
            onChange={handleMobile} />
        </div>
        <div className="flex gap-5 m-2">
          <label className="text-lg text-end w-1/3 mr-2">Email id </label>
          <input type="email" placeholder="enter email"
            className="py-1 px-2 rounded-md border border-black w-[40vh]"
            onChange={handleEmail} />
        </div>
        <div className="flex gap-5 m-2">
          <label className="text-lg text-end w-1/3 mr-2">Select the Date </label>
          <input type="date" placeholder="select date"
            className="py-1 px-2 rounded-md border border-black w-[40vh]"
            onChange={handleConsulting} />
        </div>
        <div className="flex gap-5 m-2">
          <label className="text-lg text-end w-1/3 mr-2">Select the Slot </label>
          <select
            className="py-1 px-2 rounded-md border border-black w-[40vh]"
            onChange={handleSlot}
            value={slot}>
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
          <button type="submit" className="w-[20rem] text-white rounded-md border border-gray-500 font-medium text-lg hover:scale-105" name="Save & Continue" style={{ backgroundColor: "black" }} onClick={handleSubmit}>
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}
