import axios from "axios";
import { useEffect, useState } from "react";
import AddNew from "../../../components/AddNew";
import ThComponent from "../../../components/ThComponent";
import TdComponent from "../../../components/TdComponent";
import { MdDelete, MdEdit } from "react-icons/md";

function Questions() {
  const [getQuestionsPart1, setGetQuestionsPart1] = useState([]);
  const [getQuestionsPart2, setGetQuestionsPart2] = useState([]);
  const [serialCount, setSerialCount] = useState(0);
  const [nextPageName, setNextPageName] = useState("Next");
  const [nextPage, setNextPage] = useState(false);

  const handleGetQuestionsPart1 = () => {
    axios
      .get("/api/v1/questions/part1")
      .then((res) => {
        console.log(res.data);
        setGetQuestionsPart1(res.data);
        setSerialCount(res.data?.length);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleGetQuestionsPart2 = () => {
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

  const handleAddQuestion = (gender, question, language, part) => {
    const formData = new FormData();
    formData.append("question[gender]", gender);
    formData.append("question[question]", question);
    formData.append("question[language]", language);
    formData.append("question[part]", part);
    axios.post("/api/v1/questions", formData).then((res) => {
      console.log(res);
      part === "1" ? handleGetQuestionsPart1() : handleGetQuestionsPart2();
    });
  };

  const deleteQuestion = (val, part) => {
    axios
      .delete(`/api/v1/questions/${val}`)
      .then((res) => {
        console.log(res);
        part === "1" ? handleGetQuestionsPart1() : handleGetQuestionsPart2();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    nextPage ? handleGetQuestionsPart2() : handleGetQuestionsPart1();
  }, [nextPage]);

  return (
    <div className="w-full p-2">
      <div className="rounded-lg bg-card h-[85vh] bg-white">
        <div className="flex p-4 h-full flex-col space-y-8">
          <div>
            <div className="flex items-center">
              <div className="font-semibold text-xl">Questions List</div>
              <div className="flex-grow" />
              <button
                onClick={() => {
                  setNextPage(!nextPage);
                  nextPage
                    ? setNextPageName("Next")
                    : setNextPageName("Previous");
                }}
                className="px-3 py-1.5 border rounded-md bg-gray-700 text-white  hover:scale-105  border-x-gray-300"
              >
                {nextPageName} Page
              </button>
              <div className="flex-grow" />
              <AddNew
                handleApi={handleAddQuestion}
                gender="gender"
                language="Language"
                part="Part"
                name="Add Question"
                title="Add New Question"
                label1="For Whom"
                label2="Question"
              />
            </div>
          </div>

          <div className="animate-fade-left animate-delay-100 animate-once animate-ease-out overflow-auto h-[93%]">
            <table className="w-full min-w-[460px] z-0">
              <thead className="uppercase ">
                <tr className="bg-[#1F2937] text-white rounded-md">
                  <ThComponent
                    moreClasses={"rounded-tl-md rounded-bl-md"}
                    name="No."
                  />
                  <ThComponent name="In English" />
                  <ThComponent name="For" />
                  <ThComponent />
                  <ThComponent />
                  <ThComponent moreClasses={"rounded-tr-md rounded-br-md"} />
                </tr>
              </thead>
              <tbody>
                {!nextPage ? (
                  getQuestionsPart1.length === 0 ? (
                    <tr>
                      <th
                        className="uppercase tracking-wide font-medium pt-[13rem] text-lg"
                        colSpan={8}
                      >
                        No Questions Found!
                      </th>
                    </tr>
                  ) : (
                    getQuestionsPart1.map((val, index) => {
                      return (
                        <tr key={val.id}>
                          <td className="py-2 px-4 border-b border-b-gray-50">
                            <div className="flex items-center">{index + 1}</div>
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
                          <td className="py-3 px-4 border-b border-b-gray-50">
                            <TdComponent
                              things={
                                <button
                                  onClick={() => console.log("edit")}
                                  className="font-semibold text-blue-800 border border-gray-300 p-1 rounded-md hover:bg-[#558ccb] hover:text-white"
                                >
                                  <MdEdit size={20} />
                                </button>
                              }
                            />
                          </td>
                          <td className="py-3 px-4 border-b border-b-gray-50">
                            <TdComponent
                              things={
                                <button
                                  onClick={() =>
                                    deleteQuestion(val.id, val.part)
                                  }
                                  className="font-semibold text-red-600 border border-gray-300 p-1 rounded-md hover:bg-[#c43e19] hover:text-white"
                                >
                                  <MdDelete size={20} />
                                </button>
                              }
                            />
                          </td>
                        </tr>
                      );
                    })
                  )
                ) : getQuestionsPart2.length === 0 ? (
                  <tr>
                    <th
                      className="uppercase tracking-wide font-medium pt-[13rem] text-lg"
                      colSpan={8}
                    >
                      No Questions Found!
                    </th>
                  </tr>
                ) : (
                  getQuestionsPart2.map((val, index) => {
                    return (
                      <tr key={val.id}>
                        <td className="py-2 px-4 border-b border-b-gray-50">
                          <div className="flex items-center">
                            {index + 1}
                          </div>
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
                        <td className="py-3 px-4 border-b border-b-gray-50">
                          <TdComponent
                            things={
                              <button
                                onClick={() => console.log("edit")}
                                className="font-semibold text-blue-800 border border-gray-300 p-1 rounded-md hover:bg-[#558ccb] hover:text-white"
                              >
                                <MdEdit size={20} />
                              </button>
                            }
                          />
                        </td>
                        <td className="py-3 px-4 border-b border-b-gray-50">
                          <TdComponent
                            things={
                              <button
                                onClick={() => deleteQuestion(val.id, val.part)}
                                className="font-semibold text-red-600 border border-gray-300 p-1 rounded-md hover:bg-[#c43e19] hover:text-white"
                              >
                                <MdDelete size={20} />
                              </button>
                            }
                          />
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Questions;
