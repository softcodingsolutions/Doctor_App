import PrevPageButton from "../../../components/Admin/PrevPageButton";
import NextPageButton from "../../../components/Admin/NextPageButton";
import TdComponent from "../../../components/TdComponent";
import ThComponent from "../../../components/ThComponent";
import { useEffect, useState } from "react";

function TreatmentDos() {
  const [getDos, setGetDos] = useState([]);

  const handleGetDos = () => {};

  useEffect(() => {
    handleGetDos();
  }, []);

  return (
    <div className="w-full p-2">
      <div className="rounded-lg bg-card h-[85vh] bg-white">
        <div className="flex p-4 h-full flex-col space-y-8">
          <div className="animate-fade-left animate-delay-75 animate-once animate-ease-out overflow-auto h-[93%]">
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
                  <ThComponent
                    moreClasses={"rounded-tr-md rounded-br-md"}
                    name="For"
                  />
                </tr>
              </thead>
              <tbody>
                {getDos.length === 0 ? (
                  <tr>
                    <th
                      className="uppercase tracking-wide font-medium pt-[13rem] text-lg"
                      colSpan={8}
                    >
                      No Dos Found!
                    </th>
                  </tr>
                ) : (
                  getDos.map((val, index) => {
                    return (
                      <tr key={val.id}>
                        <td className="py-2 px-4 border-b border-b-gray-50">
                          <div className="flex items-center">{index + 1}</div>
                        </td>
                        <td className="py-3 px-4 border-b border-b-gray-50">
                          <TdComponent things={val.question} />
                        </td>
                        <td className="py-3 px-4 border-b border-b-gray-50">
                          <TdComponent things={val.question} />
                        </td>
                        <td className="py-3 px-4 border-b border-b-gray-50">
                          <TdComponent things={val.question} />
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
          <div className="flex justify-between">
            <PrevPageButton to="../nutrition" />
            <NextPageButton to="../donts" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default TreatmentDos;
