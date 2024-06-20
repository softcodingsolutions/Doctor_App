import { useState, useEffect } from "react";
import Oldcase from "./Oldcase";
import Newcase from "./Newcase";
import axios from "axios";

export default function CreateAppointment() {
  const [doctorList, setDoctorList] = useState("");
  const [Case, setCase] = useState("old");
  const [doctorName, setDoctorNames] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredDoctors, setFilteredDoctors] = useState([]);

  const handleDoctorList = (e) => {
    setDoctorList(e.target.value);
    console.log(e.target.value);
  };

  const handleCase = (e) => {
    setCase(e.target.value);
  };

  const handleSearchTerm = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSearch = () => {
    const filtered = doctorName.filter((doctor) =>
      `${doctor.first_name} ${doctor.last_name}`
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
    );
    setFilteredDoctors(filtered);
  };

  useEffect(() => {
    axios
      .get("api/v1/users")
      .then((res) => {
        console.log(res);
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
          <div className="text-xl font-semibold">Create Appointment</div>
          <div className="flex gap-5 p-2 w-full">
            <input
              type="text"
              value={searchTerm}
              onChange={handleSearchTerm}
              placeholder="search case number"
              className="py-1 px-2 rounded-md border border-black w-full"
            />
            <button
              type="button"
              onClick={handleSearch}
              className="w-[10rem] text-white rounded-md border border-gray-500 font-medium text-lg  hover:scale-105"
              name="Save & Continue"
              style={{ backgroundColor: "black" }}
            >
              New
            </button>
          </div>
          <div className="w-full flex justify-center p-4 shadow-gray-400 shadow-inner border rounded-md border-gray-100 animate-once animate-ease-out overflow-auto h-[93%]">
            <form>
              <div className="flex gap-5 m-5">
                <label className="text-lg text-end w-1/3 mr-2">
                  Select Doctor{" "}
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
                  <Oldcase doctor={doctorList} />
                ) : (
                  <Newcase doctor={doctorList} />
                )}

                <label className="text-lg text-end w-1/3 mr-2">Case </label>
                <select
                  className="py-1 px-2 rounded-md border border-black w-[40vh]"
                  onChange={handleCase}
                  value={Case}
                >
                  <option value="old">Old</option>
                  <option value="new">New</option>
                </select>
              </div>
              <div className="flex gap-5 m-5">
                {Case === "old" ? (
                  <Oldcase doctor={doctorList} />
                ) : (
                  <Newcase doctor={doctorList} />
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
