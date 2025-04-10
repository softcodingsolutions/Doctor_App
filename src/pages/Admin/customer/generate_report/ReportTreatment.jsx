import { useEffect, useState } from "react";
import { Link, Outlet, useOutletContext, useNavigate } from "react-router-dom";
import clsx from "https://cdn.skypack.dev/clsx@1.1.1";
import { reportTreatmentButtons } from "../../../../constants/admin/AdminConstants";
import { Option, Select } from "@mui/joy";
import axios from "axios";
import { IoIosCheckmarkCircle } from "react-icons/io";
import Swal from "sweetalert2";
import InsideLoader from "../../../InsideLoader";

function ReportTreatment() {
  const appointment_id = localStorage.getItem("appointment_id");
  const navigate = useNavigate();
  const getCustomers = useOutletContext();
  const [selectedId, setSelectedId] = useState("1");
  const [getWeightReason, setGetWeightReason] = useState([]);
  const [sendWeightReason, setSendWeightReason] = useState(null);
  const [mappingPackages, setMappingPackages] = useState([]);
  const user_id = localStorage.getItem("userId");
  let main_id = localStorage.getItem("main_id");
  const [loading, setLoading] = useState(false);
  const [loadingWeightReason, setLoadingWeightReason] = useState(true);
  const role = localStorage.getItem("role");

  const [storeData, setStoreData] = useState({
    medicine: [],
    diet: [],
    nutrition: [],
    exercise: [],
    dos: [],
    donts: [],
  });

  useEffect(() => {
    const storedSelectedId = localStorage.getItem(
      `selectedTreatmentTabId_${user_id}`
    );
    const storedWeightReason = localStorage.getItem(
      `sendWeightReason_${user_id}`
    );
    const storedTreatmentData = localStorage.getItem(
      `storeTreatmentData_${user_id}`
    );

    if (storedSelectedId) setSelectedId(storedSelectedId);
    if (storedWeightReason) setSendWeightReason(JSON.parse(storedWeightReason));
    if (storedTreatmentData) setStoreData(JSON.parse(storedTreatmentData));
  }, []);

  const submitDataToCreateTreatmentPackage = () => {
    setLoading(true);
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
        const newData = new FormData();
        newData.append("treatment[user_id]", user_id);
        newData.append(
          "treatment[treatment_package_id]",
          res.data?.treatment_package?.id
        );

        await axios
          .post("/api/v1/user_treatments", newData)
          .then((res) => {
            setLoading(false);
            Swal.fire({
              title: "Assigned!",
              text: "Your treatment package has been assigned to the user.",
              icon: "success",
            });
            localStorage.removeItem(`selectedTreatmentTabId_${user_id}`);
            localStorage.removeItem(`sendWeightReason_${user_id}`);
            localStorage.removeItem(`storeTreatmentData_${user_id}`);

            if (appointment_id) {
              const formdata = new FormData();
              formdata.append("appointment[status]", "completed");

              axios
                .put(`/api/v1/appointments/${appointment_id}`, formdata)
                .then(() => {
                  localStorage.removeItem("appointment_id");
                  getCustomers[2]();
                  navigate("/admin/appointments");
                  window.location.reload();
                })
                .catch((err) => console.log(err));
            } else {
              getCustomers[2]();
              navigate("/admin/patients/user-diagnosis/lab-tests");
              window.location.reload();
            }
          })
          .catch((err) => {
            setLoading(false);
            alert(err.response?.data?.message + "!");
          });
      })
      .catch((err) => {
        setLoading(false);
        alert(err.response?.data?.message + "!");
      });
  };

  const handleGetWeightReason = () => {
    setLoadingWeightReason(true);
    if (role === "franchise") {
      main_id = localStorage.getItem("doctor_id");
    }

    axios
      .get(`/api/v1/weight_reasons?user_id=${main_id}`)
      .then((res) => {
        const doctorWeightReasons = res.data?.weight_reasons;
        const doctorWeightReasonsMap = doctorWeightReasons.reduce(
          (acc, reason) => {
            acc[reason.id] = reason.name;
            return acc;
          },
          {}
        );

        axios
          .get(`/api/v1/packages/find_packages?id=${user_id}`)
          .then((res) => {
            const patientWeightReasons = res.data?.matching_packages.map(
              (pack) => ({
                id: pack.package.weight_reason_id,
                name: pack.package.weight_reason,
                meets_requirements: pack.meets_requirements,
              })
            );

            const filteredWeightReasons = patientWeightReasons.filter(
              (pack) => doctorWeightReasonsMap[pack.id] === pack.name
            );

            const finalWeightReasons = filteredWeightReasons.length
              ? filteredWeightReasons
              : doctorWeightReasons.map((reason) => ({
                  id: reason.id,
                  name: reason.name,
                  meets_requirements: false,
                }));

            setGetWeightReason(
              finalWeightReasons.map((reason) => [
                reason.name,
                reason.meets_requirements,
              ])
            );
            setMappingPackages(res.data?.matching_packages);
            setLoadingWeightReason(false);
          })
          .catch((err) => {
            console.log(err);
            alert(err.response?.data?.message + "!");
            setLoadingWeightReason(false);
          });
      })
      .catch((err) => {
        console.log(err);
        setLoadingWeightReason(false);
      });
  };

  useEffect(() => {
    handleGetWeightReason();
  }, [selectedId]);

  useEffect(() => {
    localStorage.setItem(
      `storeTreatmentData_${user_id}`,
      JSON.stringify(storeData)
    );
  }, [storeData]);

  useEffect(() => {
    localStorage.setItem(`selectedTreatmentTabId_${user_id}`, selectedId);
  }, [selectedId]);

  useEffect(() => {
    if (sendWeightReason) {
      localStorage.setItem(
        `sendWeightReason_${user_id}`,
        JSON.stringify(sendWeightReason)
      );
    }
  }, [sendWeightReason]);

  if (loading || loadingWeightReason) {
    return <InsideLoader />;
  }

  return (
    <div className="relative">
      <div className="flex flex-wrap items-center gap-4 transition-transform sticky top-0 bg-white z-10 shadow-md">
        <div className="flex justify-center w-full mt-2 p-2 bg-white shadow-sm border">
          <Select
            sx={{ width: "100%", border: "1px solid black" }}
            value={sendWeightReason ? sendWeightReason[0] : ""}
            required
            placeholder="Select Weight Reason"
          >
            {getWeightReason?.map((res) => (
              <Option
                key={res[0]}
                value={res[0]}
                style={{
                  backgroundColor: res[1] ? "" : "lightgreen",
                  marginBottom: "1px",
                }}
                onClick={() => setSendWeightReason(res)}
              >
                {res[0]}
              </Option>
            ))}
          </Select>
          {!sendWeightReason && (
            <span className="text-red-500 font-medium text-sm mt-2 md:mt-5">
              *Required
            </span>
          )}
        </div>

        <div className="bg-white shadow-sm border mt-2 p-1 w-full rounded-md">
          {sendWeightReason !== null && (
            <div className="grid grid-cols-7">
              {reportTreatmentButtons.map((res) => (
                <Link
                  to={res.to}
                  onClick={() => setSelectedId(res.id)}
                  key={res.id}
                  className={clsx(
                    "w-full flex items-center justify-center text-md p-1 cursor-pointer rounded-md",
                    selectedId === res.id
                      ? "bg-[#EFF6FF] text-[#2563EB] border-b border-[#2563EB]  rounded-b-none"
                      : "bg-white hover:bg-[#e3eaf3]"
                  )}
                >
                  {res.icons}
                  <span className="ml-1">{res.name}</span>
                </Link>
              ))}
              <button
                onClick={submitDataToCreateTreatmentPackage}
                className="w-full flex justify-center text-md p-1 text-green-500 font-semibold items-center shadow-md cursor-pointer hover:bg-[#17da21] hover:text-white"
              >
                <IoIosCheckmarkCircle size={20} /> Submit
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="bg-white mt-5 shadow-sm border">
        {sendWeightReason !== null && (
          <Outlet
            context={{
              sendWeightReason,
              mappingPackages,
              handleGetWeightReason,
              setStoreData,
              storeData,
              user_id,
            }}
          />
        )}
      </div>
    </div>
  );
}
export default ReportTreatment;
