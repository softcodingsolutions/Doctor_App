import axios from "axios";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import ThComponent from "../../../../components/ThComponent";
import TdComponent from "../../../../components/TdComponent";
import SaveUserDetailsButton from "../../../../components/User/SaveUserDetailsButton";
import PrevPageButton from "../../../../components/Admin/PrevPageButton";
import { useForm } from "react-hook-form";

function CustomerQuestionsPart1({
  onNext,
  onBack,
  onValidate,
  storedData,
  setStoreData,
}) {
  const language = localStorage.getItem('user_selected_language');
  const gender = localStorage.getItem('user_selected_gender');
  const [getQuestionsPart1, setGetQuestionsPart1] = useState([]);
  const [selectedCheckboxes, setSelectedCheckboxes] = useState([]);

  const {
    formState: { isValid },
  } = useForm({
    mode: "onChange",
  });

  const handleGetQuestionsPart1 = () => {
    axios
      .get(
        `/api/v1/questions/part1?user_id=${localStorage.getItem("doctor_id")}`
      )
      .then((res) => {
        console.log(res.data);
        const filteredQuestions = res.data.filter(question =>
          question.gender === gender || question.gender === "both"
        );
        setGetQuestionsPart1(filteredQuestions);
      })
      .catch((err) => {
        console.log(err);
        alert(err.response?.data?.message + "!");
      });
  };

  const handleCheckboxChange = (e) => {
    const checkboxValue = e.target.value;
    const isChecked = e.target.checked;

    setSelectedCheckboxes((prevState) => 
      isChecked 
        ? [...prevState, checkboxValue] 
        : prevState.filter((value) => value !== checkboxValue)
    );
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

    setStoreData((prev) => ({
      ...prev,
      questions: selectedQuestions,
    }));

    Swal.fire({
      position: "top-end",
      icon: "success",
      title: "Saved!",
      text: `Your question has been saved.`,
      showConfirmButton: false,
      timer: 1500,
    });
    onNext();
  };

  const getQuestionText = (val) => {
    switch (language) {
      case "english":
        return val.question_in_english;
      case "hindi":
        return val.question_in_hindi;
      case "gujarati":
        return val.question_in_gujarati;
      default:
        return val.question_in_english; 
    }
  };

  useEffect(() => {
    handleGetQuestionsPart1();
  }, []);

  useEffect(() => {
    if (storedData) {
      setSelectedCheckboxes(storedData.map((q) => q.id.toString()));
    }
    onValidate(isValid);
  }, [storedData, isValid, onValidate]);



  return (
    <div className="w-full my-1.5 gap-2.5 px-2 py-2.5 flex rounded-lg bg-card bg-white flex-col content-start">
      <div className="text-xl font-semibold">User Questions</div>
      <div className="flex flex-col rounded-lg bg-card h-[78vh] w-full">
        <div className="flex w-full h-full flex-col gap-1.5">
          <div className="animate-fade-left w-full min-h-[455px] animate-delay-75 shadow-gray-400 shadow-inner border rounded-md border-gray-100 animate-once animate-ease-out overflow-auto">
            <table className="w-full z-0 text-lg overflow-auto">
              <thead className="uppercase">
                <tr className="bg-[#1F2937] text-white rounded-md">
                  <ThComponent
                    moreClasses={"rounded-tl-md rounded-bl-md"}
                    name="Select"
                  />
                  <ThComponent  />
                  <ThComponent  />
                  <ThComponent
                    moreClasses={"rounded-tr-md rounded-br-md"}
                    
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
                  getQuestionsPart1.map((val) => {
                    return (
                      <tr key={val.id}>
                        <td className="py-3 px-4 border-b border-b-gray-50 ">
                          <input
                            value={val.id}
                            checked={selectedCheckboxes.includes(val.id.toString())}
                            onChange={handleCheckboxChange}
                            type="checkbox"
                            className="size-5"
                          />
                        </td>
                        <td className="py-3 px-4 border-b border-b-gray-50">
                          <TdComponent things={getQuestionText(val)} />
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
          <div className="flex w-full justify-center gap-3 ">
            <PrevPageButton back={onBack} />
            <SaveUserDetailsButton
              function={handleSave}
              name="Save & Continue"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default CustomerQuestionsPart1;
