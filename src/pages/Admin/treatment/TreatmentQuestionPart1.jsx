import { useEffect, useState } from "react";
import ThComponent from "../../../components/ThComponent";
import TdComponent from "../../../components/TdComponent";
import axios from "axios";
import NextPageButton from "../../../components/Admin/NextPageButton";
import { useOutletContext } from "react-router-dom";
import Swal from "sweetalert2";
import SaveTreatmentButtons from "../../../components/Admin/SaveTreatmentButtons";
import SelectTreatmentButton from "../../../components/Admin/SelectTreatmentButton";
import { MenuItem, Select } from "@mui/joy";
import InsideLoader from "../../InsideLoader";

function TreatmentQuestionPart1() {
  const context = useOutletContext();
  const [getQuestionsPart1, setGetQuestionsPart1] = useState([]);
  const [showCheckboxes, setShowCheckboxes] = useState(false);
  const [selectedCheckboxes, setSelectedCheckboxes] = useState([]);
  const [defaultDropdownValue, setDefaultDropdownValue] = useState();
  const role = localStorage.getItem("role");
  const main_id = localStorage.getItem("main_id");
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 7;

  const paginateCustomers = () => {
    const indexOfLastRow = currentPage * rowsPerPage;
    const indexOfFirstRow = indexOfLastRow - rowsPerPage;
    return getQuestionsPart1.slice(indexOfFirstRow, indexOfLastRow);
  };

  const totalPages = Math.ceil(getQuestionsPart1.length / rowsPerPage);

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

  const handleGetQuestionsPart1 = () => {
    if (role === "doctor") {
      axios
        .get(
          `/api/v1/questions/part1?user_id=${localStorage.getItem("main_id")}`
        )
        .then((res) => {
          console.log(res.data);
          setGetQuestionsPart1(res.data);
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
          alert(err.response?.data?.message + "!");
        });
    } else if (role === "super_admin") {
      axios
        .get(
          `/api/v1/questions/part1?user_id=${localStorage.getItem(
            "map_doctor_id"
          )}`
        )
        .then((res) => {
          console.log(res.data);
          setLoading(false);
          setGetQuestionsPart1(res.data);
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
          alert(err.response?.data?.message + "!");
        });
    }
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
    const selectedValue = e.target.value; 
    console.log("min", selectedValue);
    const formData = new FormData();
    formData.append(
      "package[weight_reason]",
      context[0] === "null" ? null : context[0]
    );
    formData.append("package[user_id]", main_id);
    formData.append("package[number_of_question_one]", selectedValue);
    try {
      await axios
        .post("/api/v1/packages", formData)
        .then((res) => {
          console.log("min question list:", res);
          setDefaultDropdownValue(selectedValue); 
          context[1]();
          Swal.fire({
            icon: "success",
            title: `${selectedValue} questions are to be answered!`,
            showCancelButtons: true,
          });
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
    formData.append("package[user_id]", main_id);
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
          title: "Saved!",
          text: `Your question has been saved.`,
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
  }, [context]);

  useEffect(() => {
    handleGetQuestionsPart1();
    context[1]();
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
                name="Select Questions (Part-1)"
                function={handleToggleCheckboxes}
              />
            )}
            {showCheckboxes && (
              <div className="font-[550] text-lg">
                No. of questions checked: {selectedCheckboxes.length}
              </div>
            )}

            {!showCheckboxes && (
              <div className="flex items-center gap-2 font-bold text-lg">
                <span>No. of questions to be answered:</span>
                {defaultDropdownValue}
                <Select
                  required
                  placeholder="Select"
                  value={defaultDropdownValue}
                  onChange={(e) => handleSendQuestionToBeAnswered(e)}
                >
                  {[...Array(selectedCheckboxes.length).keys()].map((index) => (
                    <MenuItem key={index} value={index + 1}>
                      {index + 1}
                    </MenuItem>
                  ))}
                </Select>
              </div>
            )}
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
                {paginateCustomers().length === 0 ? (
                  <tr>
                    <th
                      className="uppercase tracking-wide font-medium pt-[13rem] text-lg"
                      colSpan={8}
                    >
                      No Questions Found in Part-1!
                    </th>
                  </tr>
                ) : (
                  paginateCustomers().map((val, index) => {
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
                              className="size-4"
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

          {/* Pagination Controls */}
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
