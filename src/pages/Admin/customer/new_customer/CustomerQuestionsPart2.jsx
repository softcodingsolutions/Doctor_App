import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import ThComponent from "../../../../components/ThComponent";
import TdComponent from "../../../../components/TdComponent";
import SaveUserDetailsButton from "../../../../components/User/SaveUserDetailsButton";
import axios from "axios";
import PrevPageButton from "../../../../components/Admin/PrevPageButton";
import { useForm } from "react-hook-form";

function CustomerQuestionsPart2({
  onBack,
  onNext,
  onValidate,
  storedData,
  setStoreData,
}) {
  const [getQuestionsPart2, setGetQuestionsPart2] = useState([]);
  const [selectedCheckboxes, setSelectedCheckboxes] = useState([]);
  const {
    formState: { isValid },
  } = useForm({
    mode: "onChange",
  });

  const handleGetQuestionsPart2 = () => {
    axios
      .get(
        `/api/v1/questions/part2?user_id=${localStorage.getItem("doctor_id")}`
      )
      .then((res) => {
        console.log(res.data);
        setGetQuestionsPart2(res.data);
      })
      .catch((err) => {
        console.log(err);
        alert(err.response?.data?.message + "!");
      });
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

  const handleSave = async () => {
    const selectedQuestions = selectedCheckboxes
      .map((id) =>
        getQuestionsPart2.find((question) => question.id === Number(id))
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

    setStoreData((prev) => ({
      ...prev,
      diagnosis: selectedQuestions,
    }));

    Swal.fire({
      position: "top-end",
      icon: "success",
      title: "Saved!",
      text: `Your diagnosis questions has been saved.`,
      showConfirmButton: false,
      timer: 1500,
    });
    onNext();
  };

  useEffect(() => {
    if (storedData) {
      setSelectedCheckboxes(storedData.map((q) => q.id.toString()));
    }
    handleGetQuestionsPart2();
  }, []);

  useEffect(() => {
    onValidate(isValid);
  }, [isValid, onValidate]);

  return (
    <div className="w-full m-5 gap-2 overflow-auto flex rounded-lg bg-card h-[87%] bg-white flex-wrap content-start p-2 px-4">
      <div className="text-xl font-semibold">User Diagnosis</div>
      <div className="flex flex-col rounded-lg bg-card h-[75vh] w-full">
        <div className="flex w-full h-full flex-col gap-1.5 ">
          <div className="animate-fade-left w-full min-h-[515px] animate-delay-75 shadow-gray-400 shadow-inner border rounded-md border-gray-100 animate-once animate-ease-out overflow-auto">
            <table className="w-full z-0">
              <thead className="uppercase">
                <tr className="bg-[#1F2937] text-white rounded-md">
                  <ThComponent
                    moreClasses={"rounded-tl-md rounded-bl-md"}
                    name="Select"
                  />
                  <ThComponent name="In English" />
                  <ThComponent name="In Hindi" />
                  <ThComponent
                    moreClasses={"rounded-tr-md rounded-br-md"}
                    name="In Gujarati"
                  />
                </tr>
              </thead>
              <tbody>
                {getQuestionsPart2.length === 0 ? (
                  <tr>
                    <th
                      className="uppercase tracking-wide font-medium pt-[13rem] text-lg"
                      colSpan={8}
                    >
                      No Questions Found in Part-1!
                    </th>
                  </tr>
                ) : (
                  getQuestionsPart2.map((val) => {
                    return (
                      <tr key={val.id}>
                        <td className="py-3 px-4 border-b border-b-gray-50">
                          <input
                            value={val.id}
                            checked={selectedCheckboxes.includes(
                              val.id.toString()
                            )}
                            onChange={handleCheckboxChange}
                            type="checkbox"
                            className="size-4"
                          />
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
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
          <div className="flex w-full justify-center gap-3 mt-2">
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

export default CustomerQuestionsPart2;
