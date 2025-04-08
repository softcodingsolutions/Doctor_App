import React, { useEffect, useState } from "react";
import axios from "axios";
import { LineChart } from "@mui/x-charts/LineChart";
import { useOutletContext } from "react-router-dom";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";

const COLORS = ["#C7253E", "#399918"];

const PatientAnalysis = () => {
  const context = useOutletContext();
  const [dates, setDates] = useState([]);
  const [weight, setWeight] = useState([]);
  const [groupedReports, setGroupedReports] = useState({});

  const handleGetProgress = () => {
    axios
      .get(`/api/v1/progress_reports?user_id=${context[0]}`)
      .then((res) => {
        const progressReports = res.data?.progress_reports || [];
        console.log(progressReports, "Progress reports");

        const groupedByPackage = progressReports.reduce((acc, report) => {
          const packageName =
            report.treatment_package?.package_name || "Unknown";
          if (!acc[packageName]) {
            acc[packageName] = [];
          }
          acc[packageName].push(report);
          return acc;
        }, {});

        setGroupedReports(groupedByPackage);
        console.log(groupedByPackage, "Grouped reports");

        // Map the progress report data for the chart
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

  const preparePieChartData = (reports) => {
    let totalWeightGain = 0;
    let totalWeightLoss = 0;

    reports.forEach((report) => {
      const currentWeight = parseFloat(report.weight);
      const previousWeight = parseFloat(report.pre_weight);

      if (currentWeight > previousWeight) {
        totalWeightGain += currentWeight - previousWeight;
      } else {
        totalWeightLoss += previousWeight - currentWeight;
      }
    });

    return [
      { name: "Total Weight Gain", value: totalWeightGain },
      { name: "Total Weight Loss", value: totalWeightLoss },
    ];
  };

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white border border-gray-300 p-2 rounded shadow">
          <p className="label">{`${payload[0].name} : ${payload[0].value} kg`}</p> {/* Add unit here */}
        </div>
      );
    }
    return null;
  };
  

  return (
    <div className="flex flex-col p-2">
      <div className="w-full grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 mb-3 overflow-auto">
        {dates.length > 0 && weight.length > 0 ? (
          <LineChart
            xAxis={[{ data: dates, scaleType: "point", label: "Date" }]}
            series={[{ curve: "linear",data: weight, label: "Weight" }]}
            width={800}
            height={250}
            
          />
        ) : (
          <div>Treatment Package has not been assigned yet</div>
        )}
      </div>

      <div className="flex flex-wrap justify-center gap-4">
        {Object.entries(groupedReports).map(([packageName, reports]) => {
          // Step 1: Extract unique weight reasons
          const uniqueWeightReasons = [
            ...new Set(
              reports.map((report) => report.treatment_package?.weight_reason)
            ),
          ];

          return (
            <div key={packageName} className="flex flex-col items-center">
              <h3 className="text-sm font-semibold text-left w-full">
                {`Package: ${uniqueWeightReasons.join(", ")}  ${packageName}`}
              </h3>
              <PieChart width={200} height={160}>
                <Pie
                  data={preparePieChartData(reports)}
                  cx={70}
                  cy={70}
                  innerRadius={50}
                  outerRadius={70}
                  dataKey="value"
                >
                  {reports.map((_, i) => (
                    <Cell key={`cell-${i}`} fill={COLORS[i % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
              </PieChart>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PatientAnalysis;
