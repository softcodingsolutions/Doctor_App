import axios from "axios";
import { useEffect, useState } from "react";
import NextPageButton from "../../../components/Admin/NextPageButton";
import PrevPageButton from "../../../components/Admin/PrevPageButton";
import TdComponent from "../../../components/TdComponent";
import ThComponent from "../../../components/ThComponent";
import Swal from "sweetalert2";
import { useOutletContext } from "react-router-dom";
import SaveTreatmentButtons from "../../../components/Admin/SaveTreatmentButtons";
import SelectTreatmentButton from "../../../components/Admin/SelectTreatmentButton";
import InsideLoader from "../../InsideLoader";

function TreatmentMedicines() {
  const context = useOutletContext();
  const [getMedicines, setGetMedicines] = useState([]);
  const [selectedCheckboxes, setSelectedCheckboxes] = useState([]);
  const [showCheckboxes, setShowCheckboxes] = useState(true);
  const role = localStorage.getItem("role");
  const [loading, setLoading] = useState(true);
  const main_id = localStorage.getItem("main_id");

  const handleGetMedicines = () => {
    if (role === "doctor") {
      axios
        .get(`/api/v1/medicines?user_id=${localStorage.getItem("main_id")}`)
        .then((res) => {
          console.log(res.data);
          setGetMedicines(res.data?.medicines);
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
          alert(err.response?.data?.message + "!");
        });
    } else if (role === "super_admin") {
      axios
        .get(
          `/api/v1/medicines?user_id=${localStorage.getItem("map_doctor_id")}`
        )
        .then((res) => {
          console.log(res.data);
          setGetMedicines(res.data?.medicines);
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
          alert(err.response?.data?.message + "!");
        });
    }
  };

  const handleCheckboxChange = (e) => {
    const checkboxValue = e.target.value;
    const isChecked = e.target.checked;

    setSelectedCheckboxes((prevState) => {
      if (isChecked) {
        return [...new Set([...prevState, checkboxValue])];
      } else {
        return prevState.filter((value) => value !== checkboxValue);
      }
    });
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

    const formData = new FormData();
    formData.append(
      "package[weight_reason]",
      context[0] === "null" ? null : context[0]
    );
    formData.append("package[user_id]", main_id);
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
    }
  };

  useEffect(() => {
    const preSelectedMedicines = context[2]?.reduce((acc, packages) => {
      if (context[0] === packages.weight_reason) {
        acc.push(...packages.medicines.map((med) => String(med.id)));
      }
      return acc;
    }, []);

    setSelectedCheckboxes([...new Set(preSelectedMedicines)]); // Remove duplicates
  }, [context]);
  useEffect(() => {
    handleGetMedicines();
  }, [context[0]]);

  if (loading) {
    return <InsideLoader />;
  }

  return (
    <div className="w-full p-2">
      <div className="rounded-lg bg-card h-[85vh] bg-white">
        <div className="flex px-4 py-3 h-full flex-col space-y-3">
          <div className="flex flex-col md:flex-row gap-4 md:gap-5 text-center items-center justify-between p-4">
            {showCheckboxes && (
              <div className="font-[550] text-lg">
                No. of medicines checked: {selectedCheckboxes.length}
              </div>
            )}

            {showCheckboxes && (
              <div className="font-[550] text-lg flex items-center">
                Checked Medicine -{" "}
                <div className="ml-2 bg-gray-400 border border-gray-200 h-5 w-5"></div>{" "}
              </div>
            )}
          </div>

          <div className="animate-fade-left animate-delay-75 shadow-gray-400 shadow-inner border rounded-md border-gray-100 animate-once animate-ease-out overflow-auto h-[70vh]">
            <table className="w-full min-w-[460px] z-0">
              <thead className="uppercase ">
                <tr className="bg-[#1F2937] text-white rounded-md">
                  <ThComponent
                    moreClasses={"rounded-tl-md rounded-bl-md"}
                    name="Select"
                  />

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
                            className="size-5"
                            checked={selectedCheckboxes.includes(
                              String(val.id)
                            )}
                          />
                        </td>

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
            <div className="flex justify-between">
              <div>
                <PrevPageButton to="../question-part2" />
              </div>
              <div>
                {" "}
                <SaveTreatmentButtons function={handleSave} />{" "}
                <NextPageButton name="Diet" to="../diet" />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default TreatmentMedicines;
