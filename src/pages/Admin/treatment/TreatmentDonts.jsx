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
import { useNavigate } from "react-router-dom";

function TreatmentDonts() {
  const weight_reason = localStorage.getItem("weight_reason");
  const navigate = useNavigate();
  const context = useOutletContext();
  const [getDonts, setGetDonts] = useState([]);
  const [selectedCheckboxes, setSelectedCheckboxes] = useState([]);
  const [showCheckboxes, setShowCheckboxes] = useState(true);
  const role = localStorage.getItem("role");
  const [loading, setLoading] = useState(true);
  const main_id = localStorage.getItem("main_id");

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
      navigate(`/admin/treatment/question-part1`);
      window.location.reload();
    } catch (err) {
      console.error(err);
    } finally {
      setSelectedCheckboxes([]);
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
          <div className="flex flex-col md:flex-row gap-4 md:gap-5 text-center items-center justify-between p-4">
            {showCheckboxes && (
              <div className="font-[550] text-lg">
                No. of don'ts checked: {selectedCheckboxes.length}
              </div>
            )}

            {showCheckboxes && (
              <div className="font-[550] text-lg flex items-center">
                Checked Don'ts -{" "}
                <div className="ml-2 bg-gray-400 border border-gray-200 h-5 w-5"></div>{" "}
              </div>
            )}
          </div>

          <div className="animate-fade-left animate-delay-75 shadow-gray-400 shadow-inner border rounded-md border-gray-100 animate-once animate-ease-out overflow-auto h-[93%]">
            <table className="w-full min-w-[460px] z-0">
              <thead className="uppercase ">
                <tr className="bg-[#1F2937] text-white rounded-md">
                  <ThComponent
                    moreClasses={"rounded-tl-md rounded-bl-md"}
                    name="Select"
                  />

                  <ThComponent name="In English" />
                  <ThComponent name="In Hindi" />
                  <ThComponent
                    moreClasses={"rounded-tr-md rounded-br-md"}
                    name="In Gujarati"
                  />
                </tr>
              </thead>
              <tbody>
                {getDonts.length === 0 ? (
                  <tr>
                    <th
                      className="uppercase tracking-wide font-medium pt-[13rem] text-lg"
                      colSpan={8}
                    >
                      No Don'ts Found!
                    </th>
                  </tr>
                ) : (
                  getDonts.map((val, index) => {
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
                        <td className="py-3 px-4 border-b border-b-gray-50">
                          <input
                            value={val.id}
                            onChange={handleCheckboxChange}
                            type="checkbox"
                            className="size-5"
                            defaultChecked={context[2]?.some(
                              (packages) =>
                                context[0] === packages.weight_reason &&
                                packages.dont?.some(
                                  (donts) => donts.id === val.id
                                )
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
                    );
                  })
                )}
              </tbody>
            </table>
          </div>

          {showCheckboxes && (
            <>
              <div className="flex justify-between">
                <PrevPageButton to="../dos" />
                <div className="flex gap-2">
                  <SaveTreatmentButtons function={handleSave} />{" "}
                  <div className="font-bold text-lg m-2">
                    for "{weight_reason}"
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default TreatmentDonts;
