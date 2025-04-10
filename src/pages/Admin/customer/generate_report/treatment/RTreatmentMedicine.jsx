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
import { useDispatch, useSelector } from "react-redux";
import {
  setSelectedMedicines,
  updateDropdownValue,
} from "../../../../../store/treatmentSlice";

function RTreatmentMedicine() {
  const {
    sendWeightReason,
    mappingPackages,
    setStoreData,
    storeData,
    user_id,
  } = useOutletContext();

  const dispatch = useDispatch();
  const selectedCheckboxes = useSelector(
    (state) => state.treatment.selectedMedicines
  );
  const dropdownValues = useSelector(
    (state) => state.treatment.dropdownValues // this will still be undefined unless you define it in the slice
  );

  const [getPredictionMedicine, setGetPredictionMedicine] = useState([]);
  const [getMedicines, setGetMedicines] = useState([]);
  const [filteredMedicines, setFilteredMedicines] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  const handleGetMedicines = () => {
    if (sendWeightReason) {
      const data = mappingPackages.filter(
        (pack) => sendWeightReason[0] === pack.package.weight_reason
      );
      setGetPredictionMedicine(data[0]?.package?.medicines || []);
    }

    axios
      .get(`/api/v1/medicines?user_id=${localStorage.getItem("doctor_id")}`)
      .then((res) => {
        setGetMedicines(res.data?.medicines || []);
        setLoading(false);
      })
      .catch((err) => {
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
      const isAMapped = getPredictionMedicine?.some((med) => med.id === a.id);
      const isBMapped = getPredictionMedicine?.some((med) => med.id === b.id);
      return isBMapped - isAMapped;
    });

    setFilteredMedicines(filtered);
  }, 300);

  const updateReduxStoreData = (checkboxIds) => {
    const selectedMedicine = checkboxIds
      .map((id) => getMedicines.find((med) => med.id === Number(id)))
      .filter(Boolean);

    const formattedData = selectedMedicine.map((med) => ({
      medicine_name: med.medicine_name,
      dosage: dropdownValues[med.id]?.dosage || "",
      frequency: dropdownValues[med.id]?.frequency || {},
      quantity: dropdownValues[med.id]?.quantity || [],
      with_milk: dropdownValues[med.id]?.with_milk || "",
    }));

    setStoreData((prev) => ({
      ...prev,
      medicine: formattedData,
    }));
  };

  const handleCheckboxChange = (e) => {
    const id = e.target.value;
    const isChecked = e.target.checked;
    let updatedCheckboxes = [...selectedCheckboxes];

    if (isChecked) {
      updatedCheckboxes.push(id);
    } else {
      updatedCheckboxes = updatedCheckboxes.filter((value) => value !== id);
    }

    const invalidMedicines = updatedCheckboxes
      .map((id) => getMedicines.find((med) => med.id === Number(id)))
      .filter((med) => {
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

      updatedCheckboxes = updatedCheckboxes.filter(
        (id) => !invalidMedicines.some((med) => med.id === Number(id))
      );
    }

    dispatch(setSelectedMedicines(updatedCheckboxes));
    updateReduxStoreData(updatedCheckboxes);
  };

  const handleDropdownChange = (id, field, value) => {
    dispatch(updateDropdownValue({ id, field, value }));

    const med = getMedicines.find((med) => med.id === id);
    const currentValues = {
      ...dropdownValues[id],
      [field]: value,
    };

    const { dosage, frequency, quantity, with_milk } = currentValues;

    const hasAllFields =
      dosage && frequency && quantity?.length > 0 && with_milk;

    if (hasAllFields && !selectedCheckboxes.includes(id.toString())) {
      const updatedCheckboxes = [...selectedCheckboxes, id.toString()];
      dispatch(setSelectedMedicines(updatedCheckboxes));
      updateReduxStoreData(updatedCheckboxes);
    } else {
      updateReduxStoreData(selectedCheckboxes);
    }
  };

  useEffect(() => {
    handleGetMedicines();
  }, [sendWeightReason, user_id]);

  useEffect(() => {
    filterMedicines(searchTerm);
  }, [getMedicines, searchTerm]);

  if (loading) return <InsideLoader />;

  return (
    <div className="flex w-full flex-col space-y-2 bg-white p-2">
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
            className="p-1.5 rounded-md border border-gray-800 focus:outline-none focus:ring-1 focus:ring-black"
          />
          <div className="font-[530] text-sm flex items-center">
            Mapped Medicine -{" "}
            <div className="ml-2 bg-[#EFF6FF] border border-gray-200 size-5"></div>
          </div>
        </div>
      </div>

      <div className="shadow-gray-400 shadow-inner border rounded-md border-gray-100 overflow-auto">
        <table className="w-full z-0">
          <thead className="uppercase">
            <tr className="bg-[#1F2937] text-white rounded-md">
              <ThComponent
                name="Select"
                moreClasses="rounded-tl-md rounded-bl-md"
              />
              <ThComponent name="Name" />
              <ThComponent name="Dose" />
              <ThComponent name="frequency" />
              <ThComponent name="quantity" />
              <ThComponent
                name="with Milk"
                moreClasses="rounded-tr-md rounded-br-md"
              />
            </tr>
          </thead>
          <tbody>
            {filteredMedicines.length === 0 ? (
              <tr>
                <td
                  colSpan={8}
                  className="text-center pt-[13rem] text-lg font-medium"
                >
                  No Medicines Found!
                </td>
              </tr>
            ) : (
              filteredMedicines.map((val) => {
                const medicineId = val.id.toString();
                return (
                  <tr
                    key={val.id}
                    className={
                      getPredictionMedicine.some((med) => med.id === val.id)
                        ? "bg-[#EFF6FF]"
                        : ""
                    }
                  >
                    <td className="py-2 px-4 border-b border-gray-50">
                      <input
                        value={medicineId}
                        onChange={handleCheckboxChange}
                        type="checkbox"
                        className="size-4"
                        checked={selectedCheckboxes.includes(medicineId)}
                      />
                    </td>
                    <td className="py-2 px-4 border-b border-gray-50">
                      <TdComponent things={val.medicine_name} />
                    </td>
                    <td className="py-2 px-4 border-b border-gray-50">
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          gap: "0.5rem",
                        }}
                      >
                        {["before-meal", "after-meal"].map((meal) => (
                          <label key={meal}>
                            <input
                              type="checkbox"
                              name={`dosage-${val.id}`}
                              value={meal}
                              className="m-2"
                              onChange={(e) =>
                                handleDropdownChange(
                                  val.id,
                                  "dosage",
                                  e.target.checked ? meal : null
                                )
                              }
                              checked={dropdownValues[val.id]?.dosage === meal}
                            />
                            {meal
                              .replace("-", " ")
                              .replace(/\b\w/g, (l) => l.toUpperCase())}
                          </label>
                        ))}
                      </Box>
                    </td>
                    <td className="py-2 px-4 border-b border-gray-50">
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          gap: "0.3rem",
                        }}
                      >
                        {["morning", "lunch", "evening", "dinner"].map(
                          (time, i) => (
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
                                  fontWeight: "bold",
                                  cursor: "pointer",
                                }}
                                onClick={() => {
                                  const current =
                                    dropdownValues[val.id]?.frequency?.[time] ||
                                    0;
                                  const updated = {
                                    ...dropdownValues[val.id]?.frequency,
                                    [time]: current === 1 ? 0 : 1,
                                  };
                                  handleDropdownChange(
                                    val.id,
                                    "frequency",
                                    updated
                                  );
                                }}
                              >
                                {dropdownValues[val.id]?.frequency?.[time] || 0}
                              </Box>
                              {i < 3 && <span>-</span>}
                            </React.Fragment>
                          )
                        )}
                      </Box>
                    </td>
                    <td className="py-2 px-4 border-b border-gray-50">
                      <Select
                        multiple
                        placeholder="Select Quantity"
                        onChange={(event, value) =>
                          handleDropdownChange(val.id, "quantity", value)
                        }
                        value={dropdownValues[val.id]?.quantity || []}
                        renderValue={(selected) => (
                          <Box sx={{ display: "flex", gap: "0.25rem" }}>
                            {selected.map((option, index) => (
                              <Chip key={index} variant="soft" color="primary">
                                {option.label}
                              </Chip>
                            ))}
                          </Box>
                        )}
                      >
                        <Option disabled>Quantity</Option>
                        <Option value="0.5">½</Option>
                        <Option value="1">1</Option>
                        <Option value="1.5">1½</Option>
                        <Option value="2">2</Option>
                      </Select>
                    </td>
                    <td className="py-2 px-4 border-b border-gray-50">
                      <Box sx={{ display: "flex", gap: "0.5rem" }}>
                        {["yes", "no"].map((opt) => (
                          <label key={opt}>
                            <input
                              type="radio"
                              name={`with-milk-${val.id}`}
                              value={opt}
                              onChange={() =>
                                handleDropdownChange(val.id, "with_milk", opt)
                              }
                              checked={
                                dropdownValues[val.id]?.with_milk === opt
                              }
                            />
                            {opt.toUpperCase()}
                          </label>
                        ))}
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
