import { useEffect, useState } from "react";
import { Link, Outlet, useOutletContext } from "react-router-dom";
import clsx from "https://cdn.skypack.dev/clsx@1.1.1";
import { reportTreatmentButtons } from "../../../../constants/admin/AdminConstants";
import { Option, Select } from "@mui/joy";
import axios from "axios";
import { IoIosCheckmarkCircle } from "react-icons/io";
import Swal from "sweetalert2";

function ReportTreatment() {
  const context = useOutletContext();
  const [selectedId, setSelectedId] = useState("1");
  const [getWeightReason, setGetWeightReason] = useState([]);
  const [sendWeightReason, setSendWeightReason] = useState(null);
  const [mappingPackages, setMappingPackages] = useState([]);
  const user_id = localStorage.getItem("userId");
  const [storeData, setStoreData] = useState({
    medicine: [],
    diet: [],
    nutrition: [],
    exercise: [],
    dos: [],
    donts: [],
  });

  console.log("Context From Report", context[1]);

  const submitDataToCreateTreatmentPackage = () => {
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
            Swal.fire({
              title: "Assigned!",
              text: "Your treatment package has been assigned.",
              icon: "success",
            });
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleGetTreatmentPackages = () => {
    axios
      .get(`/api/v1/treatment_packages`)
      .then((res) => {
        console.log("Treatment Packages: ", res.data?.treatment_packages);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleGetWeightReason = () => {
    axios
      .get(`/api/v1/packages/find_packages?id=${user_id}`)
      .then((res) => {
        console.log(
          "Got weight reason of the user",
          res.data?.matching_packages
        );
        setMappingPackages(res.data?.matching_packages);

        const data = res.data?.matching_packages.map((pack) => {
          return [pack.package.weight_reason, pack.meets_requirements];
        });
        setGetWeightReason(data);
      })
      .catch((err) => {
        console.log(err);
        alert(err.message);
      });
  };

  const handleSendWeightReason = (val) => {
    setSendWeightReason(val);
  };

  useEffect(() => {
    handleGetTreatmentPackages();
    handleGetWeightReason();
  }, [selectedId]);

  return (
    <div className="w-full p-2">
      <div className="rounded-lg bg-card h-[85vh] bg-white">
        <div className="flex px-4 py-3 h-full flex-col space-y-4">
          <div className="w-full sm:flex p-1 items-end">
            <div className="sm:flex-grow flex flex-col justify-between overflow-x-hidden">
              <div className="flex flex-wrap justify-evenly items-center gap-2 transition-transform">
                <div className="flex items-center">
                  <span className="mr-2 font-semibold">
                    Select Weight Reason:{" "}
                  </span>
                  <Select required placeholder="Select">
                    {getWeightReason?.map((res) => {
                      return (
                        <Option
                          style={{
                            backgroundColor: res[1] ? "lightgreen" : "",
                            marginBottom: "1px",
                          }}
                          key={res[0]}
                          value={res[0]}
                          onClick={() => handleSendWeightReason(res)}
                        >
                          {res}
                        </Option>
                      );
                    })}
                  </Select>
                </div>
                {reportTreatmentButtons.map((res) => {
                  return (
                    <Link
                      to={res.to}
                      onClick={() => setSelectedId(res.id)}
                      key={res.id}
                      className={clsx(
                        "min-w-fit flex items-center justify-center border shadow-md cursor-pointer hover:bg-[#1F2937] hover:text-white py-2 px-3.5 rounded-md",
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
                  className="min-w-fit flex text-green-500 font-semibold items-center justify-center border shadow-md cursor-pointer hover:bg-[#17da21] hover:text-white py-2 px-3.5 rounded-md"
                >
                  <IoIosCheckmarkCircle size={20} /> Submit
                </button>
              </div>
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
  );
}

export default ReportTreatment;
