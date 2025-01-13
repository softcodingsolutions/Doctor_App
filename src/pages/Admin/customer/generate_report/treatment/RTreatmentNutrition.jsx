import { useEffect, useState } from "react";
import TdComponent from "../../../../../components/TdComponent";
import ThComponent from "../../../../../components/ThComponent";
import InsideLoader from "../../../../InsideLoader";
import axios from "axios";
import { useOutletContext } from "react-router-dom";

function RTreatmentNutrition() {
  const { sendWeightReason, mappingPackages, setStoreData, storeData } =
    useOutletContext();
  const [getPredictionNutrition, setGetPredictionNutrition] = useState([]);
  const [getNutrition, setGetNutrition] = useState([]);
  const [selectedCheckboxes, setSelectedCheckboxes] = useState([]);
  const [selectAll, setSelectAll] = useState(false); // New state for "select all"
  const [loading, setLoading] = useState(true);

  const handleGetNutrition = () => {
    if (sendWeightReason) {
      const data = mappingPackages.filter((pack) => {
        return sendWeightReason[0] === pack.package.weight_reason;
      });
      setGetPredictionNutrition(data[0]?.package?.nutrition || []);
    }

    axios
      .get(`/api/v1/nutritions?user_id=${localStorage.getItem("doctor_id")}`)
      .then((res) => {
        setGetNutrition(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
        alert(err.response?.data?.message || "An error occurred!");
      });
  };

  useEffect(() => {
    handleGetNutrition();
  }, [sendWeightReason]);

  useEffect(() => {
    if (storeData.nutrition) {
      const selectedNutritionIds = storeData.nutrition.map((nut) =>
        nut.id.toString()
      );
      setSelectedCheckboxes(selectedNutritionIds);
    }
  }, [storeData.nutrition]);

  const handleCheckboxChange = (e) => {
    const checkboxValue = e.target.value;
    const isChecked = e.target.checked;

    const updatedCheckboxes = isChecked
      ? [...selectedCheckboxes, checkboxValue]
      : selectedCheckboxes.filter((value) => value !== checkboxValue);

    setSelectedCheckboxes(updatedCheckboxes);

    const selectedNutrition = updatedCheckboxes
      .map((id) => getNutrition.find((nut) => nut.id === Number(id)))
      .filter((nut) => nut);

    setStoreData((prev) => ({
      ...prev,
      nutrition: selectedNutrition,
    }));
  };

  // Handler for the "select all" checkbox
  const handleSelectAllChange = (e) => {
    const isChecked = e.target.checked;
    setSelectAll(isChecked);

    if (isChecked) {
      // Select all mapped nutrition items
      const allMappedIds = getPredictionNutrition.map((nut) =>
        nut.id.toString()
      );
      setSelectedCheckboxes(allMappedIds);

      const selectedNutrition = getNutrition.filter((nut) =>
        allMappedIds.includes(nut.id.toString())
      );
      setStoreData((prev) => ({
        ...prev,
        nutrition: selectedNutrition,
      }));
    } else {
      // Deselect all
      setSelectedCheckboxes([]);
      setStoreData((prev) => ({
        ...prev,
        nutrition: [],
      }));
    }
  };

  const predictedNutritions = getNutrition.filter((nut) =>
    getPredictionNutrition.some((pred) => pred.id === nut.id)
  );

  const otherNutritions = getNutrition.filter(
    (nut) => !getPredictionNutrition.some((pred) => pred.id === nut.id)
  );

  const sortedNutritions = [...predictedNutritions, ...otherNutritions];

  if (loading) {
    return <InsideLoader />;
  }

  return (
    <div className="w-full">
      <div className="rounded-lg bg-card h-[65vh] bg-white">
        <div className="flex px-4 py-3 h-full flex-col space-y-4">
          <div className="flex flex-col md:flex-row gap-5 text-center items-center justify-between">
            <div className="font-[550] text-lg">
              No. of nutrition checked: {selectedCheckboxes.length}
            </div>

            <div className="font-[550] text-lg flex items-center">
              Mapped Nutrition -{" "}
              <div className="ml-2 bg-gray-400 border border-gray-200 w-5 h-5"></div>
            </div>
          </div>

          <div className="animate-fade-left animate-delay-75 shadow-gray-400 shadow-inner border rounded-md border-gray-100 animate-once animate-ease-out overflow-auto h-[75vh]">
            <table className="w-full min-w-[460px] z-0">
              <thead className="uppercase">
                <tr className="bg-[#1F2937] text-white rounded-md">
                  <ThComponent
                    moreClasses={"rounded-tl-md rounded-bl-md"}
                    name={
                      <input
                        type="checkbox"
                        onChange={handleSelectAllChange}
                        checked={selectAll}
                      />
                    }
                  />
                  <ThComponent
                    moreClasses={"rounded-tr-md rounded-br-md"}
                    name="Nutrition Name"
                  />
                </tr>
              </thead>
              <tbody>
                {sortedNutritions.length === 0 ? (
                  <tr>
                    <th
                      className="uppercase tracking-wide font-medium pt-[13rem] text-lg"
                      colSpan={2}
                    >
                      No Nutrition & Supplements Found!
                    </th>
                  </tr>
                ) : (
                  sortedNutritions.map((val) => (
                    <tr
                      className={`${
                        getPredictionNutrition.some((nut) => nut.id === val.id)
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

export default RTreatmentNutrition;
