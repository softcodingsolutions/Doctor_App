import axios from "axios";
import TdComponent from "../../../components/TdComponent";
import ThComponent from "../../../components/ThComponent";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function FranchiseAllCustomers() {
  const navigate = useNavigate();
  const [getCustomers, setGetCustomers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [getParticularCustomer, setGetParticularCustomer] = useState([]);
  const mainId = localStorage.getItem("main_id");

  const handleGetAllUsers = () => {
    axios.get("/api/v1/users").then((res) => {
      const patients = res.data?.users?.filter(
        (user) =>
          user.role === "patient" &&
          user.creator === "franchise" &&
          user.created_by_id == mainId
      );
      console.log(patients);
      setGetCustomers(patients);
      setGetParticularCustomer(patients);
    });
  };

  const handleDiagnosis = (val) => {
    localStorage.setItem("userId", val);
    navigate(`../user-diagnosis/profile`);
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

  return (
    <div className="w-full p-2">
      <div className="rounded-lg bg-card h-[93vh] bg-white">
        <div className="flex p-4 h-full flex-col space-y-4 text-lg">
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
          <div className="animate-fade-left animate-delay-75-100 animate-once animate-ease-out overflow-auto h-[99%]">
            <table className="w-full min-w-[460px] z-0">
              <thead className="uppercase ">
                <tr className="bg-[#1F2937] text-white rounded-md">
                  <ThComponent
                    moreClasses={"rounded-tl-md rounded-bl-md"}
                    name="Case No."
                  />
                  <ThComponent name="Name" />
                  <ThComponent name="Email" />
                  <ThComponent name="Mobile" />
                  <ThComponent name="City" />
                  <ThComponent />
                  <ThComponent moreClasses={"rounded-tr-md rounded-br-md"} />
                </tr>
              </thead>
              <tbody>
                {getParticularCustomer.length === 0 ? (
                  <tr>
                    <th
                      className="uppercase tracking-wide font-medium pt-[16rem] text-xl"
                      colSpan={8}
                    >
                      No Customers Found!
                    </th>
                  </tr>
                ) : (
                  getParticularCustomer.map((val) => {
                    return (
                      val.role === "patient" && (
                        <tr key={val.id}>
                          <td className="py-2 px-4 border-b border-b-gray-50">
                            <div className="flex items-center text-lg">
                              {val.case_number}
                            </div>
                          </td>
                          <td className="py-3 px-4 border-b border-b-gray-50">
                            <TdComponent
                              things={val.first_name + " " + val.last_name}
                            />
                          </td>
                          <td className="py-3 px-4 border-b border-b-gray-50">
                            <TdComponent things={val.email} />
                          </td>
                          <td className="py-3 px-4 border-b border-b-gray-50">
                            <TdComponent things={val.phone_number} />
                          </td>
                          <td className="py-3 px-4 border-b border-b-gray-50">
                            <TdComponent things={val.personal_detail?.city} />
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

export default FranchiseAllCustomers;
