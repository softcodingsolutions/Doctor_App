import { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { FaAnglesUp } from "react-icons/fa6";
import { FaAnglesDown } from "react-icons/fa6";
import { FaRupeeSign } from "react-icons/fa";

const OverallAnalysis = () => {
  const [dailyData, setDailyData] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState("January");
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [loading, setLoading] = useState(true);

  // Month options
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  // Dynamically generate years
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 11 }, (_, i) => currentYear - 5 + i);

  const getDaysInMonth = (month, year) => {
    const monthIndex = months.indexOf(month);
    return new Date(year, monthIndex + 1, 0).getDate();
  };

  const generateDemoData = (daysInMonth) => {
    return Array.from({ length: daysInMonth }, (_, i) => ({
      day: i + 1,
      value: Math.floor(Math.random() * 100) + 1,
      weightLoss: Math.floor(Math.random() * 50) + 1,
      weightGain: Math.floor(Math.random() * 50) + 1,
    }));
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const daysInMonth = getDaysInMonth(selectedMonth, selectedYear);
        const data = generateDemoData(daysInMonth);
        setDailyData(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
      setLoading(false);
    };

    fetchData();
  }, [selectedMonth, selectedYear]);

  const handleMonthChange = (event) => {
    setSelectedMonth(event.target.value);
  };

  const handleYearChange = (event) => {
    setSelectedYear(event.target.value);
  };

  // Sample data for Pie Charts
  const pieData1 = [
    { name: "Active Patients", value: 400 },
    { name: "Inactive Patients", value: 300 },
    { name: "Inactive Patients", value: 300 },
    { name: "Inactive Patients", value: 300 },
    { name: "Inactive Patients", value: 300 },
    { name: "Inactive Patients", value: 300 },
  ];

  const pieData2 = [
    { name: "Weight Loss", value: 500 },
    { name: "Weight Gain", value: 200 },
    { name: "Weight Gain", value: 200 },
    { name: "Weight Gain", value: 200 },
    { name: "Weight Gain", value: 200 },
    { name: "Weight Gain", value: 200 },
  ];

  const COLORS = ["#0088FE", "#FFBB28", "#FF8042", "#FF6347"];

  return (
    <div className="flex w-full font-sans bg-white">
      <div className="w-full h-screen hidden sm:block sm:w-20 xl:w-60 flex-shrink-0">
        .
      </div>
      <div className="h-screen flex-grow overflow-auto flex flex-wrap content-start p-1">
        <div className="w-full p-2 flex flex-col gap-1 h-full">
          <div className="flex justify-end gap-2">
            <select
              value={selectedYear}
              onChange={handleYearChange}
              className="p-2 border rounded"
            >
              {years.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
            <select
              value={selectedMonth}
              onChange={handleMonthChange}
              className="p-2 border rounded"
            >
              {months.map((month) => (
                <option key={month} value={month}>
                  {month}
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-col">
            <div className="flex w-[100%] ">
              <div className="flex items-center m-2 border rounded-md shadow-md p-4 w-[50%] h-[90%]">
                <div className="flex-shrink-0">
                  <span className="text-lg sm:text-xl leading-none font-bold text-gray-900"></span>
                  <h3 className="text-base font-normal text-gray-500"></h3>
                </div>
              </div>
              <div className="flex items-center m-2 border rounded-md shadow-md p-4 w-[25%] h-[90%]">
                <div className="flex flex-col  ">
                  <div className="flex mt-2 ">
                    <div className="bg-[#d6f4f8] p-2 w-[25%] rounded-md flex justify-center ">
                      <FaRupeeSign color="#00bad1" size={20} />
                    </div>
                    <div className="text-[#6d6b77] font-thin text-sm ml-2">
                      Due Payment Customer
                    </div>
                  </div>
                  <div className="flex justify-start mt-3 text-xl font-medium">
                    25%
                  </div>
                  <div  className="text-[#6d6b77] font-medium text-sm">
                    50 patient
                  </div>
                  <div className="mt-12 w-full bg-gray-200 rounded overflow-hidden">
                    <div className="flex h-2">
                      <div
                        className="bg-[#00bad1] rounded-l"
                        style={{ width: `90.2%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex items-center m-2 border rounded-md shadow-md p-4 w-[40%] h-[90%]">
                <div className="flex flex-col flex-shrink-0">
                  <div className="flex flex-col">
                    <lebal className="text-[#6d6b77] font-thin text-sm">
                      Total Patient
                    </lebal>
                    <div className="flex justify-start mt-1 text-xl font-medium">
                      80%
                    </div>
                  </div>

                  <div className="flex items-center mt-2 justify-center w-62 ">
                    <div className="text-center">
                      <div className="flex gap-2">
                        <div className="bg-[#d7ecbd] p-1 rounded-md flex justify-center">
                          <FaAnglesDown size={20} color="#4f6238" />
                        </div>
                        <div className="mt-1 text-[#6d6b77] font-thin text-sm">
                          Weight Loss
                        </div>
                      </div>
                      <div className="flex justify-start mt-3 text-md font-medium">
                        62.2%
                      </div>
                    </div>

                    {/* Divider with v/s */}
                    <div className="flex flex-col items-center mx-5 gap-2 relative">
                      {/* Left vertical line */}
                      <div className="h-4 w-[0.5px] bg-gray-300"></div>

                      {/* v/s text */}
                      <div className="rounded-full bg-gray-200 text-sm px-1.5 py-1">
                        v/s
                      </div>

                      {/* Right vertical line */}
                      <div className="h-4 w-[0.5px] bg-gray-300"></div>
                    </div>

                    <div className="text-center">
                      <div className="flex gap-2">
                        <div className="bg-[#C96868] p-1 rounded-md flex justify-center">
                          <FaAnglesUp size={20} color="#800000" />
                        </div>
                        <div className="mt-1 text-[#6d6b77] font-thin text-sm">
                          Weight Gain
                        </div>
                      </div>
                      <div className="flex justify-start mt-3 text-md font-medium">
                        62.2%
                      </div>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="mt-4 w-full bg-gray-200 rounded overflow-hidden">
                    <div className="flex h-2">
                      <div
                        className="bg-[#d7ecbd] rounded-l"
                        style={{ width: `90.2%` }}
                      ></div>
                      <div
                        className="bg-[#C96868] rounded-r"
                        style={{ width: `10.8%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex w-[100%]">
              {/* Pie Chart 1 */}
              <div className="flex flex-col m-5 border rounded-md shadow-md p-4 w-[50%]">
                <label className="flex justify-center">
                  Patient Status Distribution
                </label>
                <ResponsiveContainer height={280} width="100%">
                  <PieChart>
                    <Pie
                      data={pieData1}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) =>
                        `${name} ${(percent * 100).toFixed(0)}%`
                      }
                      outerRadius={100}
                      dataKey="value"
                    >
                      {pieData1.map((_, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={COLORS[index % COLORS.length]}
                        />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>

              {/* Pie Chart 2 */}
              <div className="flex flex-col m-5 border rounded-md shadow-md p-4 w-[50%]">
                <label className="flex justify-center">
                  Weight Change Distribution
                </label>
                <ResponsiveContainer height={280} width="100%">
                  <PieChart>
                    <Pie
                      data={pieData2}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) =>
                        `${name} ${(percent * 100).toFixed(0)}%`
                      }
                      outerRadius={100}
                      dataKey="value"
                    >
                      {pieData2.map((_, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={COLORS[index % COLORS.length]}
                        />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* New Case Chart */}
            <div className="flex flex-col m-5 border rounded-md shadow-md p-4">
              <label className="flex justify-center">New Case</label>
              <ResponsiveContainer height={280} width="100%">
                <LineChart data={dailyData} margin={{ top: 20 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="day" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="value" stroke="#8884d8" />
                </LineChart>
              </ResponsiveContainer>
            </div>

            {/* Renew Packages Case Chart */}
            <div className="flex flex-col m-5 border rounded-md shadow-md p-4">
              <label className="flex justify-center">Renew Packages Case</label>
              <ResponsiveContainer height={280} width="100%">
                <LineChart data={dailyData} margin={{ top: 20 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="day" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="value" stroke="#8884d8" />
                </LineChart>
              </ResponsiveContainer>
            </div>

            {/* Deactivate / Left Packages Cases Chart */}
            <div className="flex flex-col m-5 border rounded-md shadow-md p-4">
              <label className="flex justify-center">
                Deactivate / Left Packages Cases
              </label>
              <ResponsiveContainer height={280} width="100%">
                <LineChart data={dailyData} margin={{ top: 20 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="day" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="value" stroke="#8884d8" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OverallAnalysis;
