import PrevPageButton from "../../../components/Admin/PrevPageButton";
import NextPageButton from "../../../components/Admin/NextPageButton";
import TdComponent from "../../../components/TdComponent";
import ThComponent from "../../../components/ThComponent";
import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";

function TreatmentNutrition() {
  const [getNutrition, setGetNutrition] = useState([]);
  const [selectedCheckboxes, setSelectedCheckboxes] = useState([]);
  const [showCheckboxes, setShowCheckboxes] = useState(false);

  const handleGetNutrition = () => {
    axios
      .get("/api/v1/nutritions")
      .then((res) => {
        console.log(res.data);
        setGetNutrition(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleToggleCheckboxes = () => {
    setShowCheckboxes(!showCheckboxes);
  };

  const handleCheckboxChange = (event) => {
    const checkboxValue = event.target.value;
    setSelectedCheckboxes((prevCheckboxes) => {
      if (prevCheckboxes.includes(checkboxValue)) {
        return prevCheckboxes.filter((val) => val !== checkboxValue);
      } else {
        return [...prevCheckboxes, checkboxValue];
      }
    });
  };

  const handleSave = () => {
    console.log("Selected checkboxes:", selectedCheckboxes);
    selectedCheckboxes.map((res) => {
      console.log(getNutrition.find((val) => val.id === Number(res)));
    });
    setSelectedCheckboxes([]);
    setShowCheckboxes(false);
  };

  useEffect(() => {
    handleGetNutrition();
  }, []);

  return (
    <div className="w-full p-2">
      <div className="rounded-lg bg-card h-[85vh] bg-white">
        <div className="flex px-4 py-3 h-full flex-col space-y-3">
          <div className="flex gap-5 text-center items-center justify-between">
            {!showCheckboxes ? (
              <button
                type="button"
                onClick={handleToggleCheckboxes}
                className={`p-1.5 border-[1.5px] border-gray-400 rounded-md hover:text-white hover:bg-green-600`}
              >
                Select Nutritions
              </button>
            ) : (
              <button
                type="button"
                onClick={handleSave}
                className={`p-1.5 border-[1.5px] border-gray-400 rounded-md hover:text-white hover:bg-green-600`}
              >
                Save
              </button>
            )}
            <div className="font-[550] text-lg">
              No. of nutritions checked: {selectedCheckboxes.length}
            </div>
          </div>
          <div className="animate-fade-left animate-delay-75 shadow-gray-400 shadow-inner border rounded-md border-gray-100 animate-once animate-ease-out overflow-auto h-[93%]">
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
                      <tr key={val.id}>
                        {showCheckboxes && (
                          <td className="py-3 px-4 border-b border-b-gray-50">
                            <input
                              value={val.id}
                              onChange={handleCheckboxChange}
                              type="checkbox"
                              defaultChecked={selectedCheckboxes.includes(
                                val.id
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
          <div className="flex justify-between">
            <PrevPageButton to="../exercise" />
            <NextPageButton to="../dos" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default TreatmentNutrition;
