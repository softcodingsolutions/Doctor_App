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
import { jsPDF } from "jspdf";
import "jspdf-autotable";
import { borderRadius, fontSize } from "@mui/system";

function ReportProgress() {
  const navigate = useNavigate();
  const [getProgess, setGetProgress] = useState([]);
  const [showProgress, setShowProgress] = useState(true);
  const [loading, setLoading] = useState(true);
  const role = localStorage.getItem("role");
  const context = useOutletContext();
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 4;

  const paginateCustomers = () => {
    if (showProgress) {
      const indexOfLastRow = currentPage * rowsPerPage;
      const indexOfFirstRow = indexOfLastRow - rowsPerPage;
      return getProgess.slice(indexOfFirstRow, indexOfLastRow);
    }
  };

  const totalPages = Math.ceil(getProgess.length / rowsPerPage);

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

  const handleDownloadReport = () => {
    const doc = new jsPDF();

    // Title of the document
    doc.text("All Progress Reports", 14, 15);

    const tableColumn = [
      "Date",
      "Package Assigned",
      "Pre Weight",
      "Current Weight",
      "Weight Status",
      "Following Diet",
      "Following Exercise",
    ];

    const tableRows = getProgess.map((val) => [
      val.date,
      val.treatment_package?.weight_reason +
        " - " +
        val.treatment_package?.package_name || "N/A",
      "N/A",
      `${val.weight} kg`,
      "N/A",
      "N/A",
      "N/A",
    ]);

    // Custom styles for the table
    const headStyles = {
      fillColor: "#1F2937",
      textColor: "white",
      border: "1px solid",
      borderRadius: "5px",
      fontSize: 10,
    };

    const bodyStyles = {
      fillColor: [255, 255, 255],
      textColor: [0, 0, 0],
      fontSize: 10,
    };

    doc.autoTable({
      head: [tableColumn],
      body: tableRows,
      startY: 25,
      theme: "grid",
      headStyles: headStyles,
      styles: bodyStyles,
      columnStyles: {
        0: { fillColor: [220, 220, 255] },
        1: { fillColor: [255, 220, 220] },
        2: { fillColor: [220, 255, 220] },
      },
    });

    // Save the PDF with a timestamp
    const fileName = `all_progress_reports_${
      new Date().toISOString().split("T")[0]
    }.pdf`;
    doc.save(fileName);
  };

  const handleGetProgress = () => {
    axios
      .get(`/api/v1/progress_reports?user_id=${context[0]}`)
      .then((res) => {
        console.log("Progress Report: ", res.data?.progress_reports);
        setGetProgress(res.data?.progress_reports);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        alert(err.response?.data?.message + "!");
      });
  };

  const handleAddProgress = (date, weight ,pre_weight) => {
    const formData = new FormData();

    formData.append("progress_report[user_id]", context[0]);
    formData.append("progress_report[weight]", weight);
    formData.append("progress_report[pre_weight]",pre_weight)
    formData.append("progress_report[date]", date);

    axios
      .post("api/v1/progress_reports", formData)
      .then((res) => {
        console.log(res);
        if (res.data) {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Added!",
            text: "Your progress report has been added.",
            showConfirmButton: false,
            timer: 1500,
          });
        }
        handleGetProgress();
      })
      .catch((err) => {
        console.log(err);
        alert(err.response?.data?.message + "!");
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

  const feedbackReport = (id, val) => {
    const formData = new FormData();
    formData.append("progress_report[progress_report]", val);
    axios
      .put(`/api/v1/progress_reports/${id}`, formData)
      .then((res) => {
        console.log(res);
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Saved!",
          text: "Your progress report has been saved.",
          showConfirmButton: false,
          timer: 1500,
        });
        handleGetProgress();
      })
      .catch((err) => {
        console.log(err);
        alert(err.response?.data?.message + "!");
      });
  };

  const handleRedirect = () => {
    navigate("/admin/patients/user-diagnosis/generate-report");
  };

  useEffect(() => {
    handleGetProgress();
  }, [showProgress]);

  if (loading) {
    return <InsideLoader />;
  }

  return (
    <div className="w-full p-2">
      <div className="flex px-4 py-3 h-[75vh] flex-col space-y-4">
        <div className="flex items-center justify-between">
          <div>
            {(role === "super_admin" ||
              role === "franchise" ||
              role === "doctor") && (
              <AddNewProgresReport
                handleApi={handleAddProgress}
                name="Add New Report"
                title="Add Report"
                progress_weight="Weight"
                progress_date="Date"
                weight_reason="Weight Reason"
              />
            )}
          </div>
          <div>
            <button
              onClick={() => handleDownloadReport()}
              className="font-semibold  border border-gray-300 p-1 rounded-md hover:bg-[#1F2937] hover:text-white"
            >
              Download All
            </button>
          </div>
        </div>

        {/* progress */}
        {showProgress && (
          <div className="animate-fade-left animate-delay-75 shadow-gray-400 shadow-inner border rounded-md border-gray-100 animate-once animate-ease-out overflow-auto ">
            <table className="w-full min-w-[460px] z-0">
              <thead className="uppercase ">
                <tr className="bg-[#1F2937] text-white rounded-md">
                  <ThComponent
                    name="Date"
                    moreClasses={"rounded-tl-md rounded-bl-md"}
                  />
                  <ThComponent name="Package Assigned" />
                  <ThComponent name="Pre Weight" />
                  <ThComponent name="Current Weight" />
                  <ThComponent name="Weight Status" />
                  <ThComponent name=" Diet" />
                  <ThComponent name="Exercise" />
                  <ThComponent name="Blood Report" />
                  <ThComponent moreClasses={"rounded-tr-md rounded-br-md"} />
                </tr>
              </thead>
              <tbody>
                {paginateCustomers().length === 0 ? (
                  <tr>
                    <th
                      className="uppercase tracking-wide font-medium pt-[13rem] text-lg"
                      colSpan={8}
                    >
                      No Progess Report Found!
                    </th>
                  </tr>
                ) : (
                  paginateCustomers()?.map((val, index) => {
                    return (
                      <tr key={val.id}>
                        <td className="py-3 px-4 border-b text-xs border-b-gray-50">
                          <TdComponent things={convertDate(val.date)} />
                        </td>
                        <td className="py-3 px-4 border-b text-xs border-b-gray-50">
                          <TdComponent things={val.weight + " kg"} />
                        </td>
                        <td className="py-3 px-4 border-b text-xs border-b-gray-50">
                          <TdComponent
                            things={
                              val.treatment_package?.weight_reason +
                              " - " +
                              val.treatment_package?.package_name
                            }
                          />
                        </td>
                      
                        <td className="py-3 px-4 border-b text-xs border-b-gray-50 flex gap-5">
                          {val.progress_report === null && (
                            <>
                              <TdComponent
                                things={
                                  <button
                                    onClick={() => feedbackReport(val.id, true)}
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
                                      feedbackReport(val.id, false)
                                    }
                                    className="font-semibold text-red-600 border border-gray-300 p-1 rounded-md hover:bg-[#cd2f03] hover:text-white"
                                  >
                                    <FaRegThumbsDown size={20} />
                                  </button>
                                }
                              />
                            </>
                          )}

                          {val.progress_report && (
                            <TdComponent
                              things={
                                <button className="font-semibold text-blue-600 border border-gray-300 p-1 rounded-md hover:bg-[#03c41a] hover:text-white">
                                  <FaRegThumbsUp size={20} />
                                </button>
                              }
                            />
                          )}

                          {val?.progress_report === false && (
                            <TdComponent
                              things={
                                <button className="font-semibold text-red-600 border border-gray-300 p-1 rounded-md hover:bg-[#cd2f03] hover:text-white">
                                  <FaRegThumbsDown size={20} />
                                </button>
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
    </div>
  );
}

export default ReportProgress;
