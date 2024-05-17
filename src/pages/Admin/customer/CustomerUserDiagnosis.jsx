import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function CustomerUserDiagnosis() {
  const [getCustomer, setGetCustomer] = useState([]);
  const navigate = useNavigate();
  const { state } = useLocation();
  const { id } = state;

  const handlegetUser = () => {
    axios
      .get(`/api/v2/users/${id}`)
      .then((res) => {
        console.log(res.data.user);
        setGetCustomer(res.data?.user);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleGenerateReport = () => {
    navigate("./generate-report");
  };

  useEffect(() => {
    handlegetUser();
  }, []);

  return (
    <div className="w-full p-2">
      <div className="rounded-lg bg-card h-[90vh] bg-white">
        <div className="flex p-5 h-full flex-col items-center space-y-8">
          <div className="flex flex-col text-lg font-bold justify-center w-5/6 gap-3 mt-1">
            <div className="flex justify-between">
              <div>
                Patient Name:{" "}
                {getCustomer.first_name + " " + getCustomer.last_name}
              </div>
              <div>Case Number: {getCustomer.case_number}</div>
            </div>
            <div className="flex justify-between">
              <div>
                Gender:{" "}
                {getCustomer.personal_detail?.gender[0].toUpperCase() +
                  getCustomer.personal_detail?.gender?.substring(1)}
              </div>
              <div>Customer Type:</div>
            </div>
            <div className="flex justify-between">
              <div>Age: {getCustomer.personal_detail?.age}</div>
              <div>
                Date: {getCustomer.personal_detail?.created_at.slice(0, 10)}
              </div>
            </div>
            <div className="flex justify-between">
              <div>
                Current Weight: {getCustomer.personal_detail?.weight} kg
              </div>
              <div>Height: {getCustomer.personal_detail?.height} cm</div>
            </div>
            <div className="flex justify-between">
              <div>Package:</div>
              <div>Treatment Code:</div>
            </div>
            <div className="flex justify-center mt-3">
              <button
                onClick={handleGenerateReport}
                className="p-1 border border-gray-400 rounded-md hover:bg-green-600 hover:text-white"
              >
                Generate Report
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CustomerUserDiagnosis;
