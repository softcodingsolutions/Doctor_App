import { useEffect, useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import axios from "axios";
import InsideLoader from "../InsideLoader";
import { FaUsersLine } from "react-icons/fa6";
import { FaUserPlus } from "react-icons/fa";
import { AiFillBulb } from "react-icons/ai";
import { GoNorthStar } from "react-icons/go";
import { FaClipboardList } from "react-icons/fa";

function AdminDashboard() {
  const context = useOutletContext();
  const main_id = localStorage.getItem("main_id");
  const [data, setData] = useState("");
  const [activeTab, setActiveTab] = useState("inbox");
  const [complaints, setComplaints] = useState([
    {
      id: 1,
      user: "John Doe",
      complaint: "The app crashes frequently when I try to upload files.",
      response: "",
    },
    {
      id: 2,
      user: "Jane Smith",
      complaint: "I am unable to change my password from the settings page.",
      response: "",
    },
  ]);

  // Function to handle admin response
  const handleResponseChange = (id, response) => {
    setComplaints((prev) =>
      prev.map((complaint) =>
        complaint.id === id ? { ...complaint, response } : complaint
      )
    );
  };

  // Function to handle complaint submission
  const handleResponseSubmit = (id) => {
    console.log(
      `Response for complaint ${id}:`,
      complaints.find((c) => c.id === id).response
    );
    // Implement further logic for submitting the response (API call, etc.)
  };

  const handleData = (today) => {
    axios
      .get(`/api/v2/dashboards?doctor_id=${main_id}&date=${today}`)
      .then((res) => {
        console.log(res);
        setData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    const today = new Date().toISOString().split("T")[0];
    handleData(today);
  }, []);

  return (
    <div className="flex w-full font-sans">
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
              <div className="w-full grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-2">
                <div className="bg-white shadow  rounded-lg p-2 border-b-[#fff0e1] hover:border-b-[#ff9f43] border-y-4 sm:p-5 xl:p-8 ">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <div className="flex gap-2">
                        <div className="bg-[#fff0e1] p-1 rounded-md flex justify-center">
                          <FaUsersLine size={25} color="#ff9f43" />
                        </div>
                        <span className="text-lg sm:text-xl mt-1 leading-none font-bold text-gray-900">
                          {data.total_doctor_user}
                        </span>
                      </div>
                      <h3 className="text-base font-normal text-gray-500">
                        Total Patients
                      </h3>
                    </div>
                  </div>
                </div>
                <div className="bg-white shadow  border-b-[#d6f4f8] border-y-4 rounded-lg p-2 sm:p-5 xl:p-8 hover:border-b-[#00bad1] ">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <div className="flex gap-2">
                        <div className="bg-[#d6f4f8] p-1 rounded-md flex justify-center">
                          <FaClipboardList size={20} color="#00bad1" />
                        </div>
                        <span className="text-lg sm:text-xl mt-1 leading-none font-bold text-gray-900">
                          {data.todays_appointment_count}
                        </span>
                      </div>
                      <h3 className="text-base font-normal text-gray-500">
                        Todays Appointments
                      </h3>
                    </div>
                  </div>
                </div>
                <div className="bg-white shadow  rounded-lg p-2 border-b-[#ddf6e8] border-y-4  hover:border-b-[#28c76f] sm:p-5 xl:p-8 ">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <div className="flex gap-2">
                        <div className="bg-[#ddf6e8] p-1 rounded-md flex justify-center">
                          <FaUserPlus size={23} color="#28c76f" />
                        </div>
                        <span className="text-lg sm:text-xl mt-1 leading-none font-bold text-gray-900">
                          {data.total_new_patient}
                        </span>
                      </div>
                      <h3 className="text-base font-normal text-gray-500">
                        New Patients
                      </h3>
                    </div>
                  </div>
                </div>
                <div className="bg-white shadow  rounded-lg p-2  border-b-[#e9e7fd] border-y-4 hover:border-b-[#7367f0] sm:p-5 xl:p-8 ">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <div className="flex gap-2">
                        <div className="bg-[#e9e7fd] p-1 rounded-md flex justify-center">
                          <AiFillBulb size={22} color="#7367f0" />
                        </div>
                        <span className="text-lg sm:text-xl mt-1 leading-none font-bold text-gray-900">
                          {data.total_followup_users}
                        </span>
                      </div>
                      <h3 className="text-base font-normal text-gray-500">
                        FollowUp Patients
                      </h3>
                    </div>
                  </div>
                </div>
                <div className="bg-white shadow  rounded-lg p-2 border-b-[#ffe2e3] border-y-4 hover:border-b-[#ff4c51] sm:p-5 xl:p-8 ">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <div className="flex gap-2">
                        <div className="bg-[#ffe2e3] p-1 rounded-md flex justify-center">
                          <GoNorthStar size={22} color="#ff4c51" />
                        </div>
                        <span className="text-lg sm:text-xl mt-1 leading-none font-bold text-gray-900">
                          {data.total_franchise_user}
                        </span>
                      </div>
                      <h3 className="text-base font-normal text-gray-500">
                        Franchise Patients
                      </h3>
                    </div>
                  </div>
                </div>
              </div>

              <div className=" mt-2 w-full  h-[72vh] flex gap-2  rounded-lg ">
                <div className="bg-white w-[50%] border p-4 rounded-md">
                  <div className="flex justify-between border-b pb-2 mb-2">
                    <div className="text-lg font-bold ">Notifications</div>
                    <button className="text-sm font-medium text-blue-500">
                      Mark all as read
                    </button>
                  </div>
                  <div className="flex pt-2 pl-4 gap-5 border-b text-sm">
                    <button
                      className={`${
                        activeTab === "inbox"
                          ? "text-black border-b-2 border-black"
                          : "text-gray-500 border-b-2 border-transparent"
                      } pb-1`}
                      onClick={() => setActiveTab("inbox")}
                    >
                      Inbox
                    </button>
                    <button
                      className={`${
                        activeTab === "unread"
                          ? "text-black border-b-2 border-black"
                          : "text-gray-500 border-b-2 border-transparent"
                      } pb-1`}
                      onClick={() => setActiveTab("unread")}
                    >
                      Unread
                    </button>
                  </div>
                </div>
                <div className="bg-white w-[50%] border rounded-md p-4 shadow-lg h-full">
                  <div className="text-lg font-bold border-b pb-2 mb-2">
                    Complaints
                  </div>
                  <div className="space-y-4 overflow-y-auto h-[60vh]">
                    {complaints.map((complaint) => (
                      <div
                        key={complaint.id}
                        className="border rounded-lg p-2 bg-gray-50"
                      >
                        <div className="mb-2 text-sm">
                          <span className="font-semibold">User:</span>{" "}
                          {complaint.user}
                        </div>
                        <div className="mb-2 text-sm">
                          <span className="font-semibold">Complaint:</span>{" "}
                          {complaint.complaint}
                        </div>
                        <div className="mb-4 text-sm">
                          <label className="font-semibold block mb-1">
                            Response:
                          </label>
                          <textarea
                            className="w-full p-1 border text-sm rounded-md"
                            value={complaint.response}
                            onChange={(e) =>
                              handleResponseChange(complaint.id, e.target.value)
                            }
                            placeholder="Write your response..."
                          />
                        </div>
                        <button
                          className="bg-blue-500 text-white text-sm px-1 py-1 rounded-md"
                          onClick={() => handleResponseSubmit(complaint.id)}
                        >
                          Submit Response
                        </button>
                      </div>
                    ))}
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
