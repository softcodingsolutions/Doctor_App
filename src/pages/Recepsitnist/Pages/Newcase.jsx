import React,{useState} from 'react'

export default function Newcase() {
    const[name,setName] = useState('');
    const[mobile_number,setMobileNumber] = useState('');
    const[email,setEmail] = useState('');
    const [consultingTime,setConsultingTime] = useState(new Date());
    const [slot,setSlot] = useState('');
    const handleConsulting = (e) =>{
        setConsultingTime(e.target.value);
    }
    const handleSlot = (e) =>{
        setSlot(e.target.value);
    }
    const handleName = (e) =>{
        setName(e.target.value);
    }
    const handleMobile = (e) =>{
        setMobileNumber(e.target.value);
    }
    const handleEmail = (e) =>{
        setEmail(e.target.value);
    }
    const handleSubmit = (e) =>{
        alert("Yeee")
    }
  return (
    <div>
    <form>
        <div className="flex gap-5 m-2">
            <label>Name </label>
            <input type="text" placeholder="enter name" 
            className="border-2 rounded-md p-2"
            onChange={handleName}/>
        </div>
        <div className="flex gap-5 m-2">
            <label>Mobile Number </label>
            <input type="text" placeholder="enter number" 
            className="border-2 rounded-md p-2"
            onChange={handleMobile}/>
        </div>
        <div className="flex gap-5 m-2">
            <label>Email id </label>
            <input type="email" placeholder="enter email" 
            className="border-2 rounded-md p-2"
            onChange={handleEmail}/>
        </div>
        <div className="flex gap-5 m-2">
            <label>Select the Date </label>
            <input type="date" placeholder="select date" 
            className="border-2 rounded-md p-2"
            onChange={handleConsulting}/>
        </div>
        <div className="flex gap-5 m-2">
            <label>Select the Slot </label>
                <select
                className="border-2 rounded-md p-2"
                onChange={handleSlot}
                value={slot}>
                    <option value="" disabled>
                        Select
                    </option>
                    <option value="old">Old</option>
                    <option value="new">New</option>
                </select>
        </div>
      <div className="flex w-full justify-start mt-10">
          <button type="submit" className="w-[20rem]  text-white rounded-md border border-gray-500 font-medium text-lg hover:scale-105" name="Save & Continue"  style={{ backgroundColor: "black" }} onClick={handleSubmit}>Submit</button>
      </div>
    </form>
  </div>
  )
}
