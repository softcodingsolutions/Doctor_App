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
import { PiIntersectSquareFill } from "react-icons/pi";
import { FaUsers } from "react-icons/fa6";
import { useOutletContext } from "react-router-dom";
import { BsGraphDown } from "react-icons/bs";
import axios from "axios";

const OverallAnalysis = () => {
  const main_id = localStorage.getItem("main_id");
  const context = useOutletContext();
  const currentDate = new Date();
  const currentMonth = currentDate.toLocaleString("default", { month: "long" });
  const currentYear = currentDate.getFullYear();
  const [franchises, SetFranchises] = useState();
  const [franchisesUsers, setFranchisesUsers] = useState();
  const [selectedMonth, setSelectedMonth] = useState(currentMonth);
  const [newData, setNewData] = useState({});
  const [weightData, setWeightData] = useState({});
  const [deactivatedData, setDeactivatedData] = useState({});
  const [leftUserData, setLeftUserData] = useState({});
  const [renewPackages, setRenewPackages] = useState({});
  const [selectedYear, setSelectedYear] = useState(currentYear);
  const [overallData, setOverallData] = useState([]);
  const [duePayment, setDuePayment] = useState();
  const [docPaitents, setDocPaitents] = useState();
  const [patientData, setPatientData] = useState({});
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

  const years = Array.from({ length: 11 }, (_, i) => currentYear - 5 + i);

  const handleData = () => {
    const monthIndex = months.indexOf(selectedMonth) + 1;
    axios
      .get(
        `/api/v2/dashboards/fetch_analysis_reports?month=${monthIndex}&doctor_id=${main_id}&year=${selectedYear}`
      )
      .then((res) => {
        // console.log(res);
        SetFranchises(res.data?.franchises);
        setFranchisesUsers(res.data?.frenchis_users);
        setNewData(res.data?.monthly_new_users);
        setDeactivatedData(res.data?.monthly_deactivated_users);
        setRenewPackages(res.data?.monthly_renew_package);
        setOverallData(res.data?.overall_count);
        setLeftUserData(res.data?.monthly_left_users);
        setWeightData(res.data?.weight_gain_loos_data);
        setDuePayment(res.data?.due_payment);
        setDocPaitents(res.data?.doctor_total_paitent);
        setPatientData(res.data?.treatment_package_analysis_data);
        setCount;
      })
      .catch((err) => {
        // console.log(err);
      });
  };

  const newCase = Object.entries(newData).map(([day, value]) => ({
    day: parseInt(day),
    value: value,
  }));

  const deactivatedPackage = Object.entries(deactivatedData).map(
    ([day, value]) => ({
      day: parseInt(day),
      value: value,
    })
  );

  const leftUsers = Object.entries(leftUserData).map(([day, value]) => ({
    day: parseInt(day),
    value: value,
  }));

  const renewCase = Object.entries(renewPackages).map(([day, value]) => ({
    day: parseInt(day),
    value: value,
  }));

  const handleMonthChange = (event) => {
    setSelectedMonth(event.target.value);
  };

  const handleYearChange = (event) => {
    setSelectedYear(event.target.value);
  };

  const pieData2 =
    overallData.length > 0
      ? [
          { name: "New Users", value: overallData[0]?.day_wise_new_users || 0 },
          {
            name: "Renewed Packages",
            value: overallData[1]?.day_wise_renew_package || 0,
          },
          {
            name: "Deactivated Users",
            value: overallData[2]?.day_wise_deactivated_users || 0,
          },
          {
            name: "Left Users",
            value: overallData[3]?.day_wise_left_users || 0,
          },
        ]
      : ["No Data Available"];

  const COLORS = ["#0088FE", "#FFBB28", "#FF8042", "#FF6347"];

  useEffect(() => {
    handleData();
  }, [selectedMonth, selectedYear]);
  return (
    <div className="flex flex-col  font-sans ">
      <div className="flex justify-between p-2 max-h-96">
        <div className="flex gap-2 ">
          <div>
            <BsGraphDown size={30} />
          </div>
          <label className="flex justify-start text-lg font-bold  tracking-wide">
            Analysis Reports
          </label>
        </div>
        <div className="flex justify-end gap-2 ">
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
      </div>
      <div className="h-[calc(100vh-100px)] overflow-y-auto p-4">
        <div className="flex flex-col max-h-96">
          <div className="flex flex-wrap w-full">
            <div className="flex items-center m-2 border rounded-md shadow-md p-3 w-full md:w-[30%]">
              <div className="flex flex-col gap-2 w-full">
                <div className="flex flex-col bg-white shadow rounded-lg sm:p-5 xl:p-4">
                  <div className="flex justify-between">
                    <div className="text-[#6d6b77] font-medium text-md">
                      Total Franchise
                    </div>
                    <div className="bg-[#fff0e1] p-1 rounded-md flex justify-center">
                      <PiIntersectSquareFill size={25} color="#ff9f43" />
                    </div>
                  </div>
                  <div>{franchises}</div>
                  <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                    <div
                      className="bg-[#ff9f43] h-2 rounded-full"
                      style={{ width: `${franchises}%` }}
                    ></div>
                  </div>
                </div>

                <div className="flex flex-col bg-white shadow rounded-lg p-2 justify-between sm:p-5 xl:p-4">
                  <div className="flex justify-between">
                    <div className="text-[#6d6b77] font-medium text-md">
                      Franchise Users
                    </div>
                    <div className="bg-[#e9e7fd] p-1 rounded-md flex justify-center">
                      <FaUsers size={22} color="#7367f0" />
                    </div>
                  </div>
                  <div>{franchisesUsers}</div>
                  <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                    <div
                      className="bg-[#7367f0] h-2 rounded-full"
                      style={{ width: `${franchisesUsers}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center m-2 border rounded-md shadow-md p-3 w-full md:w-[25%]">
              <div className="flex flex-col w-full">
                <div className="flex mt-2">
                  <div className="bg-[#d6f4f8] p-2 w-[25%] rounded-md flex justify-center">
                    <FaRupeeSign color="#00bad1" size={20} />
                  </div>
                  <div className="text-[#6d6b77] font-thin text-sm ml-2">
                    Due Payment Customer
                  </div>
                </div>
                <div className="flex justify-start mt-3 text-xl font-medium">
                  {duePayment}
                </div>
                <div className="text-[#6d6b77] font-medium text-sm">
                  {docPaitents} patient
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

            <div className="flex items-center m-2 border rounded-md shadow-md p-3 w-full md:w-[40%]">
              <div className="flex flex-col w-full">
                <div className="flex flex-col">
                  <label className="text-[#6d6b77] font-thin text-sm">
                    Total Patient
                  </label>
                  <div className="flex justify-start mt-1 text-xl font-medium">
                    {weightData.treatment_packages_count}
                  </div>
                </div>

                <div className="flex items-center mt-2 justify-center w-full">
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
                      {weightData.one_kg_loss_user_count}
                    </div>
                  </div>

                  <div className="flex flex-col items-center mx-5 gap-2 relative">
                    <div className="h-4 w-[0.5px] bg-gray-300"></div>
                    <div className="rounded-full bg-gray-200 text-sm px-1.5 py-1">
                      v/s
                    </div>
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
                      {weightData.one_kg_gain_user_count}
                    </div>
                  </div>
                </div>

                <div className="mt-4 w-full bg-gray-200 rounded overflow-hidden">
                  <div className="flex h-2">
                    <div
                      className="bg-[#d7ecbd] rounded-l"
                      style={{
                        width: `${weightData.one_kg_loss_user_count}%`,
                      }}
                    ></div>
                    <div
                      className="bg-[#C96868] rounded-r"
                      style={{
                        width: `${weightData.one_kg_gain_user_count}%`,
                      }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col md:flex-row w-full h-[18%]">
            {/* Package Status Card */}
            <div className="flex flex-col m-5 border rounded-md shadow-md p-4 w-full md:w-[50%]">
              <label className="flex justify-center text-lg font-medium">
                Package Status
              </label>
              <div className="mt-4 flex flex-col gap-4 overflow-auto p-2">
                {Object.keys(patientData)
                  .map((patient) => {
                    const count = patientData[patient][0];
                    const percentage =
                      count.true_count + count.false_count > 0
                        ? (count.true_count /
                            (count.true_count + count.false_count)) *
                          100
                        : 0;

                    return {
                      name: patient,
                      percentage: percentage,
                    };
                  })
                  .sort((a, b) => b.percentage - a.percentage)
                  .map((patientDataSorted, index) => (
                    <div key={index} className="w-full mb-2">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-700">
                          {patientDataSorted.name}
                        </span>
                        <span className="text-gray-700">
                          {patientDataSorted.percentage.toFixed(2)}%
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded h-3">
                        <div
                          className="bg-blue-500 h-3 rounded"
                          style={{
                            width: `${patientDataSorted.percentage}%`,
                          }}
                        ></div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>

            {/* Pie Chart Card */}
            <div className="m-5 border rounded-md shadow-md p-2 w-full md:w-[50%]">
              <label className="flex justify-center p-4">
                Overall Monthly Data
              </label>
              <ResponsiveContainer height={280} width="100%">
                <PieChart>
                  <Pie
                    data={pieData2.filter((item) => item.value > 0)}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={100}
                    dataKey="value"
                  >
                    {pieData2
                      .filter((item) => item.value > 0)
                      .map((_, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={COLORS[index % COLORS.length]}
                        />
                      ))}
                  </Pie>
                  <Tooltip />
                  <Legend
                    layout="vertical"
                    align="center"
                    verticalAlign="bottom"
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* New Case Chart */}
          <div className="flex flex-col m-5 border rounded-md shadow-md ">
            <label className="flex justify-center text-[#8884d8]">
              Monthly New Case
            </label>
            <ResponsiveContainer height={280} width="100%">
              <LineChart data={newCase} margin={{ top: 20 }}>
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
          <div className="flex flex-col m-5 border rounded-md shadow-md ">
            <label className="flex justify-center text-[#00bad1]">
              Renew Packages Case
            </label>
            <ResponsiveContainer height={280} width="100%">
              <LineChart data={renewCase} margin={{ top: 20 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="value" stroke="#00bad1" />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Deactivate  Cases Chart */}
          <div className="flex flex-col m-5 border rounded-md shadow-md  ">
            <label className="flex justify-center text-[#ff9f43]">
              Deactivate Cases
            </label>
            <ResponsiveContainer height={280} width="100%">
              <LineChart margin={{ top: 20 }} data={deactivatedPackage}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="value" stroke="#ff9f43" />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Left Users Cases Chart */}
          <div className="flex flex-col m-5 border rounded-md shadow-md  ">
            <label className="flex justify-center text-[#ff4c51]">
              Left Users Cases
            </label>
            <ResponsiveContainer height={280} width="100%">
              <LineChart margin={{ top: 20 }} data={leftUsers}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="value" stroke="#ff4c51" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OverallAnalysis;
