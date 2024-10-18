import { useEffect, useState, useRef, useCallback } from 'react';
import { TiMessages } from 'react-icons/ti';
import { IoMdCloseCircleOutline, IoMdSend } from 'react-icons/io';
import Avatar from './Avatar';
import './chat.css';
import axios from 'axios';
import useWebSocket from 'react-use-websocket';

function ChatComponent() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [avatarColor, setAvatarColor] = useState('');
  const messageContainerRef = useRef(null);
  const [hasUnread, setHasUnread] = useState(
    JSON.parse(localStorage.getItem('hasUnread')) || false,
  );
  const notificationSound = useRef(new Audio('/Audio/notification.mp3'));

  const doctorDetails = {
    id: localStorage.getItem('doctor_id'),
    fname: localStorage.getItem('doctor_fname'),
    lname: localStorage.getItem('doctor_lname'),
    patientId: localStorage.getItem('main_id'),
  };

  useEffect(() => {
    setAvatarColor(generateRandomColor());
    notificationSound.current.load();
  }, []);

  const subscribeToChannel = () => {
    sendMessage(
      JSON.stringify({
        command: 'subscribe',
        identifier: JSON.stringify({
          channel: 'MessagesChannel',
          doctor_id: doctorDetails.id,
          patient_id: doctorDetails.patientId,
        }),
      }),
    );
  };

  const handleWebSocketMessage = useCallback(event => {
    const data = JSON.parse(event.data);
    if (['ping', 'welcome', 'confirm_subscription'].includes(data.type)) return;
    const { type, message } = data.message || {};
    if (type === 'message_created') {
      setMessages(prevMessages => [...prevMessages, message]);
      if (message.role === 'doctor') {
        // notificationSound.current.play();
        updateUnreadStatus(true);
      }
    }
  }, []);

  const updateUnreadStatus = status => {
    setHasUnread(status);
    localStorage.setItem('hasUnread', JSON.stringify(status));
  };

  const handleIconClick = () => {
    setIsModalOpen(true);
    fetchMessages(); // Fetch messages when chat opens
    scrollToBottom();
    updateUnreadStatus(false); // Mark as read when chat is opened
  };

  const { sendMessage } = useWebSocket('ws://localhost:3000/cable', {
    onOpen: subscribeToChannel,
    onMessage: handleWebSocketMessage,
  });

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const fetchMessages = async () => {
    try {
      const { data } = await axios.get(
        `/messages/between/${doctorDetails.id}/${doctorDetails.patientId}`,
      );
      setMessages(data);
      scrollToBottom();
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  };

  const scrollToBottom = () => {
    if (messageContainerRef.current) {
      messageContainerRef.current.scrollTop =
        messageContainerRef.current.scrollHeight;
    }
  };

  const generateRandomColor = () => {
    return `#${Math.floor(Math.random() * 16777215)
      .toString(16)
      .padStart(6, '0')}`;
  };

  const handleSendMessage = async event => {
    event.preventDefault();
    const messageInput = event.target.elements['message-input'];
    const body = messageInput.value.trim();
    if (!body) return;

    messageInput.value = '';

    try {
      const formData = new FormData();
      formData.append('message[body]', body);
      formData.append('message[doctor_id]', doctorDetails.id);
      formData.append('message[patient_id]', doctorDetails.patientId);
      formData.append('message[role]', 'patient');

      await axios.post('/messages', formData);
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  const formatTime = timestamp => {
    const date = new Date(timestamp || Date.now());

    const day = date.toLocaleDateString(undefined, {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
    });
    const hours = date.getHours() % 12 || 12; // 12-hour format
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const ampm = date.getHours() >= 12 ? 'PM' : 'AM';

    return `${day} ${hours}:${minutes} ${ampm}`;
  };

  const handleCloseClick = () => {
    setIsModalOpen(false);
  };

  return (
    <div id="chat-app">
      <div
        id="chat-icon"
        onClick={handleIconClick}
        className="bottom-5 right-5 w-14 h-14 bg-blue-500 rounded-full flex justify-center items-center cursor-pointer relative"
      >
        <TiMessages size={40} className="text-white" />
        {hasUnread && (
          <span className="w-4 h-4 bg-red-500 rounded-full absolute top-0 right-1"></span>
        )}
      </div>

      {isModalOpen && (
        <div
          id="chat-modal"
          className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-10"
        >
          <div className="bg-white w-2/5 h-3/4 p-4 rounded-md shadow-lg flex flex-col absolute bottom-10 right-10">
            {/* Header with Doctor Info */}
            <div className="flex items-center border-b pb-2">
              <Avatar
                firstName={doctorDetails.fname}
                lastName={doctorDetails.lname}
                avatarColor={avatarColor}
              />
              <div className="ml-3 font-medium text-lg">
                Dr. {doctorDetails.fname} {doctorDetails.lname}
              </div>
              <IoMdCloseCircleOutline
                onClick={handleCloseClick}
                size={25}
                className="ml-auto cursor-pointer"
              />
            </div>

            {/* Chat Messages Container */}
            <div
              ref={messageContainerRef}
              id="messages"
              className="flex-grow overflow-y-auto p-2 space-y-4"
            >
              {messages.map(message => (
                <div
                  key={message.id}
                  className={`flex flex-col ${
                    message.role === 'doctor' ? 'items-start' : 'items-end'
                  }`}
                >
                  {/* Label */}
                  <span className="text-xs font-semibold uppercase text-gray-600 mb-1">
                    {message.role === 'doctor'
                      ? `Dr. ${doctorDetails.fname} ${doctorDetails.lname}`
                      : 'You'}
                  </span>

                  {/* Message Bubble */}
                  <div
                    className={`p-3 rounded-lg shadow-md max-w-xs w-fit ${
                      message.role === 'doctor'
                        ? 'bg-gray-200 text-black'
                        : 'bg-blue-500 text-white'
                    }`}
                  >
                    {message.body}
                  </div>

                  {/* Timestamp */}
                  <span className="text-xs text-gray-500 mt-1">
                    {formatTime(message.created_at)}
                  </span>
                </div>
              ))}
            </div>

            {/* Input Form */}
            <form
              onSubmit={handleSendMessage}
              className="flex items-center border-t pt-2 space-x-2"
            >
              <input
                type="text"
                name="message-input"
                placeholder="Type a message..."
                autoComplete="off"
                className="flex-grow p-2 border rounded-md focus:outline-none"
              />
              <button type="submit" className="text-blue-500">
                <IoMdSend size={25} />
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default ChatComponent;
