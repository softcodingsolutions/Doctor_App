import { useOutletContext } from "react-router-dom";
import TdComponent from "../../../../../components/TdComponent";
import ThComponent from "../../../../../components/ThComponent";
import { useEffect, useState } from "react";
import axios from "axios";
import SaveTreatmentButtons from "../../../../../components/Admin/SaveTreatmentButtons";
import Swal from "sweetalert2";
import { Box, Chip, Option, Select } from "@mui/joy";
import InsideLoader from "../../../../InsideLoader";
import { debounce } from "lodash";

function RTreatmentMedicine() {
  const { sendWeightReason, mappingPackages, setStoreData, storeData } =
    useOutletContext();
  const [getPredictionMedicine, setGetPredictionMedicine] = useState([]);
  const [getMedicines, setGetMedicines] = useState([]);
  const [filteredMedicines, setFilteredMedicines] = useState([]);
  const [selectedCheckboxes, setSelectedCheckboxes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [dropdownValues, setDropdownValues] = useState({});

  const handleGetMedicines = () => {
    console.log(mappingPackages);
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

  const handleSearchTerm = (value) => {
    setSearchTerm(value);
    filterMedicines(value);
  };

  const filterMedicines = debounce((term) => {
    let filtered = getMedicines;

    if (term) {
      filtered = filtered.filter((medicine) =>
        medicine.medicine_name.toLowerCase().includes(term.toLowerCase())
      );
    }

    filtered.sort((a, b) => {
      const isAMapped = getPredictionMedicine.some((med) => med.id === a.id);
      const isBMapped = getPredictionMedicine.some((med) => med.id === b.id);
      return isBMapped - isAMapped;
    });

    setFilteredMedicines(filtered);
  }, 300);

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
    }

    setSelectedCheckboxes(updatedCheckboxes);

    // Automatically save selected medicines when checkboxes change
    const selectedMedicine = updatedCheckboxes
      .map((id) => getMedicines.find((med) => med.id === Number(id)))
      .filter((med) => med);

    const invalidMedicines = selectedMedicine.filter((med) => {
      const { dosage, frequency, quantity, with_milk } =
        dropdownValues[med.id] || {};
      return !dosage || !frequency || !quantity || !with_milk;
    });

    if (invalidMedicines.length > 0) {
      Swal.fire({
        title: "Error",
        text: "Please fill all dropdown fields for selected medicines.",
        icon: "error",
        confirmButtonText: "OK",
      });
      // Optionally, you can uncheck the boxes for medicines that are missing values
      setSelectedCheckboxes(
        selectedCheckboxes.filter(
          (id) => !invalidMedicines.some((med) => med.id === Number(id))
        )
      );
      return; // Exit early
    }

    const formattedData = selectedMedicine.map((med) => ({
      medicine_name: med.medicine_name,
      dosage: dropdownValues[med.id]?.dosage || "",
      frequency: dropdownValues[med.id]?.frequency || "",
      quantity: dropdownValues[med.id]?.quantity || "",
      with_milk: dropdownValues[med.id]?.with_milk || "",
    }));

    console.log("Formatted Data: ", formattedData);

    setStoreData((prev) => ({
      ...prev,
      medicine: formattedData,
    }));
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

  useEffect(() => {
    handleGetMedicines();
  }, [sendWeightReason]);

  useEffect(() => {
    filterMedicines(searchTerm);
  }, [getMedicines, searchTerm]);

  if (loading) {
    return <InsideLoader />;
  }

  return (
    <div className="w-full">
      <div className="rounded-lg bg-card h-[75vh] bg-white ">
        <div className="flex px-4 py-2 h-full flex-col space-y-4">
          <div className="flex gap-5 text-center items-center justify-between">
            <div className="font-[550] text-lg">
              No. of medicines checked: {selectedCheckboxes.length}
            </div>

            <input
              type="text"
              value={searchTerm}
              onChange={(e) => handleSearchTerm(e.target.value)}
              placeholder="Search for Medicines"
              className="py-2 px-4 rounded-md border border-gray-800 w-1/2 focus:outline-none focus:ring-1 focus:ring-black"
            />

            <div className="font-[550] text-lg flex">
              Mapped Medicine -{" "}
              <div className="ml-2 bg-gray-400 border border-gray-200 size-5"></div>
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
                  <ThComponent name="Name" />
                  <ThComponent moreClasses={"rounded-tr-md rounded-br-md"} />
                </tr>
              </thead>
              <tbody>
                {filteredMedicines.length === 0 ? (
                  <tr>
                    <th
                      className="uppercase tracking-wide font-medium pt-[13rem] text-lg"
                      colSpan={8}
                    >
                      No Medicines Found!
                    </th>
                  </tr>
                ) : (
                  filteredMedicines.map((val) => {
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
        </div>
      </div>
    </div>
  );
}

export default RTreatmentMedicine;
