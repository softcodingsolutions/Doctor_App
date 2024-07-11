import React, { useState, useEffect } from "react";
import axios from "axios";
import { useDebounce } from "use-debounce";
import { useNavigate } from "react-router-dom";
import Button from "@mui/joy/Button";
import { IoMdArrowRoundBack } from "react-icons/io";
export default function GenerateBill() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm] = useDebounce(searchTerm, 500);
  const [id, setId] = useState(0);
  const [userDetails, setUser] = useState({});
  const [medicines, setMedicines] = useState([]);
  const [packageDetail , setPackageDetail] = useState({});
  const handleSearchTerm = (value) => {
    setSearchTerm(value);
  };
  const handleInventory = () => {
    navigate(`../medical-inventory`);
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
          setPackageDetail(res.data.user.personal_detail.package)
          console.log(
            res.data.user.treatment_packages[0].treatment_package.medicines,
            "Richa"
          );
          setMedicines(
            res.data.user.treatment_packages[0].treatment_package.medicines
          );
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [id]);

  const formatTime = (time) => {
    if (time === "morning") {
      return "Morning";
    }
    if (time === "dinner") {
      return "Dinner";
    }
    if (time === "lunch") {
      return "Lunch";
    }
    if (time === "evening") {
      return "Evening";
    }
  };
  const formatDuration = (duration) =>{
    if(duration === "before-meal"){
      return "Before-meal"
    }
    if(duration === "after-meal"){
      return "After-meal"
    }
  }
  const formatPackageDuration = (fromDate, toDate) => {
    if (fromDate && toDate) {
      const options = { year: "numeric", month: "long", day: "numeric" };
      const from = new Date(fromDate).toLocaleDateString(undefined, options);
      const to = new Date(toDate).toLocaleDateString(undefined, options);
      
      const fromDateObj = new Date(fromDate);
      const toDateObj = new Date(toDate);
      const diffTime = Math.abs(toDateObj - fromDateObj);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

      return `${from} - ${to} (${diffDays} days)`;
    }
    return "";
  
  };
  const handleTotalMedicine = () =>{
    
  }

  return (
    <div className="w-full p-5 bg-gray-100">
      <div className="rounded-lg bg-white shadow-lg overflow-hidden">
        <div className="flex flex-col px-4 py-6 space-y-4">
          <div className="text-2xl font-semibold text-center mb-4">
            Generate Bill
          </div>
          <div>
              <Button variant="outlined" color="neutral"  onClick={handleInventory}>
                <IoMdArrowRoundBack size={24}/>
              </Button>
          </div>
          <div className="flex gap-5 p-2 w-full mb-4">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => handleSearchTerm(e.target.value)}
              placeholder="Search case number or phone number"
              className="py-2 px-4 rounded-md border border-gray-300 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="w-full ">
            <div className="flex gap-48">
            <div className="text-lg font-bold mb-4">
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
            <div className="text-lg font-bold mb-4">
              <div>
                  Package Name:{" "}
                  <span className="font-medium">{packageDetail.package_name}</span>
                </div>
                <div>
                  Package Duration:{" "}
                  <span className="font-medium">
                    {formatPackageDuration(
                        packageDetail.from_date,
                        packageDetail.to_date
                    )} 
                  </span>
                </div>
                </div>
            </div>
            <div className="bg-white shadow-md rounded-lg overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-900 uppercase tracking-wider">
                      Medicine Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-900 uppercase tracking-wider">
                      Time
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-900 uppercase tracking-wider">
                      Medicine Intake
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-900 uppercase tracking-wider">
                      Assigned Medicine
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-900 uppercase tracking-wider">
                      Total  Medicine
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-900 uppercase tracking-wider">
                      With Milk
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {medicines.map((med, index) => (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium ">
                        {med.medicine_name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm ">
                        {med.frequency.map((time, timeIndex) => (
                          <span
                            key={timeIndex}
                            className=" ml-1"
                          >
                            {formatTime(time) }
                          </span>
                        ))}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm ">
                        {formatDuration(med.dosage)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm ">
                        {med.quantity}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm ">
                        <input type="number" className="border border-blue-gray-400 rounded-md p-2" min={0} onChange={handleTotalMedicine}/>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm ">
                        {med.with_milk }
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
