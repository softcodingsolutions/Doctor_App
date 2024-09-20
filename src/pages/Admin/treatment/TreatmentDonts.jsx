import { useEffect, useState } from "react";
import TdComponent from "../../../components/TdComponent";
import PrevPageButton from "../../../components/Admin/PrevPageButton";
import ThComponent from "../../../components/ThComponent";
import axios from "axios";
import SaveTreatmentButtons from "../../../components/Admin/SaveTreatmentButtons";
import Swal from "sweetalert2";
import { useOutletContext } from "react-router-dom";
import SelectTreatmentButton from "../../../components/Admin/SelectTreatmentButton";
import InsideLoader from "../../InsideLoader";

function TreatmentDonts() {
  const context = useOutletContext();
  const [getDonts, setGetDonts] = useState([]);
  const [selectedCheckboxes, setSelectedCheckboxes] = useState([]);
  const [showCheckboxes, setShowCheckboxes] = useState(false);
  const role = localStorage.getItem("role");
  const [loading, setLoading] = useState(true);
  const main_id = localStorage.getItem("main_id");
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 7;

  const paginateCustomers = () => {
    const indexOfLastRow = currentPage * rowsPerPage;
    const indexOfFirstRow = indexOfLastRow - rowsPerPage;
    return getDonts.slice(indexOfFirstRow, indexOfLastRow);
  };

  const totalPages = Math.ceil(getDonts.length / rowsPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };
  const handleGetDonts = () => {
    if (role === "doctor") {
      axios
        .get(
          `/api/v1/avoid_and_adds?user_id=${localStorage.getItem("main_id")}`
        )
        .then((res) => {
          console.log(
            "Donts",
            res.data?.avoid_and_adds.filter((res) => res.category === "dont")
          );
          setGetDonts(
            res.data?.avoid_and_adds.filter((res) => res.category === "dont")
          );
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
          `/api/v1/avoid_and_adds?user_id=${localStorage.getItem(
            "map_doctor_id"
          )}`
        )
        .then((res) => {
          console.log(
            "Donts",
            res.data?.avoid_and_adds.filter((res) => res.category === "dont")
          );
          setGetDonts(
            res.data?.avoid_and_adds.filter((res) => res.category === "dont")
          );
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
          alert(err.response?.data?.message + "!");
        });
    }
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
    const selectedDonts = selectedCheckboxes
      .map((id) => getDonts.find((donts) => donts.id === Number(id)))
      .filter((donts) => donts);

    if (selectedDonts.length === 0) {
      return Swal.fire({
        icon: "warning",
        title: "No Don'ts Selected",
        text: "Please select at least one don'ts to save.",
      });
    }

    console.log("Selected Donts: ", selectedDonts);

    const formData = new FormData();
    formData.append(
      "package[weight_reason]",
      context[0] === "null" ? null : context[0]
    );
    formData.append("package[user_id]", main_id);
    formData.append("package[dont]", JSON.stringify(selectedDonts));

    try {
      const response = await axios.post("/api/v1/packages", formData);
      if (response.data) {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Added!",
          text: `Your donts has been added.`,
          showConfirmButton: false,
          timer: 1500,
        });
      }
      handleGetDonts();
      context[1]();
    } catch (err) {
      console.error(err);
    } finally {
      setSelectedCheckboxes([]);
      setShowCheckboxes(false);
    }
  };

  useEffect(() => {
    const preSelectedDonts = context[2]?.reduce((acc, packages) => {
      if (context[0] === packages.weight_reason) {
        acc = [...acc, ...packages.dont.map((q) => String(q.id))];
      }
      return acc;
    }, []);
    setSelectedCheckboxes(preSelectedDonts);
  }, [context]);

  useEffect(() => {
    handleGetDonts();
  }, [context[0]]);

  if (loading) {
    return <InsideLoader />;
  }

  return (
    <div className="w-full p-2">
      <div className="rounded-lg bg-card h-[85vh] bg-white">
        <div className="flex px-4 py-3 h-full flex-col space-y-3">
          <div className="flex gap-5 text-center items-center justify-between">
            {!showCheckboxes && (
              <SelectTreatmentButton
                name="Select Don'ts"
                function={handleToggleCheckboxes}
              />
            )}

            {showCheckboxes && (
              <div className="font-[550] text-lg">
                No. of don'ts checked: {selectedCheckboxes.length}
              </div>
            )}

            {!showCheckboxes && (
              <div className="font-[550] text-lg flex items-center">
                Checked Don'ts -{" "}
                <div className="ml-2 bg-gray-400 border border-gray-200 size-5"></div>
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
                  <ThComponent name="In English" />
                  <ThComponent name="In Hindi" />
                  <ThComponent
                    moreClasses={"rounded-tr-md rounded-br-md"}
                    name="In Gujarati"
                  />
                </tr>
              </thead>
              <tbody>
                {paginateCustomers().length === 0 ? (
                  <tr>
                    <th
                      className="uppercase tracking-wide font-medium pt-[13rem] text-lg"
                      colSpan={8}
                    >
                      No Don'ts Found!
                    </th>
                  </tr>
                ) : (
                  paginateCustomers().map((val, index) => {
                    return (
                      <tr
                        className={`${
                          context[2]?.some(
                            (packages) =>
                              context[0] === packages.weight_reason &&
                              packages.dont?.some(
                                (donts) => donts.id === val.id
                              )
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
                              className="size-4"
                              defaultChecked={context[2]?.some(
                                (packages) =>
                                  context[0] === packages.weight_reason &&
                                  packages.dont?.some(
                                    (donts) => donts.id === val.id
                                  )
                              )}
                            />
                          </td>
                        )}
                        {!showCheckboxes && (
                          <td className="py-2 px-4 border-b border-b-gray-50">
                            <div className="flex items-center">
                              {index + 1 + (currentPage - 1) * rowsPerPage}
                            </div>{" "}
                          </td>
                        )}
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
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
          {/* Pagination Controls */}
          {totalPages !== 0 && (
            <div className="flex flex-wrap justify-center items-center gap-2 py-2">
              <button
                onClick={handlePreviousPage}
                disabled={currentPage === 1}
                className="flex items-center gap-2 px-6 py-3 font-sans text-xs font-bold text-center text-gray-900 uppercase align-middle transition-all rounded-full select-none hover:bg-gray-900/10 active:bg-gray-900/20 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                  stroke="currentColor"
                  aria-hidden="true"
                  className="w-4 h-4"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
                  ></path>
                </svg>
                Previous
              </button>
              <div className="flex gap-2">
                {Array.from({ length: totalPages }, (_, i) => (
                  <button
                    key={i + 1}
                    onClick={() => setCurrentPage(i + 1)}
                    className={`relative h-10 max-h-[40px] w-10 max-w-[40px] select-none rounded-full text-center align-middle font-sans text-xs font-medium uppercase text-gray-900 transition-all hover:bg-gray-900/10 active:bg-gray-900/20 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none ${
                      currentPage === i + 1
                        ? "bg-gray-900 text-white"
                        : "bg-gray-200 text-black"
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}
              </div>
              <button
                onClick={handleNextPage}
                disabled={currentPage === totalPages}
                className="flex items-center gap-2 px-6 py-3 font-sans text-xs font-bold text-center text-gray-900 uppercase align-middle transition-all rounded-full select-none hover:bg-gray-900/10 active:bg-gray-900/20 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
              >
                Next
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                  stroke="currentColor"
                  aria-hidden="true"
                  className="w-4 h-4"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                  ></path>
                </svg>
              </button>
            </div>
          )}
          {!showCheckboxes && (
            <div className="flex justify-between">
              <PrevPageButton to="../dos" />
            </div>
          )}
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

export default TreatmentDonts;
