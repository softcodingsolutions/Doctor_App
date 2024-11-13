import { useEffect, useState, useRef, useCallback } from "react";
import { TiBell } from "react-icons/ti";
import { IoMdCloseCircleOutline } from "react-icons/io";
import useWebSocket from "react-use-websocket";

function NotificationComponent() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [hasUnread, setHasUnread] = useState(
    JSON.parse(localStorage.getItem("notificationHasUnread")) || false
  );
  const notificationSound = useRef(null);

  const userId = localStorage.getItem("user_id");
  const { sendMessage } = useWebSocket(
    "ws:/https://7ba8-2401-4900-1f3f-4f0b-9413-9596-8f61-c0c4.ngrok-free.app/cable",
    {
      onOpen: JSON.stringify({
        command: "subscribe",
        identifier: JSON.stringify({
          channel: "NotificationChannel",
          user_id: userId,
        }),
      }),
      onMessage: (event) => {
        const data = JSON.parse(event.data);

        // Ignore certain message types
        if (["ping", "welcome", "confirm_subscription"].includes(data.type))
          return;

        if (data.message) {
          const newNotification = data.message.notification;
          setNotifications((prev) => [...prev, newNotification]);
          setHasUnread(true);
          localStorage.setItem("notificationHasUnread", JSON.stringify(true));

          // Play sound
          notificationSound.current
            .play()
            .catch((error) =>
              console.warn("Failed to play notification sound:", error)
            );
        }
      },
    }
  );

  const handleIconClick = () => {
    setIsModalOpen(true);
    setHasUnread(false);
    localStorage.setItem("notificationHasUnread", JSON.stringify(false));
  };

  const handleCloseClick = () => {
    setIsModalOpen(false);
  };

  // Load sound and set unread status from localStorage
  useEffect(() => {
    notificationSound.current = new Audio("/Audio/notification.mp3");
    notificationSound.current.load();
  }, []);

  return (
    <div id="notification-app">
      <div
        id="notification-icon"
        onClick={handleIconClick}
        className="bottom-5 right-5 w-14 h-14 bg-[#1F2937] rounded-full flex justify-center items-center cursor-pointer relative"
      >
        <TiBell size={40} className="text-white" />
        {hasUnread && (
          <span className="w-4 h-4 bg-red-500 rounded-full absolute top-0 right-1"></span>
        )}
      </div>

      {isModalOpen && (
        <div
          id="notification-modal"
          className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-10"
        >
          <div className="bg-white w-full md:w-2/3 lg:w-1/2 xl:w-1/3 max-h-full h-full md:h-3/4 p-4 rounded-md shadow-lg flex flex-col overflow-hidden">
            <div className="flex items-center border-b pb-2">
              <div className="ml-3 font-medium text-lg">Notifications</div>
              <IoMdCloseCircleOutline
                onClick={handleCloseClick}
                size={25}
                className="ml-auto cursor-pointer"
              />
            </div>

            <div className="flex-grow overflow-y-auto p-2 space-y-4">
              {notifications.length === 0 ? (
                <div className="text-center text-gray-500">
                  No notifications yet
                </div>
              ) : (
                notifications.map((notification, index) => (
                  <div
                    key={index}
                    className="p-3 rounded-lg shadow-md bg-gray-200"
                  >
                    <div className="font-semibold">{notification.title}</div>
                    <p>{notification.body}</p>
                    <span className="text-xs text-gray-500 mt-1">
                      {new Date(notification.created_at).toLocaleString()}
                    </span>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default NotificationComponent;
