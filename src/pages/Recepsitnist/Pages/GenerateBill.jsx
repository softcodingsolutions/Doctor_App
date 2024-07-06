import React, { useState, useEffect } from "react";
import axios from "axios";
import { useDebounce } from "use-debounce";

export default function GenerateBill() {
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm] = useDebounce(searchTerm, 500);
  const [id, setId] = useState(0);
  const [userDetails, setUser] = useState({});
  const [medicines, setMedicines] = useState([]);
  const [treatment, setTreatment] = useState([]);

  const handleSearchTerm = (value) => {
    setSearchTerm(value);
  };

  useEffect(() => {
    if (debouncedSearchTerm) {
      axios
        .get(
          `/api/v2/users/search?case_number=${debouncedSearchTerm}&phone_number=${debouncedSearchTerm}`
        )
        .then((res) => {
          console.log("search", res);
          let userId = res.data.user.id;
          setId(res.data.user.id);
          axios
            .get(`/api/v1/appointments/user_appointments_count/${userId}`)
            .then((res) => {
              console.log(res, "COUNTT");
              const count = res.data.appointments_count;
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
    if (id) {
      axios
        .get(`/api/v2/users/search?id=${id}`)
        .then((res) => {
          console.log(res, "USER PACKAGE");
          setUser(res.data.user);
          setMedicines(
            res.data.user.treatment_packages.flatMap((data) =>
              data.treatment_package.medicines
            )
          );
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [id]);

  return (
    <div className="w-full p-5">
      <div className="rounded-lg bg-white h-[90vh] shadow-lg">
        <div className="flex flex-col px-4 py-3 h-full space-y-4">
          <div>
            <div className="text-2xl font-semibold mb-4">Generate Bill</div>
            <div className="flex gap-5 p-2 w-full mb-4">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => handleSearchTerm(e.target.value)}
                placeholder="Search case number or phone number"
                className="py-2 px-4 rounded-md border border-gray-300 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="w-full flex-col p-5 shadow-gray-400 shadow-inner border rounded-md border-gray-200 overflow-auto h-[75vh]">
              <div className="flex flex-col text-lg font-bold mb-6">
                <div>
                  Patient Name:{" "}
                  <span className="font-medium">
                    {userDetails.first_name} {userDetails.last_name}
                  </span>
                </div>
                <div>
                  Case Number:{" "}
                  <span className="font-medium">{userDetails.case_number}</span>
                </div>
              </div>
              <div className="text-md font-semibold">
                {medicines.map((med, index) => (
                  <div
                    key={index}
                    className="flex justify-between items-center mb-4 p-5 border rounded-md border-gray-200"
                  >
                    <div className="flex flex-col">
                      <span className="font-medium">Medicine Name:</span>
                      <span>{med.medicine_name}</span>
                    </div>
                    <div className="flex flex-col mr-20">
                      <span className="font-medium">Quantity:</span>
                      <span>{med.medicine_quantity}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
