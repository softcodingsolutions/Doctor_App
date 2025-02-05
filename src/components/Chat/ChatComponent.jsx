import { useEffect, useState, useRef, useCallback } from "react";
import { TiMessages } from "react-icons/ti";
import { IoMdCloseCircleOutline, IoMdSend } from "react-icons/io";
import Avatar from "./Avatar";
import axios from "axios";
import useWebSocket from "react-use-websocket";
import "../Chat/chat.css";

function ChatComponent() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const messageContainerRef = useRef(null);
  const [hasUnread, setHasUnread] = useState(
    JSON.parse(localStorage.getItem("hasUnread")) || false
  );
  const [loading, setLoading] = useState(false); // Loading state
  const notificationSound = useRef(null);

  const doctorDetails = {
    id: localStorage.getItem("doctor_id"),
    fname: localStorage.getItem("doctor_fname"),
    lname: localStorage.getItem("doctor_lname"),
    patientId: localStorage.getItem("main_id"),
  };

  useEffect(() => {
    notificationSound.current = new Audio("/Audio/notification.mp3");
    notificationSound.current.load();
  }, [doctorDetails.patientId]);

  const subscribeToChannel = () => {
    sendMessage(
      JSON.stringify({
        command: "subscribe",
        identifier: JSON.stringify({
          channel: "MessagesChannel",
          doctor_id: doctorDetails.id,
          patient_id: doctorDetails.patientId,
        }),
      })
    );
  };

  const handleWebSocketMessage = useCallback(
    (event) => {
      const data = JSON.parse(event.data);
      if (["ping", "welcome", "confirm_subscription"].includes(data.type))
        return;

      const { type, message } = data.message || {};
      if (type === "message_created") {
        setMessages((prevMessages) => [...prevMessages, message]);

        if (message.role === "doctor" && !isModalOpen) {
          notificationSound.current
            .play()
            .catch((error) =>
              console.warn("Failed to play notification sound:", error)
            );
          updateUnreadStatus(true);
        }
      }
    },
    [isModalOpen]
  );

  const updateUnreadStatus = (status) => {
    setHasUnread(status);
    localStorage.setItem("hasUnread", JSON.stringify(status));
  };

  const handleIconClick = () => {
    setIsModalOpen(true);
    fetchMessages();
    scrollToBottom();
    updateUnreadStatus(false);
  };

  const { sendMessage } = useWebSocket("wss://docapi.softcodingsolutions.com/cable", {
    onOpen: subscribeToChannel,
    onMessage: handleWebSocketMessage,
  });

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const fetchMessages = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(
        `/messages/between/${doctorDetails.id}/${doctorDetails.patientId}`
      );
      setMessages(data);
      scrollToBottom();
    } catch (error) {
      console.error("Error fetching messages:", error);
    } finally {
      setLoading(false);
    }
  };

  const scrollToBottom = () => {
    if (messageContainerRef.current) {
      messageContainerRef.current.scrollTop =
        messageContainerRef.current.scrollHeight;
    }
  };

  const handleSendMessage = async (event) => {
    event.preventDefault();
    const messageInput = event.target.elements["message-input"];
    const body = messageInput.value.trim();
    if (!body) return;

    messageInput.value = "";

    try {
      const formData = new FormData();
      formData.append("message[body]", body);
      formData.append("message[doctor_id]", doctorDetails.id);
      formData.append("message[patient_id]", doctorDetails.patientId);
      formData.append("message[role]", "patient");

      await axios.post("/messages", formData);
    } catch (error) {
      console.error("Error sending message:", error);
    }
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

  const handleCloseClick = () => {
    setIsModalOpen(false);
  };

  return (
    <div id="chat-app">
      <div
        id="chat-icon"
        onClick={handleIconClick}
        className="bottom-5 right-5 w-14 h-14 bg-[#1F2937] rounded-full flex justify-center items-center cursor-pointer relative"
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
          <div className="bg-white w-full md:w-2/3 lg:w-1/2 xl:w-1/3 max-h-full h-full md:h-3/4 p-4 rounded-md shadow-lg flex flex-col overflow-hidden">
            <div className="flex items-center border-b pb-2">
              <Avatar
                firstName={doctorDetails.fname}
                lastName={doctorDetails.lname}
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

            <div
              ref={messageContainerRef}
              id="messages"
              className="flex-grow overflow-y-auto p-2 space-y-4"
            >
              {loading && <div>Loading messages...</div>}
              {messages.length === 0 && !loading && (
                <div className="text-center text-gray-500">No messages yet</div>
              )}
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex flex-col ${
                    message.role === "doctor" ? "items-start" : "items-end"
                  }`}
                >
                  <span className="text-xs font-semibold uppercase text-gray-600 mb-1">
                    {message.role === "doctor"
                      ? `Dr. ${doctorDetails.fname} ${doctorDetails.lname}`
                      : "You"}
                  </span>

                  <div
                    className={`p-3 rounded-lg shadow-md max-w-xs w-fit ${
                      message.role === "doctor"
                        ? "bg-gray-200 text-black"
                        : "bg-blue-500 text-white"
                    }`}
                  >
                    {message.body}
                  </div>

                  <span className="text-xs text-gray-500 mt-1">
                    {formatTime(message.created_at)}
                  </span>
                </div>
              ))}
            </div>

            <form
              onSubmit={handleSendMessage}
              className="flex items-center border-t pt-2 space-x-2"
            >
              <input
                name="message-input"
                type="text"
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
