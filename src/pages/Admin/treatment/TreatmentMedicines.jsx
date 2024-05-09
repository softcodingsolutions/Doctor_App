import axios from "axios";
import { useEffect, useState } from "react";
import NextPageButton from "../../../components/Admin/NextPageButton";
import PrevPageButton from "../../../components/Admin/PrevPageButton";
import TdComponent from "../../../components/TdComponent";
import ThComponent from "../../../components/ThComponent";
import Swal from "sweetalert2";
import { useOutletContext } from "react-router-dom";

function TreatmentMedicines() {
  const context = useOutletContext();
  const [getMedicines, setGetMedicines] = useState([]);
  const [selectedCheckboxes, setSelectedCheckboxes] = useState([]);
  const [showCheckboxes, setShowCheckboxes] = useState(false);

  const handleGetMedicines = () => {
    axios
      .get("/api/v1/medicines")
      .then((res) => {
        console.log(res.data);
        setGetMedicines(res.data?.medicines);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleToggleCheckboxes = () => {
    setShowCheckboxes(!showCheckboxes);
  };

  const handleCheckboxChange = (e) => {
    const checkboxValue = e.target.value;
    const updatedSelectedCheckboxes = [...selectedCheckboxes];
    const checkboxIndex = updatedSelectedCheckboxes.indexOf(checkboxValue);

    if (checkboxIndex === -1) {
      updatedSelectedCheckboxes.push(checkboxValue);
    } else {
      updatedSelectedCheckboxes.splice(checkboxIndex, 1);
    }

    setSelectedCheckboxes(updatedSelectedCheckboxes);
  };

  const handleSave = async () => {
    if (selectedCheckboxes.length === 0) {
      return Swal.fire({
        icon: "warning",
        title: "No Medicine Selected",
        text: "Please select at least one medicine to save.",
      });
    }

    const selectedMedicine = selectedCheckboxes.map((id) =>
      getMedicines.find((med) => med.id === Number(id))
    );

    console.log("Selected Medicine: ", selectedMedicine);

    const formData = new FormData();
    formData.append(
      "package[weight_reason]",
      context[0] === "null" ? null : context[0]
    );
    formData.append("package[medicines]", JSON.stringify(selectedMedicine));

    try {
      const response = await axios.post("/api/v1/packages", formData);
      if (response.data) {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Added!",
          text: `Your medicine has been added.`,
          showConfirmButton: false,
          timer: 1500,
        });
      }
      handleGetMedicines();
      context[1]();
    } catch (err) {
      console.error(err);
    } finally {
      setSelectedCheckboxes([]);
      setShowCheckboxes(false);
    }
  };

  useEffect(() => {
    handleGetMedicines();
    context[1]();
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
                Select Medicines
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
              No. of medicines checked: {selectedCheckboxes.length}
            </div>

            {!showCheckboxes && (
              <div className="font-[550] text-lg flex items-center">
                Checked Medicine -{" "}
                <div className="ml-2 bg-green-400 border border-gray-200 size-5"></div>
              </div>
            )}
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
                  <ThComponent name="Drug's Name" />
                  <ThComponent name="Drug's Content" />
                  <ThComponent
                    moreClasses={"rounded-tr-md rounded-br-md"}
                    name="Durg's Quantity"
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
                          context[2]?.some(
                            (packages) =>
                              context[0] === packages.weight_reason &&
                              packages.medicines?.some(
                                (med) => med.id === val.id
                              )
                          )
                            ? "bg-green-400 "
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
                              defaultChecked={context[2]?.some(
                                (packages) =>
                                  context[0] === packages.weight_reason &&
                                  packages.medicines?.some(
                                    (med) => med.id === val.id
                                  )
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
          <div className="flex justify-between">
            <PrevPageButton to="../question-part2" />
            <NextPageButton to="../diet" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default TreatmentMedicines;
