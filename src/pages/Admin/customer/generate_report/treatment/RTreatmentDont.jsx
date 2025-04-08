import axios from "axios";
import { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import Swal from "sweetalert2";
import TdComponent from "../../../../../components/TdComponent";
import ThComponent from "../../../../../components/ThComponent";
import InsideLoader from "../../../../InsideLoader";

function RTreatmentDont() {
  const { sendWeightReason, mappingPackages, setStoreData, storeData } =
    useOutletContext();
  const [getPredictionDonts, setGetPredictionDonts] = useState([]);
  const [getDonts, setGetDonts] = useState([]);
  const [selectedCheckboxes, setSelectedCheckboxes] = useState([]);
  const [selectAll, setSelectAll] = useState(false); // For the "Select All" checkbox
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    handleGetDonts();

    // Initialize selected checkboxes from storeData when the component mounts
    if (storeData.dont) {
      const selectedDontsIds = storeData.dont.map((dont) => dont.id.toString());
      setSelectedCheckboxes(selectedDontsIds);
    }
  }, [sendWeightReason]);

  const handleGetDonts = () => {
    if (sendWeightReason) {
      const data = mappingPackages.filter(
        (pack) => sendWeightReason[0] === pack.package.weight_reason
      );
      setGetPredictionDonts(data[0]?.package?.dont || []);
    }

    axios
      .get(
        `/api/v1/avoid_and_adds?user_id=${localStorage.getItem("doctor_id")}`
      )
      .then((res) => {
        setGetDonts(
          res.data?.avoid_and_adds.filter((res) => res.category === "dont") ||
            []
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

    const selectedDonts = updatedCheckboxes
      .map((id) => getDonts.find((dont) => dont.id === Number(id)))
      .filter((dont) => dont);

    setStoreData((prev) => ({
      ...prev,
      dont: selectedDonts,
    }));
  };

  // Handle "Select All" checkbox change
  const handleSelectAllChange = (e) => {
    const isChecked = e.target.checked;
    setSelectAll(isChecked);

    if (isChecked) {
      const allPredictionDontsIds = getPredictionDonts.map((dont) =>
        dont.id.toString()
      );
      setSelectedCheckboxes(allPredictionDontsIds);

      const selectedDonts = getPredictionDonts.map((dont) => ({
        ...dont,
      }));

      setStoreData((prev) => ({
        ...prev,
        dont: selectedDonts,
      }));
    } else {
      setSelectedCheckboxes([]);
      setStoreData((prev) => ({
        ...prev,
        dont: [],
      }));
    }
  };

  const predictedDonts = getDonts.filter((dont) =>
    getPredictionDonts.some((pred) => pred.id === dont.id)
  );

  const otherDonts = getDonts.filter(
    (dont) => !getPredictionDonts.some((pred) => pred.id === dont.id)
  );

  const sortedDonts = [...predictedDonts, ...otherDonts];

  if (loading) {
    return <InsideLoader />;
  }

  return (
    <div className="w-full">
      <div className="rounded-lg bg-card h-[65vh] bg-white ">
        <div className="flex px-4 py-3 h-full flex-col space-y-4">
          <div className="flex flex-col md:flex-row gap-5 text-center items-center justify-between">
            <div className="font-[530] text-sm">
              No. of don'ts checked: {selectedCheckboxes.length}
            </div>
            <div className="font-[530] text-sm flex items-center">
              Mapped Don'ts -{" "}
              <div className="ml-2 bg-[#EFF6FF] border border-gray-200 w-5 h-5"></div>
            </div>
          </div>

          <div className="animate-fade-left animate-delay-75 shadow-gray-400 shadow-inner border rounded-md border-gray-100 animate-once animate-ease-out overflow-auto h-[75vh]">
            <table className="w-full min-w-[460px] z-0">
              <thead className="uppercase ">
                <tr className="bg-[#1F2937] text-white rounded-md">
                  <th className="rounded-tl-md rounded-bl-md py-2">
                    <input
                      type="checkbox"
                      checked={selectAll}
                      onChange={handleSelectAllChange}
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
                {sortedDonts.length === 0 ? (
                  <tr>
                    <th
                      className="uppercase tracking-wide font-medium pt-[13rem] text-lg"
                      colSpan={8}
                    >
                      No Don'ts Found!
                    </th>
                  </tr>
                ) : (
                  sortedDonts.map((val) => (
                    <tr
                      className={`${
                        getPredictionDonts.some((med) => med.id === val.id)
                          ? "bg-[#EFF6FF] "
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

export default RTreatmentDont;
