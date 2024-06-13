import React,{useState,useEffect} from 'react';
import Oldcase from './Oldcase';
import Newcase from './Newcase';

export default function CreateAppointment() {
  const [doctorList,setDoctorList] = useState('');
  const [Case,setCase] = useState('new');
  const handleDoctorList = (e) =>{
    setDoctorList(e.target.value);
  }
  const handleCase = (e) =>{
    setCase(e.target.value);
  }
  return (
    <div className="w-full p-5">
    <div className="rounded-lg bg-card h-[90vh] bg-white">
      <div className="flex flex-col px-4 py-3 h-full space-y-4 ">
          <div className="text-xl font-semibold">
              Create Appointment
          </div>
          <div  className="w-full flex justify-center p-4 shadow-gray-400 shadow-inner border rounded-md border-gray-100 animate-once animate-ease-out overflow-auto h-[93%]">
            <form >
              <div className="flex gap-5 m-5">
                <label className="text-lg text-end w-1/3 mr-2">Select Doctor </label>
                  <select
                      onChange={handleDoctorList}
                      value={doctorList}
                      className="py-1 px-2 rounded-md border border-black w-[40vh]"
                    >
                      <option value="" disabled>Doctor</option>
                      <option value="Doctor">ABC</option>
                      <option value="Nurse">DEF</option>
                      <option value="Technician">Technician</option>
                      <option value="Administrator">Administrator</option>
                  </select>
                </div>
                <div className="flex gap-5 m-5">
                  <label className="text-lg text-end w-1/3 mr-2">Case </label>
                    <select
                        className="py-1 px-2 rounded-md border border-black w-[40vh]"
                        onChange={handleCase}
                        value={Case}
                      >
                        <option value="old">Old</option>
                        <option value="new" >New</option>
                    </select>
                </div>
                <div className="flex gap-5 m-5">
                 {Case === "old" ? <Oldcase /> : <Newcase />}
                </div>
            </form>
          </div>
      </div>
    </div>
    </div>
  )
}
