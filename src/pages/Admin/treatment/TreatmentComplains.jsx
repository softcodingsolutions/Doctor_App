import TdComponent from "../../../components/TdComponent";
import PrevPageButton from "../../../components/Admin/PrevPageButton";
import NextPageButton from "../../../components/Admin/NextPageButton";
import ThComponent from "../../../components/ThComponent";
import { useEffect, useState } from "react";
import axios from "axios";
import SaveTreatmentButtons from "../../../components/Admin/SaveTreatmentButtons";
import Swal from "sweetalert2";
import { useOutletContext } from "react-router-dom";
import SelectTreatmentButton from "../../../components/Admin/SelectTreatmentButton";
import InsideLoader from "../../InsideLoader";

function TreatmentComplains() {
  const context = useOutletContext();
  const [getComplain, setGetComplain] = useState([]);
  const [selectedCheckboxes, setSelectedCheckboxes] = useState([]);
  const [showCheckboxes, setShowCheckboxes] = useState(false);
  const role = localStorage.getItem("role");
  const [loading, setLoading] = useState(true);
  const main_id = localStorage.getItem("main_id");

  const handleGetComplain = () => {
    if (role === "doctor") {
      axios
        .get(`/api/v1/complaints?user_id=${localStorage.getItem("main_id")}`)
        .then((res) => {
          console.log(res.data);
          setGetComplain(res.data);
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
          `/api/v1/complaints?user_id=${localStorage.getItem("map_doctor_id")}`
        )
        .then((res) => {
          console.log(res.data);
          setGetComplain(res.data);
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
    const selectedComplain = selectedCheckboxes
      .map((id) => getComplain.find((com) => com.id === Number(id)))
      .filter((com) => com);

    if (selectedComplain.length === 0) {
      return Swal.fire({
        icon: "warning",
        title: "No Complains Selected",
        text: "Please select at least one complain to save.",
      });
    }

    console.log("Selected Complain: ", selectedComplain);

    const formData = new FormData();
    formData.append(
      "package[weight_reason]",
      context[0] === "null" ? null : context[0]
    );
    formData.append("package[user_id]", main_id);
    formData.append("package[complaints]", JSON.stringify(selectedComplain));

    try {
      const response = await axios.post("/api/v1/packages", formData);
      if (response.data) {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Added!",
          text: `Your complain has been added.`,
          showConfirmButton: false,
          timer: 1500,
        });
      }
      handleGetComplain();
      context[1]();
    } catch (err) {
      console.error(err);
    } finally {
      setSelectedCheckboxes([]);
      setShowCheckboxes(false);
    }
  };

  useEffect(() => {
    const preSelectedComplain = context[2]?.reduce((acc, packages) => {
      if (context[0] === packages.weight_reason) {
        acc = [...acc, ...packages.complaints.map((q) => String(q.id))];
      }
      return acc;
    }, []);
    setSelectedCheckboxes(preSelectedComplain);
  }, [context]);

  useEffect(() => {
    handleGetComplain();
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
                name="Select Complains"
                function={handleToggleCheckboxes}
              />
            )}

            {showCheckboxes && (
              <div className="font-[550] text-lg">
                No. of complains checked: {selectedCheckboxes.length}
              </div>
            )}

            {!showCheckboxes && (
              <div className="font-[550] text-lg flex items-center">
                Checked Complains -{" "}
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
                  <ThComponent
                    moreClasses={"rounded-tr-md rounded-br-md"}
                    name="Complain Details"
                  />
                </tr>
              </thead>
              <tbody>
                {getComplain.length === 0 ? (
                  <tr>
                    <th
                      className="uppercase tracking-wide font-medium pt-[13rem] text-lg"
                      colSpan={8}
                    >
                      No Complains Found!
                    </th>
                  </tr>
                ) : (
                  getComplain.map((val, index) => {
                    return (
                      <tr
                        className={`${
                          context[2]?.some(
                            (packages) =>
                              context[0] === packages.weight_reason &&
                              packages.complaints?.some(
                                (com) => com.id === val.id
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
                                  packages.complaints?.some(
                                    (com) => com.id === val.id
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
                          <TdComponent things={val.details} />
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>

          {!showCheckboxes && (
            <div className="flex justify-between">
              <PrevPageButton to="../family-reason" />
              <NextPageButton name="Lab Tests" to="../lab-tests" />
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

export default TreatmentComplains;
