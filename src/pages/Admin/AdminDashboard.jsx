import { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import ThComponent from "../../components/ThComponent";
import TdComponent from "../../components/TdComponent";
import axios from "axios";
import InsideLoader from "../InsideLoader";

function AdminDashboard() {
  const [getConsultingTime, setGetConsultingTime] = useState([]);
  const context = useOutletContext();
  const [getTotalPatients, setGetTotalPatients] = useState([]);
  const [getTotalFranchise, setGetTotalFranchise] = useState([]);
  const [loading, setLoading] = useState(true);
  const main_id = localStorage.getItem("main_id");

  const handleGetConsultingTime = () => {
    axios
      .get(`/api/v1/consulting_times`)
      .then((res) => {
        console.log("Consulting Time: ", res.data?.consulting_times);
        setGetConsultingTime(res.data?.consulting_times);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        alert(err.response?.data?.message + "!");
        setLoading(false);
      });
  };

  const handleGetPatients = () => {
    axios
      .get(`/api/v1/users`)
      .then((res) => {
        const patients = res.data?.users?.filter(
          (user) => user.role === "patient"
        );
        console.log(patients.length);
        setGetTotalPatients(patients?.length);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };

  const handleGetFranchise = () => {
    axios
      .get("/api/v1/users/franchise_index")
      .then((res) => {
        const franchise = res.data?.users.filter(
          (user) => user.created_by_id == main_id
        );
        console.log(franchise.length);
        setGetTotalFranchise(franchise.length);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        alert(err.response?.data?.message + "!");
        setLoading(false);
      });
  };

  function formatTime(dateTimeString) {
    const date = new Date(dateTimeString);
    return date.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  }

  useEffect(() => {
    handleGetConsultingTime();
    handleGetPatients();
    handleGetFranchise();
  }, []);

  if (loading) {
    return <InsideLoader />;
  }

  return (
    <div className="flex w-full font-teachers">
      <div className="w-full h-screen hidden sm:block sm:w-20 xl:w-60 flex-shrink-0">
        .
      </div>
      <div className="h-screen flex-grow overflow-auto flex flex-wrap content-start p-1">
        <div className="w-full h-full p-2 flex flex-col gap-1">
          <div className="flex justify-end">
            <button
              onClick={context[0]}
              type="button"
              className="block sm:hidden"
            >
              <img
                src={`https://assets.codepen.io/3685267/res-react-dash-sidebar-open.svg`}
                alt=""
                className="w-full h-full"
              />
            </button>
          </div>

          <div className="relative overflow-y-auto">
            <div className="px-4">
              <div className="w-full grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                <div className="bg-white shadow rounded-lg p-4 sm:p-6 xl:p-8 ">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <span className="text-2xl sm:text-3xl leading-none font-bold text-gray-900">
                        {getTotalPatients}
                      </span>
                      <h3 className="text-base font-normal text-gray-500">
                        Total Patients
                      </h3>
                    </div>
                  </div>
                </div>
                <div className="bg-white shadow rounded-lg p-4 sm:p-6 xl:p-8 ">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <span className="text-2xl sm:text-3xl leading-none font-bold text-gray-900">
                        {getTotalFranchise}
                      </span>
                      <h3 className="text-base font-normal text-gray-500">
                        Total Franchise
                      </h3>
                    </div>
                  </div>
                </div>
                <div className="bg-white shadow rounded-lg p-4 sm:p-6 xl:p-8 ">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <span className="text-2xl sm:text-3xl leading-none font-bold text-gray-900">
                        385
                      </span>
                      <h3 className="text-base font-normal text-gray-500">
                        User signups this week
                      </h3>
                    </div>
                  </div>
                </div>
              </div>
              <div className=" mt-4 w-full grid grid-cols-1 xl:grid-cols-2 2xl:grid-cols-3 gap-4">
                <div className="bg-white shadow rounded-lg p-4 sm:p-6 xl:p-8  2xl:col-span-2">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex-shrink-0">
                      <span className="text-2xl sm:text-3xl leading-none font-bold text-gray-900">
                        $45,385
                      </span>
                      <h3 className="text-base font-normal text-gray-500">
                        Sales this week
                      </h3>
                    </div>
                    <div className="flex items-center justify-end flex-1 text-green-500 text-base font-bold">
                      12.5%
                      <svg
                        className="w-5 h-5"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fillRule="evenodd"
                          d="M5.293 7.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L6.707 7.707a1 1 0 01-1.414 0z"
                          clipRule="evenodd"
                        ></path>
                      </svg>
                    </div>
                  </div>
                  <div id="main-chart"></div>
                </div>
                <div className="bg-white shadow rounded-lg p-4 sm:p-6 xl:p-8 ">
                  <div className="mb-4 flex items-center justify-between">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">
                        Latest Transactions
                      </h3>
                      <span className="text-base font-normal text-gray-500">
                        This is a list of latest transactions
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-col mt-5">
                    <div className="overflow-x-auto rounded-lg">
                      <div className="align-middle inline-block min-w-full">
                        <div className="shadow overflow-hidden sm:rounded-lg">
                          <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                              <tr>
                                <th
                                  scope="col"
                                  className="p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                >
                                  Transaction
                                </th>
                                <th
                                  scope="col"
                                  className="p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                >
                                  Date & Time
                                </th>
                                <th
                                  scope="col"
                                  className="p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                >
                                  Amount
                                </th>
                              </tr>
                            </thead>
                            <tbody className="bg-white">
                              <tr>
                                <td className="p-4 whitespace-nowrap text-sm font-normal text-gray-900">
                                  Payment from{" "}
                                  <span className="font-semibold">
                                    Bonnie Green
                                  </span>
                                </td>
                                <td className="p-4 whitespace-nowrap text-sm font-normal text-gray-500">
                                  Apr 23 ,2021
                                </td>
                                <td className="p-4 whitespace-nowrap text-sm font-semibold text-gray-900">
                                  $2300
                                </td>
                              </tr>
                              <tr className="bg-gray-50">
                                <td className="p-4 whitespace-nowrap text-sm font-normal text-gray-900 rounded-lg rounded-left">
                                  Payment refund to{" "}
                                  <span className="font-semibold">#00910</span>
                                </td>
                                <td className="p-4 whitespace-nowrap text-sm font-normal text-gray-500">
                                  Apr 23 ,2021
                                </td>
                                <td className="p-4 whitespace-nowrap text-sm font-semibold text-gray-900">
                                  -$670
                                </td>
                              </tr>
                              <tr>
                                <td className="p-4 whitespace-nowrap text-sm font-normal text-gray-900">
                                  Payment failed from{" "}
                                  <span className="font-semibold">#087651</span>
                                </td>
                                <td className="p-4 whitespace-nowrap text-sm font-normal text-gray-500">
                                  Apr 18 ,2021
                                </td>
                                <td className="p-4 whitespace-nowrap text-sm font-semibold text-gray-900">
                                  $234
                                </td>
                              </tr>
                              <tr className="bg-gray-50">
                                <td className="p-4 whitespace-nowrap text-sm font-normal text-gray-900 rounded-lg rounded-left">
                                  Payment from{" "}
                                  <span className="font-semibold">
                                    Lana Byrd
                                  </span>
                                </td>
                                <td className="p-4 whitespace-nowrap text-sm font-normal text-gray-500">
                                  Apr 15 ,2021
                                </td>
                                <td className="p-4 whitespace-nowrap text-sm font-semibold text-gray-900">
                                  $5000
                                </td>
                              </tr>
                              <tr>
                                <td className="p-4 whitespace-nowrap text-sm font-normal text-gray-900">
                                  Payment from{" "}
                                  <span className="font-semibold">
                                    Jese Leos
                                  </span>
                                </td>
                                <td className="p-4 whitespace-nowrap text-sm font-normal text-gray-500">
                                  Apr 15 ,2021
                                </td>
                                <td className="p-4 whitespace-nowrap text-sm font-semibold text-gray-900">
                                  $2300
                                </td>
                              </tr>
                              <tr className="bg-gray-50">
                                <td className="p-4 whitespace-nowrap text-sm font-normal text-gray-900 rounded-lg rounded-left">
                                  Payment from{" "}
                                  <span className="font-semibold">
                                    THEMESBERG LLC
                                  </span>
                                </td>
                                <td className="p-4 whitespace-nowrap text-sm font-normal text-gray-500">
                                  Apr 11 ,2021
                                </td>
                                <td className="p-4 whitespace-nowrap text-sm font-semibold text-gray-900">
                                  $560
                                </td>
                              </tr>
                              <tr>
                                <td className="p-4 whitespace-nowrap text-sm font-normal text-gray-900">
                                  Payment from{" "}
                                  <span className="font-semibold">
                                    Lana Lysle
                                  </span>
                                </td>
                                <td className="p-4 whitespace-nowrap text-sm font-normal text-gray-500">
                                  Apr 6 ,2021
                                </td>
                                <td className="p-4 whitespace-nowrap text-sm font-semibold text-gray-900">
                                  $1437
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
