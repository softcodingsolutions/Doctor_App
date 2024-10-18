import axios from "axios";
import { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import TdComponent from "../../../../../components/TdComponent";
import ThComponent from "../../../../../components/ThComponent";
import InsideLoader from "../../../../InsideLoader";

function RTreatmentDiet() {
  const { sendWeightReason, mappingPackages, setStoreData, storeData } =
    useOutletContext();
  const [getPredictionDiet, setGetPredictionDiet] = useState([]);
  const [getDiet, setGetDiet] = useState([]);
  const [selectedCheckboxes, setSelectedCheckboxes] = useState([]);
  const [selectAll, setSelectAll] = useState(false); // Added for "Select All" checkbox
  const [loading, setLoading] = useState(true);

  const handleGetDiet = () => {
    if (sendWeightReason) {
      const data = mappingPackages.filter((pack) => {
        return sendWeightReason[0] === pack.package.weight_reason;
      });
      setGetPredictionDiet(data[0]?.package?.diet);
      console.log("Predicted Diet:", data[0]?.package?.diet);
    }

    axios
      .get(`/api/v1/diets?user_id=${localStorage.getItem("doctor_id")}`)
      .then((res) => {
        console.log("All the Diet:", res.data);
        setGetDiet(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        alert(err.response?.data?.message + "!");
      });
  };

  useEffect(() => {
    handleGetDiet();
  }, [sendWeightReason]);

  useEffect(() => {
    if (storeData.diet) {
      const selectedDietIds = storeData.diet.map((diet) => diet.id.toString());
      setSelectedCheckboxes(selectedDietIds);
    }
  }, [storeData.diet]);

  const handleCheckboxChange = (e) => {
    const checkboxValue = e.target.value;
    const isChecked = e.target.checked;

    let updatedCheckboxes;
    if (isChecked) {
      updatedCheckboxes = [...selectedCheckboxes, checkboxValue];
    } else {
      updatedCheckboxes = selectedCheckboxes.filter(
        (value) => value !== checkboxValue
      );
      setSelectAll(false); // Uncheck "Select All" if any individual checkbox is unchecked
    }

    setSelectedCheckboxes(updatedCheckboxes);

    const selectedDiet = updatedCheckboxes
      .map((id) => getDiet.find((diet) => diet.id === Number(id)))
      .filter((diet) => diet);

    setStoreData((prev) => ({
      ...prev,
      diet: selectedDiet,
    }));
  };

  // Handle "Select All" checkbox
  const handleSelectAll = () => {
    if (!selectAll) {
      // When checked, select all predicted diets
      const allMappedDietIds = getPredictionDiet.map((diet) =>
        diet.id.toString()
      );
      setSelectedCheckboxes(allMappedDietIds);

      const allMappedDiets = allMappedDietIds
        .map((id) => getDiet.find((diet) => diet.id === Number(id)))
        .filter((diet) => diet);

      setStoreData((prev) => ({
        ...prev,
        diet: allMappedDiets,
      }));
    } else {
      // When unchecked, deselect all
      setSelectedCheckboxes([]);
      setStoreData((prev) => ({
        ...prev,
        diet: [],
      }));
    }
    setSelectAll(!selectAll);
  };

  const predictedDiets = getDiet.filter((diet) =>
    getPredictionDiet.some((med) => med.id === diet.id)
  );

  const otherDiets = getDiet.filter(
    (diet) => !getPredictionDiet.some((med) => med.id === diet.id)
  );

  const sortedDiets = [...predictedDiets, ...otherDiets];

  if (loading) {
    return <InsideLoader />;
  }

  return (
    <div className="w-full">
      <div className="rounded-lg bg-card h-[65vh] bg-white ">
        <div className="flex px-4 py-3 h-full flex-col space-y-4">
          <div className="flex flex-col md:flex-row gap-5 text-center items-center justify-between">
            <div className="font-[550] text-lg">
              No. of Diets checked: {selectedCheckboxes.length}
            </div>

            <div className="font-[550] text-lg flex items-center">
              Mapped Diet -{" "}
              <div className="ml-2 bg-gray-400 border border-gray-200 w-5 h-5"></div>
            </div>
          </div>

          <div className="animate-fade-left animate-delay-75 shadow-gray-400 shadow-inner border rounded-md border-gray-100 animate-once animate-ease-out overflow-auto h-[75vh]">
            <table className="w-full min-w-[460px] z-0">
              <thead className="uppercase ">
                <tr className="bg-[#1F2937] text-white rounded-md">
                  <th className="py-3 px-4">
                    <input
                      type="checkbox"
                      onChange={handleSelectAll}
                      checked={selectAll}
                    />
                  </th>
                  <ThComponent name="Diet Code" />
                  <ThComponent name="Diet Name" />
                  <ThComponent name="In English" />
                  <ThComponent name="In Hindi" />
                  <ThComponent name="In Gujarati" />
                </tr>
              </thead>
              <tbody>
                {sortedDiets.length === 0 ? (
                  <tr>
                    <th
                      className="uppercase tracking-wide font-medium pt-[13rem] text-lg"
                      colSpan={8}
                    >
                      No Diet Found!
                    </th>
                  </tr>
                ) : (
                  sortedDiets.map((val) => {
                    return (
                      <tr
                        className={`${
                          getPredictionDiet.some((med) => med.id === val.id)
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
                          <TdComponent things={val.code} />
                        </td>
                        <td className="py-3 px-4 border-b border-b-gray-50">
                          <TdComponent things={val.name} />
                        </td>
                        <td className="py-3 px-4 border-b border-b-gray-50">
                          <TdComponent
                            things={
                              <div
                                dangerouslySetInnerHTML={{
                                  __html: val.chart_english,
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
                                  __html: val.chart_hindi,
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
                                  __html: val.chart_gujarati,
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
        </div>
      </div>
    </div>
  );
}

export default RTreatmentDiet;
