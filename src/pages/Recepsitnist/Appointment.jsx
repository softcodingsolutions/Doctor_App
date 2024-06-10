import { Option, Select } from "@mui/joy";
import axios from "axios";
import { useEffect, useState } from "react";
import { Outlet, useOutletContext } from "react-router-dom";

function Appointment() {
  const context = useOutletContext();
  const [getWeightReason, setGetWeightReason] = useState([]);
  const [sendWeightReason, setSendWeightReason] = useState(null);
  const [getPackages, setPackages] = useState([]);

  const handleGetWeightReason = () => {
    axios
      .get("/api/v1/weight_reasons")
      .then((res) => {
        console.log(res.data);
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
        console.log("Packages", res.data?.packages);+
        setPackages(res.data?.packages);
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

export default Appointment;
