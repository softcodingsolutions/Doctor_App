import { useEffect, useState } from "react";
import TdComponent from "../../../../components/TdComponent";
import ThComponent from "../../../../components/ThComponent";
import { useOutletContext } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import AddNewProgresReport from "../../../../components/Admin/AddNewProgresReport";
import { FaRegThumbsUp } from "react-icons/fa";
import { FaRegThumbsDown } from "react-icons/fa6";

function ReportProgress() {
  const [getProgess, setGetProgress] = useState([]);
  const [getQues, setGetQues] = useState([]);
  const [getComplains, setGetComplains] = useState([]);
  const [showQues, setShowQues] = useState(false);
  const [showComplain, setShowComplain] = useState(false);
  const [showProgress, setShowProgress] = useState(true);
  const role = localStorage.getItem("role");
  const context = useOutletContext();

  const handleGetQues = async () => {
    const data =
      await context[1].personal_detail?.user_selected_questions_one?.concat(
        context[1].personal_detail?.user_selected_questions_two
      );

    console.log("User Questions: ", data);

    setGetQues(data);
  };
  console.log("User lyo", context[1]);

  const handleGetComplains = () => {
    const data = context[1].personal_detail?.complaints?.selected_complains;
    const complainsArray = data.map((complain) => ({
      details: complain,
      isEffective: null,
    }));
    console.log("Complains: ", complainsArray);
    setGetComplains(complainsArray);
  };

  const handleGetProgress = () => {
    axios
      .get(`/api/v1/progress_reports?user_id=${context[0]}`)
      .then((res) => {
        console.log("Progress Report: ", res.data.progress_reports);
        setGetProgress(res.data.progress_reports);
      })
      .catch((err) => {
        console.log(err);
        alert(err.message);
      });
  };

  const handleAddProgress = (date, weight) => {
    const formData = new FormData();

    formData.append("progress_report[user_id]", context[0]);
    formData.append("progress_report[weight]", weight);
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
        alert(err.message);
      });
  };

  const feedbackReport = (id, val) => {
    const formData = new FormData();
    formData.append("progress_report[progress_report]", val);
    axios
      .put(`/api/v1/progress_reports/${id}`, formData)
      .then((res) => {
        console.log(res);
        handleGetProgress();
      })
      .catch((err) => {
        console.log(err);
        alert(err.message);
      });
  };

  const feedbackQuestions = (val) => {
    console.log(val);
  };

  const feedbackComplains = (id, isEffective) => {
    const updatedComplains = getComplains.map((complain, index) => ({
      ...complain,
      isEffective: index === id ? isEffective : complain.isEffective,
    }));

    const formData = new FormData();
    formData.append(
      "personal_detail[complaints]",
      JSON.stringify(updatedComplains)
    );

    console.log(updatedComplains);

    axios
      .put(
        `/api/v2/users/update_personal_details?user_id=${context[1]?.id}`,
        formData
      )
      .then((res) => {
        console.log(res);
        handleGetComplains();
      })
      .catch((err) => {
        console.log(err);
        alert(err.message);
      });
  };

  useEffect(() => {
    handleGetProgress();
    handleGetComplains();
    handleGetQues();
  }, [showProgress, showQues, showComplain]);

  return (
    <div className="w-full p-2">
      <div className="rounded-lg bg-card h-[85vh] bg-white">
        <div className="flex px-4 py-3 h-full flex-col space-y-4">
          <div className="flex items-center justify-between">
            <div className="font-semibold text-xl">
              <div className="font-semibold text-xl">Progress Report</div>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => {
                  setShowQues(false);
                  setShowComplain(false);
                  setShowProgress(true);
                }}
                className={`px-3 py-1.5 border-[1.5px] rounded-md ${
                  showProgress
                    ? "scale-105 bg-gray-700 text-white"
                    : "bg-gray-50"
                } hover:scale-105 border-x-gray-300`}
              >
                Report
              </button>
              <button
                onClick={() => {
                  setShowQues(true);
                  setShowComplain(false);
                  setShowProgress(false);
                }}
                className={`px-3 py-1.5 border-[1.5px] rounded-md ${
                  showQues ? "scale-105 bg-gray-700 text-white" : "bg-gray-50"
                } hover:scale-105 border-x-gray-300`}
              >
                Questions
              </button>
              <button
                onClick={() => {
                  setShowQues(false);
                  setShowComplain(true);
                  setShowProgress(false);
                }}
                className={`px-3 py-1.5 rounded-md ${
                  showComplain
                    ? "scale-105 bg-gray-700 text-white"
                    : "bg-gray-50"
                } hover:scale-105  border-x-gray-300 border-[1.5px]`}
              >
                Complains
              </button>
            </div>
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
          {showProgress && (
            <div className="animate-fade-left animate-delay-75 shadow-gray-400 shadow-inner border rounded-md border-gray-100 animate-once animate-ease-out overflow-auto h-[93%]">
              <table className="w-full min-w-[460px] z-0">
                <thead className="uppercase ">
                  <tr className="bg-[#1F2937] text-white rounded-md">
                    <ThComponent
                      moreClasses={"rounded-tl-md rounded-bl-md"}
                      name="No."
                    />
                    <ThComponent name="Date" />
                    <ThComponent name="Weight" />
                    <ThComponent name="Package Assigned" />
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
                    getProgess.map((val, index) => {
                      return (
                        <tr key={val.id}>
                          <td className="py-2 px-4 border-b border-b-gray-50">
                            <div className="flex items-center">{index + 1}</div>
                          </td>
                          <td className="py-3 px-4 border-b border-b-gray-50">
                            <TdComponent things={val.date} />
                          </td>
                          <td className="py-3 px-4 border-b border-b-gray-50">
                            <TdComponent things={val.weight + " kg"} />
                          </td>
                          <td className="py-3 px-4 border-b border-b-gray-50">
                            <TdComponent
                              things={
                                val.treatment_package?.weight_reason +
                                " - " +
                                val.treatment_package?.package_name
                              }
                            />
                          </td>
                          <td className="py-3 px-4 border-b border-b-gray-50 flex gap-5">
                            {val.progress_report === null && (
                              <>
                                <TdComponent
                                  things={
                                    <button
                                      onClick={() =>
                                        feedbackReport(val.id, true)
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

                            {val.progress_report === false && (
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

          {showComplain && (
            <div className="animate-fade-left animate-delay-75 shadow-gray-400 shadow-inner border rounded-md border-gray-100 animate-once animate-ease-out overflow-auto h-[93%]">
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
                  {getComplains?.length === 0 ? (
                    <tr>
                      <th
                        className="uppercase tracking-wide font-medium pt-[13rem] text-lg"
                        colSpan={8}
                      >
                        No Complains Found!
                      </th>
                    </tr>
                  ) : (
                    getComplains.map((val, index) => {
                      return (
                        <tr key={val.id}>
                          <td className="py-2 px-4 border-b border-b-gray-50">
                            <div className="flex items-center">{index + 1}</div>
                          </td>
                          <td className="py-3 px-4 border-b border-b-gray-50">
                            <TdComponent things={val.details} />
                          </td>
                          <td className="py-3 px-4 border-b border-b-gray-50 flex gap-5">
                            <TdComponent
                              things={
                                <button
                                  onClick={() => feedbackComplains(index, true)}
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
                                    feedbackComplains(index, false)
                                  }
                                  className="font-semibold text-red-600 border border-gray-300 p-1 rounded-md hover:bg-[#cd2f03] hover:text-white"
                                >
                                  <FaRegThumbsDown size={20} />
                                </button>
                              }
                            />
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>
          )}

          {showQues && (
            <div className="animate-fade-left animate-delay-75 shadow-gray-400 shadow-inner border rounded-md border-gray-100 animate-once animate-ease-out overflow-auto h-[93%]">
              <table className="w-full min-w-[460px] z-0">
                <thead className="uppercase ">
                  <tr className="bg-[#1F2937] text-white rounded-md">
                    <ThComponent
                      moreClasses={"rounded-tl-md rounded-bl-md"}
                      name="No."
                    />
                    <ThComponent name="In English" />
                    <ThComponent name="In Hindi" />
                    <ThComponent name="In Gujarati" />
                    <ThComponent moreClasses={"rounded-tr-md rounded-br-md"} />
                  </tr>
                </thead>
                <tbody>
                  {getQues?.length === 0 ? (
                    <tr>
                      <th
                        className="uppercase tracking-wide font-medium pt-[13rem] text-lg"
                        colSpan={8}
                      >
                        No Questions Found!
                      </th>
                    </tr>
                  ) : (
                    getQues?.map((val, index) => {
                      return (
                        <tr key={val.id}>
                          <td className="py-2 px-4 border-b border-b-gray-50">
                            <div className="flex items-center">{index + 1}</div>
                          </td>
                          <td className="py-3 px-4 border-b border-b-gray-50">
                            <TdComponent things={val.question_in_english} />
                          </td>
                          <td className="py-3 px-4 border-b border-b-gray-50">
                            <TdComponent things={val.question_in_hindi} />
                          </td>
                          <td className="py-3 px-4 border-b border-b-gray-50">
                            <TdComponent things={val.question_in_gujarati} />
                          </td>
                          {val.progress_report === null && (
                            <td className="py-3 px-4 border-b border-b-gray-50 flex gap-5">
                              <TdComponent
                                things={
                                  <button className="font-semibold text-blue-600 border border-gray-300 p-1 rounded-md hover:bg-[#03c41a] hover:text-white">
                                    <FaRegThumbsUp size={20} />
                                  </button>
                                }
                              />
                              <TdComponent
                                things={
                                  <button className="font-semibold text-red-600 border border-gray-300 p-1 rounded-md hover:bg-[#cd2f03] hover:text-white">
                                    <FaRegThumbsDown size={20} />
                                  </button>
                                }
                              />
                            </td>
                          )}
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ReportProgress;
