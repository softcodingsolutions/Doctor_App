import { useEffect, useState } from "react";
import SaveTreatmentButtons from "../../../../../components/Admin/SaveTreatmentButtons";
import TdComponent from "../../../../../components/TdComponent";
import ThComponent from "../../../../../components/ThComponent";
import Swal from "sweetalert2";
import axios from "axios";
import { useOutletContext } from "react-router-dom";
import InsideLoader from "../../../../InsideLoader";

function RTreatmentNutrition() {
  const { sendWeightReason, mappingPackages, setStoreData, storeData } =
    useOutletContext();
  const [getPredictionNutrition, setGetPredictionNutrition] = useState([]);
  const [getNutrition, setGetNutrition] = useState([]);
  const [selectedCheckboxes, setSelectedCheckboxes] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleGetNutrition = () => {
    if (sendWeightReason) {
      const data = mappingPackages.filter((pack) => {
        return sendWeightReason[0] === pack.package.weight_reason;
      });
      console.log("Predicted Nutritions:", data[0]);
      setGetPredictionNutrition(data[0]?.package?.nutrition);
    }

    axios
      .get(`/api/v1/nutritions?user_id=${localStorage.getItem("doctor_id")}`)
      .then((res) => {
        console.log("All the Nutritions:", res.data);
        setGetNutrition(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
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

    const formData = new FormData();
    formData.append(
      "treatment_package[weight_reason]",
      sendWeightReason === "null" ? null : sendWeightReason
    );
    formData.append(
      "treatment_package[nutrition]",
      JSON.stringify(selectedNutrition)
    );

    setStoreData((prev) => ({
      ...prev,
      nutrition: selectedNutrition,
    }));

    Swal.fire({
      icon: "Success",
      title: "Saved!",
      text: "Your selected nutrition has been saved.",
    });
  };

  const predictedNutritions = getNutrition.filter((diet) =>
    getPredictionNutrition.some((med) => med.id === diet.id)
  );

  const otherNutritions = getNutrition.filter(
    (diet) => !getPredictionNutrition.some((med) => med.id === diet.id)
  );

  const sortedNutrition = [...predictedNutritions, ...otherNutritions];

  useEffect(() => {
    console.log("Updated storeData: ", storeData);
  }, [storeData]);

  useEffect(() => {
    const preSelectedNutrition = getPredictionNutrition.map((val) =>
      val.id.toString()
    );
    console.log("pre", preSelectedNutrition);
    setSelectedCheckboxes(preSelectedNutrition);
  }, [getPredictionNutrition]);

  useEffect(() => {
    handleGetNutrition();
  }, [sendWeightReason]);

  if (loading) {
    return <InsideLoader />;
  }

  return (
    <div className="w-full">
      <div className="rounded-lg bg-card h-[80vh] bg-white ">
        <div className="flex px-4 py-3 h-full flex-col space-y-4">
          <div className="flex gap-5 text-center items-center justify-between">
            <div className="font-[550] text-lg">
              No. of nutrition checked: {selectedCheckboxes.length}
            </div>
          </div>

          <div className="animate-fade-left animate-delay-75 shadow-gray-400 shadow-inner border rounded-md border-gray-100 animate-once animate-ease-out overflow-auto h-[75vh]">
            <table className="w-full min-w-[460px] z-0">
              <thead className="uppercase ">
                <tr className="bg-[#1F2937] text-white rounded-md">
                  <ThComponent
                    moreClasses={"rounded-tl-md rounded-bl-md"}
                    name="Select"
                  />
                  <ThComponent
                    moreClasses={"rounded-tr-md rounded-br-md"}
                    name="Nutrition Name"
                  />
                </tr>
              </thead>
              <tbody>
                {sortedNutrition.length === 0 ? (
                  <tr>
                    <th
                      className="uppercase tracking-wide font-medium pt-[13rem] text-lg"
                      colSpan={8}
                    >
                      No Nutrition & Supplements Found!
                    </th>
                  </tr>
                ) : (
                  sortedNutrition.map((val) => {
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
                        <td className="py-3 px-4 border-b border-b-gray-50">
                          <input
                            value={val.id}
                            onChange={handleCheckboxChange}
                            type="checkbox"
                            className="size-4"
                            defaultChecked={getPredictionNutrition.some(
                              (med) => med.id === val.id
                            )}
                          />
                        </td>
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
            <div className="font-[550] text-lg flex items-center invisible">
              Checked Nutrition -{" "}
              <div className="ml-2 bg-gray-400 border border-gray-200 size-5"></div>
            </div>
            <SaveTreatmentButtons function={handleSave} />{" "}
            <div className="font-[550] text-lg flex items-center">
              Mapped Nutrition -{" "}
              <div className="ml-2 bg-gray-400 border border-gray-200 size-5"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RTreatmentNutrition;
