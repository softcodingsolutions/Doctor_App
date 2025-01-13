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
    setDropdownValues((prev) => {
      const updatedValues = {
        ...prev,
        [id]: {
          ...prev[id],
          [field]: value,
        },
      };

      const { dosage, frequency, quantity, with_milk } =
        updatedValues[id] || {};

      if (
        dosage &&
        frequency?.length > 0 &&
        quantity?.length > 0 &&
        with_milk
      ) {
        if (!selectedCheckboxes.includes(id.toString())) {
          const updatedCheckboxes = [...selectedCheckboxes, id.toString()];
          setSelectedCheckboxes(updatedCheckboxes);

          const selectedMedicine = updatedCheckboxes
            .map((checkboxId) =>
              getMedicines.find((med) => med.id === Number(checkboxId))
            )
            .filter((med) => med);

          const formattedData = selectedMedicine.map((med) => ({
            medicine_name: med.medicine_name,
            dosage: updatedValues[med.id]?.dosage || "",
            frequency: updatedValues[med.id]?.frequency || [],
            quantity: updatedValues[med.id]?.quantity || [],
            with_milk: updatedValues[med.id]?.with_milk || "",
          }));

          setStoreData((prev) => ({
            ...prev,
            medicine: formattedData,
          }));
        }
      }

      return updatedValues;
    });
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
      <div className="rounded-lg bg-card h-[65vh] bg-white ">
        <div className="flex px-4 py-2 h-full flex-col space-y-4">
          <div className="flex flex-col md:flex-row gap-5 text-center items-center justify-between">
            <div className="font-[550] text-lg">
              No. of medicines checked: {selectedCheckboxes.length}
            </div>

            <input
              type="text"
              value={searchTerm}
              onChange={(e) => handleSearchTerm(e.target.value)}
              placeholder="Search for Medicines"
              className="py-2 px-4 rounded-md border border-gray-800 w-full md:w-1/2 focus:outline-none focus:ring-1 focus:ring-black"
            />

            <div className="font-[550] text-lg flex items-center">
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
                  <ThComponent name="Dose" />
                  <ThComponent name="frequency" />
                  <ThComponent name="quantity" />
                  <ThComponent name="with Milk" />
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
                          <Box
                            sx={{
                              minWidth: "10rem",
                              display: "flex",
                              flexDirection: "column",
                              gap: "0.5rem",
                            }}
                          >
                            <label>
                              <input
                                type="checkbox"
                                name={`dosage-${val.id}`}
                                value="before-meal"
                                className="m-2"
                                onChange={(event) =>
                                  handleDropdownChange(
                                    val.id,
                                    "dosage",
                                    event.target.checked ? "before-meal" : null
                                  )
                                }
                                checked={
                                  dropdownValues[val.id]?.dosage ===
                                  "before-meal"
                                }
                              />
                              Before Meal
                            </label>
                            <label>
                              <input
                                type="checkbox"
                                name={`dosage-${val.id}`}
                                value="after-meal"
                                className="m-2"
                                onChange={(event) =>
                                  handleDropdownChange(
                                    val.id,
                                    "dosage",
                                    event.target.checked ? "after-meal" : null
                                  )
                                }
                                checked={
                                  dropdownValues[val.id]?.dosage ===
                                  "after-meal"
                                }
                              />
                              After Meal
                            </label>
                          </Box>
                        </td>

                        <td className="py-3 px-4 border-b border-b-gray-50 ">
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
                        </td>
                        <td className="py-3 px-4 border-b border-b-gray-50 ">
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
                        </td>
                        <td className="py-3 px-4 border-b border-b-gray-50 ">
                          <Box
                            sx={{
                              minWidth: "10rem",
                              display: "flex",
                              flexDirection: "row",
                              gap: "0.5rem",
                            }}
                          >
                            <label>
                              <input
                                type="radio"
                                name={`with-milk-${val.id}`}
                                value="yes"
                                className="m-1"
                                onChange={() =>
                                  handleDropdownChange(
                                    val.id,
                                    "with_milk",
                                    "yes"
                                  )
                                }
                                checked={
                                  dropdownValues[val.id]?.with_milk === "yes"
                                }
                              />
                              Yes
                            </label>
                            <label>
                              <input
                                type="radio"
                                name={`with-milk-${val.id}`}
                                value="no"
                                className="m-1"
                                onChange={() =>
                                  handleDropdownChange(
                                    val.id,
                                    "with_milk",
                                    "no"
                                  )
                                }
                                checked={
                                  dropdownValues[val.id]?.with_milk === "no"
                                }
                              />
                              No
                            </label>
                          </Box>
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
