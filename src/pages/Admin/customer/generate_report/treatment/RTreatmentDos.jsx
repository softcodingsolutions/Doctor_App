import axios from "axios";
import { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import Swal from "sweetalert2";
import TdComponent from "../../../../../components/TdComponent";
import ThComponent from "../../../../../components/ThComponent";
import InsideLoader from "../../../../InsideLoader";

function RTreatmentDos() {
  const { sendWeightReason, mappingPackages, setStoreData, storeData } =
    useOutletContext();
  const [getPredictionDos, setGetPredictionDos] = useState([]);
  const [getDos, setGetDos] = useState([]);
  const [selectedCheckboxes, setSelectedCheckboxes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectAllMapped, setSelectAllMapped] = useState(false); // State to track header checkbox

  useEffect(() => {
    handleGetDos();

    // Preselect checkboxes based on storeData when the component mounts
    if (storeData.dos) {
      const selectedDosIds = storeData.dos.map((dos) => dos.id.toString());
      setSelectedCheckboxes(selectedDosIds);
    }
  }, [sendWeightReason]);

  const handleGetDos = () => {
    if (sendWeightReason) {
      const data = mappingPackages.filter(
        (pack) => sendWeightReason[0] === pack.package.weight_reason
      );
      setGetPredictionDos(data[0]?.package?.dos || []);
    }

    axios
      .get(
        `/api/v1/avoid_and_adds?user_id=${localStorage.getItem("doctor_id")}`
      )
      .then((res) => {
        setGetDos(
          res.data?.avoid_and_adds.filter((res) => res.category === "do") || []
        );
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: err.response?.data?.message || "An error occurred!",
        });
      });
  };

  const handleCheckboxChange = (e) => {
    const checkboxValue = e.target.value;
    const isChecked = e.target.checked;

    const updatedCheckboxes = isChecked
      ? [...selectedCheckboxes, checkboxValue]
      : selectedCheckboxes.filter((value) => value !== checkboxValue);

    setSelectedCheckboxes(updatedCheckboxes);

    const selectedDos = updatedCheckboxes
      .map((id) => getDos.find((dos) => dos.id === Number(id)))
      .filter((dos) => dos);

    // Automatically update storeData whenever a checkbox is selected or deselected
    setStoreData((prev) => ({
      ...prev,
      dos: selectedDos,
    }));
  };

  // Preselect dos based on getPredictionDos
  const predictedDos = getDos.filter((dos) =>
    getPredictionDos.some((pred) => pred.id === dos.id)
  );

  const otherDos = getDos.filter(
    (dos) => !getPredictionDos.some((pred) => pred.id === dos.id)
  );

  const sortedDos = [...predictedDos, ...otherDos];

  const handleSelectAllMapped = () => {
    const isSelectAll = !selectAllMapped;
    setSelectAllMapped(isSelectAll);

    const mappedDosIds = predictedDos.map((dos) => dos.id.toString());

    if (isSelectAll) {
      // Select all mapped items
      const updatedCheckboxes = [
        ...new Set([...selectedCheckboxes, ...mappedDosIds]),
      ];
      setSelectedCheckboxes(updatedCheckboxes);

      const selectedDos = updatedCheckboxes
        .map((id) => getDos.find((dos) => dos.id === Number(id)))
        .filter((dos) => dos);

      setStoreData((prev) => ({
        ...prev,
        dos: selectedDos,
      }));
    } else {
      // Deselect all mapped items
      const updatedCheckboxes = selectedCheckboxes.filter(
        (id) => !mappedDosIds.includes(id)
      );
      setSelectedCheckboxes(updatedCheckboxes);

      const selectedDos = updatedCheckboxes
        .map((id) => getDos.find((dos) => dos.id === Number(id)))
        .filter((dos) => dos);

      setStoreData((prev) => ({
        ...prev,
        dos: selectedDos,
      }));
    }
  };

  if (loading) {
    return <InsideLoader />;
  }

  return (
    <div className="w-full">
      <div className="rounded-lg bg-card h-[65vh] bg-white">
        <div className="flex px-4 py-3 h-full flex-col space-y-4">
          <div className="flex flex-col md:flex-row gap-5 text-center items-center justify-between">
            <div className="font-[550] text-lg">
              No. of dos checked: {selectedCheckboxes.length}
            </div>
            <div className="font-[550] text-lg flex items-center">
              Mapped Dos -{" "}
              <div className="ml-2 bg-gray-400 border border-gray-200 w-5 h-5"></div>
            </div>
          </div>

          <div className="animate-fade-left animate-delay-75 shadow-gray-400 shadow-inner border rounded-md border-gray-100 animate-once animate-ease-out overflow-auto h-[75vh]">
            <table className="w-full min-w-[460px] z-0">
              <thead className="uppercase">
                <tr className="bg-[#1F2937] text-white rounded-md">
                  <th className="rounded-tl-md rounded-bl-md py-3 px-4">
                    <input
                      type="checkbox"
                      onChange={handleSelectAllMapped}
                      checked={selectAllMapped}
                      className="size-4"
                    />
                  </th>
                  <ThComponent name="In English" />
                  <ThComponent name="In Hindi" />
                  <ThComponent
                    moreClasses={"rounded-tr-md rounded-br-md"}
                    name="In Gujarati"
                  />
                </tr>
              </thead>
              <tbody>
                {sortedDos.length === 0 ? (
                  <tr>
                    <th
                      className="uppercase tracking-wide font-medium pt-[13rem] text-lg"
                      colSpan={8}
                    >
                      No Dos Found!
                    </th>
                  </tr>
                ) : (
                  sortedDos.map((val) => (
                    <tr
                      className={`${
                        getPredictionDos.some((med) => med.id === val.id)
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
                        <TdComponent things={val.details_in_english} />
                      </td>
                      <td className="py-3 px-4 border-b border-b-gray-50">
                        <TdComponent things={val.details_in_hindi} />
                      </td>
                      <td className="py-3 px-4 border-b border-b-gray-50">
                        <TdComponent things={val.details_in_gujarati} />
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RTreatmentDos;
