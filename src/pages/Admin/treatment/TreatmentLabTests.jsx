import TdComponent from "../../../components/TdComponent";
import PrevPageButton from "../../../components/Admin/PrevPageButton";
import ThComponent from "../../../components/ThComponent";
import { useEffect, useState } from "react";
import axios from "axios";
import SaveTreatmentButtons from "../../../components/Admin/SaveTreatmentButtons";
import Swal from "sweetalert2";
import { useOutletContext } from "react-router-dom";
import SelectTreatmentButton from "../../../components/Admin/SelectTreatmentButton";
import { Option, Select } from "@mui/joy";

function TreatmentLabTests() {
  const context = useOutletContext();
  const [getTests, setGetTests] = useState([]);
  const [getWeightReason, setGetWeightReason] = useState([]);
  const [sendWeightReason, setSendWeightReason] = useState(null);
  const [selectedCheckboxes, setSelectedCheckboxes] = useState([]);
  const [showCheckboxes, setShowCheckboxes] = useState(false);
  const [getPackages, setPackages] = useState([]);

  const handleGetWeightReason = () => {
    axios
      .get("/api/v1/weight_reasons")
      .then((res) => {
        console.log("Weight Reasons", res.data?.weight_reasons);
        setGetWeightReason(res.data?.weight_reasons);
      })
      .catch((err) => {
        console.log(err);
        alert(err.message);
      });
  };

  const handlegetPackages = () => {
    axios
      .get("/api/v1/packages")
      .then((res) => {
        console.log("Packages", res.data?.packages);
        setPackages(res.data?.packages);
      })
      .catch((err) => {
        console.log(err);
        alert(err.message);
      });
  };

  const handleSendWeightReason = (val) => {
    setSendWeightReason(val);
    console.log(val);
  };

  const handleGetTests = () => {
    axios
      .get("/api/v1/labtest_managements")
      .then((res) => {
        console.log(res.data);
        setGetTests(res.data?.lab_managements);
      })
      .catch((err) => {
        console.log(err);
        alert(err.message);
      });
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
    const selectedTests = selectedCheckboxes
      .map((id) => getTests.find((com) => com.id === Number(id)))
      .filter((com) => com);

    if (selectedTests.length === 0) {
      return Swal.fire({
        icon: "warning",
        title: "No Lab Test Selected",
        text: "Please select at least one test to save.",
      });
    }

    console.log("Selected Lab Test: ", selectedTests);

    const formData = new FormData();
    formData.append(
      "package[weight_reason]",
      sendWeightReason === "null" ? null : sendWeightReason
    );
    formData.append("package[lab_test]", JSON.stringify(selectedTests));

    try {
      const response = await axios.post("/api/v1/packages", formData);
      if (response.data) {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Added!",
          text: `Your lab test has been added.`,
          showConfirmButton: false,
          timer: 1500,
        });
      }
      handleGetTests();
      handlegetPackages();
    } catch (err) {
      console.error(err);
    } finally {
      setSelectedCheckboxes([]);
      setShowCheckboxes(false);
    }
  };

  useEffect(() => {
    const preSelectedTest = getPackages?.reduce((acc, packages) => {
      if (sendWeightReason === packages.weight_reason) {
        acc = [...acc, ...packages.lab_test.map((q) => String(q.id))];
      }
      return acc;
    }, []);
    setSelectedCheckboxes(preSelectedTest);
  }, [sendWeightReason]);

  useEffect(() => {
    handleGetTests();
    handlegetPackages();
    handleGetWeightReason();
  }, []);

  return (
    <div className="w-full p-2">
      <div className="rounded-lg bg-card h-[85vh] bg-white">
        <div className="flex px-4 py-3 h-full flex-col space-y-3">
          <div className="flex gap-5 text-center items-center justify-between">
            <div className="flex items-center w-fit mb-2">
              <span className="mr-2 font-semibold">Select Weight Reason: </span>
              <Select required placeholder="Select">
                {getWeightReason.map((res) => {
                  return (
                    <Option
                      key={res.id}
                      value={res.name}
                      onClick={() => handleSendWeightReason(res.name)}
                    >
                      {res.name}
                    </Option>
                  );
                })}
              </Select>
            </div>

            {!showCheckboxes && (
              <SelectTreatmentButton
                name="Select Lab Tests"
                function={handleToggleCheckboxes}
              />
            )}

            {showCheckboxes && (
              <div className="font-[550] text-lg">
                No. of tests checked: {selectedCheckboxes?.length}
              </div>
            )}

            {!showCheckboxes && (
              <div className="font-[550] text-lg flex items-center">
                Checked Lab Tests -{" "}
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
                  <ThComponent name="Test Name" />
                  <ThComponent name="Gender" />
                  <ThComponent
                    moreClasses={"rounded-tr-md rounded-br-md"}
                    name="Comments"
                  />
                </tr>
              </thead>
              <tbody>
                {getTests.length === 0 ? (
                  <tr>
                    <th
                      className="uppercase tracking-wide font-medium pt-[13rem] text-lg"
                      colSpan={8}
                    >
                      No Lab Tests Found!
                    </th>
                  </tr>
                ) : (
                  getTests.map((val, index) => {
                    return (
                      <tr
                        className={`${
                          getPackages?.some(
                            (packages) =>
                              sendWeightReason === packages.weight_reason &&
                              packages.lab_test?.some(
                                (test) => test.id === val.id
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
                              defaultChecked={getPackages?.some(
                                (packages) =>
                                  sendWeightReason === packages.weight_reason &&
                                  packages.lab_test?.some(
                                    (test) => test.id === val.id
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
                          <TdComponent things={val.name} />
                        </td>
                        <td className="py-3 px-4 border-b border-b-gray-50">
                          <TdComponent things={val.gender} />
                        </td>
                        <td className="py-3 px-4 border-b border-b-gray-50">
                          <TdComponent things={val.comments} />
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
              <PrevPageButton to="../complains" />
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

export default TreatmentLabTests;
