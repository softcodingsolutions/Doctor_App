import axios from "axios";
import TdComponent from "../../../components/TdComponent";
import ThComponent from "../../../components/ThComponent";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import InsideLoader from "../../InsideLoader";

function FranchiseAllCustomers() {
  const navigate = useNavigate();
  const [getCustomers, setGetCustomers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [getParticularCustomer, setGetParticularCustomer] = useState([]);
  const mainId = localStorage.getItem("main_id");
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 8;

  const handleGetAllUsers = () => {
    axios
      .get("/api/v1/users")
      .then((res) => {
        const patients = res.data?.users?.filter(
          (user) =>
            user.role === "patient" &&
            user.creator === "franchise" &&
            user.created_by_id == mainId
        );
        console.log(patients);
        setGetCustomers(patients);
        setGetParticularCustomer(patients);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        alert(err.response?.data?.message);
        setLoading(false);
      });
  };

  const handleDiagnosis = (val) => {
    localStorage.setItem("userId", val);
    navigate(`../user-diagnosis/treatment/medicine`);
  };

  const handleAddUsers = () => {
    navigate("../../new-user/general-details");
  };

  const handleSearchTerm = (value) => {
    setSearchTerm(value);
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

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
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
      <div className="rounded-lg bg-card h-[93vh] bg-white">
        <div className="flex p-4 h-full flex-col space-y-4 text-lg">
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
          <div className="overflow-x-auto animate-fade-left animate-delay-75 shadow-gray-400 shadow-inner border rounded-md border-gray-100 animate-once animate-ease-out h-[75vh]">
            <table className="w-full min-w-[460px] z-0">
              <thead className="uppercase ">
                <tr className="bg-[#1F2937] text-white rounded-md">
                  <ThComponent
                    moreClasses={"rounded-tl-md rounded-bl-md"}
                    name="Case No."
                  />
                  <ThComponent name="Patient Name" />
                  <ThComponent name="Age" />
                  <ThComponent name="Weight" />
                  <ThComponent name="Mobile Number" />
                  <ThComponent name="City" />
                  <ThComponent name="Patient Created At" />
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
                        <tr key={val.id}>
                          <td className="py-2 px-4 border-b border-b-gray-50">
                            <div className="flex items-center text-sm">
                              {val.case_number}
                            </div>
                          </td>
                          <td className="py-3 px-4 border-b border-b-gray-50">
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
                            <TdComponent things={val.personal_detail?.age} />
                          </td>
                          <td className="py-3 px-4 border-b border-b-gray-50">
                            <TdComponent
                              things={val.personal_detail?.weight + "kg"}
                            />
                          </td>
                          <td className="py-3 px-4 border-b border-b-gray-50">
                            <TdComponent things={val.phone_number} />
                          </td>
                          <td className="py-3 px-4 border-b border-b-gray-50">
                            <TdComponent
                              things={
                                val.personal_detail?.city[0]?.toUpperCase() +
                                val.personal_detail?.city?.slice(1)
                              }
                            />
                          </td>
                          <td className="py-3 px-4 border-b border-b-gray-50">
                            <TdComponent things={convertDate(val.created_at)} />
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

export default FranchiseAllCustomers;
