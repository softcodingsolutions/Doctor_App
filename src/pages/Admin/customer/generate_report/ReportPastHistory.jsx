import { useState } from "react";
import TdComponent from "../../../../components/TdComponent";
import ThComponent from "../../../../components/ThComponent";
import { useOutletContext } from "react-router-dom";

function ReportPastHistory() {
  const context = useOutletContext();
  const [showPart1, setShowPart1] = useState(true);

  return (
    <div className="w-full p-2">
      <div className="rounded-lg bg-card h-[85vh] bg-white">
        <div className="flex px-4 py-3 h-full flex-col space-y-4">
          <div className="flex items-center justify-between">
            <div className="font-semibold text-xl">Past History</div>
            <div className="space-x-2.5">
              <button
                onClick={() => {
                  setShowPart1(true);
                }}
                className={`px-3 py-1.5 border-[1.5px] rounded-md ${
                  showPart1 ? "scale-105 bg-gray-700 text-white" : "bg-gray-50"
                } hover:scale-105 border-x-gray-300`}
              >
                Family Reason
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
                      <ThComponent
                        moreClasses={"rounded-tr-md rounded-br-md"}
                        name="Details"
                      />{" "}
                    </>
                  )}
                </tr>
              </thead>
              <tbody>
                {showPart1 ? (
                  context[1]?.personal_detail?.family_reasons
                    ?.selected_family_reasons?.length === 0 ? (
                    <tr>
                      <th
                        className="uppercase tracking-wide font-medium pt-[13rem] text-lg"
                        colSpan={8}
                      >
                        No Family Reason Found!
                      </th>
                    </tr>
                  ) : (
                    context[1]?.personal_detail?.family_reasons?.selected_family_reasons?.map(
                      (val, index) => {
                        return (
                          <tr key={val.id}>
                            <td className="py-2 px-4 border-b border-b-gray-50">
                              <div className="flex items-center">
                                {index + 1}
                              </div>
                            </td>
                            <td className="py-3 px-4 border-b border-b-gray-50">
                              <TdComponent things={val} />
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
