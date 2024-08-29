import { useEffect, useState } from "react";
import TdComponent from "../../../components/TdComponent";
import NextPageButton from "../../../components/Admin/NextPageButton";
import ThComponent from "../../../components/ThComponent";
import axios from "axios";
import { useOutletContext } from "react-router-dom";
import Swal from "sweetalert2";
import SaveTreatmentButtons from "../../../components/Admin/SaveTreatmentButtons";
import SelectTreatmentButton from "../../../components/Admin/SelectTreatmentButton";
import { MenuItem, Select } from "@mui/joy";
import InsideLoader from "../../InsideLoader";

function SurveyWeightGainQuestions() {
  const context = useOutletContext();
  const [getQuestions, setGetQuestions] = useState([]);
  const [selectedCheckboxes, setSelectedCheckboxes] = useState([]);
  const [defaultDropdownValue, setDefaultDropdownValue] = useState(0);
  const [showCheckboxes, setShowCheckboxes] = useState(false);
  const [loading, setLoading] = useState(true);

  const handleGetQuestions = () => {
    axios
      .get(`/api/v2/survey_questions`)
      .then((res) => {
        console.log("Questions: ", res?.data?.all_survey_questions);
        setGetQuestions(res?.data?.all_survey_questions);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };

  const handleToggleCheckboxes = () => {
    setShowCheckboxes(!showCheckboxes);
  };

  const handleCheckboxChange = (e) => {
    const checkboxValue = e.target.value;
    const isChecked = e.target.checked;

    if (isChecked) {
      setSelectedCheckboxes((prevState) => {
        const newState = [...prevState, checkboxValue];
        // Remove duplicates
        return [...new Set(newState)];
      });
    } else {
      setSelectedCheckboxes((prevState) =>
        prevState.filter((value) => value !== checkboxValue)
      );
    }
  };

  const handleSendQuestionToBeAnswered = async (e) => {
    const selectedValue = e.target.value;
    console.log("Selected value:", selectedValue);

    const formData = new FormData();
    formData.append(
      "survey_weight_reason_package[survey_weigh_reason]",
      context[0] == "null" ? null : context[0]
    );
    formData.append(
      "survey_weight_reason_package[number_of_question]",
      selectedValue
    );

    try {
      await axios
        .post("/api/v2/survey_weight_reason_packages", formData)
        .then((res) => {
          console.log("Min question list:", res);
          context[1]();
        })
        .catch((err) => {
          console.log(err);
          alert(err.response?.data?.message + "!");
        });
    } catch (err) {
      console.error(err);
    }
  };

  const handleSave = async () => {
    const selectedQuestions = selectedCheckboxes
      .map((id) => getQuestions.find((que) => que.id === Number(id)))
      .filter((que) => que);

    if (selectedQuestions.length === 0) {
      return Swal.fire({
        icon: "warning",
        title: "No Questions Selected",
        text: "Please select at least one question to save.",
      });
    }
    console.log("Selected Questions: ", selectedQuestions);

    const formData = new FormData();
    formData.append(
      "survey_weight_reason_package[survey_weigh_reason]",
      context[0] === "null" ? null : context[0]
    );
    formData.append(
      "survey_weight_reason_package[questions]",
      JSON.stringify(selectedQuestions)
    );
    try {
      const response = await axios.post(
        "/api/v2/survey_weight_reason_packages",
        formData
      );
      if (response.data) {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Mapped!",
          text: `Your questions have been mapped.`,
          showConfirmButton: false,
          timer: 1500,
        });
      }
      handleGetQuestions();
      context[1]();
    } catch (err) {
      console.error(err);
    } finally {
      setSelectedCheckboxes([]);
      setShowCheckboxes(false);
    }
  };

  useEffect(() => {
    const defaultValue =
      context[2]?.find((packages) => {
        return (
          context[0] == packages?.survey_weigh_reason &&
          packages?.number_of_question
        );
      })?.number_of_question || 0;
    console.log("Default value:", defaultValue);

    setDefaultDropdownValue(defaultValue);

    const preSelectedQuestions = context[2]?.reduce((acc, packages) => {
      if (context[0] == packages?.survey_weigh_reason) {
        const questionsIds = packages?.questions?.map((q) => String(q.id));
        acc = new Set([...acc, ...questionsIds]);
      }
      return acc;
    }, new Set());
    console.log("Pre-selected questions:", Array.from(preSelectedQuestions));

    setSelectedCheckboxes(Array.from(preSelectedQuestions));
  }, [context]);

  useEffect(() => {
    handleGetQuestions();
  }, [context[0]]);

  if (loading) {
    return <InsideLoader />;
  }

  return (
    <div className="w-full p-2">
      <div className="rounded-lg bg-card h-[85vh] bg-white">
        <div className="flex px-4 py-3 h-full flex-col space-y-3">
          <div className="flex gap-5 text-center items-center justify-between">
            {!showCheckboxes && (
              <SelectTreatmentButton
                name="Select Weight Gain Questions"
                function={handleToggleCheckboxes}
              />
            )}

            {showCheckboxes && (
              <div className="font-[550] text-lg">
                No. of Weight Gain Questions: {selectedCheckboxes?.length}
              </div>
            )}

            {!showCheckboxes && (
              <div className="flex items-center gap-2 font-bold text-lg">
                <span>No. of questions to be answered:</span>{" "}
                {defaultDropdownValue}
                <Select required placeholder="Select">
                  {[...Array(selectedCheckboxes?.length).keys()].map(
                    (index) => (
                      <MenuItem
                        key={index}
                        value={index + 1}
                        onClick={handleSendQuestionToBeAnswered}
                      >
                        {index + 1}
                      </MenuItem>
                    )
                  )}
                </Select>
              </div>
            )}

            {!showCheckboxes && (
              <div className="font-[550] text-lg flex items-center">
                Checked Weight Gain Questions -{" "}
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
                  <ThComponent
                    moreClasses={"rounded-tr-md rounded-br-md"}
                    name="In Gujarati"
                  />
                </tr>
              </thead>
              <tbody>
                {getQuestions.length === 0 ? (
                  <tr>
                    <th
                      className="uppercase tracking-wide font-medium pt-[13rem] text-lg"
                      colSpan={8}
                    >
                      No Questions Found!
                    </th>
                  </tr>
                ) : (
                  getQuestions.map((val, index) => {
                    return (
                      <tr
                        className={`${
                          context[2]?.some(
                            (packages) =>
                              context[0] == packages?.survey_weigh_reason &&
                              packages?.questions?.some(
                                (que) => que.id == val.id
                              )
                          )
                            ? "bg-gray-400 "
                            : ""
                        } w-full`}
                        key={val.id}
                      >
                        {showCheckboxes && (
                          <td className="py-3 px-4 border-b border-b-gray-50">
                            <input
                              value={val.id}
                              onChange={handleCheckboxChange}
                              type="checkbox"
                              className="size-4"
                              defaultChecked={context[2]?.some(
                                (packages) =>
                                  context[0] == packages.survey_weigh_reason &&
                                  packages.questions?.some(
                                    (que) => que.id == val.id
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
                          <TdComponent things={val.in_english} />
                        </td>
                        <td className="py-3 px-4 border-b border-b-gray-50">
                          <TdComponent things={val.in_gujarati} />
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
              <NextPageButton name="Dos" to="../survey-treatment-dos" />
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

export default SurveyWeightGainQuestions;
