import axios from "axios";
import { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import Swal from "sweetalert2";
import SaveTreatmentButtons from "../../../../../components/Admin/SaveTreatmentButtons";
import TdComponent from "../../../../../components/TdComponent";
import ThComponent from "../../../../../components/ThComponent";
import SelectTreatmentButton from "../../../../../components/Admin/SelectTreatmentButton";
import InsideLoader from "../../../../InsideLoader";

function RTreatmentDos() {
  const { sendWeightReason, mappingPackages, setStoreData, storeData } =
    useOutletContext();
  const [getPredictionDos, setGetPredictionDos] = useState([]);
  const [getDos, setGetDos] = useState([]);
  const [selectedCheckboxes, setSelectedCheckboxes] = useState([]);
  const [showCheckboxes, setShowCheckboxes] = useState(false);
  const [loading, setLoading] = useState(true);

  const handleGetDos = () => {
    if (sendWeightReason) {
      const data = mappingPackages.filter((pack) => {
        return sendWeightReason[0] === pack.package.weight_reason;
      });
      console.log("Predicted Dos:", data[0]);
      setGetPredictionDos(data[0]?.package?.dos);
    }

    axios
      .get(
        `/api/v1/avoid_and_adds?user_id=${localStorage.getItem("doctor_id")}`
      )
      .then((res) => {
        console.log(
          "All the Dos",
          res.data?.avoid_and_adds.filter((res) => res.category === "do")
        );
        setGetDos(
          res.data?.avoid_and_adds.filter((res) => res.category === "do")
        );
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        alert(err.response?.data?.message + "!");
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
    const selectedDos = selectedCheckboxes
      .map((id) => getDos.find((med) => med.id === Number(id)))
      .filter((med) => med);

    if (selectedDos.length === 0) {
      return Swal.fire({
        icon: "warning",
        title: "No Dos Selected",
        text: "Please select at least one dos to save.",
      });
    }

    console.log("Selected Nutrition: ", selectedDos);
    setShowCheckboxes(false);
    const formData = new FormData();
    formData.append(
      "package[weight_reason]",
      sendWeightReason === "null" ? null : sendWeightReason
    );
    formData.append("package[medicines]", JSON.stringify(selectedDos));

    setStoreData((prev) => ({
      ...prev,
      dos: selectedDos,
    }));

    Swal.fire({
      icon: "Success",
      title: "Saved!",
      text: "Your selected dos have been saved.",
    });
  };

  useEffect(() => {
    console.log("Updated storeData: ", storeData);
  }, [storeData]);

  useEffect(() => {
    const preSelectedDos = getPredictionDos.map((val) => val.id.toString());
    console.log("pre", preSelectedDos);
    setSelectedCheckboxes(preSelectedDos);
  }, [getPredictionDos]);

  useEffect(() => {
    handleGetDos();
  }, [sendWeightReason]);

  if (loading) {
    return <InsideLoader />;
  }

  return (
    <div className="w-full">
      <div className="rounded-lg bg-card h-[74vh] bg-white ">
        <div className="flex px-4 py-3 h-full flex-col space-y-4">
          <div className="flex gap-5 text-center items-center justify-between">
            {!showCheckboxes && (
              <SelectTreatmentButton
                name="Select Dos"
                function={handleToggleCheckboxes}
              />
            )}

            {showCheckboxes && (
              <div className="font-[550] text-lg">
                No. of dos checked: {selectedCheckboxes.length}
              </div>
            )}

            {!showCheckboxes && (
              <div className="font-[550] text-lg flex items-center">
                Checked Dos -{" "}
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
                  <ThComponent name="In English" />
                  <ThComponent name="In Hindi" />
                  <ThComponent
                    moreClasses={"rounded-tr-md rounded-br-md"}
                    name="In Gujarati"
                  />
                </tr>
              </thead>
              <tbody>
                {getDos.length === 0 ? (
                  <tr>
                    <th
                      className="uppercase tracking-wide font-medium pt-[13rem] text-lg"
                      colSpan={8}
                    >
                      No Dos Found!
                    </th>
                  </tr>
                ) : (
                  getDos.map((val, index) => {
                    return (
                      <tr
                        className={`${
                          getPredictionDos.some((med) => med.id === val.id)
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
                              defaultChecked={getPredictionDos.some(
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
                          <TdComponent things={val.details_in_english} />
                        </td>
                        <td className="py-3 px-4 border-b border-b-gray-50">
                          <TdComponent things={val.details_in_hindi} />
                        </td>
                        <td className="py-3 px-4 border-b border-b-gray-50">
                          <TdComponent things={val.details_in_gujarati} />
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

export default RTreatmentDos;
