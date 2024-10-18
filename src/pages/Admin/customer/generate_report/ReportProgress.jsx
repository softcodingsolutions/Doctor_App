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

function ReportProgress() {
  const navigate = useNavigate();
  const [getProgess, setGetProgress] = useState([]);
  const [showProgress, setShowProgress] = useState(true);
  const [loading, setLoading] = useState(true);
  const role = localStorage.getItem("role");
  const [userDetails, setUserDetails] = useState([]);
  const context = useOutletContext();
  const [viewBloodReport, setViewBloodReport] = useState(null);

  const handleDownloadReport = () => {
    const doc = new jsPDF();

    // Company Details with Custom Styles
    doc.setFont("Helvetica", "bold");
    doc.setFontSize(18);
    doc.text("Slim And Smile", 80, 15);
    doc.setFontSize(18);
    doc.setFont("Helvetica", "bold");
    doc.text("by Ahmedabad", 80, 22);
    const doctorEmailId = `Email Id: ${userDetails.doctor?.email}`;
    doc.setFontSize(12);
    doc.setFont("Helvetica", "normal");
    doc.text(doctorEmailId, 78, 30);

    // User Details with Custom Styles
    const userName = `Report of ${userDetails.first_name} ${userDetails.last_name} (${userDetails.case_number})`;
    const mobileNumber = `Phone Number: ${userDetails.phone_number} Email Id: ${userDetails.email}`;
    doc.setFontSize(20);
    doc.setFont("Helvetica", "bold");
    doc.text(userName, 60, 45);
    doc.setFont("Helvetica", "normal");
    doc.setFontSize(12);
    doc.text(mobileNumber, 55, 53);

    // Add a space before the table
    doc.text("", 14, 40); // Optional space for better readability

    // Define table columns and rows
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
      convertDate(val.date),
      val.treatment_package?.weight_reason +
        " - " +
        val.treatment_package?.package_name || "N/A",
      val.pre_weight + " kg",
      val.weight + " kg",
      compairWeight(val.pre_weight, val.weight),
      handleFormate(val.following_diet),
      handleFormate(val.following_exercise),
    ]);

    // Custom styles for the table
    const headStyles = {
      fillColor: "#1F2937",
      textColor: "white",
      fontSize: 10,
    };

    const bodyStyles = {
      fillColor: [255, 255, 255],
      textColor: [0, 0, 0],
      fontSize: 10,
    };

    // Adding alternating row colors for better readability
    const rowStyles = {
      fillColor: (rowIndex) =>
        rowIndex % 2 === 0 ? [240, 240, 240] : [255, 255, 255],
    };

    // Create the table
    doc.autoTable({
      head: [tableColumn],
      body: tableRows,
      startY: 60, // Adjusted startY to accommodate the details above
      theme: "grid",
      headStyles: headStyles,
      styles: bodyStyles,
      columnStyles: {
        0: { fillColor: [220, 220, 255] }, // Date Column Style
        1: { fillColor: [255, 220, 220] }, // Package Assigned Column Style
        2: { fillColor: [220, 255, 220] }, // Pre Weight Column Style
        3: { fillColor: [240, 240, 240] }, // Default for Current Weight
        4: {
          halign: "center", // Center align text
        },
      },
      didParseCell: function (data) {
        if (data.column.index === 4) {
          // Weight Status Column
          const preWeight = parseFloat(data.row.cells[2].raw.split(" ")[0]); // Get Pre Weight
          const currentWeight = parseFloat(data.row.cells[3].raw.split(" ")[0]); // Get Current Weight
          if (currentWeight <= preWeight) {
            data.cell.styles.fillColor = "#90D26D"; // Green
          } else if (currentWeight > preWeight) {
            data.cell.styles.fillColor = "#EF5A6F"; // Red
          }
        }
      },
      rowStyles: rowStyles,
    });

    // Calculate Total Weight Gain and Loss
    let totalWeightGain = 0;
    let totalWeightLoss = 0;

    getProgess.forEach((val) => {
      const preWeight = parseFloat(val.pre_weight);
      const currentWeight = parseFloat(val.weight);
      if (currentWeight > preWeight) {
        totalWeightGain += currentWeight - preWeight;
      } else {
        totalWeightLoss += preWeight - currentWeight;
      }
    });

    const totalEntries = getProgess.length;

    doc.setFont("Helvetica", "normal");
    doc.setFontSize(12);
    const totalWeightGainText = `Total Weight Gain: ${totalWeightGain} kg`;
    const totalWeightLossText = `Total Weight Loss: ${totalWeightLoss} kg`;
    const totalEntriesText = `Total Entries: ${totalEntries}`;

    doc.text(totalWeightGainText, 14, doc.lastAutoTable.finalY + 10);
    doc.text(totalWeightLossText, 14, doc.lastAutoTable.finalY + 17);
    doc.text(totalEntriesText, 14, doc.lastAutoTable.finalY + 24);

    const fileName = `all_progress_reports_${
      new Date().toISOString().split("T")[0]
    }.pdf`;
    doc.save(fileName);
  };

  const handleGetProgress = () => {
    axios
      .get(`/api/v1/progress_reports?user_id=${context[0]}`)
      .then((res) => {
        console.log(res.data?.user);
        console.log("Progress Report: ", res.data?.progress_reports);
        setUserDetails(res.data?.user);
        setGetProgress(res.data?.progress_reports);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        alert(err.response?.data?.message + "!");
      });
  };

  const handleAddProgress = (
    date,
    weight,
    preWeight,
    diet,
    exercise,
    blood_report
  ) => {
    const formData = new FormData();
    formData.append("progress_report[user_id]", context[0]);
    formData.append("progress_report[weight]", weight);
    formData.append("progress_report[date]", date);
    formData.append("progress_report[pre_weight]", preWeight);
    formData.append("progress_report[following_diet]", diet);
    formData.append("progress_report[following_exercise]", exercise);
    formData.append("progress_report[blood_report]", blood_report);

    axios
      .post("/api/v1/progress_reports", formData)
      .then((res) => {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Added!",
          text: "Your progress report has been added.",
          showConfirmButton: false,
          timer: 1500,
        });
        handleGetProgress();
      })
      .catch((err) => {
        Swal.fire(
          "Error",
          err.response?.data?.message || "Something went wrong",
          "error"
        );
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

  const getWeightStatus = (pre_weight, weight) => {
    return weight <= pre_weight ? "bg-[#90D26D]" : "bg-[#EF5A6F]";
  };

  const compairWeight = (pre_weight, weight) => {
    return Math.abs(pre_weight - weight);
  };

  const handleFormate = (value) => {
    if (value === true) {
      return "Yes";
    } else if (value === false) {
      return "No";
    }
  };

  useEffect(() => {
    handleGetProgress();
  }, [showProgress]);

  if (loading) {
    return <InsideLoader />;
  }

  return (
    <div className="w-full p-2">
      {userDetails?.treatment_packages?.length > 0 ? (
        <div className="flex px-4 py-3 h-[75vh] flex-col space-y-4">
          <div className="flex items-center justify-between">
            <div>
              {(role === "super_admin" ||
                role === "franchise" ||
                role === "doctor" ||
                role === "patient") && (
                <AddNewProgresReport
                  handleApi={handleAddProgress}
                  name="Add New Report"
                  title="Add Report"
                  progress_weight="Weight"
                  progress_date="Date"
                  weight_reason="Weight Reason"
                  blood_report="Blood Report"
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

          <div className="animate-fade-left animate-delay-75 shadow-gray-400 shadow-inner border rounded-md border-gray-100 animate-once animate-ease-out overflow-auto h-[60vh] ">
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
                {getProgess.length === 0 ? (
                  <tr>
                    <th
                      className="uppercase tracking-wide font-medium pt-[13rem] text-lg"
                      colSpan={8}
                    >
                      No Progess Report Found!
                    </th>
                  </tr>
                ) : (
                  getProgess?.map((val, index) => {
                    return (
                      <tr key={val.id}>
                        <td className="py-2 px-2 border-b text-xs w-28 border-b-gray-50">
                          <TdComponent things={convertDate(val.date)} />
                        </td>
                        <td className="py-2 px-2 border-b text-xs border-b-gray-50">
                          <TdComponent
                            things={
                              val.treatment_package?.weight_reason +
                              " - " +
                              val.treatment_package?.package_name
                            }
                          />
                        </td>
                        <td className="py-2 px-2 border-b text-xs border-b-gray-50">
                          <TdComponent things={val.pre_weight + " kg"} />
                        </td>
                        <td className="py-2 px-2 border-b text-xs border-b-gray-50">
                          <TdComponent things={val.weight + " kg"} />
                        </td>
                        <td
                          className={`py-2 px-2 border-b text-xs border-b-gray-50 ${getWeightStatus(
                            val.pre_weight,
                            val.weight
                          )}`}
                        >
                          <TdComponent
                            things={compairWeight(val.pre_weight, val.weight)}
                          />
                        </td>

                        <td className="py-2 px-2 border-b text-xs border-b-gray-50 w-10">
                          <TdComponent
                            things={handleFormate(val.following_diet)}
                          />
                        </td>
                        <td className="py-2 px-2 border-b text-xs border-b-gray-50 w-10">
                          <TdComponent
                            things={handleFormate(val.following_exercise)}
                          />
                        </td>
                        <td className="py-2 px-2 border-b text-xs border-b-gray-50">
                          {val.blood_report ? (
                            <button
                              className="text-blue-500 hover:underline"
                              onClick={() => window.open(val.blood_report)}
                            >
                              VIEW
                            </button>
                          ) : (
                            <p>No Report</p>
                          )}
                        </td>
                        <td className="py-2 px-2 border-b text-xs border-b-gray-50 flex gap-5">
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
        </div>
      ) : (
        <div className="flex justify-center">
          Treatment Package has been not assigned yet
        </div>
      )}
    </div>
  );
}

export default ReportProgress;
