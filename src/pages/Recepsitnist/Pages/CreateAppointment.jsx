import { useState, useEffect } from "react";
import Oldcase from "./Oldcase";
import Newcase from "./Newcase";
import axios from "axios";
import InsideLoader from "../../InsideLoader";
import { SiPowerapps } from "react-icons/si";

export default function CreateAppointment() {
  const [doctorList, setDoctorList] = useState("");
  const [doctorName, setDoctorName] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [email, setEmail] = useState("");
  const [userId, setUserId] = useState("");
  const [machineList, setMachineList] = useState([]);
  const [machineConsultingTime, setMachineConsultingTime] = useState([]);
  const [loading, setLoading] = useState(false);
  const [newCase, setNewCase] = useState(false);
  const [oldCase, setOldCase] = useState(false);
  const [getParticularCustomer, setGetParticularCustomer] = useState([]);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("Create Consulting Appointment");

  const handleSearchTerm = (value) => {
    setNewCase(false);
    setDoctorName("");
    setOldCase(false);
    setSearchTerm(value);
    setError("");

    if (value) {
      setLoading(true);
      axios
        .get(`/api/v2/users/search?search_query=${value}`)
        .then((res) => {
          setLoading(false);
          setGetParticularCustomer(res.data.user);
          setMessage("");
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
      setLastName("");
      setMobileNumber("");
      setEmail("");
      setUserId("");
      setDoctorName("");
      setDoctorList("");
      setMachineList([]);
      setMachineConsultingTime([]);
    }
  };

  const handleUserSelect = (user) => {
    setSearchTerm("");
    if (user.follow_up === true) {
      setOldCase(true);
      setNewCase(false);
    } else {
      setOldCase(false);
      setNewCase(true);
    }
    setName(user?.first_name);
    setLastName(user?.last_name);
    setMobileNumber(user?.phone_number);
    setEmail(user?.email);
    setUserId(user?.personal_detail?.user_id);
    if (user?.creator === "franchise") {
      setDoctorName(user?.doctor?.doctor);
      setDoctorList(user?.doctor?.doctor?.id);
    } else {
      setDoctorName(user?.doctor);
      setDoctorList(user?.doctor?.id);
    }
    setGetParticularCustomer([]);
  };

  useEffect(() => {
    const timerId = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 500);
    return () => clearTimeout(timerId);
  }, [searchTerm]);

  return (
    <div className="w-full ">
      <div className="rounded-lg bg-card h-[95vh] bg-white overflow-scroll">
        <div className="flex flex-col px-2 py-1 h-full space-y-4">
          <div className="flex justify-center">
            <div className="mt-2">
              <SiPowerapps size={25} />
            </div>
            {searchTerm ? (
              <div className="text-xl font-semibold text-center p-2">
                Consulting Appointment
              </div>
            ) : (
              <div className="text-xl font-semibold text-center p-2">
                Create Consulting Appointment
              </div>
            )}
          </div>
          <div className="flex gap-3 p-2 items-center ml-40">
            <label className="font-medium text-lg">Search:</label>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => handleSearchTerm(e.target.value)}
              placeholder="Search User by First Name, Last Name, or Phone Number"
              className="py-1 px-2 rounded-md border border-black w-[80%]"
            />
          </div>

          {message && (
            <div className="flex justify-center">
              <label className="text-xl bg-white rounded-md p-2 font-semibold text-center">
                {message}
              </label>
            </div>
          )}
          {loading && <InsideLoader />}
          {error && <div className="text-red-500">{error}</div>}
          {getParticularCustomer?.length > 0 && (
            <div className="space-y-1 ">
              {getParticularCustomer.map((user) => (
                <div
                  key={user.id}
                  className="border p-3 text-lg rounded-md cursor-pointer hover:bg-gray-100 flex justify-between items-center"
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
              <div className="flex w-[100%]">
                <div className="w-[38%] p-6 border border-gray-300 rounded-lg ml-10 mt-5 shadow-md shadow-[#1F2937] bg-white h-auto">
                  <div className="flex flex-col gap-3">
                    {newCase && (
                      <label className="text-xl rounded-md p-2 font-semibold text-left ">
                        New Case
                      </label>
                    )}
                    {oldCase && (
                      <label className="text-xl rounded-md p-2 font-semibold text-left ">
                        Old Case
                      </label>
                    )}
                  </div>

                  <div className="flex flex-col gap-4 mt-4">
                    <div className="flex flex-col sm:flex-row gap-3">
                      <label className="text-lg w-full sm:w-1/3 text-left">
                        Patient Name:
                      </label>
                      <input
                        type="text"
                        className=" px-4  rounded-md w-full sm:w-[40vh] "
                        value={`${name} ${lastName}`}
                        readOnly
                      />
                    </div>

                    <div className="flex flex-col sm:flex-row gap-3">
                      <label className="text-lg w-full sm:w-1/3 text-left">
                        Mobile Number:
                      </label>
                      <input
                        type="text"
                        className=" px-4  rounded-md w-full sm:w-[40vh] "
                        value={mobileNumber}
                        readOnly
                      />
                    </div>

                    <div className="flex flex-col sm:flex-row gap-3">
                      <label className="text-lg w-full sm:w-1/3 text-left">
                        Email:
                      </label>
                      <input
                        type="text"
                        className=" px-4  rounded-md w-full sm:w-[40vh] "
                        value={email}
                        readOnly
                      />
                    </div>

                    <div className="flex flex-col sm:flex-row gap-3">
                      <label className="text-lg w-full sm:w-1/3 text-left">
                        Doctor Name:
                      </label>
                      {doctorName && (
                        <div className=" px-4  rounded-md w-full sm:w-[40vh] ">
                          {doctorName.first_name} {doctorName.last_name}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                {doctorList && (
                  <div className="gap-5 justify-center">
                    {oldCase && userId && (
                      <Oldcase
                        doctor={doctorList}
                        user={userId}
                        machine={machineList}
                        machineTime={machineConsultingTime}
                      />
                    )}
                    {newCase && userId && (
                      <Newcase doctor={doctorList} name={name} />
                    )}
                  </div>
                )}
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
