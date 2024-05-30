import axios from "axios";
import { useEffect, useState } from "react";
import { Link, Outlet } from "react-router-dom";
import clsx from "https://cdn.skypack.dev/clsx@1.1.1";
import { reportButtons } from "../../../constants/admin/AdminConstants";

function CustomerUserDiagnosis() {
  const [selectedId, setSelectedId] = useState("1");
  const [getCustomer, setGetCustomer] = useState([]);
  const id = localStorage.getItem("userId");

  const handlegetUser = () => {
    axios
      .get(`/api/v2/users/${id}`)
      .then((res) => {
        console.log("User to diagnos", res.data.user);
        setGetCustomer(res.data?.user);
      })
      .catch((err) => {
        console.log(err);
        alert(err.message);
      });
  };

  useEffect(() => {
    handlegetUser();
  }, []);

  return (
    <>
      <div className="w-full sm:flex items-end">
        <div className="sm:flex-grow flex justify-between overflow-x-hidden">
          <div className="flex flex-wrap justify-center transition-transform gap-3 p-1 w-full">
            {reportButtons.map((res) => {
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
        </div>
      </div>
      <div className="w-full p-2">
        {!selectedId && (
          <div className="rounded-lg bg-card h-[87vh] bg-white">
            <div className="flex p-5 h-full flex-col items-center space-y-8">
              <div className="flex flex-col text-lg font-bold justify-center w-5/6 gap-3 mt-1">
                <div className="flex justify-between">
                  <div>
                    Patient Name:{" "}
                    {getCustomer?.first_name + " " + getCustomer?.last_name}
                  </div>
                  <div>Case Number: {getCustomer?.case_number}</div>
                </div>
                <div className="flex justify-between">
                  <div>
                    Gender:{" "}
                    {getCustomer.personal_detail &&
                      getCustomer.personal_detail?.gender[0]?.toUpperCase() +
                        getCustomer.personal_detail?.gender?.substring(1)}
                  </div>
                  <div>Customer Type: null</div>
                </div>
                <div className="flex justify-between">
                  <div>Age: {getCustomer.personal_detail?.age}</div>
                  <div>
                    Date:{" "}
                    {getCustomer.personal_detail?.created_at?.slice(0, 10)}
                  </div>
                </div>
                <div className="flex justify-between">
                  <div>
                    Current Weight: {getCustomer.personal_detail?.weight} kg
                  </div>
                  <div>Height: {getCustomer.personal_detail?.height} cm</div>
                </div>
                <div className="flex justify-between">
                  <div>Package: null</div>
                  <div>Treatment Code: null</div>
                </div>
                <div className="flex justify-center mt-3">
                  <button
                    onClick={() => console.log("Generate Report")}
                    className="p-1 border border-gray-400 rounded-md bg-gray-600 text-white hover:scale-105"
                  >
                    Generate Report
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      {selectedId && <Outlet context={[id, getCustomer]} />}
    </>
  );
}

export default CustomerUserDiagnosis;
