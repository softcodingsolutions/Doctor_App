import { useState, useEffect } from "react";
import axios from "axios";

export default function Home() {
    const [filteredDoctors, setFilteredDoctors] = useState([]);
    const [doctorList, setDoctorList] = useState("");
  const [doctorName, setDoctorNames] = useState([]);

    const handleDoctorList = (e) =>{
        setDoctorList(e.target.value);
        axios.get(`api/v1/appointments`).then((res)=>{
            console.log(res)
        }).catch((err)=>{
            console.log(err)
        })
    }
    useEffect(() => {
        axios
          .get("api/v1/users")
          .then((res) => {
            console.log("all the users: ", res);
            setDoctorNames(res.data.users);
            setFilteredDoctors(res.data.users);
          })
          .catch((err) => {
            console.log(err);
          });
      }, []);
  return (
    <div className="w-full p-5">
      <div className="rounded-lg bg-card h-[90vh] bg-white">
        <div className="flex flex-col px-4 py-3 h-full space-y-4 ">
            <div className="flex gap-5  p-2 w-full">
                
                <select
                  onChange={handleDoctorList}
                  value={doctorList}
                  className="p-2 rounded-md border border-black  w-[40vh]"
                >
                  <option value="select" selected>
                    Select Doctor
                  </option>
                  {filteredDoctors
                    .filter((doctor) => doctor.role === "doctor")
                    .map((name) => (
                      <option key={name.id} value={name.id}>
                        {name.first_name} {name.last_name}
                      </option>
                    ))}
                </select>
            </div>
            <div  className="w-full flex justify-center p-4 shadow-gray-400 shadow-inner border rounded-md border-gray-100 animate-once animate-ease-out overflow-auto h-[93%]" >

            </div>
        </div>
        </div>
    </div>
  )
}
