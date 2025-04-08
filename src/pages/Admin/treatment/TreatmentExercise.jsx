import { useEffect, useState } from "react";
import TdComponent from "../../../components/TdComponent";
import PrevPageButton from "../../../components/Admin/PrevPageButton";
import NextPageButton from "../../../components/Admin/NextPageButton";
import ThComponent from "../../../components/ThComponent";
import axios from "axios";
import { useOutletContext } from "react-router-dom";
import Swal from "sweetalert2";
import SaveTreatmentButtons from "../../../components/Admin/SaveTreatmentButtons";
import SelectTreatmentButton from "../../../components/Admin/SelectTreatmentButton";
import InsideLoader from "../../InsideLoader";

function TreatmentExercise() {
  const context = useOutletContext();
  const [getExercise, setGetExercise] = useState([]);
  const [selectedCheckboxes, setSelectedCheckboxes] = useState([]);
  const [showCheckboxes, setShowCheckboxes] = useState(true);
  const role = localStorage.getItem("role");
  const [loading, setLoading] = useState(true);
  const main_id = localStorage.getItem("main_id");

  const handleGetExercise = () => {
    if (role === "doctor") {
      axios
        .get(`/api/v1/exercises?user_id=${localStorage.getItem("main_id")}`)
        .then((res) => {
          console.log(res.data);
          setGetExercise(res.data);
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
          `/api/v1/exercises?user_id=${localStorage.getItem("map_doctor_id")}`
        )
        .then((res) => {
          console.log(res.data);
          setGetExercise(res.data);
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
    const selectedExercise = selectedCheckboxes
      .map((id) => getExercise.find((exe) => exe.id === Number(id)))
      .filter((exe) => exe);

    if (selectedExercise.length === 0) {
      return Swal.fire({
        icon: "warning",
        title: "No Exercise Selected",
        text: "Please select at least one exercise to save.",
      });
    }

    console.log("Selected Exercise: ", selectedExercise);

    const formData = new FormData();
    formData.append(
      "package[weight_reason]",
      context[0] === "null" ? null : context[0]
    );
    formData.append("package[user_id]", main_id);
    formData.append("package[exercise]", JSON.stringify(selectedExercise));

    try {
      const response = await axios.post("/api/v1/packages", formData);
      if (response.data) {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Added!",
          text: `Your exercise has been added.`,
          showConfirmButton: false,
          timer: 1500,
        });
      }
      handleGetExercise();
      context[1]();
    } catch (err) {
      console.error(err);
    } finally {
      setSelectedCheckboxes([]);
    }
  };

  useEffect(() => {
    const preSelectedExercise = context[2]?.reduce((acc, packages) => {
      if (context[0] === packages.weight_reason) {
        acc = [...acc, ...packages.exercise.map((q) => String(q.id))];
      }
      return acc;
    }, []);
    setSelectedCheckboxes(preSelectedExercise);
  }, [context]);

  useEffect(() => {
    handleGetExercise();
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
                No. of exercises checked: {selectedCheckboxes.length}
              </div>
            )}

            {showCheckboxes && (
              <div className="font-[550] text-lg flex items-center">
                Checked Exercise -{" "}
                <div className="ml-2 bg-gray-400 border border-gray-200 h-5 w-5"></div>{" "}
                {/* Explicit size for the checked exercise indicator */}
              </div>
            )}
          </div>

          <div className="animate-fade-left animate-delay-75 shadow-gray-400 shadow-inner border rounded-md border-gray-100 animate-once animate-ease-out overflow-auto h-[93%]">
            <table className="w-full min-w-[460px] z-0">
              <thead className="uppercase sticky top-0 z-10">
                <tr className="bg-[#1F2937] text-white rounded-md">
                  <ThComponent
                    moreClasses={"rounded-tl-md rounded-bl-md"}
                    name="Select"
                  />

                  <ThComponent name="Exercise Name" />
                  <ThComponent name="In English" />
                  <ThComponent name="In Hindi" />
                  <ThComponent
                    moreClasses={"rounded-tr-md rounded-br-md"}
                    name="In Gujarati"
                  />
                </tr>
              </thead>
              <tbody>
                {getExercise.length === 0 ? (
                  <tr>
                    <th
                      className="uppercase tracking-wide font-medium pt-[13rem] text-lg"
                      colSpan={8}
                    >
                      No Exercise Found!
                    </th>
                  </tr>
                ) : (
                  getExercise.map((val, index) => {
                    return (
                      <tr
                        className={`${
                          context[2]?.some(
                            (packages) =>
                              context[0] === packages.weight_reason &&
                              packages?.exercise?.some(
                                (exercise) => exercise.id === val.id
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
                                packages.exercise?.some(
                                  (exercise) => exercise.id === val.id
                                )
                            )}
                          />
                        </td>

                        <td className="py-3 px-4 border-b border-b-gray-50">
                          <TdComponent things={val.name} />
                        </td>
                        <td className="py-3 px-4 border-b border-b-gray-50">
                          <TdComponent
                            things={
                              <div
                                dangerouslySetInnerHTML={{
                                  __html: val.details,
                                }}
                              />
                            }
                          />
                        </td>
                        <td className="py-3 px-4 border-b border-b-gray-50">
                          <TdComponent
                            things={
                              <div
                                dangerouslySetInnerHTML={{
                                  __html: val.details_hindi,
                                }}
                              />
                            }
                          />
                        </td>
                        <td className="py-3 px-4 border-b border-b-gray-50">
                          <TdComponent
                            things={
                              <div
                                dangerouslySetInnerHTML={{
                                  __html: val.details_gujarati,
                                }}
                              />
                            }
                          />
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
                <PrevPageButton to="../diet" />
              </div>
              <div>
                <SaveTreatmentButtons function={handleSave} />{" "}
                <NextPageButton name="Nutrition" to="../nutrition" />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default TreatmentExercise;
