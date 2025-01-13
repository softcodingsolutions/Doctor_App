import { Option, Select } from "@mui/joy";
import axios from "axios";
import { useEffect, useState } from "react";
import { Outlet, useOutletContext } from "react-router-dom";

function Surveytreatment() {
  const context = useOutletContext();
  const [getWeightReason, setGetWeightReason] = useState([]);
  const [sendWeightReason, setSendWeightReason] = useState(null);
  const [getPackages, setPackages] = useState([]);

  const handleGetWeightReason = () => {
    axios
      .get("/api/v2/survey_weigh_reasons")
      .then((res) => {
        console.log("Weight Reasons: ", res.data?.all_survey_weigh_reasons);
        setGetWeightReason(res.data?.all_survey_weigh_reasons);
      })
      .catch((err) => {
        console.log(err);
        alert(err.response?.data?.message + "!");
      });
  };

  const handlegetPackages = () => {
    axios
      .get("/api/v2/survey_weight_reason_packages")
      .then((res) => {
        console.log("Packages", res.data?.all_survey_weight_reason_packages);
        setPackages(res.data?.all_survey_weight_reason_packages);
      })
      .catch((err) => {
        console.log(err);
        alert(err.response?.data?.message + "!");
      });
  };

  const handleSendWeightReason = (val) => {
    setSendWeightReason(val);
  };

  useEffect(() => {
    handleGetWeightReason();
    handlegetPackages();
  }, []);

  return (
    <div className="flex w-full">
      <div className="w-full h-screen hidden sm:block sm:w-20 xl:w-60 flex-shrink-0">
        .
      </div>
      <div className=" h-screen flex-grow overflow-auto flex flex-wrap content-start p-2">
        <div className="w-fit p-2">
          <div className="grid grid-cols-4 transition-transform lg:grid-cols-10 md:grid-cols-8 sm:grid-cols-6 gap-3 p-1 min-w-fit xl:flex"></div>
          <Select required placeholder="Select">
            {getWeightReason?.map((res) => {
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
          <button
            onClick={context[0]}
            type="button"
            className="absolute end-5 top-8 sm:hidden hover:scale-110 w-fit"
          >
            <img
              src={`https://assets.codepen.io/3685267/res-react-dash-sidebar-open.svg`}
              alt=""
            />
          </button>
        </div>
        <Outlet context={[sendWeightReason, handlegetPackages, getPackages]} />
      </div>
    </div>
  );
}

export default Surveytreatment;
