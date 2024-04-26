import axios from "axios";
import { useEffect, useState } from "react";
import AddNewQuestion from "../../../components/Admin/AddNewQuestion";
import ThComponent from "../../../components/ThComponent";
import TdComponent from "../../../components/TdComponent";
import { MdDelete, MdEdit } from "react-icons/md";
import Swal from "sweetalert2";

function Questions() {
  const [getQuestionsPart1, setGetQuestionsPart1] = useState([]);
  const [getQuestionsPart2, setGetQuestionsPart2] = useState([]);
  const [showPart1, setShowPart1] = useState(true);
  const [showPart2, setShowPart2] = useState(false);

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

  const handleAddQuestion = (
    gender,
    question_gujarati,
    question_hindi,
    question_english,
    Part
  ) => {
    const formData = new FormData();
    console.log();
    formData.append("question[gender]", gender);
    formData.append("question[question_gujarati]", question_gujarati);
    formData.append("question[question_hindi]", question_hindi);
    formData.append("question[question_english]", question_english);
    formData.append("question[part]", Part);
    axios.post("/api/v1/questions", formData).then((res) => {
      console.log(res);
      Part === "1" ? handleGetQuestionsPart1() : handleGetQuestionsPart2();
      if (res.data) {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Added!",
          text: "Your question is added.",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    });
  };

  const editQuestion = async (val, Part) => {
    const see =
      Part === "1"
        ? getQuestionsPart1.filter((item) => item?.id === val)
        : getQuestionsPart2.filter((item) => item?.id === val);
    console.log(see);
    const { value: formValues } = await Swal.fire({
      title: "Edit the question",
      html: `
    <div class="flex flex-col items-center justify-center text-black">
      <div>
        Part:<select id="swal-input1" name="swal-input1" class="w-[15rem] p-1 mx-2 my-1.5 border border-gray-500 rounded-md">
          <option value="1" ${Part == 1 ? "selected" : ""}>1</option>
          <option value="2" ${Part == 2 ? "selected" : ""}>2</option>
        </select>
      </div>
      <div>
        Gender:<select id="swal-input2" name="swal-input2" class="w-[15rem] p-1 mx-2 my-1.5 border border-gray-500 rounded-md">
          <option value="female" ${
            see[0].gender === "female" ? "selected" : ""
          }>Female</option>
          <option value="male" ${
            see[0].gender === "male" ? "selected" : ""
          }>Male</option>
          <option value="both" ${
            see[0].gender === "both" ? "selected" : ""
          }>Both</option>
        </select>
      </div>
      <div>
        Language:<select id="swal-input3" name="swal-input3" class="w-[15rem] p-1 mx-2 my-1.5 border border-gray-500 rounded-md">
          <option value="gujarati" ${
            see[0].language === "gujarati" ? "selected" : ""
          }>Gujarati</option>
          <option value="hindi" ${
            see[0].language === "hindi" ? "selected" : ""
          }>Hindi</option>
          <option value="english" ${
            see[0].language === "english" ? "selected" : ""
          }>English</option>
        </select>
      </div>
      <div class="flex items-center">
        Question:
        <textarea rows="5" cols="30" type="text" id="swal-input4" class="w-[15rem] p-1 mx-2 my-1.5 border border-gray-500 rounded-md">${
          see[0]?.question
        }
      </textarea></div>
    </div>
  `,
      focusConfirm: false,
      showCancelButton: true,
      preConfirm: () => {
        return [
          document.getElementById("swal-input1").value,
          document.getElementById("swal-input2").value,
          document.getElementById("swal-input3").value,
          document.getElementById("swal-input4").value,
        ];
      },
    });
    if (formValues) {
      const formData = new FormData();
      formData.append("question[part]", formValues[0]);
      formData.append("question[gender]", formValues[1]);
      formData.append("question[language]", formValues[2]);
      formData.append("question[question_gujarati]", formValues[3]);
      formData.append("question[question_hindi]", formValues[4]);
      formData.append("question[question_english]", formValues[5]);
      axios.put(`api/v1/questions/${val}`, formData).then((res) => {
        console.log(res);
        Part === "1" ? handleGetQuestionsPart1() : handleGetQuestionsPart2();
        if (res.data) {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Updated!",
            text: "Your question has been updated.",
            showConfirmButton: false,
            timer: 1500,
          });
        }
      });
    }
  };

  const deleteQuestion = (val, Part) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`/api/v1/questions/${val}`)
          .then((res) => {
            console.log(res);
            Part === "1"
              ? handleGetQuestionsPart1()
              : handleGetQuestionsPart2();
            Swal.fire({
              title: "Deleted!",
              text: "Your question has been deleted.",
              icon: "success",
            });
          })
          .catch((err) => {
            console.log(err);
          });
      }
    });
  };

  useEffect(() => {
    showPart2 ? handleGetQuestionsPart2() : handleGetQuestionsPart1();
  }, [showPart1, showPart2]);

  return (
    <div className="w-full p-2">
      <div className="rounded-lg bg-card h-[85vh] bg-white">
        <div className="flex p-4 h-full flex-col space-y-8">
          <div>
            <div className="flex items-center">
              <div className="font-semibold text-xl">Questions List</div>
              <div className="flex-grow" />
              <div className="space-x-1">
                <button
                  onClick={() => {
                    setShowPart2(false);
                    setShowPart1(true);
                  }}
                  className={`px-3 py-1.5 border-[1.5px] rounded-md ${
                    showPart1
                      ? "scale-105 bg-gray-700 text-white"
                      : "bg-gray-50"
                  } hover:scale-105 border-x-gray-300`}
                >
                  Part 1
                </button>
                <button
                  onClick={() => {
                    setShowPart1(false);
                    setShowPart2(true);
                  }}
                  className={`px-3 py-1.5 rounded-md ${
                    showPart2
                      ? "scale-105 bg-gray-700 text-white"
                      : "bg-gray-50"
                  } hover:scale-105  border-x-gray-300 border-[1.5px]`}
                >
                  Part 2
                </button>
              </div>
              <div className="flex-grow" />
              <AddNewQuestion
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
                  <ThComponent name="In Hindi" />
                  <ThComponent name="In Gujarati" />
                  <ThComponent name="For" />
                  <ThComponent />
                  <ThComponent />
                  <ThComponent moreClasses={"rounded-tr-md rounded-br-md"} />
                </tr>
              </thead>
              <tbody>
                {showPart1 ? (
                  getQuestionsPart1.length === 0 ? (
                    <tr>
                      <th
                        className="uppercase tracking-wide font-medium pt-[13rem] text-lg"
                        colSpan={8}
                      >
                        No Questions found in Part 1!
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
                          <td className="py-3 px-4 border-b border-b-gray-50">
                            <TdComponent
                              things={
                                <button
                                  onClick={() => editQuestion(val.id, val.part)}
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
                ) : null}
                {showPart2 ? (
                  getQuestionsPart2.length === 0 ? (
                    <tr>
                      <th
                        className="uppercase tracking-wide font-medium pt-[13rem] text-lg"
                        colSpan={8}
                      >
                        No Questions Found in Part 2!
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
                          <td className="py-3 px-4 border-b border-b-gray-50">
                            <TdComponent
                              things={
                                <button
                                  onClick={() => editQuestion(val.id, val.part)}
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
                ) : null}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Questions;
