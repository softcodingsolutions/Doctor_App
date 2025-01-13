import { useEffect, useState } from "react";
import TdComponent from "../../../../components/TdComponent";
import ThComponent from "../../../../components/ThComponent";
import { useOutletContext } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import AddNewProgresReport from "../../../../components/Admin/AddNewProgresReport";
import { FaRegThumbsUp } from "react-icons/fa";
import { FaRegThumbsDown } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";
import InsideLoader from "../../../InsideLoader";

const ProgressComplains = () => {
  const [getComplains, setGetComplains] = useState([]);
  const [showComplain, setShowComplain] = useState(false);
  const [loading, setLoading] = useState(true);
  const role = localStorage.getItem("role");
  const context = useOutletContext();
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 6;

  const paginateCustomers = () => {
    const indexOfLastRow = currentPage * rowsPerPage;
    const indexOfFirstRow = indexOfLastRow - rowsPerPage;
    return getComplains.slice(indexOfFirstRow, indexOfLastRow);
  };

  const totalPages = Math.ceil(getComplains.length / rowsPerPage);

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

  const feedbackComplains = (id, isEffective) => {
    const formData = new FormData();
    formData.append("users_complain[is_solved]", isEffective);

    axios
      .put(`/api/v1/users_complains/${id}`, formData)
      .then((res) => {
        console.log(res);
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Saved!",
          text: "Your progress on complains has been saved.",
          showConfirmButton: false,
          timer: 1500,
        });
        handleGetComplains();
      })
      .catch((err) => {
        console.log(err);
        alert(err.response?.data?.message + "!");
      });
  };

  const handleGetComplains = () => {
    axios
      .get(`/api/v1/users_complains?user_id=${context[1]?.id}`)
      .then((res) => {
        console.log("User Complains: ", res.data?.complains);
        setGetComplains(res.data?.complains);
        setShowComplain(true);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        alert(err.response?.data?.message + "!");
      });
  };

  useEffect(() => {
    handleGetComplains();
  }, []);

  return (
    <div className="w-full">
      {showComplain && (
        <div className="animate-fade-left animate-delay-75  rounded-md border-gray-100 animate-once animate-ease-out overflow-auto h-[90%]">
          <table className="w-full min-w-[460px] z-0">
            <thead className="uppercase ">
              <tr className="bg-[#1F2937] text-white rounded-md">
                <ThComponent
                  moreClasses={"rounded-tl-md rounded-bl-md"}
                  name="No."
                />
                <ThComponent name="Complain Details" />
                <ThComponent moreClasses={"rounded-tr-md rounded-br-md"} />
              </tr>
            </thead>
            <tbody>
              {paginateCustomers()?.length === 0 ? (
                <tr>
                  <th
                    className="uppercase tracking-wide font-medium pt-[13rem] text-lg"
                    colSpan={8}
                  >
                    No Complains Found!
                  </th>
                </tr>
              ) : (
                paginateCustomers()?.map((val, index) => {
                  return (
                    <tr key={val.id}>
                      <td className="py-2 px-4 border-b border-b-gray-50">
                        <div className="flex items-center">
                          {index + 1 + (currentPage - 1) * rowsPerPage}
                        </div>
                      </td>
                      <td className="py-3 px-4 border-b border-b-gray-50">
                        <TdComponent things={val.complain} />
                      </td>
                      <td className="py-3 px-4 border-b border-b-gray-50 flex gap-5">
                        {val.is_solved === null && (
                          <>
                            <TdComponent
                              things={
                                <button
                                  onClick={() =>
                                    feedbackComplains(val.id, true)
                                  }
                                  className="font-semibold text-blue-600 border border-gray-300 p-1 rounded-md hover:bg-[#03c41a] hover:text-white"
                                >
                                  <FaRegThumbsUp size={20} />
                                </button>
                              }
                            />
                            <TdComponent
                              things={
                                <button
                                  onClick={() =>
                                    feedbackComplains(val.id, false)
                                  }
                                  className="font-semibold text-red-600 border border-gray-300 p-1 rounded-md hover:bg-[#cd2f03] hover:text-white"
                                >
                                  <FaRegThumbsDown size={20} />
                                </button>
                              }
                            />
                          </>
                        )}
                        {val.is_solved === true && (
                          <TdComponent
                            things={
                              <div className="font-semibold text-blue-600 border border-gray-300 p-1 rounded-md">
                                <FaRegThumbsUp size={20} />
                              </div>
                            }
                          />
                        )}
                        {val.is_solved === false && (
                          <TdComponent
                            things={
                              <div className="font-semibold text-red-600 border border-gray-300 p-1 rounded-md">
                                <FaRegThumbsDown size={20} />
                              </div>
                            }
                          />
                        )}
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      )}
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
  );
};

export default ProgressComplains;
