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
  const [showCheckboxes, setShowCheckboxes] = useState(true);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 7;

  const paginateCustomers = () => {
    const indexOfLastRow = currentPage * rowsPerPage;
    const indexOfFirstRow = indexOfLastRow - rowsPerPage;
    return getQuestions.slice(indexOfFirstRow, indexOfLastRow);
  };

  const totalPages = Math.ceil(getQuestions.length / rowsPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };
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
          text: `Your questions has been mapped.`,
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
            {showCheckboxes && (
              <div className="font-[550] text-lg">
                No. of Weight Gain Questions: {selectedCheckboxes?.length}
              </div>
            )}

            {showCheckboxes && (
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

            {showCheckboxes && (
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
                  <ThComponent
                    moreClasses={"rounded-tl-md rounded-bl-md"}
                    name="Select"
                  />

                  <ThComponent name="In English" />
                  <ThComponent
                    moreClasses={"rounded-tr-md rounded-br-md"}
                    name="In Gujarati"
                  />
                </tr>
              </thead>
              <tbody>
                {paginateCustomers().length === 0 ? (
                  <tr>
                    <th
                      className="uppercase tracking-wide font-medium pt-[13rem] text-lg"
                      colSpan={8}
                    >
                      No Questions Found!
                    </th>
                  </tr>
                ) : (
                  paginateCustomers().map((val, index) => {
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

          {totalPages !== 0 && (
            <div className="flex flex-wrap justify-center items-center gap-2 py-2">
              <button
                onClick={handlePreviousPage}
                disabled={currentPage === 1}
                className="flex items-center gap-2 px-6 py-3 font-sans text-xs font-bold text-center text-gray-900 uppercase align-middle transition-all rounded-full select-none hover:bg-gray-900/10 active:bg-gray-900/20 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                  stroke="currentColor"
                  aria-hidden="true"
                  className="w-4 h-4"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
                  ></path>
                </svg>
                Previous
              </button>
              <div className="flex gap-2">
                {Array.from({ length: totalPages }, (_, i) => (
                  <button
                    key={i + 1}
                    onClick={() => setCurrentPage(i + 1)}
                    className={`relative h-10 max-h-[40px] w-10 max-w-[40px] select-none rounded-full text-center align-middle font-sans text-xs font-medium uppercase text-gray-900 transition-all hover:bg-gray-900/10 active:bg-gray-900/20 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none ${
                      currentPage === i + 1
                        ? "bg-gray-900 text-white"
                        : "bg-gray-200 text-black"
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}
              </div>
              <button
                onClick={handleNextPage}
                disabled={currentPage === totalPages}
                className="flex items-center gap-2 px-6 py-3 font-sans text-xs font-bold text-center text-gray-900 uppercase align-middle transition-all rounded-full select-none hover:bg-gray-900/10 active:bg-gray-900/20 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
              >
                Next
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                  stroke="currentColor"
                  aria-hidden="true"
                  className="w-4 h-4"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                  ></path>
                </svg>
              </button>
            </div>
          )}

          {showCheckboxes && (
            <div className="flex justify-end">
              <SaveTreatmentButtons function={handleSave} />{" "}
              <NextPageButton name="Dos" to="../survey-treatment-dos" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default SurveyWeightGainQuestions;
