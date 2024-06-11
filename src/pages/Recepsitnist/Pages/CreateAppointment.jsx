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
      <div className="flex flex-col px-4 py-3 h-full space-y-4  text-center items-center">
          <div>
            <h2 className="flex gap-5 m-2 text-xl font-semibold">
              Create Appointment
            </h2>
          </div>
          <div>
            <form >
              <div className="flex gap-5 m-2">
                <label>Select Doctor </label>
                  <select
                      className="border-2 rounded-md p-2"
                      onChange={handleDoctorList}
                      value={doctorList}
                    >
                      <option value="" disabled>Doctor</option>
                      <option value="Doctor">ABC</option>
                      <option value="Nurse">DEF</option>
                      <option value="Technician">Technician</option>
                      <option value="Administrator">Administrator</option>
                  </select>
                </div>
                <div className="flex gap-5 m-2">
                  <label>Case </label>
                    <select
                        className="border-2 rounded-md p-2"
                        onChange={handleCase}
                        value={Case}
                      >
                        <option value="old">Old</option>
                        <option value="new" >New</option>
                    </select>
                </div>
                <div className="flex gap-5 m-2">
                 {Case === "old" ? <Oldcase /> : <Newcase />}
                </div>
            </form>
          </div>
      </div>
    </div>
    </div>
  )
}
