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
  const main_id = localStorage.getItem("main_id");
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [type, setType] = useState("");
  const [created_at, setCreatedAt] = useState("");
  const rowsPerPage = 7;

  const handleGetAllUsers = () => {
    axios.get(`/api/v1/users?user_id=${main_id}`).then((res) => {
      console.log("Patients by Doctor: ", res.data?.users);
      setGetCustomers(res.data?.users);
      setGetParticularCustomer(res.data?.users);
      setLoading(false);
    });
  };

  const handleType = (e) => {
    const selectedType = e.target.value;
    console.log(selectedType, "Type");
    setType(selectedType);

    axios
      .get(`/api/v1/users?user_id=${main_id}&user_type=${selectedType}`)
      .then((res) => {
        console.log("Patients by Doctor: ", res.data?.users);
        setGetCustomers(res.data?.users);
        setGetParticularCustomer(res.data?.users);
        setLoading(false);
      });
  };

  const handleDate = (e) => {
    const inputDate = new Date(e.target.value);
    const formattedDate = inputDate.toISOString().split("T")[0];

    setCreatedAt(formattedDate);

    axios
      .get(`/api/v1/users?user_id=${main_id}&created_at=${formattedDate}`)
      .then((res) => {
        console.log("Patients by Doctor: ", res.data?.users);
        setGetCustomers(res.data?.users);
        setGetParticularCustomer(res.data?.users);
        setLoading(false);
      });
  };

  const handleDiagnosis = (val, caseNumber) => {
    localStorage.setItem("userId", val);
    localStorage.setItem("caseNumber", caseNumber);
    navigate(`../user-diagnosis/treatment/medicine`);
  };

  const handleAddUsers = () => {
    navigate("../../new-user/general-details");
  };

  const handleSearchTerm = (value) => {
    setSearchTerm(value);
  };

  const handleInventory = (val, caseNumber) => {
    localStorage.setItem("userId", val);
    localStorage.setItem("caseNumber", caseNumber);
    navigate(`/admin/patients/customer-details/progress-questions`);
  };

  const handlePackageDetail = (e) => {
    const selectedPackageStatus = e.target.value;

    axios
      .get(`/api/v1/users?user_id=${main_id}`)
      .then((res) => {
        console.log("Patients by Doctor: ", res.data?.users);
        if (selectedPackageStatus === "select") {
          setGetCustomers(res.data?.users);
        } else {
          const filteredUsers = res.data?.users.filter((user) => {
            if (user.user_packages) {
              return (
                user.user_packages.package_status === selectedPackageStatus
              );
            }
            return false;
          });
          setGetCustomers(filteredUsers);
        }
      })
      .catch((error) => {
        console.error("Error fetching users: ", error);
      });
  };

  const sortedCustomers = getParticularCustomer.sort((a, b) => {
    const aHasNoPackage = a.creator === "franchise";
    const bHasNoPackage = b.creator === "franchise";
    return bHasNoPackage - aHasNoPackage;
  });

  const paginateCustomers = () => {
    const indexOfLastRow = currentPage * rowsPerPage;
    const indexOfFirstRow = indexOfLastRow - rowsPerPage;
    return sortedCustomers.slice(indexOfFirstRow, indexOfLastRow);
  };

  const totalPages = Math.ceil(getParticularCustomer.length / rowsPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const formatType = (type) => {
    if (type === true) {
      return (
        <div className="bg-[#f0d5bb] p-1 rounded  text-[#e78f3d]">
          Follow Up
        </div>
      );
    } else if (type === false) {
      return (
        <div className="bg-[#D6F4F8] p-1 rounded  text-[#00bad1]">New Case</div>
      );
    }
  };

  const convertDate = (date) => {
    const dateObj = new Date(date);
    const formattedDate = `${String(dateObj.getDate()).padStart(
      2,
      "0"
    )}-${String(dateObj.getMonth() + 1).padStart(
      2,
      "0"
    )}-${dateObj.getFullYear()}`;
    return formattedDate;
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
    <div className="w-full p-2">
      <div className="rounded-lg bg-card md:h-[92vh] bg-white">
        <div className="flex p-2 h-full flex-col space-y-1">
          <div className="flex justify-between gap-5 p-2 w-full">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => handleSearchTerm(e.target.value)}
              placeholder="Search User through First Name/Phone Number/Email/Case Number"
              className="p-2 rounded-md border border-black w-full"
            />
            <button
              onClick={handleAddUsers}
              className="border border-gray-300 w-full sm:w-[20%] text-lg p-1 rounded-md bg-green-600 text-white hover:scale-105"
            >
              New Patient
            </button>
          </div>
          <div className="flex items-center justify-end gap-2 flex-wrap md:flex-nowrap">
            <div className="flex p-2 gap-2 flex-wrap  w-full justify-start md:w-auto">
              <div className="flex items-start w-full  md:w-auto">
                <select
                  name="overweight"
                  onChange={handleType}
                  placeholder="Type"
                  className="py-3 text-sm px-2 w-full md:w-auto rounded-md border border-black"
                >
                  <option value="">Select Type</option>
                  <option value="new_case">New Case / Unread </option>
                  <option value="old_case">Follow Up</option>
                </select>
              </div>
              <div className="flex items-start w-full md:w-auto">
                <input
                  type="date"
                  placeholder="select date"
                  onChange={handleDate}
                  className="py-2 text-sm px-3 w-full md:w-auto rounded-md border border-black"
                />
              </div>
              <div className="flex items-start w-full md:w-auto">
                <select
                  defaultValue="select"
                  placeholder="Type"
                  onChange={handlePackageDetail}
                  className="py-3 text-sm px-2 w-full md:w-auto rounded-md border border-black"
                >
                  <option value="select">Package Details</option>
                  <option value="activate">Active</option>
                  <option value="expired">Expired</option>
                  <option value="deactivate">Deactive</option>
                  <option value="renew">Renew</option>
                  <option value="about_to_expired">About to Expire</option>
                </select>
              </div>
            </div>
            <div className="w-full md:w-auto flex items-center justify-end  gap-2">
              <div className="w-4 h-4 bg-red-300 border border-gray-800"></div>
              <div>- Franchise Patient</div>
            </div>
          </div>

          <div className="overflow-x-auto animate-fade-left animate-delay-75 shadow-gray-400 shadow-inner border rounded-md border-gray-100 animate-once animate-ease-out h-[75vh]">
            <table className="w-full min-w-[460px] z-0">
              <thead className="uppercase ">
                <tr className="bg-[#1F2937] text-white rounded-md ">
                  <ThComponent name="Case No." className="rounded-md" />
                  <ThComponent name="Patient Name" />
                  <ThComponent name="Age" />
                  <ThComponent name="Weight" />
                  <ThComponent name="Mobile Number" />
                  <ThComponent name="Type" />
                  <ThComponent name="Patient Created At" />
                  <ThComponent />
                </tr>
              </thead>
              <tbody>
                {paginateCustomers().length === 0 ? (
                  <tr>
                    <td colSpan={8} className="pt-[16rem] text-xl text-center">
                      No Customers Found!
                    </td>
                  </tr>
                ) : (
                  paginateCustomers().map((val) => (
                    <tr
                      key={val.id}
                      className={
                        val.creator === "franchise"
                          ? "border-l-4 border-red-300 hover:bg-gray-200"
                          : "hover:bg-gray-200 "
                      }
                    >
                      <td className="py-3 px-2 border-b border-b-gray-50 text-sm text-left ">
                        {val.case_number}
                      </td>
                      <td className="py-3 px-2 border-b border-b-gray-50 text-sm text-left">
                        {val.first_name} {val.last_name}
                      </td>
                      <td className="py-3 px-2 border-b border-b-gray-50 text-sm text-left">
                        {val.personal_detail?.age}
                      </td>
                      <td className="py-3 px-2 border-b border-b-gray-50 text-sm text-left">
                        {val.personal_detail?.weight} kg
                      </td>
                      <td className="py-3 px-2 border-b border-b-gray-50 text-sm text-left">
                        {val.phone_number}
                      </td>
                      <td className="py-3 px-2 border-b border-b-gray-50 flex justify-start   text-sm text-left  ">
                        {formatType(val.follow_up)}
                      </td>
                      <td className="py-3 px-2 border-b border-b-gray-50 text-sm text-left">
                        {convertDate(val.created_at)}
                      </td>
                      <td className="flex gap-1 py-3 px-2 border-b  border-b-gray-50">
                        <button
                          onClick={() =>
                            handleDiagnosis(val.id, val.case_number)
                          }
                          className="font-medium p-1 text-green-600 bg-white border text-sm ml-1 border-gray-300 rounded-md hover:bg-green-600 hover:text-white"
                        >
                          Diagnosis
                        </button>
                        <button
                          className="font-medium p-1 text-white bg-green-600 border border-gray-300  text-sm rounded-md hover:text-green-600 hover:bg-white"
                          onClick={() =>
                            handleInventory(val.id, val.case_number)
                          }
                        >
                          View Patient
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination Controls */}
          {totalPages !== 0 && (
            <div className="flex flex-wrap justify-center items-center gap-2 py-2">
              <button
                onClick={handlePreviousPage}
                disabled={currentPage === 1}
                className="flex items-center gap-2 px-6 py-3 font-sans text-xs font-bold text-center text-gray-900 uppercase align-middle transition-all rounded-full select-none hover:bg-gray-900/10 active:bg-gray-900/20 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                  stroke="currentColor"
                  aria-hidden="true"
                  className="w-4 h-4"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
                  ></path>
                </svg>
                Previous
              </button>
              <div className="flex gap-2">
                {Array.from({ length: totalPages }, (_, i) => (
                  <button
                    key={i + 1}
                    onClick={() => setCurrentPage(i + 1)}
                    className={`relative h-10 max-h-[40px] w-10 max-w-[40px] select-none rounded-full text-center align-middle font-sans text-xs font-medium uppercase text-gray-900 transition-all hover:bg-gray-900/10 active:bg-gray-900/20 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none ${
                      currentPage === i + 1
                        ? "bg-gray-900 text-white"
                        : "bg-gray-200 text-black"
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}
              </div>
              <button
                onClick={handleNextPage}
                disabled={currentPage === totalPages}
                className="flex items-center gap-2 px-6 py-3 font-sans text-xs font-bold text-center text-gray-900 uppercase align-middle transition-all rounded-full select-none hover:bg-gray-900/10 active:bg-gray-900/20 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
              >
                Next
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                  stroke="currentColor"
                  aria-hidden="true"
                  className="w-4 h-4"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                  ></path>
                </svg>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default CustomerAllUsers;
