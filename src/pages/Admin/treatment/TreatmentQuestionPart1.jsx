import { useEffect, useState } from "react";
import ThComponent from "../../../components/ThComponent";
import TdComponent from "../../../components/TdComponent";
import axios from "axios";
import NextPageButton from "../../../components/Admin/NextPageButton";
import { useOutletContext } from "react-router-dom";
import Swal from "sweetalert2";
import SaveTreatmentButtons from "../../../components/Admin/SaveTreatmentButtons";
import SelectTreatmentButton from "../../../components/Admin/SelectTreatmentButton";

function TreatmentQuestionPart1() {
  const context = useOutletContext();
  const [getQuestionsPart1, setGetQuestionsPart1] = useState([]);
  const [showCheckboxes, setShowCheckboxes] = useState(false);
  const [selectedCheckboxes, setSelectedCheckboxes] = useState([]);
  const [questionsToBeAnswered, setQuestionsToBeAnswered] =
    useState(selectedCheckboxes);
  const [defaultDropdownValue, setDefaultDropdownValue] = useState(0);

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

  const handleCheckboxChange = (e) => {
    const checkboxValue = e.target.value;
    const isChecked = e.target.checked;

    if (isChecked) {
      setSelectedCheckboxes((prevState) => [...prevState, checkboxValue]);
    } else {
      setSelectedCheckboxes((prevState) =>
        prevState.filter((value) => value !== checkboxValue)
      );
    }
  };

  const handleSendQuestionToBeAnswered = async (e) => {
    console.log("min", e.target.value);
    const formData = new FormData();
    formData.append(
      "package[weight_reason]",
      context[0] === "null" ? null : context[0]
    );
    formData.append("package[number_of_question_one]", e.target.value);

    try {
      await axios
        .post("/api/v1/packages", formData)
        .then((res) => {
          console.log("min question list:", res);
          e.target.value = "";
          context[1]();
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (err) {
      console.error(err);
    }
  };

  const handleSave = async () => {
    const selectedQuestions = selectedCheckboxes
      .map((id) =>
        getQuestionsPart1.find((question) => question.id === Number(id))
      )
      .filter((question) => question);

    if (selectedQuestions.length === 0) {
      return Swal.fire({
        icon: "warning",
        title: "No Questions Selected",
        text: "Please select at least one question to save.",
        showCancelButtons: true,
      });
    }

    console.log("Selected Questions: ", selectedQuestions);

    const formData = new FormData();
    formData.append(
      "package[weight_reason]",
      context[0] === "null" ? null : context[0]
    );
    formData.append(
      "package[questions_part_one]",
      JSON.stringify(selectedQuestions)
    );

    try {
      const response = await axios.post("/api/v1/packages", formData);
      if (response.data) {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Added!",
          text: `Your question has been added.`,
          showConfirmButton: false,
          timer: 1500,
        });
      }
      handleGetQuestionsPart1();
      context[1]();
    } catch (err) {
      console.error(err);
    } finally {
      setSelectedCheckboxes([]);
      setShowCheckboxes(false);
      setQuestionsToBeAnswered(selectedCheckboxes.length);
    }
  };

  useEffect(() => {
    const defaultValue =
      context[2]?.find((packages) => {
        return (
          context[0] === packages.weight_reason &&
          packages.number_of_question_one
        );
      })?.number_of_question_one || 0;

    setDefaultDropdownValue(defaultValue);

    const preSelectedQuestions = context[2]?.reduce((acc, packages) => {
      if (context[0] === packages.weight_reason) {
        acc = [...acc, ...packages.questions_part_one.map((q) => String(q.id))];
      }
      return acc;
    }, []);
    setSelectedCheckboxes(preSelectedQuestions);
    setQuestionsToBeAnswered(selectedCheckboxes.length);
  }, [context]);

  useEffect(() => {
    handleGetQuestionsPart1();
    context[1]();
  }, []);

  return (
    <div className="w-full p-2">
      <div className="rounded-lg bg-card h-[85vh] bg-white">
        <div className="flex px-4 py-3 h-full flex-col space-y-3">
          <div className="flex gap-5 text-center items-center justify-between">
            {!showCheckboxes && (
              <SelectTreatmentButton
                name="Select Questions (Part-1)"
                function={handleToggleCheckboxes}
              />
            )}
            {showCheckboxes && (
              <div className="font-[550] text-lg">
                No. of questions checked: {selectedCheckboxes.length}
              </div>
            )}

            <div className="font-bold text-lg">
              No. of questions to be answered: {defaultDropdownValue}
              <select
                className="border border-gray-400 p-1 font-normal ml-1 rounded-sm justify-center"
                onChange={handleSendQuestionToBeAnswered}
              >
                <option value="" disabled selected>
                  Select questions
                </option>
                {[...Array(selectedCheckboxes.length).keys()].map((index) => {
                  return (
                    <option key={index + 1} value={index + 1}>
                      {index + 1}
                    </option>
                  );
                })}
              </select>
            </div>

            {!showCheckboxes && (
              <div className="font-[550] text-lg flex items-center">
                Checked Questions -{" "}
                <div className="ml-2 bg-gray-400 border border-gray-200 size-5"></div>
              </div>
            )}
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
                  <ThComponent
                    moreClasses={"rounded-tr-md rounded-br-md"}
                    name="For"
                  />
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
                      <tr
                        key={val.id}
                        className={`${
                          context[2]?.some(
                            (packages) =>
                              context[0] === packages.weight_reason &&
                              packages.questions_part_one?.some(
                                (question) => question.id === val.id
                              )
                          )
                            ? "bg-gray-400"
                            : ""
                        } w-full`}
                      >
                        {showCheckboxes && (
                          <td className="py-3 px-4 border-b border-b-gray-50">
                            <input
                              value={val.id}
                              onChange={handleCheckboxChange}
                              type="checkbox"
                              defaultChecked={context[2]?.some(
                                (packages) =>
                                  context[0] === packages.weight_reason &&
                                  packages.questions_part_one?.some(
                                    (question) => question.id === val.id
                                  )
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

          {!showCheckboxes && (
            <div className="flex justify-end">
              <NextPageButton
                name="Questions (Part-2)"
                to="../question-part2"
              />
            </div>
          )}

          {showCheckboxes && (
            <div className="flex justify-center">
              <SaveTreatmentButtons function={handleSave} />{" "}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default TreatmentQuestionPart1;
