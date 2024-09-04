import axios from "axios";
import { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import Swal from "sweetalert2";
import SaveTreatmentButtons from "../../../../../components/Admin/SaveTreatmentButtons";
import TdComponent from "../../../../../components/TdComponent";
import ThComponent from "../../../../../components/ThComponent";
import InsideLoader from "../../../../InsideLoader";

function RTreatmentDiet() {
  const { sendWeightReason, mappingPackages, setStoreData, storeData } =
    useOutletContext();
  const [getPredictionDiet, setGetPredictionDiet] = useState([]);
  const [getDiet, setGetDiet] = useState([]);
  const [selectedCheckboxes, setSelectedCheckboxes] = useState([]);
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
    const selectedDiet = selectedCheckboxes
      .map((id) => getDiet.find((med) => med.id === Number(id)))
      .filter((med) => med);

    if (selectedDiet.length === 0) {
      return Swal.fire({
        icon: "warning",
        title: "No Diet Selected",
        text: "Please select at least one diet to save.",
      });
    }

    console.log("Selected Diet: ", selectedDiet);

    const formData = new FormData();
    formData.append(
      "package[weight_reason]",
      sendWeightReason === "null" ? null : sendWeightReason
    );
    formData.append("package[medicines]", JSON.stringify(selectedDiet));

    setStoreData((prev) => ({
      ...prev,
      diet: selectedDiet,
    }));

    Swal.fire({
      icon: "Success",
      title: "Saved!",
      text: "Your selected diet has been saved.",
    });
  };

  const predictedDiets = getDiet.filter((diet) =>
    getPredictionDiet.some((med) => med.id === diet.id)
  );

  const otherDiets = getDiet.filter(
    (diet) => !getPredictionDiet.some((med) => med.id === diet.id)
  );

  const sortedDiets = [...predictedDiets, ...otherDiets];

  useEffect(() => {
    const preSelectedDiet = getPredictionDiet.map((val) => val.id.toString());
    console.log("pre", preSelectedDiet);
    setSelectedCheckboxes(preSelectedDiet);
  }, [getPredictionDiet]);

  useEffect(() => {
    console.log("Updated storeData: ", storeData);
  }, [storeData]);

  useEffect(() => {
    handleGetDiet();
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
              No. of Diet checked: {selectedCheckboxes.length}
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
                  <ThComponent name="Diet Code" />
                  <ThComponent name="Diet Name" />
                  <ThComponent name="In English" />
                  <ThComponent name="In Hindi" />
                  <ThComponent
                    moreClasses={"rounded-tr-md rounded-br-md"}
                    name="In Gujarati"
                  />
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
                            defaultChecked={getPredictionDiet.some(
                              (med) => med.id === val.id
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
          <div className="flex justify-between">
            <div className="font-[550] text-lg flex items-center invisible">
              Checked Diet -{" "}
              <div className="ml-2 bg-gray-400 border border-gray-200 size-5"></div>
            </div>
            <SaveTreatmentButtons function={handleSave} />{" "}
            <div className="font-[550] text-lg flex items-center">
              Mapped Diet -{" "}
              <div className="ml-2 bg-gray-400 border border-gray-200 size-5"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RTreatmentDiet;
