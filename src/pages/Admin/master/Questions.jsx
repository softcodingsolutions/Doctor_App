import axios from "axios";
import { useEffect, useState } from "react";
import AddNewQuestion from "../../../components/Admin/AddNewQuestion";
import ThComponent from "../../../components/ThComponent";
import TdComponent from "../../../components/TdComponent";
import { MdDelete } from "react-icons/md";
import Swal from "sweetalert2";
import EditQuestion from "../../../components/Admin/EditQuestion";
import { Option, Select } from "@mui/joy";
import InsideLoader from "../../InsideLoader";

function Questions() {
  const [getQuestionsPart1, setGetQuestionsPart1] = useState([]);
  const [getQuestionsPart2, setGetQuestionsPart2] = useState([]);
  const [editQuestion, setEditQuestion] = useState([]);
  const [showPart1, setShowPart1] = useState(true);
  const [showPart2, setShowPart2] = useState(false);
  const role = localStorage.getItem("role");
  const main_id = localStorage.getItem("main_id");
  const [getDoctors, setGetDoctors] = useState([]);
  const [getDoctorId, setGetDoctorId] = useState("all");
  const [loading, setLoading] = useState(true);
  
  const handleGetQuestionsPart1 = () => {
    axios
      .get("/api/v1/questions/part1")
      .then((res) => {
        if (role === "super_admin") {
          if (getDoctorId) {
            if (getDoctorId === "all") {
              console.log("Part1", res.data);
              setGetQuestionsPart1(res.data);
              setLoading(false);
            } else {
              console.log(
                "Particular Doctor Part 1: ",
                res.data?.filter((que) => que.user_id == getDoctorId)
              );
              setGetQuestionsPart1(
                res.data?.filter((que) => que.user_id == getDoctorId)
              );
              setLoading(false);
            }
          }
        } else if (role === "doctor") {
          console.log(
            "Particular Doctor Part 1: ",
            res.data?.filter((que) => que.user_id == main_id)
          );
          setGetQuestionsPart1(
            res.data?.filter((que) => que.user_id == main_id)
          );
          setLoading(false);
        }
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        alert(err.response?.data?.message + "!");
      });
  };

  const handleGetQuestionsPart2 = () => {
    axios
      .get("/api/v1/questions/part2")
      .then((res) => {
        if (role === "super_admin") {
          if (getDoctorId) {
            if (getDoctorId === "all") {
              console.log("Part2", res.data);
              setGetQuestionsPart2(res.data);
              setLoading(false);
            } else {
              console.log(
                "Particular Doctor Part 2: ",
                res.data?.filter((que) => que.user_id == getDoctorId)
              );
              setGetQuestionsPart2(
                res.data?.filter((que) => que.user_id == getDoctorId)
              );
              setLoading(false);
            }
          }
        } else if (role === "doctor") {
          console.log(
            "Particular Doctor Part 2: ",
            res.data?.filter((que) => que.user_id == main_id)
          );
          setGetQuestionsPart2(
            res.data?.filter((que) => que.user_id == main_id)
          );
          setLoading(false);
        }
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        alert(err.response?.data?.message + "!");
      });
  };

  const handleAddQuestion = (
    gender,
    question_gujarati,
    question_english,
    question_hindi,
    Part,
    doc_id
  ) => {
    const formData = new FormData();
    if (role === "doctor") {
      formData.append("question[gender]", gender);
      formData.append("question[question_in_english]", question_english);
      formData.append("question[question_in_hindi]", question_hindi);
      formData.append("question[question_in_gujarati]", question_gujarati);
      formData.append("question[part]", Part);
      formData.append("question[user_id]", main_id);
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
    } else {
      formData.append("question[gender]", gender);
      formData.append("question[question_in_english]", question_english);
      formData.append("question[question_in_hindi]", question_hindi);
      formData.append("question[question_in_gujarati]", question_gujarati);
      formData.append("question[part]", Part);
      formData.append("question[user_id]", doc_id);
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
    }
  };

  const handleEditQuestion = (val, part) => {
    if (
      part == "1"
        ? setEditQuestion(getQuestionsPart1.filter((item) => item?.id === val))
        : setEditQuestion(getQuestionsPart2.filter((item) => item?.id === val))
    );
  };

  const handleEditQuestionApi = async (
    gender,
    question_gujarati,
    question_english,
    question_hindi,
    part,
    id,
    doc_id
  ) => {
    const formData = new FormData();
    if (role === "doctor") {
      formData.append("question[part]", part);
      formData.append("question[gender]", gender);
      formData.append("question[question_in_english]", question_english);
      formData.append("question[question_in_hindi]", question_hindi);
      formData.append("question[question_in_gujarati]", question_gujarati);
      formData.append("question[user_id]", main_id);
      axios.put(`api/v1/questions/${id}`, formData).then((res) => {
        console.log(res);
        part == "1" ? handleGetQuestionsPart1() : handleGetQuestionsPart2();
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
    } else {
      formData.append("question[part]", part);
      formData.append("question[gender]", gender);
      formData.append("question[question_in_english]", question_english);
      formData.append("question[question_in_hindi]", question_hindi);
      formData.append("question[question_in_gujarati]", question_gujarati);
      formData.append("question[user_id]", doc_id);
      axios.put(`api/v1/questions/${id}`, formData).then((res) => {
        console.log(res);
        part == "1" ? handleGetQuestionsPart1() : handleGetQuestionsPart2();
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
            alert(err.response?.data?.message + "!");
          });
      }
    });
  };

  const handleGetDoctors = () => {
    axios
      .get(`/api/v1/users`)
      .then((res) => {
        console.log(
          "Doctors: ",
          res.data?.users?.filter((user) => user.role === "doctor")
        );
        setGetDoctors(
          res.data?.users?.filter((user) => user.role === "doctor")
        );
      })
      .catch((err) => {
        console.log(err);
        alert(err.response?.data?.message + "!");
      });
  };

  useEffect(() => {
    handleGetDoctors();
  }, [getDoctorId]);

  useEffect(() => {
    showPart2 ? handleGetQuestionsPart2() : handleGetQuestionsPart1();
  }, [showPart1, showPart2, getDoctorId]);

  if (loading) {
    return <InsideLoader />;
  }

  return (
    <div className="w-full p-2">
      <div className="rounded-lg bg-card h-[85vh] bg-white">
        <div className="flex px-4 py-3 h-full flex-col space-y-4">
          <div className="flex items-center justify-between">
            <div className="font-semibold text-xl">Questions List</div>
            <div className="space-x-1">
              <button
                onClick={() => {
                  setShowPart2(false);
                  setShowPart1(true);
                }}
                className={`px-3 py-1.5 border-[1.5px] rounded-md ${
                  showPart1 ? "scale-105 bg-gray-700 text-white" : "bg-gray-50"
                } hover:scale-105 border-x-gray-300`}
              >
                Part 1
              </button>
              <button
                onClick={() => {
                  setLoading(true);
                  setShowPart1(false);
                  setShowPart2(true);
                }}
                className={`px-3 py-1.5 rounded-md ${
                  showPart2 ? "scale-105 bg-gray-700 text-white" : "bg-gray-50"
                } hover:scale-105  border-x-gray-300 border-[1.5px]`}
              >
                Part 2
              </button>
            </div>
            <div className="flex gap-3">
              <AddNewQuestion
                handleApi={handleAddQuestion}
                gender="gender"
                language="Language"
                role={role}
                doctors={getDoctors}
                part="Part"
                name="Add Question"
                title="Add New Question"
                label1="For Whom"
                label2="Question"
              />
              {role === "super_admin" && (
                <Select
                  required
                  defaultValue={"all"}
                  placeholder="Select"
                  value={getDoctorId}
                  onChange={(e, newValue) => setGetDoctorId(newValue)}
                >
                  <Option key={"all"} value="all">
                    All
                  </Option>
                  {getDoctors?.map((res) => {
                    return (
                      <Option key={res.id} value={res.id}>
                        {res.first_name + " " + res.last_name}
                      </Option>
                    );
                  })}
                </Select>
              )}
            </div>
          </div>

          <div className="animate-fade-left animate-delay-75 shadow-gray-400 shadow-inner border rounded-md border-gray-100 animate-once animate-ease-out overflow-auto h-[93%]">
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
                            <div className="flex items-center">
                              {index + 1 }
                            </div>
                          </td>
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
                          <td className="py-3 px-4 border-b border-b-gray-50">
                            <EditQuestion
                              see={editQuestion}
                              function={() => {
                                handleEditQuestion(val.id, val.part);
                              }}
                              handleApi={handleEditQuestionApi}
                              gender="gender"
                              language="Language"
                              role={role}
                              doctors={getDoctors}
                              part="Part"
                              title="Edit Question"
                              label1="For Whom"
                              label2="Question"
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
                            <div className="flex items-center">
                              {index + 1 }
                            </div>{" "}
                          </td>
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
                          <td className="py-3 px-4 border-b border-b-gray-50">
                            <EditQuestion
                              see={editQuestion}
                              function={() => {
                                handleEditQuestion(val.id, val.part);
                              }}
                              handleApi={handleEditQuestionApi}
                              gender="gender"
                              language="Language"
                              part="Part"
                              title="Edit Question"
                              role={role}
                              doctors={getDoctors}
                              label1="For Whom"
                              label2="Question"
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
