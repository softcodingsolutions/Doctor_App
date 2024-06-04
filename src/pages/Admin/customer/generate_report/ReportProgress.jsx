import { useEffect, useState } from "react";
import TdComponent from "../../../../components/TdComponent";
import ThComponent from "../../../../components/ThComponent";
import { useOutletContext } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import AddNewProgresReport from "../../../../components/Admin/AddNewProgresReport";

function ReportProgress() {
  const [getProgess, setGetProgress] = useState([]);
  const [getQues, setGetQues] = useState([]);
  const [showQues, setShowQues] = useState(false);
  const [showComplain, setShowComplain] = useState(false);
  const [showProgress, setShowProgress] = useState(true);
  const context = useOutletContext();
  console.log("asdasd", context[1]);

  const handleGetQues = () => { 
    const data =
      context[1].personal_detail?.user_selected_questions_one?.concat(
        context[1].personal_detail?.user_selected_questions_two
      );

    setGetQues(data);
  };

  console.log(getQues);
  //   const handleGetProgress = () => {
  //     axios
  //       .get("/api/v1/progress")
  //       .then((res) => {
  //         console.log(res.data);
  //         setGetProgress(res.data?.progress);
  //       })
  //       .catch((err) => {
  //         console.log(err);
  //         alert(err.message);
  //       });
  //   };

  const handleAddProgress = (
    progress_name,
    progress_date,
    progress_package
  ) => {
    const formData = new FormData();
    formData.append("package[weight]", progress_name);
    formData.append("package[date]", progress_date);
    formData.append("package[package]", progress_package);
    axios
      .post("api/v1/progress", formData)
      .then((res) => {
        console.log(res);
        if (res.data) {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Added!",
            text: "Your progress has been added.",
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

  useEffect(() => {
    // handleGetProgress();
    handleGetQues();
  }, [showProgress, showQues, showComplain]);

  return (
    <div className="w-full p-2">
      <div className="rounded-lg bg-card h-[85vh] bg-white">
        <div className="flex px-4 py-3 h-full flex-col space-y-4">
          <div className="flex items-center justify-between">
            <div className="font-semibold text-xl">
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
                Progess Report List
              </button>
            </div>
            <div className="flex gap-2">
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
            <AddNewProgresReport
              handleApi={handleAddProgress}
              name="Add New Report"
              title="Add Report"
              progress_weight="Weight"
              progress_date="Date"
              progress_package="Package Assigned"
            />
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
                    <ThComponent />
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
                            <TdComponent things={val.name} />
                          </td>
                          <td className="py-3 px-4 border-b border-b-gray-50">
                            <TdComponent things={val.gender} />
                          </td>
                          <td className="py-3 px-4 border-b border-b-gray-50">
                            <TdComponent things={val.comments} />
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
                    <ThComponent
                      name="Complain Details"
                      moreClasses={"rounded-tr-md rounded-br-md"}
                    />
                  </tr>
                </thead>
                <tbody>
                  {context[1].personal_detail?.complaints?.length === 0 ? (
                    <tr>
                      <th
                        className="uppercase tracking-wide font-medium pt-[13rem] text-lg"
                        colSpan={8}
                      >
                        No Complains Found!
                      </th>
                    </tr>
                  ) : (
                    context[1].personal_detail?.complaints?.map(
                      (val, index) => {
                        return (
                          <tr key={val.id}>
                            <td className="py-2 px-4 border-b border-b-gray-50">
                              <div className="flex items-center">
                                {index + 1}
                              </div>
                            </td>
                            <td className="py-3 px-4 border-b border-b-gray-50">
                              <TdComponent things={val.details} />
                            </td>
                          </tr>
                        );
                      }
                    )
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
                  {getQues.length === 0 ? (
                    <tr>
                      <th
                        className="uppercase tracking-wide font-medium pt-[13rem] text-lg"
                        colSpan={8}
                      >
                        No Questions Found!
                      </th>
                    </tr>
                  ) : (
                    getQues.map((val, index) => {
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
