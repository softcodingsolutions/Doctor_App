import { useState, useEffect } from "react";
import { useDebounce } from 'use-debounce';
import Oldcase from "./Oldcase";
import Newcase from "./Newcase";
import axios from "axios";

export default function CreateAppointment() {
  const [doctorList, setDoctorList] = useState("");
  const [Case, setCase] = useState("new");
  const [doctorName, setDoctorNames] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm] = useDebounce(searchTerm, 500); 
  const [filteredDoctors, setFilteredDoctors] = useState([]);
  const [name, setName] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [email, setEmail] = useState('');
  const [userId, setUserId] = useState('');

  const handleDoctorList = (e) => {
    setDoctorList(e.target.value);
    console.log(e.target.value);
  };

  const handleShow = () => {
    axios
      .get(`/api/v1/appointments`)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleSearchTerm = (value) => {
    setSearchTerm(value);
  };

  useEffect(() => {
    if (debouncedSearchTerm) {
      axios
        .get(`/api/v2/users/search?case_number=${debouncedSearchTerm}&phone_number=${debouncedSearchTerm}`)
        .then((res) => {
          console.log("search", res);
          setName(res.data.user.first_name);
          setMobileNumber(res.data.user.phone_number);
          setEmail(res.data.user.email);
          setUserId(res.data.user.id);
          const userId = res.data.user.id;
          axios
            .get(`/api/v1/appointments/user_appointments_count/${userId}`)
            .then((res) => {
              console.log(res, "COUNTT");
              const count = res.data.appointments_count;
              if (count > 0) {
                setCase('old');
              } else {
                setCase('new');
              }
            })
            .catch((err) => {
              console.log(err);
            });
        })
        .catch((err) => {
          console.log(err);
          alert("USER NOT FOUND");
        });
    }
  }, [debouncedSearchTerm]);

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

  useEffect(() => {
    handleShow();
  }, []);

  return (
    <div className="w-full p-5">
      <div className="rounded-lg bg-card h-[90vh] bg-white">
        <div className="flex flex-col px-4 py-3 h-full space-y-4 ">
          <div className="text-xl font-semibold">Create Appointment</div>

          <div className="flex gap-5 p-2 w-full">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => handleSearchTerm(e.target.value)}
              placeholder="search case number"
              className="py-1 px-2 rounded-md border border-black w-full"
            />
            <button
              type="button"
              className="w-[10rem] text-white rounded-md border border-gray-500 font-medium text-lg  hover:scale-105"
              name="Save & Continue"
              style={{ backgroundColor: "black" }}
            >
              NEW USER
            </button>
          </div>

          <div className="w-full flex justify-center p-4 shadow-gray-400 shadow-inner border rounded-md border-gray-100 animate-once animate-ease-out overflow-auto h-[93%]">
            <form>
              <div className="flex gap-5 m-5">
                <label className="text-lg text-end w-1/3 mr-2">
                  Select Doctor
                </label>

                <select
                  onChange={handleDoctorList}
                  value={doctorList}
                  className="py-1 px-2 rounded-md border border-black w-[40vh]"
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
              <div className="flex gap-5 m-5">
                {Case === "old" ? (
                  <Oldcase doctor={doctorList} user={userId} />
                ) : (
                  <Newcase doctor={doctorList} name={name} number={mobileNumber} email={email} user={userId} />
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
