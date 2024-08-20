import TdComponent from "../../components/TdComponent";
import ThComponent from "../../components/ThComponent";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import InsideLoader from "../InsideLoader";

function RecepAllUsers() {
  const navigate = useNavigate();
  const [getCustomers, setGetCustomers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [getParticularCustomer, setGetParticularCustomer] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleGetAllUsers = () => {
    axios.get(`/api/v1/users`).then((res) => {
      const patients = res.data?.users?.filter(
        (user) => user.role === "patient" && user.creator === "doctor"
      );
      console.log("Patients by Super Admin: ", patients);
      setGetCustomers(patients);
      setGetParticularCustomer(patients);
      setLoading(false);
    });
  };

  const handleAddUsers = () => {
    navigate("../new-user/general-details");
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

  if (loading) {
    return <InsideLoader />;
  }

  return (
    <div className="w-full p-2 text-lg">
      <div className="rounded-lg bg-card h-[92vh] bg-white">
        <div className="flex p-4 h-full flex-col space-y-4">
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
          <div className="animate-fade-left animate-delay-75 shadow-gray-400 shadow-inner border rounded-md border-gray-100 animate-once animate-ease-out overflow-auto h-[99%]">
            <table className="w-full min-w-[460px] z-0 ">
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
                  <ThComponent name="Doctor Name" />
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
                          <td className="py-3 px-4 border-b border-b-gray-50 break-all ">
                            <TdComponent
                              things={
                                val?.first_name?.[0]?.toUpperCase() +
                                val?.first_name?.slice(1) +
                                " " +
                               val?.last_name?.[0]?.toUpperCase() +
                                val?.last_name?.slice(1)
                              }
                            />
                          </td>
                          <td className="py-3 px-4 border-b border-b-gray-50">
                            <TdComponent things={val.email} />
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

                            <div className="text-black font-medium ml-1 text-wrap text-base">{val?.doctor?.first_name + " " + val?.doctor?.last_name}</div>
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

export default RecepAllUsers;
