import PrevPageButton from "../../../components/Admin/PrevPageButton";
import NextPageButton from "../../../components/Admin/NextPageButton";
import TdComponent from "../../../components/TdComponent";
import ThComponent from "../../../components/ThComponent";
import { useEffect, useState } from "react";
import axios from "axios";

function TreatmentDos() {
  const [getDos, setGetDos] = useState([]);

  const handleGetDos = () => {
    axios
      .get("/api/v1/avoid_and_adds")
      .then((res) => {
        console.log(
          "Dos",
          res.data?.avoid_and_adds.filter((res) => res.category === "do")
        );
        setGetDos(
          res.data?.avoid_and_adds.filter((res) => res.category === "do")
        );
      })
      .catch((err) => {
        console.log(err);
      });
  };

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
                  <ThComponent
                    moreClasses={"rounded-tr-md rounded-br-md"}
                    name="In Gujarati"
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
