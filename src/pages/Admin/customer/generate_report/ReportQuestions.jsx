import { useState } from "react";
import TdComponent from "../../../../components/TdComponent";
import ThComponent from "../../../../components/ThComponent";
import { useOutletContext } from "react-router-dom";

function ReportQuestions() {
  const context = useOutletContext();
  const [showPart1, setShowPart1] = useState(true);
  const [showPart2, setShowPart2] = useState(false);
  const role = localStorage.getItem("role");

  console.log("User", context[1]);

  return (
    <div className="w-full p-2">
      <div
        className={`rounded-lg bg-card ${
          role === "patient" ? "h-[85vh]" : "h-[89vh]"
        } bg-white`}
      >
        <div className="flex px-4 py-3 h-full flex-col space-y-4">
          <div className="flex items-center justify-between">
            <div className="font-semibold text-xl">Questions List</div>
            <div className="space-x-2.5">
              <button
                onClick={() => {
                  setShowPart2(false);
                  setShowPart1(true);
                }}
                className={`px-3 py-1.5 border-[1.5px] rounded-md ${
                  showPart1 ? "scale-105 bg-gray-700 text-white" : "bg-gray-50"
                } hover:scale-105 border-x-gray-300`}
              >
                Part 1
              </button>
              <button
                onClick={() => {
                  setShowPart1(false);
                  setShowPart2(true);
                }}
                className={`px-3 py-1.5 rounded-md ${
                  showPart2 ? "scale-105 bg-gray-700 text-white" : "bg-gray-50"
                } hover:scale-105  border-x-gray-300 border-[1.5px]`}
              >
                Part 2
              </button>
            </div>
          </div>

          <div className="animate-fade-left animate-delay-75 shadow-gray-400 shadow-inner border rounded-md border-gray-100 animate-once animate-ease-out overflow-auto h-[90%]">
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
                {showPart1 ? (
                  context[1]?.personal_detail?.user_selected_questions_one
                    .length === 0 ? (
                    <tr>
                      <th
                        className="uppercase tracking-wide font-medium pt-[13rem] text-lg"
                        colSpan={8}
                      >
                        No Questions found in Part 1!
                      </th>
                    </tr>
                  ) : (
                    context[1]?.personal_detail?.user_selected_questions_one.map(
                      (val, index) => {
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
                          </tr>
                        );
                      }
                    )
                  )
                ) : null}
                {showPart2 ? (
                  context[1]?.personal_detail?.user_selected_questions_two
                    .length === 0 ? (
                    <tr>
                      <th
                        className="uppercase tracking-wide font-medium pt-[13rem] text-lg"
                        colSpan={8}
                      >
                        No Questions Found in Part 2!
                      </th>
                    </tr>
                  ) : (
                    context[1]?.personal_detail?.user_selected_questions_two.map(
                      (val, index) => {
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
                          </tr>
                        );
                      }
                    )
                  )
                ) : null}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ReportQuestions;
