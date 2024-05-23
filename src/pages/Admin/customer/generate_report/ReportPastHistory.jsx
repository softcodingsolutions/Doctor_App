import { useState } from "react";
import TdComponent from "../../../../components/TdComponent";
import ThComponent from "../../../../components/ThComponent";
import { useOutletContext } from "react-router-dom";

function ReportPastHistory() {
  const context = useOutletContext();
  const [showPart1, setShowPart1] = useState(true);
  const [showPart2, setShowPart2] = useState(false);

  return (
    <div className="w-full p-2">
      <div className="rounded-lg bg-card h-[85vh] bg-white">
        <div className="flex px-4 py-3 h-full flex-col space-y-4">
          <div className="flex items-center justify-between">
            <div className="font-semibold text-xl">Past History</div>
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
                Family Reason
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
                Complains
              </button>
            </div>
          </div>
          <div className="animate-fade-left animate-delay-75 shadow-gray-400 shadow-inner border rounded-md border-gray-100 animate-once animate-ease-out overflow-auto h-[93%]">
            <table className="w-full min-w-[460px] z-0">
              <thead className="uppercase ">
                <tr className="bg-[#1F2937] text-white rounded-md">
                  <ThComponent
                    moreClasses={"rounded-tl-md rounded-bl-md"}
                    name="No."
                  />
                  {showPart1 && (
                    <>
                      <ThComponent name="In English" />
                      <ThComponent name="In Hindi" />
                      <ThComponent
                        moreClasses={"rounded-tr-md rounded-br-md"}
                        name="In Gujarati"
                      />{" "}
                    </>
                  )}
                  {showPart2 && (
                    <>
                      <ThComponent
                        moreClasses={"rounded-tr-md rounded-br-md"}
                        name="Complain Details"
                      />{" "}
                    </>
                  )}
                </tr>
              </thead>
              <tbody>
                {showPart1 ? (
                  context[1]?.personal_detail?.family_reasons.length === 0 ? (
                    <tr>
                      <th
                        className="uppercase tracking-wide font-medium pt-[13rem] text-lg"
                        colSpan={8}
                      >
                        No Family Reason Found!
                      </th>
                    </tr>
                  ) : (
                    context[1]?.personal_detail?.family_reasons.map(
                      (val, index) => {
                        return (
                          <tr key={val.id}>
                            <td className="py-2 px-4 border-b border-b-gray-50">
                              <div className="flex items-center">
                                {index + 1}
                              </div>
                            </td>
                            <td className="py-3 px-4 border-b border-b-gray-50">
                              <TdComponent things={val.details_in_english} />
                            </td>
                            <td className="py-3 px-4 border-b border-b-gray-50">
                              <TdComponent things={val.details_in_hindi} />
                            </td>
                            <td className="py-3 px-4 border-b border-b-gray-50">
                              <TdComponent things={val.details_in_gujarati} />
                            </td>
                          </tr>
                        );
                      }
                    )
                  )
                ) : null}
                {showPart2 ? (
                  context[1]?.personal_detail?.complaints.length === 0 ? (
                    <tr>
                      <th
                        className="uppercase tracking-wide font-medium pt-[13rem] text-lg"
                        colSpan={8}
                      >
                        No Complains Found!
                      </th>
                    </tr>
                  ) : (
                    context[1]?.personal_detail?.complaints.map(
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

export default ReportPastHistory;
