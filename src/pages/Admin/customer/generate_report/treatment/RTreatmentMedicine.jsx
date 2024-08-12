import { useOutletContext } from "react-router-dom";
import TdComponent from "../../../../../components/TdComponent";
import ThComponent from "../../../../../components/ThComponent";
import { useEffect, useState } from "react";
import axios from "axios";
import SelectTreatmentButton from "../../../../../components/Admin/SelectTreatmentButton";
import SaveTreatmentButtons from "../../../../../components/Admin/SaveTreatmentButtons";
import Swal from "sweetalert2";
import { Box, Chip, Option, Select } from "@mui/joy";
import InsideLoader from "../../../../InsideLoader";

function RTreatmentMedicine() {
  const { sendWeightReason, mappingPackages, setStoreData, storeData } =
    useOutletContext();
  const [getPredictionMedicine, setGetPredictionMedicine] = useState([]);
  const [getMedicines, setGetMedicines] = useState([]);
  const [selectedCheckboxes, setSelectedCheckboxes] = useState([]);
  const [showCheckboxes, setShowCheckboxes] = useState(false);
  const [loading, setLoading] = useState(true);

  const [dropdownValues, setDropdownValues] = useState({});

  const handleGetMedicines = () => {
    if (sendWeightReason) {
      const data = mappingPackages.filter((pack) => {
        return sendWeightReason[0] === pack.package.weight_reason;
      });
      console.log("Predicted Medicines:", data[0]?.package?.medicines);
      setGetPredictionMedicine(data[0]?.package?.medicines);
    }

    axios
      .get(`/api/v1/medicines?user_id=${localStorage.getItem("doctor_id")}}`)
      .then((res) => {
        console.log("All the medicines:", res.data?.medicines);
        setGetMedicines(res.data?.medicines);
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

  const handleDropdownChange = (id, field, value) => {
    setDropdownValues((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        [field]: value,
      },
    }));
  };

  const validateSelections = () => {
    for (const id of selectedCheckboxes) {
      const selections = dropdownValues[id] || {};
      if (
        !selections.dosage ||
        !selections.frequency ||
        !selections.quantity ||
        !selections.with_milk
      ) {
        return false;
      }
    }
    return true;
  };

  const handleSave = async () => {
    if (!validateSelections()) {
      return Swal.fire({
        icon: "warning",
        title: "Incomplete Selections",
        text: "Please ensure all dropdowns are selected for each selected medicine.",
      });
    }

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

    const formattedData = selectedMedicine.map((med) => ({
      medicine_name: med.medicine_name,
      dosage: dropdownValues[med.id]?.dosage || "",
      frequency: dropdownValues[med.id]?.frequency || "",
      quantity: dropdownValues[med.id]?.quantity || "",
      with_milk: dropdownValues[med.id]?.with_milk || "",
    }));

    console.log("Formatted Data: ", formattedData);

    setShowCheckboxes(false);

    const formData = new FormData();
    formData.append(
      "package[weight_reason]",
      sendWeightReason === "null" ? null : sendWeightReason
    );
    formData.append(
      "treatment_package[weight_reason]",
      JSON.stringify(formattedData)
    );

    setStoreData((prev) => ({
      ...prev,
      medicine: formattedData,
    }));
    Swal.fire({
      icon: "Success",
      title: "Saved!",
      text: "Your selected medicines have been saved.",
    });
  };

  useEffect(() => {
    const preSelectedMedicine = getPredictionMedicine.map((val) =>
      val.id.toString()
    );
    console.log("pre", preSelectedMedicine);
    setSelectedCheckboxes(preSelectedMedicine);
  }, [getPredictionMedicine]);

  useEffect(() => {
    console.log("Updated storeData: ", storeData);
  }, [storeData]);

  useEffect(() => {
    handleGetMedicines();
  }, [sendWeightReason]);

  if (loading) {
    return <InsideLoader />;
  }

  return (
    <div className="w-full">
      <div className="rounded-lg bg-card h-[74vh] bg-white ">
        <div className="flex px-4 py-2 h-full flex-col space-y-4">
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

          <div className="animate-fade-left animate-delay-75 shadow-gray-400 shadow-inner border rounded-md border-gray-100 animate-once animate-ease-out overflow-auto">
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
                  <ThComponent moreClasses={"rounded-tr-md rounded-br-md"} />
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
                          getPredictionMedicine?.some(
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
                              defaultChecked={getPredictionMedicine.some(
                                (med) => med.id === val.id
                              )}
                            />
                          </td>
                        )}
                        {!showCheckboxes && (
                          <td className="py-3 px-4 border-b border-b-gray-50">
                            <div className="flex items-center">{index + 1}</div>
                          </td>
                        )}
                        <td className="py-3 px-4 border-b border-b-gray-50">
                          <TdComponent things={val.medicine_name} />
                        </td>
                        <td className="py-3 px-4 border-b border-b-gray-50 flex gap-4">
                          <Select
                            placeholder="Select Dose"
                            onChange={(event, value) =>
                              handleDropdownChange(val.id, "dosage", value)
                            }
                            renderValue={(selected) =>
                              selected ? (
                                <Box sx={{ display: "flex", gap: "0.25rem" }}>
                                  <Chip variant="soft" color="primary">
                                    {selected.label}
                                  </Chip>
                                </Box>
                              ) : (
                                <Box sx={{ display: "flex", gap: "0.25rem" }}>
                                  Select Dose
                                </Box>
                              )
                            }
                            sx={{
                              minWidth: "10rem",
                            }}
                            slotProps={{
                              listbox: {
                                sx: {
                                  width: "100%",
                                },
                              },
                            }}
                          >
                            <Option
                              disabled
                              style={{ color: "gray", fontWeight: 500 }}
                            >
                              Dose
                            </Option>
                            <Option value="before-meal">Before Meal</Option>
                            <Option value="after-meal">After Meal</Option>
                          </Select>
                          <Select
                            multiple
                            placeholder="Select Frequency"
                            onChange={(event, value) =>
                              handleDropdownChange(val.id, "frequency", value)
                            }
                            renderValue={(selected) => (
                              <Box sx={{ display: "flex", gap: "0.25rem" }}>
                                {selected.map((selectedOption, index) => (
                                  <Chip
                                    key={index + "1"}
                                    variant="soft"
                                    color="primary"
                                  >
                                    {selectedOption.label}
                                  </Chip>
                                ))}
                              </Box>
                            )}
                            sx={{
                              minWidth: "10rem",
                            }}
                            slotProps={{
                              listbox: {
                                sx: {
                                  width: "100%",
                                },
                              },
                            }}
                          >
                            <Option
                              disabled
                              style={{ color: "gray", fontWeight: 500 }}
                            >
                              FREQUENCY
                            </Option>
                            <Option value="morning">Morning</Option>
                            <Option value="lunch">Lunch</Option>
                            <Option value="evening">Evening</Option>
                            <Option value="dinner">Dinner</Option>
                          </Select>
                          <Select
                            multiple
                            placeholder="Select Quantity"
                            onChange={(event, value) =>
                              handleDropdownChange(val.id, "quantity", value)
                            }
                            renderValue={(selected) => (
                              <Box sx={{ display: "flex", gap: "0.25rem" }}>
                                {selected.map((selectedOption, index) => (
                                  <Chip
                                    key={index + "1"}
                                    variant="soft"
                                    color="primary"
                                  >
                                    {selectedOption.label}
                                  </Chip>
                                ))}
                              </Box>
                            )}
                            sx={{
                              minWidth: "10rem",
                            }}
                            slotProps={{
                              listbox: {
                                sx: {
                                  width: "100%",
                                },
                              },
                            }}
                          >
                            <Option
                              disabled
                              style={{ color: "gray", fontWeight: 500 }}
                            >
                              Quantity
                            </Option>
                            <Option value="0.5">½</Option>
                            <Option value="1">1</Option>
                            <Option value="1.5">1½</Option>
                            <Option value="2">2</Option>
                          </Select>
                          <Select
                            placeholder="Select with milk"
                            onChange={(event, value) =>
                              handleDropdownChange(val.id, "with_milk", value)
                            }
                            renderValue={(selected) =>
                              selected ? (
                                <Box sx={{ display: "flex", gap: "0.25rem" }}>
                                  <Chip variant="soft" color="primary">
                                    {selected.label}
                                  </Chip>
                                </Box>
                              ) : (
                                <Box sx={{ display: "flex", gap: "0.25rem" }}>
                                  Select with milk
                                </Box>
                              )
                            }
                            sx={{
                              minWidth: "10rem",
                            }}
                            slotProps={{
                              listbox: {
                                sx: {
                                  width: "100%",
                                },
                              },
                            }}
                          >
                            <Option
                              disabled
                              style={{ color: "gray", fontWeight: 500 }}
                            >
                              With Milk
                            </Option>
                            <Option value="yes">Yes</Option>
                            <Option value="no">No </Option>
                          </Select>
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
