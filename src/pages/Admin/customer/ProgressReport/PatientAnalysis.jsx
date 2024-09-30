import React, { useEffect, useState } from "react";
import axios from "axios";
import { LineChart } from "@mui/x-charts/LineChart";
import { useOutletContext } from "react-router-dom";

const PatientAnalysis = () => {
  const context = useOutletContext();
  const [dates, setDates] = useState([]);
  const [weight, setWeight] = useState([]);

  const handleGetProgress = () => {
    axios
      .get(`/api/v1/progress_reports?user_id=${context[0]}`)
      .then((res) => {
        const progressReports = res.data?.progress_reports || [];
        const formattedDates = progressReports.map((data) => {
          const parts = data.date.split("-"); 
          if (parts.length === 3) {
            const year = parseInt(parts[0], 10); 
            const month = parseInt(parts[1], 10) - 1; 
            const day = parseInt(parts[2], 10); 
            const dateObj = new Date(year, month, day);
            return dateObj.toLocaleDateString("en-IN");
          }
          return "";
        });
        console.log(formattedDates, "dates");
        const weights = progressReports.map((data) => data.weight);

        setDates(formattedDates);
        setWeight(weights);
      })
      .catch((err) => {
        console.log(err);
        alert(err.response?.data?.message + "!");
      });
  };

  useEffect(() => {
    handleGetProgress();
  }, []);

  return (
    <div>
      <div className="w-full grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-3">
        {dates||weight ? (
          <LineChart
            xAxis={[{ data: dates, scaleType: "point", label: "Date" }]}
            series={[{ data: weight, label: "Weight" }]}
            width={500}
            height={300}
          />
        ) : (
          <div> Treatment Package has been not assigned yet</div>
        )}
      </div>
    </div>
  );
};

export default PatientAnalysis;
