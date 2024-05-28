import { useOutletContext } from "react-router-dom";
import TdComponent from "../../../../../components/TdComponent";
import ThComponent from "../../../../../components/ThComponent";
import { useEffect, useState } from "react";
import axios from "axios";
import SelectTreatmentButton from "../../../../../components/Admin/SelectTreatmentButton";
import SaveTreatmentButtons from "../../../../../components/Admin/SaveTreatmentButtons";
import Swal from "sweetalert2";

function RTreatmentMedicine() {
  const context = useOutletContext();
  const [getPredictionMedicine, setGetPredictionMedicine] = useState([]);
  const [getMedicines, setGetMedicines] = useState([]);
  const [selectedCheckboxes, setSelectedCheckboxes] = useState([]);
  const [showCheckboxes, setShowCheckboxes] = useState(false);

  const handleGetMedicines = () => {
    if (context[0]) {
      const data = context[1].filter((pack) => {
        return context[0][0] === pack.package.weight_reason;
      });
      setGetPredictionMedicine(data[0]?.package?.medicines);
      console.log("Predicted Medicines:", data[0]?.package?.medicines);
    }

    axios
      .get("/api/v1/medicines")
      .then((res) => {
        console.log("All the medicines:", res.data?.medicines);
        setGetMedicines(res.data?.medicines);
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
    const selectedMedicine = selectedCheckboxes
      .map((id) => getMedicines.find((med) => med.id === Number(id)))
      .filter((med) => med);

    if (selectedMedicine.length === 0) {
      return Swal.fire({
        icon: "warning",
        title: "No Medicines Selected",
        text: "Please select at least one medicine to save.",
      });
    }

    console.log("Selected Medicine: ", selectedMedicine);
    setShowCheckboxes(false);
    const formData = new FormData();
    formData.append(
      "package[weight_reason]",
      context[0] === "null" ? null : context[0]
    );
    formData.append("package[medicines]", JSON.stringify(selectedMedicine));

    // try {
    //   const response = await axios.post("/api/v1/packages", formData);
    //   if (response.data) {
    //     Swal.fire({
    //       position: "top-end",
    //       icon: "success",
    //       title: "Added!",
    //       text: `Your medicine has been added.`,
    //       showConfirmButton: false,
    //       timer: 1500,
    //     });
    //   }
    //   handleGetMedicines();
    //   context[1]();
    // } catch (err) {
    //   console.error(err);
    // } finally {
    //   setSelectedCheckboxes([]);
    //   setShowCheckboxes(false);
    // }
  };

  useEffect(() => {
    const preSelectedMedicine = getPredictionMedicine.map((val) =>
      val.id.toString()
    );
    console.log("pre", preSelectedMedicine);
    setSelectedCheckboxes(preSelectedMedicine);
  }, [getPredictionMedicine]);

  useEffect(() => {
    handleGetMedicines();
  }, [context]);

  return (
    <div className="w-full">
      <div className="rounded-lg bg-card h-[75vh] bg-white ">
        <div className="flex px-4 py-3 h-full flex-col space-y-4">
          <div className="flex gap-5 text-center items-center justify-between">
            {!showCheckboxes && (
              <SelectTreatmentButton
                name="Select Medicines"
                function={handleToggleCheckboxes}
              />
            )}

            {showCheckboxes && (
              <div className="font-[550] text-lg">
                No. of medicines checked: {selectedCheckboxes.length}
              </div>
            )}

            {!showCheckboxes && (
              <div className="font-[550] text-lg flex items-center">
                Checked Medicine -{" "}
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
                  <ThComponent name="Name" />
                  <ThComponent name="Content" />
                  <ThComponent
                    name="Quantity"
                    moreClasses={"rounded-tr-md rounded-br-md"}
                  />
                </tr>
              </thead>
              <tbody>
                {getMedicines.length === 0 ? (
                  <tr>
                    <th
                      className="uppercase tracking-wide font-medium pt-[13rem] text-lg"
                      colSpan={8}
                    >
                      No Medicines Found!
                    </th>
                  </tr>
                ) : (
                  getMedicines.map((val, index) => {
                    return (
                      <tr
                        className={`${
                          getPredictionMedicine.some((med) => med.id === val.id)
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
                              defaultChecked={getPredictionMedicine.some(
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
                          <TdComponent things={val.medicine_name} />
                        </td>
                        <td className="py-3 px-4 border-b border-b-gray-50">
                          <TdComponent things={val.medicine_content} />
                        </td>
                        <td className="py-3 px-4 border-b border-b-gray-50">
                          <TdComponent things={val.medicine_quantity} />
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

export default RTreatmentMedicine;
