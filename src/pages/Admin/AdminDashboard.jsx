import { useEffect, useRef, useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import axios from 'axios';
import { FaUsersLine } from 'react-icons/fa6';
import { FaUserPlus } from 'react-icons/fa';
import { AiFillBulb } from 'react-icons/ai';
import { GoNorthStar } from 'react-icons/go';
import { FaClipboardList } from 'react-icons/fa';
import useWebSocket from 'react-use-websocket';
import { IoMdSend } from 'react-icons/io';
import Avatar from '../../components/Chat/Avatar';

function AdminDashboard() {
  const context = useOutletContext();
  const main_id = localStorage.getItem('main_id');
  const [data, setData] = useState('');
  const [activeTab, setActiveTab] = useState('inbox');
  const [complaints, setComplaints] = useState([]);
  const [patients, setPatients] = useState([]);
  const [avatarColor, setAvatarColor] = useState('');
  const [selectedUser, setSelectedUser] = useState(
    JSON.parse(localStorage.getItem('selectedUser')) || null
  );
  const [unreadPatients, setUnreadPatients] = useState(
    new Set(JSON.parse(localStorage.getItem('unreadPatients')) || [])
  );
  const messageContainerRef = useRef(null);
  const notificationSound = useRef(new Audio('/Audio/notification.mp3'));
  const activeSubscriptions = useRef({});

  useEffect(() => {
    fetchPatients();
    setSelectedUser(null)
  }, []);

  useEffect(() => {
    scrollToBottom()
  },[complaints])

  const { sendJsonMessage } = useWebSocket('ws://localhost:3000/cable', {
    protocol: 'actioncable-v1-json',
    onOpen: () => console.log('WebSocket connection established.'),
    onMessage: event => handleWebSocketMessage(event),
    share: true, // Share the WebSocket connection between components
  });

  const subscribeToChannel = (doctorId, patientId) => {
    const channelKey = `${doctorId}-${patientId}`;
    if (activeSubscriptions.current[channelKey]) return;

    const subscriptionMessage = {
      command: 'subscribe',
      identifier: JSON.stringify({
        channel: 'MessagesChannel',
        doctor_id: doctorId,
        patient_id: patientId,
      }),
    };

    sendJsonMessage(subscriptionMessage);
    activeSubscriptions.current[channelKey] = true;
  };


  const handleWebSocketMessage = event => {
    const data = JSON.parse(event.data);
    if (['ping', 'welcome', 'confirm_subscription'].includes(data.type)) return;

    if (data.message.type === 'message_created') {
      const newMessage = data.message.message;

      if (selectedUser && newMessage.patient_id === selectedUser.id) {
        setComplaints(prev => [...prev, newMessage]);
        if (newMessage.role !== 'doctor') notificationSound.current.play();
      } else {
        updateUnreadPatients(newMessage.patient_id);
        notificationSound.current.play();
      }
    }
  };

  const updateUnreadPatients = patientId => {
    setUnreadPatients(prev => {
      const updated = new Set(prev);
      updated.add(patientId);
      localStorage.setItem('unreadPatients', JSON.stringify([...updated]));
      return updated;
    });
  };

  const markAsRead = user => {
    setUnreadPatients(prev => {
      const updated = new Set(prev);
      updated.delete(user.id);
      localStorage.setItem('unreadPatients', JSON.stringify([...updated]));
      return updated;
    });
  };
  const fetchPatients = () => {
    axios
      .get(`api/v1/users?user_id=${main_id}`)
      .then(res => {
        setPatients(res.data.users);
        res.data.users.forEach(user => subscribeToChannel(main_id, user.id));
      })
      .catch(err => {
        console.log(err);
      });
  };


  const handleResponseSubmit = async event => {
    event.preventDefault();
    const messageInput = event.target.elements['message_input'];
    const body = messageInput.value.trim();
    if (!body) return;

    try {
      await axios.post('/messages', {
        message: {
          body,
          role: 'doctor',
          doctor_id: main_id,
          patient_id: selectedUser.id,
        },
      });
      messageInput.value = '';
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  const handleData = today => {
    axios
      .get(`/api/v2/dashboards?doctor_id=${main_id}&date=${today}`)
      .then(res => {
        console.log(res);
        setData(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  };
  useEffect(() => {
    const today = new Date().toISOString().split('T')[0];
    handleData(today);
  }, []);

  useEffect(() => {
    setAvatarColor(generateRandomColor());
  }, []);

  const generateRandomColor = () => {
    return `#${Math.floor(Math.random() * 16777215)
      .toString(16)
      .padStart(6, '0')}`;
  };


  

  const handleUserSelect = user => {
    setSelectedUser(user);
    localStorage.setItem('selectedUser', JSON.stringify(user));
    markAsRead(user);

    axios
      .get(`/messages/between/${main_id}/${user.id}`)
      .then(res => setComplaints(res.data))
      .catch(err => console.error(err));
  };
  

  const formatTime = timestamp => {
    const date = new Date(timestamp || Date.now());
  
    const day = date.toLocaleDateString(undefined, {
      weekday: 'short', month: 'short', day: 'numeric'
    });
    const hours = date.getHours() % 12 || 12; // 12-hour format
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const ampm = date.getHours() >= 12 ? 'PM' : 'AM';
  
    return `${day} ${hours}:${minutes} ${ampm}`;
  };
  const scrollToBottom = () => {
    if (messageContainerRef.current) {
      messageContainerRef.current.scrollTop =
        messageContainerRef.current.scrollHeight;
    }
  };
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
                <div className="bg-white w-[30%] border p-4 rounded-md">
                  <div className="flex justify-between border-b pb-2 mb-2">
                    <div className="text-lg font-bold ">Notifications</div>
                    <button className="text-sm font-medium text-blue-500">
                      Mark all as read
                    </button>
                  </div>
                  <div className="flex pt-2 pl-4 gap-5 border-b text-sm">
                    <button
                      className={`${
                        activeTab === 'inbox'
                          ? 'text-black border-b-2 border-black'
                          : 'text-gray-500 border-b-2 border-transparent'
                      } pb-1`}
                      onClick={() => setActiveTab('inbox')}
                    >
                      Inbox
                    </button>
                    <button
                      className={`${
                        activeTab === 'unread'
                          ? 'text-black border-b-2 border-black'
                          : 'text-gray-500 border-b-2 border-transparent'
                      } pb-1`}
                      onClick={() => setActiveTab('unread')}
                    >
                      Unread
                    </button>
                  </div>
                </div>
                <div className="bg-white w-[70%] border rounded-md p-4 shadow-lg h-full flex">
                  <div className="bg-white w-[30%] border p-4 rounded-md overflow-y-auto">
                    <div className="text-lg font-bold border-b pb-2 mb-2">
                      Patient&apos;s List
                    </div>
                    {patients.map(user => (
                      <div
                        key={user.id}
                        className={`p-2 cursor-pointer hover:bg-gray-100 flex items-center justify-start ${
                          selectedUser?.id === user.id ? 'bg-gray-200' : ''
                        }`}
                        onClick={() => handleUserSelect(user)}
                      >
                        <Avatar
                          firstName={user.first_name}
                          lastName={user.last_name}
                          avatarColor={avatarColor}
                        />
                        <div className="flex justify-between items-center">
              <span className="ml-2 mr-2 font-semibold">
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
                  <div className="bg-white w-[70%] border rounded-md p-4 h-full flex flex-col">
                    {selectedUser ? (
                      <>
                        <div className="text-lg font-bold border-b pb-2 mb-2">
                          Chat with {selectedUser.first_name}{' '}
                          {selectedUser.last_name}
                        </div>
                        <div className="flex-1 overflow-y-auto p-2" ref={messageContainerRef}>
                          {complaints?.map(message => (
                            <div
                              key={message.id}
                              className={`mb-4 ${
                                message.role === 'doctor'
                                  ? 'text-right'
                                  : 'text-left'
                              }`}
                            >
                              {/* Label Above the Bubble */}
                              <div
                                className={`text-xs font-semibold text-gray-700 mb-1 ${
                                  message.role === 'doctor'
                                    ? 'text-right'
                                    : 'text-left'
                                }`}
                              >
                                {message.role === 'doctor'
                                  ? 'You'
                                  : `${selectedUser?.first_name} ${selectedUser?.last_name}`}
                              </div>

                              {/* Message Bubble */}
                              <div
                                className={`inline-block p-3 rounded-lg relative max-w-[75%] ${
                                  message.role === 'doctor'
                                    ? 'bg-blue-500 text-white'
                                    : 'bg-gray-200 text-black'
                                }`}
                                style={{ textAlign: 'left' }}
                              >
                                {/* Message Body */}
                                <div>{message.body}</div>
                              </div>

                              {/* Timestamp Below the Bubble */}
                              <div
                                className={`text-xs text-gray-700 mt-1 ${
                                  message.role === 'doctor'
                                    ? 'text-right'
                                    : 'text-left'
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
      </div>
    </div>
  );
}

export default AdminDashboard;
