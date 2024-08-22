import TdComponent from "../../../components/TdComponent";
import ThComponent from "../../../components/ThComponent";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import InsideLoader from "../../InsideLoader";

function CustomerAllUsers() {
  const navigate = useNavigate();
  const [getCustomers, setGetCustomers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [getParticularCustomer, setGetParticularCustomer] = useState([]);
  const role = localStorage.getItem("role");
  const main_id = localStorage.getItem("main_id");
  const [loading, setLoading] = useState(true);

  const handleGetAllUsers = () => {
    if (role === "super_admin") {
      axios.get(`/api/v1/users`).then((res) => {
        const patients = res.data?.users?.filter(
          (user) => user.role === "patient"
        );
        console.log("Patients by Super Admin: ", patients);
        setGetCustomers(patients);
        setGetParticularCustomer(patients);
        setLoading(false);
      });
    } else if (role === "doctor") {
      axios.get(`/api/v1/users?user_id=${main_id}`).then((res) => {
        console.log("Patients by Doctor: ", res.data?.users);
        setGetCustomers(res.data?.users);
        setGetParticularCustomer(res.data?.users);
        setLoading(false);
      });
    }
  };

  const handleDiagnosis = (val) => {
    localStorage.setItem("userId", val);
    navigate(`../user-diagnosis/questions`);
  };

  const handleAddUsers = () => {
    navigate("../../new-user/general-details");
  };

  const handleSearchTerm = (value) => {
    setSearchTerm(value);
  };

  useEffect(() => {
    handleGetAllUsers();
    localStorage.removeItem("userId");
    localStorage.removeItem("doctor_id");
  }, []);

  useEffect(() => {
    if (searchTerm) {
      const filteredUsers = getCustomers.filter(
        (user) =>
          user.case_number.includes(searchTerm) ||
          user.phone_number.includes(searchTerm) ||
          user.email.includes(searchTerm) ||
          user.first_name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setGetParticularCustomer(filteredUsers);
    } else {
      setGetParticularCustomer(getCustomers);
    }
  }, [searchTerm, getCustomers]);

  // Sort getParticularCustomer so that those with no treatment_packages come first
  const sortedCustomers = getParticularCustomer.sort((a, b) => {
    const aHasNoPackage = a.treatment_packages?.length === 0;
    const bHasNoPackage = b.treatment_packages?.length === 0;
    return bHasNoPackage - aHasNoPackage; // This will move customers with no packages to the front
  });

  if (loading) {
    return <InsideLoader />;
  }

  return (
    <div className="w-full p-2">
      <div className="rounded-lg bg-card h-[92vh] bg-white">
        <div className="flex p-4 h-full flex-col space-y-1">
          <div className="flex gap-5 p-2 w-full">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => handleSearchTerm(e.target.value)}
              placeholder="Search User through First Name/Phone Number/Email/Case Number"
              className="py-1 px-2 rounded-md border border-black w-full"
            />
            <button
              onClick={handleAddUsers}
              className="border border-gray-300 text-lg p-1 rounded-md bg-green-600 text-white hover:scale-105"
            >
              Add New
            </button>
          </div>
          <div className="flex items-center justify-end gap-2">
            <div className="w-4 h-4 bg-red-300 border border-gray-800"> </div>
            <div>- New Patient</div>
          </div>
          <div className="animate-fade-left animate-delay-75 shadow-gray-400 shadow-inner border rounded-md border-gray-100 animate-once animate-ease-out overflow-auto h-[99%]">
            <table className="w-full min-w-[460px] z-0">
              <thead className="uppercase ">
                <tr className="bg-[#1F2937] text-white rounded-md">
                  <ThComponent
                    moreClasses={"rounded-tl-md rounded-bl-md"}
                    name="Case No."
                  />
                  <ThComponent name="Name" />
                  <ThComponent name="Email" />
                  <ThComponent name="Age" />
                  <ThComponent name="Mobile" />
                  <ThComponent name="City" />
                  <ThComponent name="Registration Through" />
                  <ThComponent moreClasses={"rounded-tr-md rounded-br-md"} />
                </tr>
              </thead>
              <tbody>
                {sortedCustomers.length === 0 ? (
                  <tr>
                    <th
                      className="uppercase tracking-wide font-medium pt-[16rem] text-xl"
                      colSpan={8}
                    >
                      No Customers Found!
                    </th>
                  </tr>
                ) : (
                  sortedCustomers.map((val) => {
                    return (
                      val.role === "patient" && (
                        <tr
                          key={val.id}
                          className={`${
                            val.treatment_packages?.length === 0
                              ? "border-l-4 border-red-300"
                              : ""
                          }`}
                        >
                          <td className="py-2 px-4 border-b border-b-gray-50">
                            <div className="flex items-center text-lg">
                              {val.case_number}
                            </div>
                          </td>
                          <td className="py-3 px-4 border-b border-b-gray-50 break-all">
                            <TdComponent
                              things={
                                val.first_name[0]?.toUpperCase() +
                                val.first_name?.slice(1) +
                                " " +
                                val.last_name[0]?.toUpperCase() +
                                val.last_name?.slice(1)
                              }
                            />
                          </td>
                          <td className="py-3 px-4 border-b border-b-gray-50">
                            <TdComponent things={val.email} />
                          </td>
                          <td className="py-3 px-4 border-b border-b-gray-50">
                            <TdComponent things={val.personal_detail?.age} />
                          </td>
                          <td className="py-3 px-4 border-b border-b-gray-50">
                            <TdComponent things={val.phone_number} />
                          </td>
                          <td className="py-3 px-4 border-b border-b-gray-50">
                            <TdComponent
                              things={
                                val.personal_detail?.city?.[0]?.toUpperCase() +
                                val.personal_detail?.city?.slice(1)
                              }
                            />
                          </td>
                          <td className="py-3 px-4 border-b border-b-gray-50">
                            {val.creator === "super_admin" && (
                              <TdComponent things={"Admin"} />
                            )}
                            {val.creator === "doctor" && (
                              <TdComponent things={"Doctor"} />
                            )}
                            {val.creator === "franchise" && (
                              <TdComponent things={"Franchise"} />
                            )}
                          </td>
                          <td className="py-3 px-4 border-b border-b-gray-50">
                            <TdComponent
                              things={
                                <button
                                  onClick={() => handleDiagnosis(val.id)}
                                  className="font-semibold text-green-600 border border-gray-300 p-1 rounded-md hover:bg-green-600 hover:text-white"
                                >
                                  Diagnosis
                                </button>
                              }
                            />
                          </td>
                        </tr>
                      )
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CustomerAllUsers;
