import { useEffect, useState } from "react";
import { Link, Outlet, useOutletContext } from "react-router-dom";
import clsx from "https://cdn.skypack.dev/clsx@1.1.1";
import { reportTreatmentButtons } from "../../../../constants/admin/AdminConstants";
import { Option, Select } from "@mui/joy";
import axios from "axios";
import { IoIosCheckmarkCircle } from "react-icons/io";
import Swal from "sweetalert2";
import InsideLoader from "../../../InsideLoader";

function ReportTreatment() {
  const getCustomers = useOutletContext();
  const [selectedId, setSelectedId] = useState("1");
  const [getWeightReason, setGetWeightReason] = useState([]);
  const [sendWeightReason, setSendWeightReason] = useState(null);
  const [mappingPackages, setMappingPackages] = useState([]);
  const user_id = localStorage.getItem("userId");
  let main_id = localStorage.getItem("main_id");
  const [loading, setLoading] = useState(false);
  const role = localStorage.getItem("role");

  const [storeData, setStoreData] = useState({
    medicine: [],
    diet: [],
    nutrition: [],
    exercise: [],
    dos: [],
    donts: [],
  });

  const submitDataToCreateTreatmentPackage = () => {
    setLoading(true);
    console.log(storeData);
    const formData = new FormData();
    formData.append("treatment_package[weight_reason]", sendWeightReason[0]);
    formData.append(
      "treatment_package[medicines]",
      JSON.stringify(storeData.medicine)
    );
    formData.append("treatment_package[diet]", JSON.stringify(storeData.diet));
    formData.append(
      "treatment_package[exercise]",
      JSON.stringify(storeData.exercise)
    );
    formData.append(
      "treatment_package[nutrition]",
      JSON.stringify(storeData.nutrition)
    );
    formData.append("treatment_package[dos]", JSON.stringify(storeData.dos));
    formData.append("treatment_package[dont]", JSON.stringify(storeData.donts));

    axios
      .post("/api/v1/treatment_packages", formData)
      .then(async (res) => {
        console.log(res.data);
        const newData = new FormData();
        newData.append("treatment[user_id]", user_id);
        newData.append(
          "treatment[treatment_package_id]",
          res.data?.treatment_package?.id
        );
        await axios
          .post("/api/v1/user_treatments", newData)
          .then((res) => {
            console.log(res);
            setLoading(false);
            Swal.fire({
              title: "Assigned!",
              text: "Your treatment package has been assigned to the user.",
              icon: "success",
            });
            getCustomers[2]();
          })
          .catch((err) => {
            console.log(err);
            alert(err.response?.data?.message + "!");
          });
      })
      .catch((err) => {
        console.log(err);
        alert(err.response?.data?.message + "!");
      });
  };

  const handleGetWeightReason = () => {
    // Fetch doctor's weight reasons
    console.log(role, "Role");
    if (role == "franchise") {
      main_id = localStorage.getItem("doctor_id");
    }
    console.log(main_id, "main id");
    axios.get(`/api/v1/weight_reasons?user_id=${main_id}`).then((res) => {
      console.log(
        "Weight Reasons of particular doctor: ",
        res.data?.weight_reasons
      );
      const doctorWeightReasons = res.data?.weight_reasons;

      // Extract both id and name from doctor's weight reasons
      const doctorWeightReasonsMap = doctorWeightReasons.reduce(
        (acc, reason) => {
          acc[reason.id] = reason.name; // Store both id and name in a map for easy lookup
          return acc;
        },
        {}
      );

      // Fetch patient's matching packages
      axios
        .get(`/api/v1/packages/find_packages?id=${user_id}`)
        .then((res) => {
          console.log(
            "Got weight reason of the user",
            res.data?.matching_packages
          );
          setMappingPackages(res.data?.matching_packages);

          // Map the patient's matching packages and extract both id and name
          const patientWeightReasons = res.data?.matching_packages.map(
            (pack) => {
              return {
                id: pack.package.weight_reason_id,
                name: pack.package.weight_reason,
                meets_requirements: pack.meets_requirements,
              };
            }
          );

          // Filter the patient's weight reasons to match both id and name with doctor's reasons
          const filteredWeightReasons = patientWeightReasons.filter(
            (pack) => doctorWeightReasonsMap[pack.id] === pack.name // Match by both id and name
          );

          // If no matches found, default to doctor's weight reasons (fallback)
          const finalWeightReasons = filteredWeightReasons.length
            ? filteredWeightReasons
            : doctorWeightReasons.map((reason) => ({
                id: reason.id,
                name: reason.name,
                meets_requirements: false, // Default `meets_requirements` to false for fallback
              }));

          console.log(finalWeightReasons);

          // Set the final filtered weight reasons in state
          setGetWeightReason(
            finalWeightReasons.map((reason) => [
              reason.name,
              reason.meets_requirements,
            ])
          );
        })
        .catch((err) => {
          console.log(err);
          alert(err.response?.data?.message + "!");
        });
    });
  };

  useEffect(() => {
    handleGetWeightReason();
  }, [selectedId]);

  if (loading) {
    return <InsideLoader />;
  }

  return (
    <div className="w-full p-2">
      <div
        className={`rounded-lg bg-card ${
          role === "patient" ? "h-[85vh]" : "h-[95vh]"
        } bg-white`}
      >
        <div className="flex px-4 py-3 h-full flex-col">
          <div className="w-full sm:flex p-1 items-end">
            <div className="sm:flex-grow flex flex-col justify-between overflow-x-hidden">
              <div className="flex flex-wrap items-center gap-4 transition-transform pb-2">
                <div className="flex flex-col">
                  <Select
                    sx={{
                      width: "250px",
                      border: "1px solid black",
                    }}
                    value={sendWeightReason ? sendWeightReason[0] : ""}
                    required
                    placeholder="Select Weight Reason"
                  >
                    {getWeightReason?.map((res) => {
                      return (
                        <Option
                          style={{
                            backgroundColor: res[1] ? "" : "lightgreen",
                            marginBottom: "1px",
                          }}
                          key={res[0]}
                          value={res[0]}
                          onClick={() => setSendWeightReason(res)}
                        >
                          {res[0]}
                        </Option>
                      );
                    })}
                  </Select>
                </div>
                {!sendWeightReason && (
                  <span className="text-red-500 font-medium text-sm -ml-4 mt-5">
                    *Required
                  </span>
                )}
                <div
                  className={clsx(
                    `flex flex-wrap space-x-3`,
                    sendWeightReason === null &&
                      "pointer-events-none opacity-50"
                  )}
                >
                  {reportTreatmentButtons.map((res) => {
                    return (
                      <Link
                        to={res.to}
                        onClick={() => setSelectedId(res.id)}
                        key={res.id}
                        className={clsx(
                          "min-w-fit flex flex-wrap items-center border shadow-md cursor-pointer hover:bg-[#1F2937] hover:text-white py-2 px-2.5 rounded-md",
                          selectedId === res.id
                            ? "bg-[#1F2937] text-white"
                            : "bg-white"
                        )}
                      >
                        {res.icons}
                        <span className="ml-1.5">{res.name}</span>
                      </Link>
                    );
                  })}
                  <button
                    onClick={submitDataToCreateTreatmentPackage}
                    className="min-w-fit flex flex-wrap text-green-500 font-semibold items-center border shadow-md cursor-pointer hover:bg-[#17da21] hover:text-white py-2 px-3.5 rounded-md"
                  >
                    <IoIosCheckmarkCircle size={20} /> Submit
                  </button>
                </div>
              </div>
              <div
                className={clsx(
                  sendWeightReason === null && "pointer-events-none opacity-50"
                )}
              >
                <Outlet
                  context={{
                    sendWeightReason,
                    mappingPackages,
                    handleGetWeightReason,
                    setStoreData,
                    storeData,
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ReportTreatment;
