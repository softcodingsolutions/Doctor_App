import { useEffect, useState } from "react";
import ThComponent from "../../../components/ThComponent";
import TdComponent from "../../../components/TdComponent";
import axios from "axios";
import NextPageButton from "../../../components/Admin/NextPageButton";

function TreatmentQuestionPart1() {
  const [getQuestionsPart1, setGetQuestionsPart1] = useState([]);
  const [showCheckboxes, setShowCheckboxes] = useState(false);
  const [selectedCheckboxes, setSelectedCheckboxes] = useState([]);
  const [questionsToBeAnswered, setQuestionsToBeAnswered] = useState(0);

  const handleGetQuestionsPart1 = () => {
    axios
      .get("/api/v1/questions/part1")
      .then((res) => {
        console.log(res.data);
        setGetQuestionsPart1(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleToggleCheckboxes = () => {
    setShowCheckboxes(!showCheckboxes);
  };

  const handleCheckboxChange = (event) => {
    const checkboxValue = event.target.value;
    console.log(checkboxValue);
    setSelectedCheckboxes((prevCheckboxes) => {
      if (prevCheckboxes.includes(checkboxValue)) {
        return prevCheckboxes.filter((val) => val !== checkboxValue);
      } else {
        return [...prevCheckboxes, checkboxValue];
      }
    });
  };

  const handleSave = () => {
    console.log("Selected checkboxes:", selectedCheckboxes);
    selectedCheckboxes.map((res) => {
      console.log(getQuestionsPart1.find((val) => val.id === Number(res)));
    });
    setSelectedCheckboxes([]);
    setShowCheckboxes(false);
  };

  useEffect(() => {
    handleGetQuestionsPart1();
  }, []);

  return (
    <div className="w-full p-2">
      <div className="rounded-lg bg-card h-[85vh] bg-white">
        <div className="flex px-4 py-3 h-full flex-col space-y-3">
          <div className="flex gap-5 text-center items-center justify-between">
            {!showCheckboxes ? (
              <button
                type="button"
                onClick={handleToggleCheckboxes}
                className={`p-1.5 border-[1.5px] border-gray-400 rounded-md hover:text-white hover:bg-green-600`}
              >
                Select Questions (Part-1)
              </button>
            ) : (
              <button
                type="button"
                onClick={handleSave}
                className={`p-1.5 border-[1.5px] border-gray-400 rounded-md hover:text-white hover:bg-green-600`}
              >
                Save
              </button>
            )}
            <div className="font-[550] text-lg">
              No. of questions checked: {selectedCheckboxes.length}
            </div>

            <div className="font-bold text-lg">
              No. of questions to be answered: {questionsToBeAnswered}
            </div>
          </div>
          <div className="animate-fade-left animate-delay-75 shadow-gray-400 shadow-inner border rounded-md border-gray-100 animate-once animate-ease-out overflow-auto h-[93%]">
            <table className="w-full min-w-[460px] z-0">
              <thead className="uppercase ">
                <tr className="bg-[#1F2937] text-white rounded-md">
                  {showCheckboxes ? (
                    <ThComponent
                      moreClasses={"rounded-tl-md rounded-bl-md"}
                      name="Select"
                    />
                  ) : (
                    <ThComponent
                      moreClasses={"rounded-tl-md rounded-bl-md"}
                      name="No."
                    />
                  )}
                  <ThComponent name="In English" />
                  <ThComponent name="In Hindi" />
                  <ThComponent name="In Gujarati" />
                  <ThComponent name="For" />
                  <ThComponent moreClasses={"rounded-tr-md rounded-br-md"} />
                </tr>
              </thead>
              <tbody>
                {getQuestionsPart1.length === 0 ? (
                  <tr>
                    <th
                      className="uppercase tracking-wide font-medium pt-[13rem] text-lg"
                      colSpan={8}
                    >
                      No Questions Found in Part-1!
                    </th>
                  </tr>
                ) : (
                  getQuestionsPart1.map((val, index) => {
                    return (
                      <tr key={val.id}>
                        {showCheckboxes && (
                          <td className="py-3 px-4 border-b border-b-gray-50">
                            <input
                              value={val.id}
                              onChange={handleCheckboxChange}
                              type="checkbox"
                              defaultChecked={selectedCheckboxes.includes(
                                val.id
                              )}
                            />
                          </td>
                        )}
                        {!showCheckboxes && (
                          <td className="py-2 px-4 border-b border-b-gray-50">
                            <div className="flex items-center">{index + 1}</div>
                          </td>
                        )}
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
                )}
              </tbody>
            </table>
          </div>
          <div className="flex justify-end">
            <NextPageButton to="../question-part2" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default TreatmentQuestionPart1;
