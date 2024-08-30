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

  const handleSearchTerm = (value) => {
    setSearchTerm(value);
    setError("");

    if (value) {
      setLoading(true);
      axios
        .get(`/api/v2/users/search?search_query=${value}`)
        .then((res) => {
          setLoading(false);
          setGetParticularCustomer(res.data.user);
          setError("");
        })
        .catch((err) => {
          setLoading(false);
          setError("Error fetching users.");
        });
    } else {
      setGetParticularCustomer([]);
      setNewCase(false);
      setOldCase(false);
      setName("");
      setMobileNumber("");
      setEmail("");
      setUserId("");
      setDoctorName("");
      setDoctorList("");
      setMachineList([]);
      setMachineConsultingTime([]);
      setOpen(false);
    }
  };

  const handleUserSelect = (user) => {
    if (user.follow_up === true) {
      setOldCase(true);
      setNewCase(false);
    } else {
      setOldCase(false);
      setNewCase(true);
    }
    setName(user?.first_name);
    setMobileNumber(user?.phone_number);
    setEmail(user?.email);
    setUserId(user?.personal_detail?.user_id);
    setDoctorName(user?.doctor);
    setDoctorList(user?.doctor?.id);
    setGetParticularCustomer([]);
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
          <div className="text-xl font-semibold text-center mb-4">
            Create Consulting Appointment
          </div>
          <div className="flex flex-row w-full justify-center gap-5 mb-4">
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
              placeholder="Search User by First Name, Last Name, or Phone Number"
              className="py-1 px-2 rounded-md border border-black w-full"
            />
          </div>
          <div className="w-full flex justify-center p-4 shadow-gray-400 shadow-inner border rounded-md border-gray-100 animate-once animate-ease-out overflow-auto h-[80%]">
            {loading && <InsideLoader />}
            {error && <div className="text-red-500">{error}</div>}
            {getParticularCustomer?.length > 0 && (
              <div className="space-y-1 w-[1800vw]">
                {getParticularCustomer.map((user) => (
                  <div
                    key={user.id}
                    className="border p-4 text-lg rounded-md cursor-pointer hover:bg-gray-100 flex justify-between items-center"
                    onClick={() => handleUserSelect(user)}
                  >
                    <div>
                      <div className="font-semibold">
                        {user.first_name} {user.last_name}
                      </div>
                      <div className="text-gray-500">
                        Phone: {user.phone_number}
                      </div>
                    </div>
                    <div className="text-gray-600 text-sm">
                      {user.follow_up ? "Follow Up" : "New Case"}
                    </div>
                  </div>
                ))}
              </div>
            )}
            {!loading && (
              <form className="text-lg w-full space-y-6">
                <div className="flex flex-col gap-3">
                  {newCase && (
                    <label className="text-xl bg-white rounded-md p-2 font-semibold text-center">
                      New Case
                    </label>
                  )}
                  {oldCase && (
                    <label className="text-xl bg-white rounded-md p-2 font-semibold text-center">
                      Old Case
                    </label>
                  )}
                  {doctorName && (
                    <div className="flex  items-center gap-5 justify-center">
                      <label className="text-lg ">Doctor:</label>
                      <h2 className="text-lg">
                        {doctorName.first_name} {doctorName.last_name}
                      </h2>
                    </div>
                  )}
                </div>
                <div className="flex gap-5 justify-center">
                  
                  {oldCase && userId && (
                    <Oldcase
                      doctor={doctorList}
                      user={userId}
                      machine={machineList}
                      machineTime={machineConsultingTime}
                      name={name}
                      number={mobileNumber}
                      email={email}
                    />
                  )}
                  {newCase && userId && (
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
