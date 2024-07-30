import axios from "axios";
import { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import Swal from "sweetalert2";
import SaveTreatmentButtons from "../../../../../components/Admin/SaveTreatmentButtons";
import TdComponent from "../../../../../components/TdComponent";
import ThComponent from "../../../../../components/ThComponent";
import SelectTreatmentButton from "../../../../../components/Admin/SelectTreatmentButton";

function RTreatmentExercise() {
  const { sendWeightReason, mappingPackages, setStoreData, storeData } =
    useOutletContext();
  const [getPredictionExercise, setGetPredictionExercise] = useState([]);
  const [getExercise, setGetExercise] = useState([]);
  const [selectedCheckboxes, setSelectedCheckboxes] = useState([]);
  const [showCheckboxes, setShowCheckboxes] = useState(false);

  const handleGetExercise = () => {
    if (sendWeightReason) {
      const data = mappingPackages.filter((pack) => {
        return sendWeightReason[0] === pack.package.weight_reason;
      });
      console.log("Predicted Exercises:", data[0]);
      setGetPredictionExercise(data[0]?.package?.exercise);
    }

    axios
      .get(`/api/v1/exercises?user_id=${localStorage.getItem("doctor_id")}}`)
      .then((res) => {
        console.log("All the Exercise:", res.data);
        setGetExercise(res.data);
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
    const selectedExercise = selectedCheckboxes
      .map((id) => getExercise.find((med) => med.id === Number(id)))
      .filter((med) => med);

    if (selectedExercise.length === 0) {
      return Swal.fire({
        icon: "warning",
        title: "No Exercise Selected",
        text: "Please select at least one exercise to save.",
      });
    }

    console.log("Selected Exercise: ", selectedExercise);
    setShowCheckboxes(false);
    const formData = new FormData();
    formData.append(
      "package[weight_reason]",
      sendWeightReason === "null" ? null : sendWeightReason
    );
    formData.append("package[medicines]", JSON.stringify(selectedExercise));

    setStoreData((prev) => ({
      ...prev,
      exercise: selectedExercise,
    }));
  };

  useEffect(() => {
    console.log("Updated storeData: ", storeData);
  }, [storeData]);

  useEffect(() => {
    const preSelectedExercise = getPredictionExercise.map((val) =>
      val.id.toString()
    );
    console.log("pre", preSelectedExercise);
    setSelectedCheckboxes(preSelectedExercise);
  }, [getPredictionExercise]);

  useEffect(() => {
    handleGetExercise();
  }, [sendWeightReason]);

  return (
    <div className="w-full">
      <div className="rounded-lg bg-card h-[75vh] bg-white ">
        <div className="flex px-4 py-3 h-full flex-col space-y-4">
          <div className="flex gap-5 text-center items-center justify-between">
            {!showCheckboxes && (
              <SelectTreatmentButton
                name="Select Exercise / Yoga"
                function={handleToggleCheckboxes}
              />
            )}

            {showCheckboxes && (
              <div className="font-[550] text-lg">
                No. of exercise checked: {selectedCheckboxes.length}
              </div>
            )}

            {!showCheckboxes && (
              <div className="font-[550] text-lg flex items-center">
                Checked Exercise -{" "}
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
                  <ThComponent name="Exercise Name" />
                  <ThComponent name="In English" />
                  <ThComponent name="In Hindi" />
                  <ThComponent
                    moreClasses={"rounded-tr-md rounded-br-md"}
                    name="In Gujarati"
                  />
                </tr>
              </thead>
              <tbody>
                {getExercise.length === 0 ? (
                  <tr>
                    <th
                      className="uppercase tracking-wide font-medium pt-[13rem] text-lg"
                      colSpan={8}
                    >
                      No Exercises Found!
                    </th>
                  </tr>
                ) : (
                  getExercise.map((val, index) => {
                    return (
                      <tr
                        className={`${
                          getPredictionExercise.some((med) => med.id === val.id)
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
                              defaultChecked={getPredictionExercise.some(
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
                        <td className="py-3 px-4 border-b border-b-gray-50">
                          <TdComponent
                            things={
                              <div
                                dangerouslySetInnerHTML={{
                                  __html: val.details,
                                }}
                              />
                            }
                          />
                        </td>
                        <td className="py-3 px-4 border-b border-b-gray-50">
                          <TdComponent
                            things={
                              <div
                                dangerouslySetInnerHTML={{
                                  __html: val.details_hindi,
                                }}
                              />
                            }
                          />
                        </td>
                        <td className="py-3 px-4 border-b border-b-gray-50">
                          <TdComponent
                            things={
                              <div
                                dangerouslySetInnerHTML={{
                                  __html: val.details_gujarati,
                                }}
                              />
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

export default RTreatmentExercise;
