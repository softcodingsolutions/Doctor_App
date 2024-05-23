import { useEffect, useState } from "react";
import { Link, Outlet } from "react-router-dom";
import clsx from "https://cdn.skypack.dev/clsx@1.1.1";
import { reportTreatmentButtons } from "../../../../constants/admin/AdminConstants";
import { Option, Select } from "@mui/joy";
import axios from "axios";

function ReportTreatment() {
  const [selectedId, setSelectedId] = useState();
  const [getWeightReason, setGetWeightReason] = useState([]);
  const [sendWeightReason, setSendWeightReason] = useState(null);

  const handleGetWeightReason = () => {
    axios
      .get("/api/v1/weight_reasons")
      .then((res) => {
        console.log("Weight Reasons",res.data?.weight_reasons);
        setGetWeightReason(res.data?.weight_reasons);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleSendWeightReason = (val) => {
    setSendWeightReason(val);
  };

  useEffect(() => {
    handleGetWeightReason();
  }, []);

  return (
    <div className="w-full p-2">
      <div className="rounded-lg bg-card h-[85vh] bg-white">
        <div className="flex px-4 py-3 h-full flex-col space-y-4">
          <div className="w-full sm:flex p-2 items-end">
            <div className="sm:flex-grow flex flex-col justify-between overflow-x-hidden">
              <div className="flex items-center w-fit mb-2">
                <span className="mr-2 font-semibold">
                  Select Weight Reason:{" "}
                </span>
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
              <div className="flex flex-wrap transition-transform gap-3 p-1">
                {reportTreatmentButtons.map((res) => {
                  return (
                    <Link
                      to={res.to}
                      onClick={() => setSelectedId(res.id)}
                      key={res.id}
                      className={clsx(
                        "min-w-fit flex items-center justify-center col-span-2 border shadow-md cursor-pointer hover:bg-[#1F2937] hover:text-white p-2 rounded-md",
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
              </div>
              <Outlet
                context={[sendWeightReason]}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ReportTreatment;
