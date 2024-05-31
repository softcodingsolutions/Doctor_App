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
  const [getComplain, setGetComplain] = useState([]);
  const [showQues, setShowQues] = useState(false);
  const [showComplain, setShowComplain] = useState(false);
  const [showProgress, setShowProgress] = useState(true);
  const context = useOutletContext();
  console.log(context[0]);

  const handleGetComplain = () => {
    axios
      .get("/api/v1/complaints")
      .then((res) => {
        console.log(res.data);
        setGetComplain(res.data);
      })
      .catch((err) => {
        console.log(err);
        alert(err.message);
      });
  };

  const handleGetQues = () => {
    let getQuesPart1, getQuesPart2;

    axios
      .get("/api/v1/questions/part1")
      .then((res) => {
        console.log("Part1", res.data);
        getQuesPart1 = res.data;
      })
      .catch((err) => {
        console.log(err);
        alert(err.message);
      });

    axios
      .get("/api/v1/questions/part2")
      .then((res) => {
        console.log("Part2", res.data);
        getQuesPart2 = res.data;
      })
      .catch((err) => {
        console.log(err);
        alert(err.message);
      });
  };

  const handleGetProgress = () => {
    axios
      .get("/api/v1/progress")
      .then((res) => {
        console.log(res.data);
        setGetProgress(res.data?.progress);
      })
      .catch((err) => {
        console.log(err);
        alert(err.message);
      });
  };

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
    handleGetComplain();
    handleGetProgress();
    handleGetQues();
  }, [showProgress, showQues, showComplain]);

  return (
    <div className="w-full p-2">
      <div className="rounded-lg bg-card h-[85vh] bg-white">
        <div className="flex px-4 py-3 h-full flex-col space-y-4">
          <div className="flex items-center justify-between">
            <div className="font-semibold text-xl">Progess Report List</div>
            <div className="flex gap-2">
              <button className="border p-1 rounded-md border-gray-300">Questions</button>
              <button className="border p-1 rounded-md border-gray-300">Complains</button>
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
                    <ThComponent name="Complain Details" />
                    <ThComponent />
                    <ThComponent moreClasses={"rounded-tr-md rounded-br-md"} />
                  </tr>
                </thead>
                <tbody>
                  {getComplain.length === 0 ? (
                    <tr>
                      <th
                        className="uppercase tracking-wide font-medium pt-[13rem] text-lg"
                        colSpan={8}
                      >
                        No Complains Found!
                      </th>
                    </tr>
                  ) : (
                    getComplain.map((val, index) => {
                      return (
                        <tr key={val.id}>
                          <td className="py-2 px-4 border-b border-b-gray-50">
                            <div className="flex items-center">{index + 1}</div>
                          </td>
                          <td className="py-3 px-4 border-b border-b-gray-50">
                            <TdComponent things={val.details} />
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>
          )}

          {/* {showQues && (
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
                    <ThComponent name="For" />
                    <ThComponent />
                    <ThComponent />
                    <ThComponent moreClasses={"rounded-tr-md rounded-br-md"} />
                  </tr>
                </thead>
                <tbody>
                  {showPart1 ? (
                    getQuestionsPart1.length === 0 ? (
                      <tr>
                        <th
                          className="uppercase tracking-wide font-medium pt-[13rem] text-lg"
                          colSpan={8}
                        >
                          No Questions found in Part 1!
                        </th>
                      </tr>
                    ) : (
                      getQuestionsPart1.map((val, index) => {
                        return (
                          <tr key={val.id}>
                            <td className="py-2 px-4 border-b border-b-gray-50">
                              <div className="flex items-center">
                                {index + 1}
                              </div>
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
                            <td className="py-3 px-4 border-b border-b-gray-50">
                              <TdComponent
                                things={`${val.gender[0].toUpperCase()}${val.gender.slice(
                                  1
                                )}`}
                              />
                            </td>
                          </tr>
                        );
                      })
                    )
                  ) : null}
                  {showPart2 ? (
                    getQuestionsPart2.length === 0 ? (
                      <tr>
                        <th
                          className="uppercase tracking-wide font-medium pt-[13rem] text-lg"
                          colSpan={8}
                        >
                          No Questions Found in Part 2!
                        </th>
                      </tr>
                    ) : (
                      getQuestionsPart2.map((val, index) => {
                        return (
                          <tr key={val.id}>
                            <td className="py-2 px-4 border-b border-b-gray-50">
                              <div className="flex items-center">
                                {index + 1}
                              </div>
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
                            <td className="py-3 px-4 border-b border-b-gray-50">
                              <TdComponent
                                things={`${val.gender[0].toUpperCase()}${val.gender.slice(
                                  1
                                )}`}
                              />
                            </td>
                          </tr>
                        );
                      })
                    )
                  ) : null}
                </tbody>
              </table>
            </div>
          )} */}
        </div>
      </div>
    </div>
  );
}

export default ReportProgress;
