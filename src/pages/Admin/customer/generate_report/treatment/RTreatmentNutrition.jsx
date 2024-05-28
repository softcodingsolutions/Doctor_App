import { useEffect, useState } from "react";
import SaveTreatmentButtons from "../../../../../components/Admin/SaveTreatmentButtons";
import TdComponent from "../../../../../components/TdComponent";
import ThComponent from "../../../../../components/ThComponent";
import SelectTreatmentButton from "../../../../../components/Admin/SelectTreatmentButton";
import Swal from "sweetalert2";
import axios from "axios";
import { useOutletContext } from "react-router-dom";

function RTreatmentNutrition() {
  const context = useOutletContext();
  const [getPredictionNutrition, setGetPredictionNutrition] = useState([]);
  const [getNutrition, setGetNutrition] = useState([]);
  const [selectedCheckboxes, setSelectedCheckboxes] = useState([]);
  const [showCheckboxes, setShowCheckboxes] = useState(false);

  const handleGetNutrition = () => {
    if (context[0]) {
      const data = context[1].filter((pack) => {
        return context[0][0] === pack.package.weight_reason;
      });
      console.log("Predicted Nutritions:", data[0]);
      setGetPredictionNutrition(data[0]?.package?.nutrition);
    }

    axios
      .get("/api/v1/nutritions")
      .then((res) => {
        console.log("All the Nutritions:", res.data);
        setGetNutrition(res.data);
      })
      .catch((err) => {
        console.log(err);
        alert(err.message);
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

  const handleSave = async () => {
    const selectedNutrition = selectedCheckboxes
      .map((id) => getNutrition.find((med) => med.id === Number(id)))
      .filter((med) => med);

    if (selectedNutrition.length === 0) {
      return Swal.fire({
        icon: "warning",
        title: "No Nutrition Selected",
        text: "Please select at least one nutrition to save.",
      });
    }

    console.log("Selected Nutrition: ", selectedNutrition);
    setShowCheckboxes(false);
    const formData = new FormData();
    formData.append(
      "treatment_package[weight_reason]",
      context[0] === "null" ? null : context[0]
    );
    formData.append(
      "treatment_package[nutrition]",
      JSON.stringify(selectedNutrition)
    );

  };

  useEffect(() => {
    const preSelectedNutrition = getPredictionNutrition.map((val) =>
      val.id.toString()
    );
    console.log("pre", preSelectedNutrition);
    setSelectedCheckboxes(preSelectedNutrition);
  }, [getPredictionNutrition]);

  useEffect(() => {
    handleGetNutrition();
  }, [context]);

  return (
    <div className="w-full">
      <div className="rounded-lg bg-card h-[75vh] bg-white ">
        <div className="flex px-4 py-3 h-full flex-col space-y-4">
          <div className="flex gap-5 text-center items-center justify-between">
            {!showCheckboxes && (
              <SelectTreatmentButton
                name="Select Nutrition / Supplements"
                function={handleToggleCheckboxes}
              />
            )}

            {showCheckboxes && (
              <div className="font-[550] text-lg">
                No. of nutrition checked: {selectedCheckboxes.length}
              </div>
            )}

            {!showCheckboxes && (
              <div className="font-[550] text-lg flex items-center">
                Checked Nutrition -{" "}
                <div className="ml-2 bg-gray-400 border border-gray-200 size-5"></div>
              </div>
            )}
          </div>

          <div className="animate-fade-left animate-delay-75 shadow-gray-400 shadow-inner border rounded-md border-gray-100 animate-once animate-ease-out overflow-auto h-[95%]">
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
                  <ThComponent
                    moreClasses={"rounded-tr-md rounded-br-md"}
                    name="Nutrition Name"
                  />
                </tr>
              </thead>
              <tbody>
                {getNutrition.length === 0 ? (
                  <tr>
                    <th
                      className="uppercase tracking-wide font-medium pt-[13rem] text-lg"
                      colSpan={8}
                    >
                      No Nutrition & Supplements Found!
                    </th>
                  </tr>
                ) : (
                  getNutrition.map((val, index) => {
                    return (
                      <tr
                        className={`${
                          getPredictionNutrition.some(
                            (med) => med.id === val.id
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
                              defaultChecked={getPredictionNutrition.some(
                                (med) => med.id === val.id
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
                          <TdComponent things={val.name} />
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
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

export default RTreatmentNutrition;
