import { useState, useEffect } from "react";
import Oldcase from "./Oldcase";
import Newcase from "./Newcase";
import axios from "axios";
import InsideLoader from "../../InsideLoader";

export default function CreateAppointment() {
  const [doctorList, setDoctorList] = useState("");
  const [doctorName, setDoctorName] = useState("");
  const [franchiseDoctor, setFranchiseDoctor] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
  const [name, setName] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [email, setEmail] = useState("");
  const [userId, setUserId] = useState("");
  const [machineList, setMachineList] = useState([]);
  const [machineConsultingTime, setMachineConsultingTime] = useState([]);
  const [loading, setLoading] = useState(false);
  const [newCase, setNewCase] = useState(false);
  const [oldCase, setOldCase] = useState(false);
  const [open, setOpen] = useState(false);
  const [getParticularCustomer, setGetParticularCustomer] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    if (debouncedSearchTerm) {
      setLoading(true);
      axios
        .get(`/api/v2/users/search?search_query=${debouncedSearchTerm}`)
        .then((res) => {

          setLoading(false);
          const user = res.data.user;
          setName(user.first_name);
          setMobileNumber(user.phone_number);
          setEmail(user.email);
          setUserId(user.id);
          if (user.creator === "franchise") {
            setDoctorName(res.data.doctor.doctor);
            setDoctorList(res.data.doctor.doctor.id);
          } else {
            setDoctorName(res.data.doctor);
            setDoctorList(res.data.doctor.id);
          }
          
        })
        .catch((err) => {
          setLoading(false);
        });
    }
  }, [debouncedSearchTerm]);

  const handleSearchTerm = (value) => {
    setSearchTerm(value);
    setError("");
    if (value) {
      axios
        .get(`/api/v2/users/search?search_query=${value}`)
        .then((res) => {
          setLoading(false);
          setGetParticularCustomer(res.data.user);
          console.log(res.data.user);
          setError("");
        })
        .catch((err) => {
          setLoading(false);
          setError("Error fetching users.");
        });
    } else {
      setGetParticularCustomer([]);
      setError("Please provide valid Patient name or phone number");
    }
  };

  const handleUserSelect = (user) => {
    setName(user.first_name);
    setMobileNumber(user.phone_number);
    setEmail(user.email);
    setUserId(user.id);
    setDoctorName(user.doctor);
    setDoctorList(user.doctor.id);
    setGetParticularCustomer([]);
    if (user.follow_up === "true") {
      setOldCase(true);
      setNewCase(false);
    } else {
      setOldCase(false);
      setNewCase(true);
    }
    setOpen(true);
  };

  useEffect(() => {
    const timerId = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 500);
    return () => clearTimeout(timerId);
  }, [searchTerm]);

  return (
    <div className="w-full p-5">
      <div className="rounded-lg bg-card h-[90vh] bg-white">
        <div className="flex flex-col px-4 py-3 h-full space-y-4">
          <div className="text-xl font-semibold">
            Create Consulting Appointment
          </div>
          <div className="flex flex-row w-full justify-center gap-5">
            <button
              className={`w-[30%] border cursor-pointer font-semibold ${
                newCase ? "bg-[#1F2937]" : "bg-white"
              } ${newCase ? "text-white" : "text-[#1F2937]"} p-2 rounded-md`}
             
            >
              New Case
            </button>
            <button
              className={`w-[30%] border cursor-pointer font-semibold ${
                oldCase ? "bg-[#1F2937]" : "bg-white"
              } ${oldCase ? "text-white" : "text-[#1F2937]"} p-2 rounded-md`}
             
            >
              Follow Up (Old Case)
            </button>
          </div>
          <div className="flex gap-3 p-2 items-center">
            <label className="font-medium text-lg">Search:</label>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => handleSearchTerm(e.target.value)}
              placeholder="Search User through Case Number/Phone Number/Email"
              className="py-1 px-2 rounded-md border border-black w-full"
            />
          </div>
          <div className="w-full flex justify-center p-4 shadow-gray-400 shadow-inner border rounded-md border-gray-100 animate-once animate-ease-out overflow-auto h-[93%]">
            {loading && <InsideLoader />}
            {error && <div className="text-red-500">{error}</div>}
            {getParticularCustomer?.length > 0 && (
              <div className="space-y-2">
                {getParticularCustomer.map((user) => (
                  <div
                    key={user.id}
                    className="border p-2 text-lg rounded-md  cursor-pointer hover:bg-gray-100"
                    onClick={() => handleUserSelect(user)}
                  >
                    Name : {user.first_name} - {user.last_name} <br/>
                    Phone Number :{user.phone_number} 
                  </div>
                ))}
              </div>
            )}
            {open && !loading && (
              <form className="text-lg">
                <div className="flex flex-col gap-5 m-5">
                  {newCase ? (
                    <label className="text-xl bg-white rounded-md p-1 font-semibold text-center mr-2">
                      New Case
                    </label>
                  ) : (
                    <label className="text-xl bg-white rounded-md p-1 font-semibold text-center mr-2">
                      Old Case
                    </label>
                  )}
                  {doctorName && (
                    <div className="flex gap-5">
                      <label className="text-lg text-end w-1/3 mr-2">
                        Doctor:
                      </label>
                      <h2 className="">
                        {doctorName
                          ? `${doctorName.first_name} ${doctorName.last_name}`
                          : "Doctor Name"}
                      </h2>
                    </div>
                  )}
                </div>
                {}
                <div className="flex gap-5 m-5">
                  {oldCase &&  (
                    <Oldcase
                      doctor={doctorList}
                      user={userId}
                      machine={machineList}
                      machineTime={machineConsultingTime}
                      name={name}
                      number={mobileNumber}
                      email={email}
                    />
                  ) }
                  {newCase && (
                    <Newcase
                      doctor={doctorList}
                      name={name}
                      number={mobileNumber}
                      email={email}
                      user={userId}
                    />
                  )}
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
