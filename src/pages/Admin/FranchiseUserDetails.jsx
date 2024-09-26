import { useState, useEffect } from "react";
import ThComponent from "../../components/ThComponent";
// import TdComponent from "../TdComponent";
import { useNavigate } from "react-router-dom";
import { useOutletContext } from "react-router-dom";
import axios from "axios";

function FranchiseUserDetails() {
  const franchiseId = localStorage.getItem("viewDetails");
  const [franchiseName, setFranchiseName] = useState("");
  const context = useOutletContext();
  const navigate = useNavigate();
  const [getFranchiseUsers, setGetFranchiseUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 7;

  const paginateCustomers = () => {
    const indexOfLastRow = currentPage * rowsPerPage;
    const indexOfFirstRow = indexOfLastRow - rowsPerPage;
    return getFranchiseUsers.slice(indexOfFirstRow, indexOfLastRow);
  };

  const totalPages = Math.ceil(getFranchiseUsers.length / rowsPerPage);

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

  const handleDiagnosis = (val) => {
    localStorage.setItem("userId", val);
    navigate(`/admin/patients/user-diagnosis/questions`);
  };

  const handleInventory = (val, caseNumber) => {
    localStorage.setItem("userId", val);
    localStorage.setItem("caseNumber", caseNumber);
    navigate(`/admin/patients/customer-details/progress-questions`);
  };

  const handleGetFranchiseUsers = () => {
    axios
      .get(`/api/v1/users/find_doc_franchise_users?id=${franchiseId}`)
      .then((res) => {
        console.log("Franchise Users", res?.data?.users);
        setGetFranchiseUsers(res?.data?.users);
        setFranchiseName(res?.data?.users[0]?.doctor?.first_name);
        // setPossGroup(res?.data?.users[0]?.possibility_group);
      })
      .catch((err) => {
        console.log(err);
        alert(err.response?.data?.message + "!");
      });
  };

  useEffect(() => {
    handleGetFranchiseUsers();
  }, []);

  return (
    <div className="flex w-full ">
      <div className="w-full h-screen hidden sm:block sm:w-20 xl:w-60 flex-shrink-0">
        .
      </div>
      <div className=" h-screen flex-grow overflow-auto flex flex-wrap content-start p-2">
        <div className="w-fit p-1">
          <button
            onClick={context[0]}
            type="button"
            className="absolute end-5 top-8 sm:hidden hover:scale-110 w-fit"
          >
            <img
              src={`https://assets.codepen.io/3685267/res-react-dash-sidebar-open.svg`}
              alt=""
            />
          </button>
        </div>
        <div className="rounded-lg bg-card h-[95vh] w-full bg-white">
          <div className="flex px-2 py-5 h-full flex-col space-y-4">
            <div className="flex ">
              <div className="flex flex-col justify-start w-[80%]">
                <div className="font-semibold text-xl">Franchise User List</div>
                <div className="font-medium text-md text-gray-700">
                  Franchise Name: {franchiseName}
                </div>
              </div>
         
            </div>
            <div className="overflow-x-auto animate-fade-left animate-delay-75  shadow-inner border rounded-md border-gray-100 animate-once animate-ease-out h-[80vh]">
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
                      <td
                        colSpan={8}
                        className="pt-[16rem] text-xl text-center"
                      >
                        No Customers Found!
                      </td>
                    </tr>
                  ) : (
                    paginateCustomers().map((val) => (
                      <tr key={val.id} className={"hover:bg-gray-200"}>
                        <td className="py-3 px-2 border-b border-b-gray-50 text-sm">
                          {val.case_number}
                        </td>
                        <td className="py-3 px-2 border-b border-b-gray-50 text-sm">
                          {val.first_name} {val.last_name}
                        </td>
                        <td className="py-3 px-2 border-b border-b-gray-50 text-sm">
                          {val.personal_detail?.age}
                        </td>
                        <td className="py-3 px-2 border-b border-b-gray-50 text-sm">
                          {val.personal_detail?.weight} kg
                        </td>
                        <td className="py-3 px-2 border-b border-b-gray-50 text-sm">
                          {val.phone_number}
                        </td>
                        <td className="py-3 px-2 border-b border-b-gray-50 text-sm">
                          {val.follow_up ? "Follow Up" : "New Case"}
                        </td>
                        <td className="py-3 px-2 border-b border-b-gray-50 text-sm">
                          {convertDate(val.created_at)}
                        </td>
                        <td className=" py-3 px-2 border-b gap-1 flex border-b-gray-50">
                          <button
                            onClick={() => handleDiagnosis(val.id)}
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
    </div>
  );
}

export default FranchiseUserDetails;
