import { useEffect, useState } from "react";
import { Link, Outlet, useOutletContext } from "react-router-dom";
import clsx from "https://cdn.skypack.dev/clsx@1.1.1";
import { reportTreatmentButtons } from "../../../../constants/admin/AdminConstants";
import { Option, Select } from "@mui/joy";
import axios from "axios";
import { IoIosCheckmarkCircle } from "react-icons/io";

function ReportTreatment() {
  const [selectedId, setSelectedId] = useState("1");
  const [getWeightReason, setGetWeightReason] = useState([]);
  const [sendWeightReason, setSendWeightReason] = useState(null);
  const [mappingPackages, setMappingPackages] = useState([]);
  const [storeData, setStoreData] = useState({
    medicine: [],
    diet: [],
    nutrition: [],
    exercise: [],
    dos: [],
    donts: [],
  });

  const submitDataToCreateTreatmentPackage = () => {
    console.log(storeData);
  };

  const context = useOutletContext();

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
    console.log(context[1]);
    axios
      .get(`/api/v1/packages/find_packages?id=${context[1]?.id}`)
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
