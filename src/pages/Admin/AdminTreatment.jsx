import { Option, Select } from "@mui/joy";
import axios from "axios";
import { useEffect, useState } from "react";
import { Outlet, useOutletContext } from "react-router-dom";
import clsx from "https://cdn.skypack.dev/clsx@1.1.1";

function AdminTreatment() {
  const context = useOutletContext();
  const [getWeightReason, setGetWeightReason] = useState([]);
  const [sendWeightReason, setSendWeightReason] = useState(null);
  const [getPackages, setPackages] = useState([]);
  const [seeRequired, setSeeRequired] = useState(true);
  const [isDropdownDisabled, setIsDropdownDisabled] = useState(false);
  const [weightReason, setWeightReason] = useState("");
  const role = localStorage.getItem("role");
  const main_id = localStorage.getItem("main_id");

  const handleGetWeightReason = () => {
    if (role === "super_admin") {
      axios
        .get("/api/v1/weight_reasons")
        .then((res) => {
          console.log("Weight Reasons: ", res.data?.weight_reasons);
          setGetWeightReason(res.data?.weight_reasons);
        })
        .catch((err) => {
          console.log(err);
          alert(err.response?.data?.message + "!");
        });
    } else if (role === "doctor") {
      axios
        .get(`/api/v1/weight_reasons?user_id=${main_id}`)
        .then((res) => {
          console.log(
            "Weight Reasons of particular doctor: ",
            res.data?.weight_reasons
          );
          setGetWeightReason(res.data?.weight_reasons);
        })
        .catch((err) => {
          console.log(err);
          alert(err.response?.data?.message + "!");
        });
    }
  };

  const handlegetPackages = () => {
    axios
      .get(`/api/v1/packages?user_id=${main_id}`)
      .then((res) => {
        console.log("Packages", res.data?.packages);
        setPackages(res.data?.packages);
      })
      .catch((err) => {
        console.log(err);
        alert(err.response?.data?.message + "!");
      });
  };

  const handleSendWeightReason = (val, doc_id) => {
    setSendWeightReason(val);
    localStorage.setItem("map_doctor_id", doc_id);
    setIsDropdownDisabled(true);
    setWeightReason(val);
    localStorage.setItem("weight_reason", val);
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
      <div className=" h-screen flex-grow overflow-auto flex flex-col flex-wrap content-start">
        <div className="w-fit ">
          <div className="flex flex-col md:flex-row gap-2 p-4 justify-center lg:w-[180vh] ">
            {weightReason ? (
              <div className="flex justify-center lg:ml-2 text-xl font-semibold">
                <div>Selected Treatment: {weightReason}</div>
              </div>
            ) : (
              <Select
                required
                placeholder="Select a reason"
                disabled={isDropdownDisabled}
                className="lg:w-[100vh]"
              >
                {getWeightReason.map((res) => {
                  return (
                    <Option
                      key={res.id}
                      value={res.name}
                      onClick={() => {
                        handleSendWeightReason(res.name, res.user_id);
                        setSeeRequired(false);
                      }}
                    >
                      {res.name}
                    </Option>
                  );
                })}
              </Select>
            )}
            {seeRequired && (
              <div className="text-red-500 text-md">**Required</div>
            )}
          </div>

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

        {sendWeightReason !== null && (
          <Outlet
            context={[sendWeightReason, handlegetPackages, getPackages]}
          />
        )}
      </div>
    </div>
  );
}

export default AdminTreatment;
