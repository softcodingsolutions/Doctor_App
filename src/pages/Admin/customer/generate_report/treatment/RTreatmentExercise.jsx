import { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import Swal from "sweetalert2";
import TdComponent from "../../../../../components/TdComponent";
import ThComponent from "../../../../../components/ThComponent";
import InsideLoader from "../../../../InsideLoader";
import axios from "axios";

function RTreatmentExercise() {
  const { sendWeightReason, mappingPackages, setStoreData, storeData } =
    useOutletContext();
  const [getPredictionExercise, setGetPredictionExercise] = useState([]);
  const [getExercise, setGetExercise] = useState([]);
  const [selectedCheckboxes, setSelectedCheckboxes] = useState([]);
  const [selectAllChecked, setSelectAllChecked] = useState(false); // Added for "Select All"
  const [loading, setLoading] = useState(true);

  const handleGetExercise = () => {
    if (sendWeightReason) {
      const data = mappingPackages.filter(
        (pack) => sendWeightReason[0] === pack.package.weight_reason
      );
      setGetPredictionExercise(data[0]?.package?.exercise || []);
    }

    axios
      .get(`/api/v1/exercises?user_id=${localStorage.getItem("doctor_id")}`)
      .then((res) => {
        setGetExercise(res.data);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: err.response?.data?.message || "An error occurred!",
        });
      });
  };

  useEffect(() => {
    // Fetch exercises and initialize selected checkboxes
    handleGetExercise();
    if (storeData.exercise) {
      const selectedExerciseIds = storeData.exercise.map((ex) =>
        ex.id.toString()
      );
      setSelectedCheckboxes(selectedExerciseIds);
    }
  }, [sendWeightReason]);

  // Function to handle individual checkbox changes
  const handleCheckboxChange = (e) => {
    const checkboxValue = e.target.value;
    const isChecked = e.target.checked;

    const updatedCheckboxes = isChecked
      ? [...selectedCheckboxes, checkboxValue]
      : selectedCheckboxes.filter((value) => value !== checkboxValue);

    setSelectedCheckboxes(updatedCheckboxes);

    const selectedExercise = updatedCheckboxes
      .map((id) => getExercise.find((ex) => ex.id === Number(id)))
      .filter((ex) => ex);

    setStoreData((prev) => ({
      ...prev,
      exercise: selectedExercise,
    }));
  };

  // Function to handle "Select All" checkbox changes
  const handleSelectAllChange = (e) => {
    const isChecked = e.target.checked;
    setSelectAllChecked(isChecked);

    const predictedIds = getPredictionExercise.map((pred) =>
      pred.id.toString()
    );

    if (isChecked) {
      // Add all predicted exercises to selected checkboxes
      const allSelected = [
        ...new Set([...selectedCheckboxes, ...predictedIds]),
      ];
      setSelectedCheckboxes(allSelected);
    } else {
      // Remove all predicted exercises from selected checkboxes
      const remainingSelected = selectedCheckboxes.filter(
        (id) => !predictedIds.includes(id)
      );
      setSelectedCheckboxes(remainingSelected);
    }

    const updatedSelectedExercises = getExercise.filter((ex) =>
      (isChecked
        ? [...new Set([...selectedCheckboxes, ...predictedIds])]
        : selectedCheckboxes.filter((id) => !predictedIds.includes(id))
      ).includes(ex.id.toString())
    );

    setStoreData((prev) => ({
      ...prev,
      exercise: updatedSelectedExercises,
    }));
  };

  const predictedExercises = getExercise.filter((ex) =>
    getPredictionExercise.some((pred) => pred.id === ex.id)
  );

  const otherExercises = getExercise.filter(
    (ex) => !getPredictionExercise.some((pred) => pred.id === ex.id)
  );

  const sortedExercises = [...predictedExercises, ...otherExercises];

  if (loading) {
    return <InsideLoader />;
  }

  return (
    <div className="w-full">
      <div className="rounded-lg bg-card h-[65vh] bg-white">
        <div className="flex px-4 py-3 h-full flex-col space-y-4">
          <div className="flex flex-col md:flex-row gap-5 text-center items-center justify-between">
            <div className="font-[550] text-lg">
              No. of exercises checked: {selectedCheckboxes.length}
            </div>
            <div className="font-[550] text-lg flex items-center">
              Mapped Exercise -{" "}
              <div className="ml-2 bg-gray-400 border border-gray-200 w-5 h-5"></div>
            </div>
          </div>

          <div className="animate-fade-left animate-delay-75 shadow-gray-400 shadow-inner border rounded-md border-gray-100 animate-once animate-ease-out overflow-auto h-[75vh]">
            <table className="w-full min-w-[460px] z-0">
              <thead className="uppercase">
                <tr className="bg-[#1F2937] text-white rounded-md">
                  <th className="rounded-tl-md rounded-bl-md px-4 py-2">
                    <input
                      type="checkbox"
                      className="size-4"
                      checked={selectAllChecked}
                      onChange={handleSelectAllChange}
                    />
                  </th>
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
                {sortedExercises.length === 0 ? (
                  <tr>
                    <th
                      className="uppercase tracking-wide font-medium pt-[13rem] text-lg"
                      colSpan={8}
                    >
                      No Exercises Found!
                    </th>
                  </tr>
                ) : (
                  sortedExercises.map((val) => (
                    <tr
                      className={`${
                        getPredictionExercise.some((pred) => pred.id === val.id)
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
                          checked={selectedCheckboxes.includes(
                            val.id.toString()
                          )}
                        />
                      </td>
                      <td className="py-3 px-4 border-b border-b-gray-50">
                        <TdComponent things={val.name} />
                      </td>
                      <td className="py-3 px-4 border-b border-b-gray-50">
                        <TdComponent
                          things={
                            <div
                              dangerouslySetInnerHTML={{ __html: val.details }}
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
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RTreatmentExercise;
