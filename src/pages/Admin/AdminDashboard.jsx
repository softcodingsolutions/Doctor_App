import { useEffect, useRef, useState } from "react";
import { useOutletContext } from "react-router-dom";
import axios from "axios";
import { FaUsersLine } from "react-icons/fa6";
import { FaUserPlus } from "react-icons/fa";
import { AiFillBulb } from "react-icons/ai";
import { GoNorthStar } from "react-icons/go";
import { FaClipboardList } from "react-icons/fa";
import useWebSocket from "react-use-websocket";
import { IoMdSend } from "react-icons/io";
import { IoPersonOutline } from "react-icons/io5";
import Avatar from "../../components/Chat/Avatar";
import { SlGraph } from "react-icons/sl";
import { CiCalendar } from "react-icons/ci";
import { BsPeople } from "react-icons/bs";

function AdminDashboard() {
  const context = useOutletContext();
  const main_id = localStorage.getItem("main_id");
  const [data, setData] = useState("");
  // const [activeTab, setActiveTab] = useState('inbox');
  const [complaints, setComplaints] = useState([]);
  const [patients, setPatients] = useState([]);
  const [avatarColor, setAvatarColor] = useState("");
  const [notifications, setNotifications] = useState([]);
  const [selectedUser, setSelectedUser] = useState(
    JSON.parse(localStorage.getItem("selectedUser")) || null
  );
  const [unreadPatients, setUnreadPatients] = useState(
    new Set(JSON.parse(localStorage.getItem("unreadPatients")) || [])
  );
  const messageContainerRef = useRef(null);
  const notificationSound = useRef(null);
  const activeSubscriptions = useRef({});

  useEffect(() => {
    axios
      .get(`api/v1/users?user_id=${main_id}`)
      .then((res) => {
        setPatients(res.data.users);
        res.data.users.forEach((user) => {
          subscribeToChannel(main_id, user.id);
        });
      })
      .catch((err) => {
        console.log(err);
      });
    setSelectedUser(null);
    notificationSound.current = new Audio("/Audio/notification.mp3");
    notificationSound.current.load();
    subscribeToNotificationChannel();
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [complaints]);

  const { sendJsonMessage } = useWebSocket(
    "wss://docapi.softcodingsolutions.com/cable",
    {
      protocol: "actioncable-v1-json",
      onOpen: () => console.log("WebSocket connection established."),
      onMessage: (event) => handleWebSocketMessage(event),
      share: true,
    }
  );

  const subscribeToChannel = (doctorId, patientId) => {
    const channelKey = `${doctorId}-${patientId}`;
    if (activeSubscriptions.current[channelKey]) return;
    console.log("Subscribing to");
    const subscriptionMessage = {
      command: "subscribe",
      identifier: JSON.stringify({
        channel: "MessagesChannel",
        doctor_id: doctorId,
        patient_id: patientId,
      }),
    };

    sendJsonMessage(subscriptionMessage);
    console.log(subscriptionMessage);
    activeSubscriptions.current[channelKey] = true;
  };

  const subscribeToNotificationChannel = () => {
    const subscriptionMessage = {
      command: "subscribe",
      identifier: JSON.stringify({
        channel: "NotificationChannel",
        user_id: main_id,
      }),
    };

    sendJsonMessage(subscriptionMessage);
    console.log("Subscribed to NotificationChannel:", subscriptionMessage);
  };

  const handleWebSocketMessage = (event) => {
    const data = JSON.parse(event.data);
    if (["ping", "welcome", "confirm_subscription"].includes(data.type)) return;

    if (data.message) {
      if (data.message.type === "message_created") {
        const newMessage = data.message.message;
        if (selectedUser && newMessage.patient_id === selectedUser.id) {
          setComplaints((prev) => [...prev, newMessage]);
          if (newMessage.role !== "doctor") notificationSound.current.play();
        } else {
          updateUnreadPatients(newMessage.patient_id);
          notificationSound.current.play();
        }
      } else if (data.message.type === "notification") {
        const newNotification = data.message.message;

        setNotifications((prev) => [...prev, newNotification]);
      }
    }
  };

  const updateUnreadPatients = (patientId) => {
    setUnreadPatients((prev) => {
      const updated = new Set(prev);
      updated.add(patientId);
      localStorage.setItem("unreadPatients", JSON.stringify([...updated]));
      return updated;
    });
  };

  const markAsRead = (user) => {
    setUnreadPatients((prev) => {
      const updated = new Set(prev);
      updated.delete(user.id);
      localStorage.setItem("unreadPatients", JSON.stringify([...updated]));
      return updated;
    });
  };
  // const fetchPatients = () => {
  //   axios
  //     .get(`api/v1/users?user_id=${main_id}`)
  //     .then((res) => {
  //       setPatients(res.data.users);
  //       res.data.users.forEach((user) => {
  //         subscribeToChannel(main_id, user.id);
  //         // console.log(user)
  //       });
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // };

  const handleResponseSubmit = async (event) => {
    event.preventDefault();
    const messageInput = event.target.elements["message_input"];
    const body = messageInput.value.trim();
    if (!body) return;

    try {
      await axios.post("/messages", {
        message: {
          body,
          role: "doctor",
          doctor_id: main_id,
          patient_id: selectedUser.id,
        },
      });
      messageInput.value = "";
    } catch (error) {
      console.error("Error sending message:", error);
    }
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
  function formatDate(timestamp) {
    const date = new Date(timestamp);

    // Format options
    const options = {
      year: "numeric",
      month: "short", // "Oct" instead of "October"
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
      hour12: true, // 12-hour format with AM/PM
    };

    return date.toLocaleDateString("en-US", options);
  }

  useEffect(() => {
    const today = new Date().toISOString().split("T")[0];
    handleData(today);
  }, []);

  useEffect(() => {
    setAvatarColor(generateRandomColor());
    axios
      .get(`/api/v1/notifications?user_id=${main_id}`)
      .then((res) => {
        console.log(res, "Notification Response");
        setNotifications(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const generateRandomColor = () => {
    return `#${Math.floor(Math.random() * 16777215)
      .toString(16)
      .padStart(6, "0")}`;
  };

  const handleUserSelect = (user) => {
    setSelectedUser(user);
    localStorage.setItem("selectedUser", JSON.stringify(user));
    markAsRead(user);

    axios
      .get(`/messages/between/${main_id}/${user.id}`)
      .then((res) => setComplaints(res.data))
      .catch((err) => console.error(err));
  };

  const formatTime = (timestamp) => {
    const date = new Date(timestamp || Date.now());

    const day = date.toLocaleDateString(undefined, {
      weekday: "short",
      month: "short",
      day: "numeric",
    });
    const hours = date.getHours() % 12 || 12;
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const ampm = date.getHours() >= 12 ? "PM" : "AM";

    return `${day} ${hours}:${minutes} ${ampm}`;
  };
  const scrollToBottom = () => {
    if (messageContainerRef.current) {
      messageContainerRef.current.scrollTop =
        messageContainerRef.current.scrollHeight;
    }
  };
  return (
    <div className="flex  font-sans ">
      {/* <div className="h-screen hidden sm:block sm:w-20 xl:w-60 flex-shrink-0">
        .
      </div> */}

      {/* <div className="flex justify-end">
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
          </div> */}

      <div className="w-full flex flex-col relative ">
        <div className="">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-3">
            {/* Cards Section */}
            <div className="bg-[#FFFBEA] rounded-lg p-2 border-2 border-[#EFE9BD] sm:p-5 xl:p-6">
              <div className="flex items-center gap-2">
                <div className="bg-[#FEF2CC] p-1 rounded-lg flex justify-center ">
                  <BsPeople size={25} color="#F2C65F" />
                </div>
                <div className="flex flex-col">
                  <span className="text-lg sm:text-xl mt-1 leading-none font-bold text-gray-900">
                    {data.total_doctor_user}
                  </span>
                  <h3 className="text-base font-normal text-gray-500">
                    Total Patients Count
                  </h3>
                </div>
              </div>
            </div>

            <div className="bg-[#ECFFFF]  border-[#DFF8F9] border-2 rounded-lg p-2 sm:p-5 xl:p-6  ">
              <div className="flex items-center gap-2">
                <div className="bg-[#D3F9F9]  p-1 rounded-lg flex justify-center ">
                  <CiCalendar size={25} color="#47B7C4" />
                </div>
                <div className="flex flex-col">
                  <span className="text-lg sm:text-xl mt-1 leading-none font-bold text-gray-900">
                    {data.todays_appointment_count}
                  </span>
                  <h3 className="text-base font-normal text-gray-500">
                    Todays Appointments
                  </h3>
                </div>
              </div>
            </div>
            <div className="bg-[#ECFDF5]  rounded-lg p-2 border-[#D3EFE6] border-2  sm:p-5 xl:p-6 ">
              <div className="flex items-center gap-2">
                <div className="bg-[#CEFCE5] p-1 rounded-lg flex justify-center ">
                  <IoPersonOutline size={25} color="#59B38D" />
                </div>
                <div className="flex flex-col">
                  <span className="text-lg sm:text-xl mt-1 leading-none font-bold text-gray-900">
                    {data.total_new_patient}
                  </span>
                  <h3 className="text-base font-normal text-gray-500">
                    New Case Patients
                  </h3>
                </div>
              </div>
            </div>
            <div className="bg-[#F6F4FF]  rounded-lg p-2  border-[#E8E8F5] border-2 sm:p-5 xl:p-6 ">
              <div className="flex items-center gap-2">
                <div className="bg-[#ECE9FE] p-1 rounded-lg flex justify-center ">
                  <SlGraph size={25} color="#8D76D5" />
                </div>
                <div className="flex flex-col">
                  <span className="text-lg sm:text-xl mt-1 leading-none font-bold text-gray-900">
                    {data.total_followup_users}
                  </span>
                  <h3 className="text-base font-normal text-gray-500">
                    Old Case Patients
                  </h3>
                </div>
              </div>
            </div>
            <div className="bg-[#FFF2F2]  rounded-lg p-2 border-[#EFDBDC] border-2  sm:p-5 xl:p-6 ">
              <div className="flex items-center gap-2">
                <div className="bg-[#FFE4E5] p-1 rounded-lg flex justify-center ">
                  <GoNorthStar size={22} color="#D95676" />
                </div>
                <div className="flex flex-col">
                  <span className="text-lg sm:text-xl mt-1 leading-none font-bold text-gray-900">
                    {data.total_franchise_user}
                  </span>
                  <h3 className="text-base font-normal text-gray-500">
                    Franchise Patients
                  </h3>
                </div>
              </div>
            </div>
          </div>

          {/* Main Container */}
          <div className="mt-2 h-[68vh] flex flex-col xl:flex-row gap-2 rounded-lg">
            {/* Notifications Panel */}
            <div className="bg-white xl:w-[30%] border p-4 rounded-md shadow-md transition-shadow duration-200  overflow-auto">
              <div className="flex sticky justify-between border-b pb-2 mb-2">
                <div className="text-md font-bold">Notifications</div>
              </div>
              {/* <div className="flex pt-2 pl-4 gap-5 border-b text-sm">
                    <button
                      className={`${
                        activeTab === 'inbox'
                          ? 'text-black border-b-2 border-black font-semibold'
                          : 'text-gray-500 border-b-2 border-transparent'
                      } pb-1 transition-colors duration-200 hover:text-black`}
                      onClick={() => setActiveTab('inbox')}
                    >
                      Inbox
                    </button>
                    <button
                      className={`${
                        activeTab === 'unread'
                          ? 'text-black border-b-2 border-black font-semibold'
                          : 'text-gray-500 border-b-2 border-transparent'
                      } pb-1 transition-colors duration-200 hover:text-black`}
                      onClick={() => setActiveTab('unread')}
                    >
                      Unread
                    </button>
                  </div> */}
              <div className="mt-4">
                {notifications.length > 0 ? (
                  notifications
                    .sort(
                      (a, b) => new Date(b.created_at) - new Date(a.created_at)
                    )
                    .map((notif) => (
                      <div
                        key={notif.id}
                        className={`p-3 mb-2 rounded-md transition-colors duration-200 hover:bg-gray-200 ${
                          notif.read ? "bg-gray-100" : "bg-white"
                        }`}
                      >
                        <div className="flex justify-between items-center">
                          <div className="font-semibold text-black">
                            {notif.title}
                          </div>
                        </div>
                        <p className="text-sm text-gray-600 mt-1">
                          {notif.body}
                        </p>
                        <div className="text-xs text-gray-400 mt-1">
                          {formatDate(notif.created_at)}
                        </div>
                      </div>
                    ))
                ) : (
                  <div className="text-center text-gray-500 py-4">
                    No notifications to display
                  </div>
                )}
              </div>
            </div>

            {/* Chat and Patient List Panel */}
            <div className="bg-white xl:w-[70%] border rounded-md p-4 shadow-lg h-full flex flex-col xl:flex-row">
              {/* Patient List */}
              <div className="bg-white xl:w-[30%] border p-2 rounded-md overflow-y-auto">
                <div className="text-md font-bold border-b pb-2 mb-2">
                  Patient&apos;s List
                </div>
                {patients.map((user) => (
                  <div
                    key={user.id}
                    className={`p-2 cursor-pointer hover:bg-gray-100 flex items-center justify-start ${
                      selectedUser?.id === user.id ? "bg-gray-200" : ""
                    }`}
                    onClick={() => handleUserSelect(user)}
                  >
                    <Avatar
                      firstName={user.first_name}
                      lastName={user.last_name}
                      avatarColor={avatarColor}
                    />
                    <div className="flex justify-between items-center">
                      <span className="ml-2 mr-2 font-medium">
                        {user.first_name} {user.last_name}
                      </span>
                      {unreadPatients.has(user.id) && (
                        <span className="w-3 h-3 bg-red-500 rounded-full"></span>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Chat Section */}
              <div className="bg-white xl:w-[70%] border rounded-md p-2 h-full flex flex-col">
                {selectedUser ? (
                  <>
                    <div className="text-md font-bold border-b pb-2 mb-2">
                      Chat with {selectedUser.first_name}{" "}
                      {selectedUser.last_name}
                    </div>
                    <div
                      className="flex-1 overflow-y-auto p-2"
                      ref={messageContainerRef}
                    >
                      {complaints?.map((message) => (
                        <div
                          key={message.id}
                          className={`mb-4 ${
                            message.role === "doctor"
                              ? "text-right"
                              : "text-left"
                          }`}
                        >
                          <div
                            className={`text-xs font-semibold text-gray-700 mb-1 ${
                              message.role === "doctor"
                                ? "text-right"
                                : "text-left"
                            }`}
                          >
                            {message.role === "doctor"
                              ? "You"
                              : `${selectedUser?.first_name} ${selectedUser?.last_name}`}
                          </div>
                          <div
                            className={`inline-block p-3 rounded-lg relative max-w-[75%] ${
                              message.role === "doctor"
                                ? "bg-blue-500 text-white"
                                : "bg-gray-200 text-black"
                            }`}
                            style={{ textAlign: "left" }}
                          >
                            <div>{message.body}</div>
                          </div>
                          <div
                            className={`text-xs text-gray-700 mt-1 ${
                              message.role === "doctor"
                                ? "text-right"
                                : "text-left"
                            }`}
                          >
                            {formatTime(message.created_at)}
                          </div>
                        </div>
                      ))}
                    </div>
                    <form
                      className="flex items-center border-t pt-2 space-x-2"
                      onSubmit={handleResponseSubmit}
                    >
                      <input
                        type="text"
                        className="flex-grow p-2 border rounded-md focus:outline-none"
                        placeholder="Type a message..."
                        id="message_input"
                      />
                      <button type="submit" className="text-blue-500">
                        <IoMdSend size={25} />
                      </button>
                    </form>
                  </>
                ) : (
                  <div className="flex items-center justify-center h-full text-gray-500">
                    No messages yet. Select a patient to start chatting.
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
