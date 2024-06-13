import React, { useState } from "react";
export default function Consulting() {
    const [consultingTime,setConsultingTime] = useState(new Date());
    const [slot,setSlot] = useState('');
    const handleConsulting = (e) =>{
        setConsultingTime(e.target.value);
    }
    const handleSlot = (e) =>{
        setSlot(e.target.value);
    }
    const handleSubmit = (e) =>{
        alert("Yeee")
    }
  return (
    <div>
      <form>
        <div >
          <h2 className="text-lg font-semibold text-center mt-5">Consulting Time Slot</h2>
        </div>
        <div className="flex gap-5 m-2">
            <label className="text-lg text-end w-1/3 mr-2">Select the Date: </label>
            <input type="date" placeholder="select date" 
            className="py-1 px-2 rounded-md border border-black w-[40vh]"
            onChange={handleConsulting}/>
        </div>
        <div className="flex gap-5 m-2">
            <label className="text-lg text-end w-1/3 mr-2">Select the Slot: </label>
                <select
                className="py-1 px-2 rounded-md border border-black w-[40vh]"
                onChange={handleSlot}
                value={slot}>
                    <option value="" disabled>
                        Select
                    </option>
                    <option value="old">Old</option>
                    <option value="new">New</option>
                </select>
        </div>
        <div className="flex w-full justify-center mt-10">
            <button type="submit" className="w-[20rem]  text-white rounded-md border border-gray-500 font-medium text-lg hover:scale-105" name="Save & Continue"  style={{ backgroundColor: "black" }} onClick={handleSubmit}>Submit</button>
        </div>
      </form>
    </div>
  );
}
 