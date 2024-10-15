import TdComponent from "../../components/TdComponent";
import ThComponent from "../../components/ThComponent";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import InsideLoader from "../InsideLoader";
import Button from "@mui/joy/Button";

function RecepAllUsers() {
  const navigate = useNavigate();
  const [getCustomers, setGetCustomers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [getParticularCustomer, setGetParticularCustomer] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [type, setType] = useState("");
  const [created_at, setCreatedAt] = useState("");
  const role = localStorage.getItem("role");
  const rowsPerPage = 6;

  console.log(role);
  const handleGetAllUsers = () => {
    axios.get(`/api/v1/users`).then((res) => {
      const patients = res.data?.users?.filter(
        (user) => user.role === "patient"
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

  const handleInventory = (caseNumber) => {
    if (role === "receptionist") {
      navigate(`/receptionist/bill-history`, { state: { caseNumber } });
    } else {
      navigate(`../../admin-bill-history`, { state: { caseNumber } });
    }
  };
  const handleRedirect = (val, caseNumber) => {
    localStorage.setItem("userId", val);
    localStorage.setItem("caseNumber", caseNumber);
    if (role === "receptionist") {
      navigate(
        "/receptionist/patients/recp-customer-details/progress-questions"
      );
    } else if (role === "super_admin") {
      navigate(`/admin/patients/customer-details/progress-questions`);
    }
  };

  const paginateCustomers = () => {
    const indexOfLastRow = currentPage * rowsPerPage;
    const indexOfFirstRow = indexOfLastRow - rowsPerPage;
    return getParticularCustomer.slice(indexOfFirstRow, indexOfLastRow);
  };

  const totalPages = Math.ceil(getParticularCustomer.length / rowsPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handleDate = (e) => {
    const inputDate = new Date(e.target.value);
    const formattedDate = inputDate.toISOString().split("T")[0];

    setCreatedAt(formattedDate);
    axios.get(`/api/v1/users?created_at=${formattedDate}`).then((res) => {
      const patients = res.data?.users?.filter(
        (user) => user.role === "patient"
      );
      console.log("Patients by Super Admin: ", patients);
      setGetCustomers(patients);
      setGetParticularCustomer(patients);
      setLoading(false);
    });
  };

  const handleType = (e) => {
    const selectedType = e.target.value;
    console.log(selectedType, "Type");
    setType(selectedType);

    axios.get(`/api/v1/users?user_type=${selectedType}`).then((res) => {
      const patients = res.data?.users?.filter(
        (user) => user.role === "patient"
      );
      console.log("Patients by Super Admin: ", patients);
      setGetCustomers(patients);
      setGetParticularCustomer(patients);
      setLoading(false);
    });
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleCheckboxChange = (e) => {
    const formdata = new FormData();
    formdata.append("user_id", e.target.value);
    setLoading(true);
    axios
      .put(`/api/v1/users/indoor_activity_accessibility`, formdata)
      .then((res) => {
        console.log(res, "DATA RESPONSe");
        setLoading(false);
        handleGetAllUsers();
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
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

  const handlePackageDetail = (e) => {
    const selectedPackageStatus = e.target.value;

    axios
      .get(`/api/v1/users`)
      .then((res) => {
        if (selectedPackageStatus === "select") {
          const patients = res.data?.users?.filter(
            (user) => user.role === "patient"
          );
          console.log("Patients by Super Admin: ", patients);
          setGetCustomers(patients);
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
    <div className="w-full ">
      <div className="rounded-lg bg-card md:h-[95vh] bg-white">
        <div className="flex p-5 h-full flex-col space-y-4">
          <div className="flex justify-between gap-5  w-full">
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
          <div className="flex flex-col sm:flex-row items-center justify-between gap-2 p-2">
            <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-[67%]">
              <div className="flex items-start">
                <select
                  name="overweight"
                  onChange={handleType}
                  placeholder="Type"
                  className="py-2 text-sm px-3 rounded-md border border-black w-full sm:w-auto"
                >
                  <option value="">Select Type</option>
                  <option value="new_case">New Case / Unread</option>
                  <option value="old_case">Follow Up</option>
                </select>
              </div>
              <div className="flex items-start">
                <input
                  type="date"
                  placeholder="Select date"
                  onChange={handleDate}
                  className="py-1 text-sm px-2 rounded-md border border-black w-full sm:w-auto"
                />
              </div>
              <div className="flex items-start">
                <select
                  defaultValue="select"
                  placeholder="Type"
                  onChange={handlePackageDetail}
                  className="py-2 text-sm px-2 rounded-md border border-black w-full sm:w-auto"
                >
                  <option value="select">Package Details</option>
                  <option value="activate">Activate</option>
                  <option value="expired">Expired</option>
                  <option value="deactivate">Deactivated</option>
                  <option value="renew">Renew</option>
                  <option value="about_to_expired">About to Expire</option>
                </select>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <input
                type="checkbox"
                checked
                className="w-4 h-4 border border-gray-800"
              />
              <div>- Indoor activity accessibility</div>
              <div className="w-4 h-4 bg-blue-300 border border-gray-800"></div>
              <div>- New Patient</div>
            </div>
          </div>

          <div className="overflow-x-auto animate-fade-left animate-delay-75 shadow-gray-400 shadow-inner border rounded-md border-gray-100 animate-once animate-ease-out h-[75vh]">
            <table className="w-full min-w-[460px] z-0 min-h-96">
              <thead className="uppercase ">
                <tr className="bg-[#1F2937] text-white rounded-md">
                  <ThComponent moreClasses={"rounded-tl-md rounded-bl-md"} />
                  <ThComponent name="Case No." />
                  <ThComponent name="Patient Name" />
                  <ThComponent name="Age" />
                  <ThComponent name="Weight" />
                  <ThComponent name="Mobile Number" />
                  {/* <ThComponent name="Type" /> */}
                  <ThComponent name="Created At" />
                  <ThComponent name="Doctor Name" />
                  <ThComponent moreClasses={"rounded-tr-md rounded-br-md"} />
                </tr>
              </thead>
              <tbody>
                {paginateCustomers().length === 0 ? (
                  <tr>
                    <th
                      className="uppercase tracking-wide font-medium pt-[16rem] text-xl"
                      colSpan={8}
                    >
                      No Customers Found!
                    </th>
                  </tr>
                ) : (
                  paginateCustomers().map((val) => {
                    return (
                      val.role === "patient" && (
                        <tr
                          key={val.id}
                          className={
                            val.follow_up === false
                              ? "border-l-4 border-blue-300 hover:bg-gray-200"
                              : "hover:bg-gray-200"
                          }
                        >
                          <td className="py-2 px-2 border-b border-b-gray-50">
                            <td className="py-2 px-2 border-b border-b-gray-50">
                              <div className="flex items-center text-sm">
                                <input
                                  value={val.id}
                                  checked={val.indoor_activity_access}
                                  onChange={(e) => handleCheckboxChange(e)}
                                  type="checkbox"
                                  className="size-4"
                                />
                              </div>
                            </td>
                          </td>
                          <td className="py-2 px-2 border-b border-b-gray-50">
                            <div className="flex items-center text-sm">
                              {val.case_number}
                            </div>
                          </td>
                          <td className="py-2 px-2 border-b border-b-gray-50 text-sm text-left">
                            {val?.first_name + " " + val?.last_name}
                          </td>
                          <td className="py-2 px-2 border-b border-b-gray-50 text-sm text-left ">
                            {val.personal_detail?.age}
                          </td>
                          <td className="py-2 px-2 border-b border-b-gray-50 text-sm text-left ">
                            {val.personal_detail?.weight + "kg"}
                          </td>
                          <td className="py-2 px-2 border-b border-b-gray-50 text-sm text-left ">
                            {val.phone_number}
                          </td>
                          {/* <td className="py-2 px-4 border-b border-b-gray-50">
                            <TdComponent
                              things={val.follow_up ? "Follow Up" : "New Case"}
                            />
                          </td>{" "} */}
                          <td className="py-2 px-2 border-b border-b-gray-50 text-sm text-left ">
                            {convertDate(val.created_at)}
                          </td>
                          <td className="py-2 px-4 border-b border-b-gray-50">
                            <div className="text-black font-medium ml-1 text-sm text-wrap ">
                              {val?.creator === "franchise"
                                ? `${val?.doctor?.doctor?.first_name} ${val?.doctor?.doctor?.last_name}`
                                : `${val?.doctor?.first_name} ${val?.doctor?.last_name}`}
                            </div>
                          </td>
                          <td className="py-2 px-2 flex gap-2 border-b border-b-gray-50">
                            {/* <Button
                              variant="outlined"
                              color="neutral"
                              onClick={() => handleInventory(val.case_number)}
                            >
                              Bill History
                            </Button> */}
                            <button
                              variant="outlined"
                              color="neutral"
                              className="font-medium p-1 text-white bg-green-600 border border-gray-300  text-sm rounded-md hover:text-green-600 hover:bg-white"
                              onClick={() =>
                                handleRedirect(val.id, val.case_number)
                              }
                            >
                              View Patient
                            </button>
                          </td>
                        </tr>
                      )
                    );
                  })
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

export default RecepAllUsers;
