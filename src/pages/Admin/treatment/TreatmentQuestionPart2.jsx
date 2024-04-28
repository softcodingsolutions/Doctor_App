import { useEffect, useState } from "react";
import ThComponent from "../../../components/ThComponent";
import axios from "axios";
import TdComponent from "../../../components/TdComponent";
import NextPageButton from "../../../components/Admin/NextPageButton";
import PrevPageButton from "../../../components/Admin/PrevPageButton";

function TreatmentQuestionPart2() {
  const [getQuestionsPart2, setGetQuestionsPart2] = useState([]);

  const handleGetQuestionsPart1 = () => {
    axios
      .get("/api/v1/questions/part2")
      .then((res) => {
        console.log(res.data);
        setGetQuestionsPart2(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    handleGetQuestionsPart1();
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
                  <ThComponent name="For" />
                  <ThComponent moreClasses={"rounded-tr-md rounded-br-md"} />
                </tr>
              </thead>
              <tbody>
                {getQuestionsPart2.length === 0 ? (
                  <tr>
                    <th
                      className="uppercase tracking-wide font-medium pt-[13rem] text-lg"
                      colSpan={8}
                    >
                      No Questions Found in Part-2!
                    </th>
                  </tr>
                ) : (
                  getQuestionsPart2.map((val, index) => {
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
                )}
              </tbody>
            </table>
          </div>
          <div className="flex justify-between">
            <PrevPageButton to="../question-part1" />
            <NextPageButton to="../medicines" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default TreatmentQuestionPart2;
