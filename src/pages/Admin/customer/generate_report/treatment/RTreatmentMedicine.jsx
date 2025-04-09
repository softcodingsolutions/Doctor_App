import { useOutletContext } from "react-router-dom";
import TdComponent from "../../../../../components/TdComponent";
import ThComponent from "../../../../../components/ThComponent";
import React, { useEffect, useState } from "react";
import axios from "axios";
import SaveTreatmentButtons from "../../../../../components/Admin/SaveTreatmentButtons";
import Swal from "sweetalert2";
import { Box, Chip, Option, Select } from "@mui/joy";
import InsideLoader from "../../../../InsideLoader";
import { debounce } from "lodash";

function RTreatmentMedicine() {
  const {
    sendWeightReason,
    mappingPackages,
    setStoreData,
    storeData,
    user_id,
  } = useOutletContext();
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
      .get(`/api/v1/medicines?user_id=${localStorage.getItem("doctor_id")}`)
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

    // filtered.sort((a, b) => {
    //   const isAMapped = getPredictionMedicine.some((med) => med.id === a.id);
    //   const isBMapped = getPredictionMedicine.some((med) => med.id === b.id);
    //   return isBMapped - isAMapped;
    // });
    filtered.sort((a, b) => {
      const isAMapped =
        Array.isArray(getPredictionMedicine) &&
        getPredictionMedicine.some((med) => med.id === a.id);
      const isBMapped =
        Array.isArray(getPredictionMedicine) &&
        getPredictionMedicine.some((med) => med.id === b.id);
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
  }, [sendWeightReason, user_id]);

  useEffect(() => {
    filterMedicines(searchTerm);
  }, [getMedicines, searchTerm]);

  if (loading) {
    return <InsideLoader />;
  }

  return (
    <div className="flex w-full  flex-col space-y-2 bg-white p-2">
      <div className="flex flex-col md:flex-row gap-2 text-center items-center justify-between">
        <div className="font-[530] text-md">
          No. of medicines checked: {selectedCheckboxes.length}
        </div>
        <div className="flex justify-end gap-2">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => handleSearchTerm(e.target.value)}
            placeholder="Search for Medicines"
            className="p-1.5 rounded-md border border-gray-800  focus:outline-none focus:ring-1 focus:ring-black"
          />

          <div className="font-[530] text-sm flex items-center">
            Mapped Medicine -{" "}
            <div className="ml-2 bg-[#EFF6FF] border border-gray-200 size-5"></div>
          </div>
        </div>
      </div>
      <div className="animate-fade-left animate-delay-75 shadow-gray-400 shadow-inner border rounded-md border-gray-100 animate-once animate-ease-out overflow-auto ">
        <table className="w-full z-0">
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
              <ThComponent
                name="with Milk"
                moreClasses={"rounded-tr-md rounded-br-md"}
              />
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
                      getPredictionMedicine?.some((med) => med.id === val.id)
                        ? "bg-[#EFF6FF]"
                        : ""
                    } `}
                    key={val.id}
                  >
                    <td className="py-2 px-4 border-b border-b-gray-50">
                      <input
                        value={val.id}
                        onChange={handleCheckboxChange}
                        type="checkbox"
                        className="size-4"
                        checked={selectedCheckboxes.includes(val.id.toString())}
                      />
                    </td>
                    <td className="py-2 px-4 border-b border-b-gray-50">
                      <TdComponent things={val.medicine_name} />
                    </td>
                    <td className="py-2 px-4 border-b text-sm border-b-gray-50 flex gap-4">
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
                              dropdownValues[val.id]?.dosage === "before-meal"
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
                              dropdownValues[val.id]?.dosage === "after-meal"
                            }
                          />
                          After Meal
                        </label>
                      </Box>
                    </td>

                    {/* <td className="py-2 px-4 border-b border-b-gray-50 ">
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
                    </td> */}
                    <td className="py-2 px-4 border-b border-b-gray-50 ">
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          gap: "0.3rem",
                        }}
                      >
                        {["morning", "lunch", "evening", "dinner"].map(
                          (time, index) => (
                            <React.Fragment key={time}>
                              <Box
                                sx={{
                                  width: "2rem",
                                  height: "2rem",
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "center",
                                  borderRadius: "0.3rem",
                                  border: "1px solid #ccc",
                                  backgroundColor:
                                    dropdownValues[val.id]?.frequency?.[
                                      time
                                    ] === 1
                                      ? "white"
                                      : "#f0f0f0",
                                  color: "#000",
                                  fontSize: "14px",
                                  fontWeight: "bold",
                                  cursor: "pointer",
                                }}
                                onClick={() => {
                                  setDropdownValues((prev) => {
                                    const updatedValues = {
                                      ...prev,
                                      [val.id]: {
                                        ...prev[val.id],
                                        frequency: {
                                          ...prev[val.id]?.frequency,
                                          [time]:
                                            prev[val.id]?.frequency?.[time] ===
                                            1
                                              ? 0
                                              : 1,
                                        },
                                      },
                                    };

                                    setStoreData((prevStore) => ({
                                      ...prevStore,
                                      medicine: prevStore.medicine.map((med) =>
                                        med.medicine_name === val.medicine_name
                                          ? {
                                              ...med,
                                              frequency:
                                                updatedValues[val.id].frequency,
                                            }
                                          : med
                                      ),
                                    }));

                                    return updatedValues;
                                  });
                                }}
                              >
                                {dropdownValues[val.id]?.frequency?.[time] || 0}
                              </Box>
                              {index < 3 && <span>-</span>}
                            </React.Fragment>
                          )
                        )}
                      </Box>
                    </td>

                    <td className="py-2 px-4 border-b border-b-gray-50 ">
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
                    <td className="py-2 px-4 border-b border-b-gray-50 ">
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
                              handleDropdownChange(val.id, "with_milk", "yes")
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
                              handleDropdownChange(val.id, "with_milk", "no")
                            }
                            checked={dropdownValues[val.id]?.with_milk === "no"}
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
  );
}

export default RTreatmentMedicine;
