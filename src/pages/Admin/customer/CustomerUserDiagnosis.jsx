import { useNavigate } from "react-router-dom";

function CustomerUserDiagnosis() {
  const navigate = useNavigate();

  const handleGenerateReport = () => {
    navigate("./generate-report");
  };

  return (
    <div className="w-full p-2">
      <div className="rounded-lg bg-card h-[90vh] bg-white">
        <div className="flex p-5 h-full flex-col items-center space-y-8">
          <div className="flex flex-col text-lg font-bold justify-center w-5/6 gap-3 mt-1">
            <div className="flex justify-between">
              <div>Patient Name:</div>
              <div>Case Number:</div>
            </div>
            <div className="flex justify-between">
              <div>Gender:</div>
              <div>Customer Type:</div>
            </div>
            <div className="flex justify-between">
              <div>Age:</div>
              <div>Date:</div>
            </div>
            <div className="flex justify-between">
              <div>Current Weight:</div>
              <div>Height:</div>
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
