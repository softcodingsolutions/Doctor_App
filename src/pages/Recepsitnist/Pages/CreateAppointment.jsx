import { useState, useEffect } from "react";
import Oldcase from "./Oldcase";
import Newcase from "./Newcase";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function CreateAppointment() {
  const navigate = useNavigate();
  const [doctorList, setDoctorList] = useState("");
  const [Case, setCase] = useState("new");
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
  const [doctorName, setDoctorNames] = useState({});
  const [name, setName] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [email, setEmail] = useState("");
  const [userId, setUserId] = useState("");
  const [machineList, setMachineList] = useState([]);
  const [machineConsultingTime, setMachineConsultingTime] = useState([]);

  const handleDoctorList = (e) => {
    setDoctorList(e.target.value);
    console.log(e.target.value);
    axios
      .get(
        `http://localhost:3000/api/v1/machine_details?doctor_id=${e.target.value}`
      )
      .then((res) => {
        console.log(res, "DATA");
        console.log(res.data.machine_details, "Machine Details");
        setMachineList(res.data.machine_details);
        console.log(
          res.data.machine_details.map((res) => res),
          "ConsultingTime"
        );
        setMachineConsultingTime(res.data.machine_details.map((res) => res));
      })
      .catch((err) => {
        console.log(err);
        alert(err.message);
      });
  };

  const handleShow = () => {
    axios
      .get(`/api/v1/appointments`)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
        alert(err.message);
      });

    axios
      .get("api/v1/users")
      .then((res) => {
        console.log("all the users: ", res);
        setDoctorNames(res.data.users);
      })
      .catch((err) => {
        console.log(err);
        alert(err.message);
      });
  };

  const handleSearchTerm = (value) => {
    setSearchTerm(value);
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      setDebouncedSearchTerm(searchTerm);
    }
  };

  useEffect(() => {
    if (debouncedSearchTerm) {
      axios
        .get(
          `/api/v2/users/search?case_number=${debouncedSearchTerm}&phone_number=${debouncedSearchTerm}&email=${debouncedSearchTerm}`
        )
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
                setCase("old");
              } else {
                setCase("new");
              }
            })
            .catch((err) => {
              console.log(err);
              alert(err.message);
            });
        })
        .catch((err) => {
          console.log(err);
          alert("USER NOT FOUND");
        });
    }
  }, [debouncedSearchTerm]);

  useEffect(() => {
    handleShow();
    localStorage.removeItem("doctor_id");
  }, []);

  const handleMove = () => {
    navigate("../new-user/general-details");
  };

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
              onKeyDown={handleKeyDown}
              placeholder="Search User through Case Number/Phone Number/Email"
              className="py-1 px-2 rounded-md border border-black w-full"
            />
            <button
              type="button"
              className="w-[10rem] text-white rounded-md border border-gray-500 font-medium text-lg hover:scale-105"
              name="Save & Continue"
              onClick={handleMove}
              style={{ backgroundColor: "black" }}
            >
              NEW USER
            </button>
          </div>

          <div className="w-full flex justify-center p-4 shadow-gray-400 shadow-inner border rounded-md border-gray-100 animate-once animate-ease-out overflow-auto h-[93%]">
            <form className="text-lg">
              <div className="flex gap-5 m-5">
                <label className="text-lg text-end w-1/3 mr-2">
                  Select Doctor
                </label>

                <select
                  onChange={handleDoctorList}
                  value={doctorList}
                  defaultValue={"select"}
                  className="py-1 px-2 rounded-md border border-black w-[40vh]"
                >
                  <option value="select" selected>
                    Select Doctor
                  </option>
                  {Object.values(doctorName)
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
                  <Oldcase
                    doctor={doctorList}
                    user={userId}
                    machine={machineList}
                    machineTime={machineConsultingTime}
                  />
                ) : (
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
          </div>
        </div>
      </div>
    </div>
  );
}
